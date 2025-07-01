const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

form.elements.email.value = formData.email || '';
form.elements.message.value = formData.message || '';

form.addEventListener('input', (e) => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { email, message } = form.elements;

  if (!email.value || !message.value) {
    alert('Lütfen tüm alanları doldurun.');
    return;
  }

  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = {};
});
