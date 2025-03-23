import { gsap } from "gsap";
const quiz = document.querySelector('.quiz');

if(quiz) {
  const nextBtn = quiz.querySelector('.quiz__btn--next');
  const prevBtn = quiz.querySelector('.quiz__btn--prev');
  const submitBtn = quiz.querySelector('.quiz__btn--submit');

  let current = 1;

  const tl = gsap.timeline().pause();

  tl
    .to(submitBtn, {
      left: '200px',
      duration: .4
    })
    .to(nextBtn, {
      left: '0',
      duration: .4
    });

  const onClickSlideNextStep = () => {
    let posX = '-' + 100 / 3 * current + '%';

    gsap.to('.quiz__content', {
      x: posX,
    })

    current++;

    if(current >= 2) {
      prevBtn.classList.remove('disabled');

      gsap.to(nextBtn, {
        left: '200px'
      });
    }

    if(current === 3) {
      nextBtn.classList.add('disabled');
      submitBtn.classList.remove('disabled');

      tl.play();
    }
  };

  const onClickSlidePrevStep = () => {
    current--;
    let posX = '-' + 100 / 3 * (current - 1) + '%';

    gsap.to('.quiz__content', {
      x: posX,
    })

    if(current < 3) {
      submitBtn.classList.add('disabled');
      nextBtn.classList.remove('disabled');

      tl.reverse();
    }

    if(current < 2) {
      prevBtn.classList.add('disabled');

      gsap.to(nextBtn, {
        left: '0'
      })
    }
  };

  nextBtn.addEventListener('click', onClickSlideNextStep);
  prevBtn.addEventListener('click', onClickSlidePrevStep);
}
