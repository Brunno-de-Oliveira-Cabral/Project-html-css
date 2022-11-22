'use strict';

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password');
const repeatPassword = document.getElementById('repeatPassword');
const Phone = document.getElementById('Phone');
const birthDate = document.getElementById('Date');
const CPF = document.getElementById('CPF');
const checkboxNotification = document.getElementById('checkbox_notification');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkInputs();
});

Email.addEventListener('keyup', () => {
    if (validationEmail(Email.value) !== true) {
        errorValidation(Email, 'O formato do email deve ser Ex. nome@exemplo.com');
    } else {
        successValidation(Email);
    }
});

CPF.addEventListener('keyup', () => {
    if (validationCPF(CPF.value) !== true) {
        errorValidation(CPF, '');
    } else {
        successValidation(CPF);
    }
});

function validationEmail(Email) {
    let emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(Email);
}

function validationCPF(CPF){
    let CPFPattern = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    return CPFPattern.test(CPF);
}

function errorValidation(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = "form-control error";
    small.innerText = message;
}

function successValidation(input){
    const formControl = input.parentElement;

    formControl.className="form-control success";
}

function checkInputs() {
    const xhttp = new XMLHttpRequest();

    var data = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        Email: Email.value.trim(),
        Password: Password.value.trim(),
        Phone: Phone.value.trim(),
        birthDate: birthDate.value.trim(),
        CPF: CPF.value.trim()

    };

    if (firstName.value === '') {
        errorValidation(firstName, 'Preencha esse campo');
    }
    if (lastName.value === '') {
        errorValidation(lastName, 'Preencha esse campo');
    }
    if (Email.value === '') {
        errorValidation(Email, 'Preencha esse campo');
    }
    if (Password.value === '') {
        errorValidation(Password, 'Preencha esse campo');
    }
    if (repeatPassword.value === '') {
        errorValidation(repeatPassword, 'Preencha esse campo');
    }
    if (Phone.value === '') {
        errorValidation(Phone, 'Preencha esse campo');
    }
    if (birthDate.value === '') {
        errorValidation(birthDate, 'Preencha esse campo');
    }
    if (CPF.value === '') {
        errorValidation(CPF, 'Preencha esse campo');
    }
    
    if(data.Password !== repeatPassword.value.trim()){
        errorValidation(repeatPassword, 'Error, senha invalida');
    }

    if (data.firstName !== '' && data.lastName !== '' && data.Email !== '' && data.Password !== '' && data.Phone !== '' && data.birthDate != '' && data.CPF !== '' && data.Password === repeatPassword.value.trim()) {
        xhttp.open('POST', '../../db/customers/registerCustomers.php', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.responseText;

                if (response === 'Success') {
                    window.location.replace('http://localhost/src/index.html');

                    alert(`Registro concluido com sucesso`);
                } else {
                    Email.value = '';
                    Password.value = '';

                    const formControl = document.getElementById('errorLogin');
                    const small = formControl.querySelector('small');

                    formControl.className = "userError login_invalided";
                    small.innerText = 'Error'
                }

            }
        };

        xhttp.send(JSON.stringify(data));
    }
}