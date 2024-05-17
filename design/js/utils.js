
export const form = document.querySelector('form');
export const completedForm = document.querySelector('.completion-form');

export const formInputs = Array.from(form.querySelectorAll('input'));

export const nameInput = document.querySelector('#cardholder-name');
export const numberInput = document.querySelector('#card-number');
export const monthInput = document.querySelector('#exp-date-mm');
export const yearInput = document.querySelector('#exp-date-yy');
export const cvcInput = document.querySelector('#cvc');
export const submitBtn = document.querySelector('.submit-btn');

export const nameCardholder = document.querySelector('.cardholder-name');
export const numberCard = document.querySelector('.card-number');
export const expCard = document.querySelector('.exp-date');
export const cvcCard = document.querySelector('.cvc');

export const errorMessages = {
    name: 'Wrong format, letters only',
    number: 'Wrong format, numbers only',
    month: 'Invalid date',
    cvc: 'Wrong format, numbers only',
    default: 'Can\'t be blank'
};
export const FormatNameInput = (event, target) => {
    const input = event.target;
    target.innerText = input.value || 'Jane Appleseed';
};

export const FormatNumericInput = (event, maxLength, divisor, target) => {
    const input = event.target;
    const value = input.value.replace(/\s/g, '').replace(/^0+(?=\d)/, '').slice(0, maxLength);
    const formattedValue = value.padStart(maxLength, '0').replace(new RegExp(`(.{${divisor}})`, 'g'), '$1 ').trim()
    input.value = formattedValue;
    target.innerText = formattedValue || target.getAttribute('--placeholder');
};

export const FormatDateInput = (event, isMonth, maxLength, target) => {
    const input = event.target;
    const value = input.value.replace(/\s/g, '').replace(/^0+(?=\d)/, '').slice(0, maxLength);
    const formattedValue = value.replace(new RegExp(`(.{2})`, 'g'), ' $1 ');
    input.value = formattedValue.trim().padStart(2, '0');
    if (isMonth) {
        target.innerText = (formattedValue.padStart(2, '0') || target.getAttribute('--placeholderM')) + target.innerText.substring(maxLength, target.innerText.length);
    } else {
        target.innerText = target.innerText.substring(0, target.innerText.length - maxLength) + (formattedValue.padStart(2, '0') || target.getAttribute('--placeholderY'));
    }
    
}