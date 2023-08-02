import {onEscKeydownListener} from './user-form.js';

const ALERT_SHOW_TIME = 5000;
const templateErrorAlert = document.querySelector('#error').content.querySelector('.error');
const templateSuccessAlert = document.querySelector('#success').content.querySelector('.success');

const showMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showAlert = (xxx) => {
  const thumbnailElement = xxx.cloneNode(true);
  document.body.append(thumbnailElement);
  const button = thumbnailElement.querySelector('button');
  const Inner = thumbnailElement.querySelector('div');
  const successTitle = thumbnailElement.querySelector ('h2');

  button.addEventListener('click', () => {
    if(xxx === templateSuccessAlert){
      thumbnailElement.remove();
      document.querySelector('.img-upload__preview').style.transform = '';
      document.querySelector('.effect-level__slider').noUiSlider.reset();
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target !== Inner && evt.target !== successTitle) {
      thumbnailElement.remove();
    }
    if(xxx === templateSuccessAlert){
      thumbnailElement.remove();
      document.querySelector('.img-upload__preview').style.transform = '';
      document.querySelector('.effect-level__slider').noUiSlider.reset();
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && xxx === templateSuccessAlert) {
      thumbnailElement.remove();
      document.querySelector('.img-upload__preview').style.transform = '';
      // document.querySelector('.effect-level__slider').noUiSlider.reset();

    }

    thumbnailElement.remove();
    document.addEventListener('keydown', onEscKeydownListener);
  });
};

const showError = () => showAlert(templateErrorAlert);

const showSuccess = () => showAlert(templateSuccessAlert);

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showError, showSuccess, showMessage, debounce};
