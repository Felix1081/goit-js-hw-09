const formEl = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
let formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', e => {
  if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') return;

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  formData.email = email;
  formData.message = message;

  saveToLS('feedback-form-state', formData);
  console.log(formData);
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formEl.reset();
    formData = { email: '', message: '' };
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');

  if (lsData && lsData.email && lsData.message) {
    formEl.elements.email.value = lsData.email;
    formEl.elements.message.value = lsData.message;
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}
