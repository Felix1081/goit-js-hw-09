const formEl = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS(localStorageKey);

  if (lsData && lsData.email && lsData.message) {
    formEl.elements.email.value = lsData.email;
    formEl.elements.message.value = lsData.message;
    formData = { ...lsData };
  }

  formEl.addEventListener('input', onInput);
  formEl.addEventListener('submit', onSubmit);
});

function onInput(e) {
  if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') return;

  formData.email = formEl.elements.email.value;
  formData.message = formEl.elements.message.value;

  saveToLS(localStorageKey, formData);
}

function onSubmit(event) {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(localStorageKey);
  formEl.reset();
  formData = { email: '', message: '' };
}

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLS(key, defaultValue = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}
