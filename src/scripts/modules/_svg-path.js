import { gsap } from "gsap";

const paths = document.querySelectorAll('.map-modal .svg-map path.active');

if(paths) {
  const allPaths = document.querySelectorAll('.map-modal .svg-map path');

  const tooltip  = document.querySelector('.map-modal-tooltip');
  const chooser  = document.querySelector('.map-modal-chooser');
  const chooserCloser = chooser.querySelector('.chooser-closer');
  let currentPath = null;
  let curPathId = null;
  const tl = gsap.timeline().pause();


  tl
    .to(tooltip, {
      visibility: 'visible',
      duration: .6,
      delay: .3,
      opacity: 1,
      ease: 'ease-in'
    });

  const chooserTl = gsap.timeline().pause();

  chooserTl
    .to(chooser, {
      visibility: 'visible',
      duration: .6,
      delay: .3,
      opacity: 1,
      ease: 'ease-in'
    });

  const setTooltipPos = evt => {
    gsap.to(tooltip, {
      x: evt.clientX,
      y: evt.clientY
    })
  };

  /*const showTooltipHandler = (evt) => {
    window.addEventListener('mousemove', setTooltipPos);
    evt.target.removeEventListener('mouseover', showTooltipHandler);

    const titleRU = evt.target.dataset.titleRu;
    currentPath = evt.target;
    tooltip.innerHTML = titleRU;

    tl.play();

    currentPath.addEventListener('mouseout', hideTooltipHandler);
  }*/



  const showChooserHandler = (evt) => {
    gsap.to(chooser, {
      x: evt.clientX,
      y: evt.clientY
    });
    console.log(paths);

    allPaths.forEach(p => {
      if(p.dataset.id === curPathId) {
        p.classList.add('clicked');
      } else {
        p.classList.add('transparented');
      }
    });

    tl.reverse();
    chooserTl.play();
    chooserCloser.addEventListener('click', hideChooserHandler);
  }

  const hideChooserHandler = (evt) => {
    chooserTl.reverse();
    chooserCloser.removeEventListener('click', hideChooserHandler);

    allPaths.forEach(path => {
      path.classList.contains('transparented') ? path.classList.remove('transparented') : null;
      path.classList.contains('clicked') ? path.classList.remove('clicked') : null;
    });
  }

  const showTooltipHandler = (evt) => {
    currentPath = evt.target;

    window.addEventListener('mousemove', setTooltipPos);
    currentPath.removeEventListener('mouseover', showTooltipHandler);

    const titleRU = currentPath.dataset.titleRu;
    tooltip.innerHTML = titleRU;

    curPathId = currentPath.dataset.id;

    const all = document.querySelectorAll(`[data-id='${curPathId}']`);

    all.forEach(p => {
      p.classList.add('infocus');
    });

    tl.play();

    currentPath.addEventListener('mouseout', hideTooltipHandler);
  }

  const hideTooltipHandler = (evt) => {
    window.removeEventListener('mousemove', setTooltipPos);
    tl.reverse();

    const all = document.querySelectorAll(`[data-id='${curPathId}']`);

    all.forEach(p => {
      p.classList.remove('infocus');
    });

    curPathId = null;
    currentPath.addEventListener('mouseover', showTooltipHandler);
  }

  paths.forEach(path => {
    path.addEventListener('mouseover', showTooltipHandler);

    /*path.addEventListener('mouseup', (evt) => {
      window.location.href = evt.target.dataset.link;
    });

    path.addEventListener('touchstart', (evt) => {
      window.location.href = evt.target.dataset.link;
    });*/

    path.addEventListener('click', showChooserHandler);

  });
};
