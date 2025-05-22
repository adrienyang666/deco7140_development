// js/modules/form.js

export function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        let valid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.setAttribute('aria-invalid', 'true');
                field.style.borderColor = '#e53935';
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('form-error')) {
                    const error = document.createElement('span');
                    error.className = 'form-error';
                    error.style.color = '#e53935';
                    error.style.fontSize = '0.9rem';
                    error.innerText = 'Required';
                    field.insertAdjacentElement('afterend', error);
                }
            } else {
                field.removeAttribute('aria-invalid');
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('form-error')) {
                    field.nextElementSibling.remove();
                }
                field.style.borderColor = '#2075d6';
            }
        });
        if (!valid) {
            e.preventDefault();
        }
    });
}
