import { gsap } from 'gsap';
import { sendForm } from "./sendForm";
import { loader } from "../../utils/nodes";
import { setInvalidStatus, setValidStatus } from './controlValidationState';

export const formValidation = (form) => {
  const fields = form.querySelectorAll("[data-required]");

  fields.forEach(field => {
    field.addEventListener('change', () => {
      setValidStatus(field);
    });

    if(field["type"] === 'text') {
      if(field.value.trim().length < 2) {
        setInvalidStatus(field);
      } else {
        setValidStatus(field);
      }
    }

    else if(field.value.length !== 16) {
      setInvalidStatus(field);
    } else {
      setValidStatus(field);
    }
  });

  const isInvalid = document.querySelector('.invalid-control');

  if(!isInvalid) {
    gsap.to(loader, {
      opacity: 1,
      visibility: 'visible'
    });
    sendForm(form);
  }
}
