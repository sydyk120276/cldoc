const required = document.querySelector('#translate_required');

if(required) {
  const langField = document.querySelector('.quiz__content-part-field--lang input');
  const disableBtn = document.querySelector('#translate_not_required');

  if(!required.checked) {
    langField.disabled = true;
  }

  required.addEventListener('change', () => {
    if(required.checked) {
      langField.disabled = false;
      langField.focus();
    }
  })

  disableBtn.addEventListener('change', () => {
    if(!required.checked) {
      langField.disabled = true;
    }
  });
}
