import { limitStr } from "../utils/functions";

const container = document.querySelector('.main-input-file-container');

if(container) {
  const control = container.querySelector('input[type="file"]');

  const onChangeHadler = (evt) => {
    const opener = evt.target.nextElementSibling;
    const removeBtn = container.querySelector('.main-input-file-remove-btn');
    let files = [...evt.target.files];

    const onClickRemoveFile = () => {
      evt.target.value = "";
      files = [];
      opener.querySelector('span').textContent = "Прикрепить документ";
      removeBtn.classList.add('disabled');
      removeBtn.removeEventListener('click', onClickRemoveFile);
    }

    if(files.length) {
      opener.querySelector('span').textContent = `${ limitStr(files[0].name, 28) }`;

      if(removeBtn.classList.contains('disabled')) {
        removeBtn.classList.remove('disabled');
        removeBtn.addEventListener('click', onClickRemoveFile);
      }
    }
  }

  control.addEventListener('change', onChangeHadler);
}
