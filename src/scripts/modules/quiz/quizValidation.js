import { setInvalidStatus, setValidStatus } from '../form/controlValidationState';

export function quizValidation(controlField) {
  let invalidControls = [];
  let controls = controlField.querySelectorAll('[data-required]');

  controls.forEach(control => {
    setValidStatus(control);
  })

  controls.forEach(control => {
    if(control.value.trim().length < 2) {
      invalidControls.push(control)
    }

    if(control.type === 'tel') {
      if(control.value.length !== 16) {
        invalidControls.push(control)
      }
    }

    if(control.type === 'checkbox') {
      if(!control.checked) {
        invalidControls.push(control)
      }
    }
  })

  if(!invalidControls.length) {
    return true;
  } else {
    invalidControls.forEach(control => {
      setInvalidStatus(control);
    });
  }
}
