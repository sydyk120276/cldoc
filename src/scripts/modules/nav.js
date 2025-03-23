import { burger, nav } from '../utils/nodes.js';
import {gsap} from 'gsap';

if(nav) {
  const onClickHandler = () => {
    if(!nav.classList.contains('active')) {
      openNav();
    } else {
      closeNav();
    }
  };

  const tl = gsap.timeline().pause();

  tl
    .fromTo(nav, {
      display: 'none',
      opacity: 0,
      classList: 'header__nav'
    }, {
      display: 'flex',
      opacity: 1,
      duration: .4,
      classList: 'header__nav active'
    })
    .to(burger, {
      rotate: '45deg',
      duration: .3
    }, "-=.5")
    .fromTo('.header__nav .nav',{
      opacity: 0,
      right: '-100vw'
    }, {
      opacity: 1,
      right: '0',
      duration: .2,
      ease: 'ease-in'
    }, "-=.4");

  function openNav() {
    burger.removeEventListener('click', onClickHandler);
    tl.play();

    setTimeout(() => {
      addListener();
    }, 1000);
  };

  function closeNav() {
    burger.removeEventListener('click', closeNav);
    removeListener();

    tl.reverse();

    setTimeout(() => {
      burger.addEventListener('click', onClickHandler);
    }, 1000);
  };

  const addListener = () => {
    burger.addEventListener('click', closeNav);
    document.addEventListener('click', onOverlayClickCloseNav);
    document.addEventListener('keydown', onEscClickCloseNav);
  }

  const removeListener = () => {
    document.removeEventListener('click', onOverlayClickCloseNav);
    document.removeEventListener('keydown', onEscClickCloseNav);
  }

  const onOverlayClickCloseNav = (evt) => {
    if(evt.target === nav) {
      closeNav();
    }
  }

  const onEscClickCloseNav = (evt) => {
    if(evt.key === "Escape" || evt.key === "Esc") {
      closeNav();
    }
  }

  burger.addEventListener('click', onClickHandler);
}
