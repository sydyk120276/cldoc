import { gsap } from "gsap";

const search = document.querySelector('.search');

if(search) {
  const opener = document.querySelector('.search-opener');
  const closer = search.querySelector('.search-closer');

  const onClickOpenSearchField = () => {

    gsap.to(search, {
      opacity: 1,
      top: 0,
      duration: .7,
      ease: 'ease-in',
      onComplete: () => {
        opener.removeEventListener('click', onClickOpenSearchField);
        closer.addEventListener('click', closeSearchHandler);
      }
    });
  }

  const closeSearchHandler = () => {

    gsap.to(search, {
      opacity: 0,
      top: '-110%',
      duration: .7,
      ease: 'ease-out',
      onComplete: () => {
        opener.addEventListener('click', onClickOpenSearchField);
        closer.removeEventListener('click', closeSearchHandler);
      }
    })
  }

  opener.addEventListener('click', onClickOpenSearchField);
}
