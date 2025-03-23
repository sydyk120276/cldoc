import gsap from "gsap";
const activePaths = document.querySelectorAll('.map-modal .svg-map path.active');
const paths = document.querySelectorAll('.map-modal .svg-map path');
const tooltip  = document.querySelector('.map-modal-tooltip');
const chooser  = document.querySelector('.map-modal-chooser');
const chooserCloser = chooser.querySelector('.chooser-closer');

const tooltipTimeline = gsap.timeline().pause();
tooltipTimeline
  .to(tooltip, {
    visibility: 'visible',
    duration: .4,
    delay: .2,
    opacity: 1,
    ease: 'ease-in'
  });

const chooserTimeline = gsap.timeline().pause();
chooserTimeline
  .to(chooser, {
    visibility: 'visible',
    duration: .4,
    delay: .2,
    opacity: 1,
    ease: 'ease-in'
  });

const setTooltipPos = evt => {
  gsap.to(tooltip, {
    x: evt.clientX,
    y: evt.clientY
  })
};

let isChooserActive = false;

let activePathTitle = null;
let activePathUrl = null;
let currentPath = null;
let curPathId = null;

const showTooltipHandler = (evt) => {
  if(!isChooserActive) {
    currentPath = evt.target;

    window.addEventListener('mousemove', setTooltipPos);
    currentPath.removeEventListener('mouseover', showTooltipHandler);

    activePathTitle = currentPath.dataset.titleRu;
    activePathUrl = currentPath.dataset.link;
    tooltip.innerHTML = activePathTitle;

    curPathId = currentPath.dataset.id;

    const similarPaths = document.querySelectorAll(`[data-id='${curPathId}']`);
    similarPaths.forEach(item => {
      item.classList.add('infocus');
    });

    tooltipTimeline.play();
    currentPath.addEventListener('mouseout', hideTooltipHandler);
  }
}

const hideTooltipHandler = () => {
  tooltipTimeline.reverse();

  const similarPaths = document.querySelectorAll(`[data-id='${curPathId}']`);
  similarPaths.forEach(item => {
    item.classList.remove('infocus');
  });

  window.removeEventListener('mousemove', setTooltipPos);
  currentPath.removeEventListener('mouseout', hideTooltipHandler);
  currentPath.addEventListener('mouseover', showTooltipHandler);

  curPathId = null;
}

const initChooserHandler = (evt) => {
  if(!isChooserActive) {
    isChooserActive = true;

    let title = chooser.querySelector('span');
    title.innerHTML = activePathTitle;
    let link = chooser.querySelector('a');
    link.setAttribute('href', activePathUrl);

    paths.forEach(item => {
      if(item.dataset.id === curPathId) {
        item.classList.add('clicked');
      } else {
        item.classList.add('transparented');
      }
    });

    tooltipTimeline.reverse();
    chooserTimeline.play();
  }
}

const destroyChooserHandler = () => {
  isChooserActive = false;

  chooserTimeline.reverse();

  paths.forEach(path => {
    path.classList.contains('transparented') ? path.classList.remove('transparented') : null;
    path.classList.contains('clicked') ? path.classList.remove('clicked') : null;
  });
}

const onOverlayClickHandler = (evt) => {
  evt.stopPropagation();

  if(evt.target !== chooser && isChooserActive) {
    destroyChooserHandler();
  }
}

chooserCloser.addEventListener('click', destroyChooserHandler);

export function chooserInit(state) {
  if(activePaths) {
    if(state === 'init') {
      activePaths.forEach(path => {
        path.addEventListener('mouseover', showTooltipHandler, false);
        path.addEventListener('click', initChooserHandler);
        path.addEventListener('touchstart', initChooserHandler);
      });
    } else if(state == 'destroy') {
      activePaths.forEach(path => {
        path.removeEventListener('mouseover', showTooltipHandler);
        path.removeEventListener('click', initChooserHandler);
        path.removeEventListener('touchstart', initChooserHandler);
      });

      if(isChooserActive) {
        chooserTimeline.reverse();
        isChooserActive = false;

        paths.forEach(path => {
          path.classList.contains('transparented') ? path.classList.remove('transparented') : null;
          path.classList.contains('clicked') ? path.classList.remove('clicked') : null;
        });

        document.removeEventListener('click', onOverlayClickHandler, false);
      }

      if(currentPath !== null) {
        currentPath.removeEventListener('mouseout', hideTooltipHandler);
        currentPath = null;
      }
    }
  }
}
