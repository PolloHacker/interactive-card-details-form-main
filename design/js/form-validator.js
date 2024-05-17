import * as utils from './utils.js';

(() => {
    const nameInput = utils.nameInput;
    const numberInput = utils.numberInput;
    const monthInput = utils.monthInput;
    const yearInput = utils.yearInput;
    const cvcInput = utils.cvcInput;

    nameInput.addEventListener('input',
        event =>
            utils.FormatNameInput(event, utils.nameCardholder));
    numberInput.addEventListener('input',
        event =>
            utils.FormatNumericInput(event, numberInput.getAttribute('--maxlength'), numberInput.getAttribute('--divisor'), utils.numberCard));
    monthInput.addEventListener('input',
        event =>
            utils.FormatDateInput(event, true, monthInput.getAttribute('--maxlength'), utils.expCard));
    yearInput.addEventListener('input',
        event =>
            utils.FormatDateInput(event, false, yearInput.getAttribute('--maxlength'), utils.expCard));
    cvcInput.addEventListener('input',
        event =>
            utils.FormatNumericInput(event, cvcInput.getAttribute('--maxlength'), cvcInput.getAttribute('--maxlength'), utils.cvcCard));

    utils.form.addEventListener('focusin', (event) => {
        const input = event.target;
        const parent = input.parentElement;
        parent.classList.add('border-creator-active');
    });

    utils.form.addEventListener('focusout', (event) => {
        const input = event.target;
        const parent = input.parentElement;
        parent.classList.remove('border-creator-active');
    });

    utils.submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const nameParent = nameInput.parentElement;
        const numberParent = numberInput.parentElement;
        const monthParent = monthInput.parentElement;
        const yearParent = yearInput.parentElement;
        const cvcParent = cvcInput.parentElement;

        const nameSpan = nameParent.nextElementSibling;
        const numberSpan = numberParent.nextElementSibling;
        const monthSpan = monthParent.nextElementSibling;
        const yearSpan = monthParent.nextElementSibling;
        const cvcSpan = cvcParent.nextElementSibling;

        if (utils.formInputs.some(input => input.value === '')) {
            utils.formInputs.forEach((input, indx) => {
                if (input.value === '') {
                    let parent = input.parentElement;
                    let errorSpan = indx == 3 ? monthSpan : parent.nextElementSibling;

                    input.parentElement.classList.add('error-border');
                    errorSpan.textContent = utils.errorMessages.default;
                }
            });
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(nameInput.value.replace(/\s/g, ''))) {
            nameParent.classList.add('error-border');
            nameSpan.textContent = utils.errorMessages.name;
            return;
        } else {
            nameParent.classList.remove('error-border');
            nameSpan.textContent = '';
        }

        if (!/^\d{16}$/.test(numberInput.value.replace(/\s/g, ''))) {
            numberParent.classList.add('error-border');
            numberSpan.textContent = utils.errorMessages.number;
            return;
        } else {
            numberParent.classList.remove('error-border');
            numberSpan.textContent = '';
        }

        if (!/^\d{2}$/.test(yearInput.value.replace(/\s/g, ''))) {
            yearParent.classList.add('error-border');
            yearSpan.textContent = utils.errorMessages.month;
            return;
        } else {
            yearParent.classList.remove('error-border');
            yearSpan.textContent = '';
        }

        if (!/^\d{2}$/.test(monthInput.value.replace(/\s/g, '')) || (monthInput.value > 12 || monthInput.value < 1)) {
            console.log('hello')
            monthParent.classList.add('error-border');
            monthSpan.textContent = utils.errorMessages.month;
            return;
        } else {
            monthParent.classList.remove('error-border');
            monthSpan.textContent = '';
        }

        if (!/^\d{3}$/.test(utils.cvcInput.value.replace(/\s/g, ''))) {
            cvcParent.classList.add('error-border');
            cvcSpan.textContent = utils.errorMessages.cvc;
            return;
        } else {
            cvcParent.classList.remove('error-border');
            cvcSpan.textContent = '';
        }

        utils.form.classList.add('completion-form');
        utils.completedForm.classList.add('completed-form');
    });
})();
