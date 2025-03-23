import { Modal } from "../../classes/Modal";
import { gsap } from 'gsap';
import { loader } from "../../utils/nodes";

export function sendForm(form) {

  const successModal = document.getElementById('success-modal');
  const errorModal = document.getElementById('error-modal');

  function loaderFadeOut() {
    gsap.to(loader, {
      opacity: 0,
      visibility: 'hidden'
    });
  }

  function success() {
    loaderFadeOut();
    form.reset();

    new Modal(successModal).show();
  }

  function error() {
    setTimeout(() => {
      loaderFadeOut();
      new Modal(errorModal, {
        preventBodyLock: true
      }).show();
    }, 3000);
  }

  // handle the form submission event

  const data = new FormData(form);
  ajax(form.method, form.action, data, success, error);

  function ajax(method, url, data, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        if(xhr.response.indexOf('SUCCESS') > -1) {
          success(xhr.response, xhr.responseType);
        } else {
          error(xhr.status, xhr.response, xhr.responseType);
        }
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  };

  /*grecaptcha.ready(function() {
    grecaptcha.execute('6LcN8QojAAAAAO1PL61cpNSsvIGf0HxUgbPazq5h', {action: 'submit'}).then(function(token) {
      form.querySelector('.g-recaptcha-response').value = token;

      const data = new FormData(form);
      ajax(form.method, form.action, data, success, error);

      function ajax(method, url, data, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            if(xhr.response.indexOf('SUCCESS') > -1) {
              success(xhr.response, xhr.responseType);
            } else {
              error(xhr.status, xhr.response, xhr.responseType);
            }
          } else {
            error(xhr.status, xhr.response, xhr.responseType);
          }
        };
        xhr.send(data);
      };

    });
  });*/
}


