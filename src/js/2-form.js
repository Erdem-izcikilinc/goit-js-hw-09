const form = document.querySelector('.feedback-form');
let formData = { email: '', message: '' };

form.addEventListener('input', event => {
    event.preventDefault();
    if (event.target.name === "email") {
        formData.email = form.elements.email.value.trim();
    }
    if (event.target.name === "message") {
        formData.message = form.elements.message.value.trim();
    }
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

const savedData = localStorage.getItem('feedback-form-state');
if (savedData)  {
    Object.assign(formData, JSON.parse(savedData));
    if (form.elements.email) form.elements.email.value = formData.email || '';
    if (form.elements.message) form.elements.message.value = formData.message || '';
}

form.addEventListener('submit', event => {
    event.preventDefault();
    if (!formData.email || !formData.message) {
        alert("Fill please all fields")
    } else {
        console.log(formData);
        localStorage.removeItem("feedback-form-state");
    }
    form.reset();
})