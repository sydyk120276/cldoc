import gsap from "gsap";
import svgPanZoom from "svg-pan-zoom";
import { chooserInit } from "./country-chooser";
const opener = document.querySelector('.svg-map-opener');

if(opener) {
  const map = document.querySelector('.map-modal');
  const closer = map.querySelector('.modal-closer');

  const tl = gsap.timeline().pause();

  tl
    .fromTo(map.parentNode, {
      opacity: 0,
      visibility: 'hidden'
    }, {
      opacity: 1,
      duration: .8,
      visibility: 'visible'
    });

  const debounceTime = 850;

  let zoomContainer = null;

  const zoomIn = document.querySelector('.map-modal-zoom--in');
  const zoomOut = document.querySelector('.map-modal-zoom--out');

  zoomIn.addEventListener('click', () => {
    zoomContainer.zoomIn();
  });

  zoomOut.addEventListener('click', () => {
    zoomContainer.zoomOut();
  });

  const onClickOpenMap = () => {
    chooserInit('init');
    zoomContainer =  svgPanZoom('.map-modal .svg-map', {
      viewportSelector: '.svg-pan-zoom_viewport',
      panEnabled: true,
      controlIconsEnabled: false,
      zoomEnabled: true,
      dblClickZoomEnabled: true,
      mouseWheelZoomEnabled: true,
      preventMouseEventsDefault: true,
      zoomScaleSensitivity: 0.2,
      minZoom: 1,
      maxZoom: 5,
      fit: true,
      contain: false,
      center: true,
      refreshRate: 'auto',
    });

    opener.removeEventListener('click', onClickOpenMap);

    tl.play();
    setTimeout(() => {
      document.addEventListener('click', onOverlayClickCloseModal);
      document.addEventListener('keydown', onEscClickCloseModal);
      closer.addEventListener('click', modalCloseHandler);
      window.addEventListener('resize', modalCloseHandler);

    }, debounceTime);
  }

  opener.addEventListener('click', onClickOpenMap);

  const onEscClickCloseModal = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      closeFunc();
    }
  }

  const modalCloseHandler = () => {
    closeFunc();
  }

  const onOverlayClickCloseModal = (evt) => {
    if(evt.target === map.parentNode) {
      closeFunc();
    }
  }

  function closeFunc() {
    document.removeEventListener('click', onOverlayClickCloseModal);
    document.removeEventListener('keydown', onEscClickCloseModal);
    closer.removeEventListener('click', modalCloseHandler);
    window.removeEventListener('resize', modalCloseHandler);

    tl.reverse();

    setTimeout(() => {
      zoomContainer.destroy();
      chooserInit('destroy');
      opener.addEventListener('click', onClickOpenMap);
    }, debounceTime);
  }
}
