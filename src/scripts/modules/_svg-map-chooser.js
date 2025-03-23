/*import { gsap } from "gsap";


const activePaths = document.querySelectorAll('.map-modal .svg-map path.active');

if(activePaths) {
  const paths = document.querySelectorAll('.map-modal .svg-map path');
  const tooltip  = document.querySelector('.map-modal-tooltip');
  const chooser  = document.querySelector('.map-modal-chooser');
  const chooserCloser = chooser.querySelector('.chooser-closer');

  let currentPath = null;
  let curPathId = null;
  let isChooserActive = false;
  let activePathTitle = null;
  let activePathUrl = null;

  const tooltipTl = gsap.timeline().pause();
  tooltipTl
    .to(tooltip, {
      visibility: 'visible',
      duration: .4,
      delay: .2,
      opacity: 1,
      ease: 'ease-in'
    });

  const chooserTl = gsap.timeline().pause();
  chooserTl
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

  const initChooser = () => {
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

      tooltipTl.reverse();
      chooserTl.play();

      document.addEventListener('click', onOverlayClickHandler, true);
    }
  }

  const hideChooserHandler = () => {
    isChooserActive = false;

    chooserTl.reverse();

    paths.forEach(path => {
      path.classList.contains('transparented') ? path.classList.remove('transparented') : null;
      path.classList.contains('clicked') ? path.classList.remove('clicked') : null;
    });

    document.removeEventListener('click', onOverlayClickHandler, true);
  }

  const onOverlayClickHandler = (evt) => {
    evt.stopPropagation();

    if(evt.target !== chooser && isChooserActive) {
      hideChooserHandler();
    }
  }

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

      tooltipTl.play();
      currentPath.addEventListener('mouseout', hideTooltipHandler);
    } else {
      currentPath.removeEventListener('mouseover', showTooltipHandler);
    }
  }

  const hideTooltipHandler = () => {
    window.removeEventListener('mousemove', setTooltipPos);
    tooltipTl.reverse();

    const similarPaths = document.querySelectorAll(`[data-id='${curPathId}']`);

    similarPaths.forEach(item => {
      item.classList.remove('infocus');
    });

    curPathId = null;
    currentPath.addEventListener('mouseover', showTooltipHandler);
  }

  activePaths.forEach(path => {
    path.addEventListener('mouseover', showTooltipHandler);
    path.addEventListener('click', initChooser);
    path.addEventListener('touchstart', initChooser);
  });

  chooserCloser.addEventListener('click', hideChooserHandler);
};*/
