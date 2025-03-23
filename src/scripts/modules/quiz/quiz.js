import { gsap } from "gsap";
import { loader } from "../../utils/nodes";
import { quizValidation } from "./quizValidation.js";
import { sendForm } from "../form/sendForm";
console.log(loader)

const quiz = document.querySelector('.quiz');

if(quiz) {
  const nextBtn = quiz.querySelector('.quiz__btn--next');
  const prevBtn = quiz.querySelector('.quiz__btn--prev');
  const submitBtn = quiz.querySelector('.quiz__btn--submit');
  const quizFields = quiz.querySelectorAll('.quiz__content-part');

  let current = 0;

  const onClickSlideNextStep = () => {

    if(!!quizValidation(quizFields[current])) {
      quizFields[current].classList.remove('active');
      quizFields[current + 1].classList.add('active');

      gsap.fromTo(quizFields[current + 1],{
        opacity: 0,
      },{
        opacity: 1,
        duration: .8,
        ease: 'ease-in'
      });
      current++;

      if(current - (quizFields.length - 1) === 0) {
        nextBtn.classList.add('disabled');
        submitBtn.classList.remove('disabled');

      } else {
        if(current >= 1 && prevBtn.classList.contains('disabled')) {
          console.log('prevBtn remove disabled');
          prevBtn.classList.remove('disabled');
        }
      }
    }
  };

  const onClickSlidePrevStep = () => {
    quizFields[current].classList.remove('active');
    quizFields[current - 1].classList.add('active');

    gsap.fromTo(quizFields[current - 1],{
      opacity: 0,
    },{
      opacity: 1,
      duration: .8,
      ease: 'ease-in'
    });
    current--;

    if(current === 0) {
      prevBtn.classList.add('disabled');
    }

    if(current - (quizFields.length - 1) !== 0 && !submitBtn.classList.contains('disabled')) {
      submitBtn.classList.add('disabled');
      nextBtn.classList.remove('disabled');
    }
  };

  nextBtn.addEventListener('click', onClickSlideNextStep);
  prevBtn.addEventListener('click', onClickSlidePrevStep);
  submitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log('send form');

    gsap.to(loader, {
      opacity: 1,
      visibility: 'visible'
    });
    sendForm(quiz);
  });
}
