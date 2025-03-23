const setInvalidStatus = (field) => {
  !field.classList.contains('invalid-control') ? field.classList.add('invalid-control') : null;

  field.classList.add('shaker');

  setTimeout(() => {
    field.classList.remove('shaker');
  }, 800);
}

const setValidStatus = (field) => {
  field.classList.contains('invalid-control') ? field.classList.remove('invalid-control') : null;
}

export { setInvalidStatus, setValidStatus };
