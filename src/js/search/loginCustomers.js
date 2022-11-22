'use strict';

const form = document.getElementById('form');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkInputs();
});

Email.addEventListener('keyup', () => {
    if (validationEmail(Email.value) !== true) {
        errorValidation(Email, 'O formato do email deve ser Ex. nome@exemplo.com');
    } else {
        const formControl = Email.parentElement;
        formControl.className = "form-control";
    }
});

function validationEmail(Email) {
    let emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(Email);
}




function errorValidation(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = "form-control error";
    small.innerText = message;
}

function checkInputs() {
    const xhttp = new XMLHttpRequest();

    let data = {
        Email: Email.value.trim(),
        Password: Password.value.trim()
    };

    if (Email.value.trim() === '') {
        errorValidation(Email, 'Preencha esse campo');
    }

    if (Password.value.trim() === '') {
        errorValidation(Password, 'Preencha esse campo');
    }

    if (Email.value !== '' && Password.value !== '') {
        xhttp.open('POST', '../../db/customers/customers.php', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.responseText);
                let Json = JSON.parse(response[1]);

                if (response[0] === 'Success') {
                    window.location.replace('http://localhost/src/index.html');

                    alert(`Bem-vindo ${Json[0].firstName} ${Json[0].lastName}`);
                } else {
                    Email.value = '';
                    Password.value = '';

                    const formControl = document.getElementById('errorLogin');
                    const small = formControl.querySelector('small');

                    formControl.className = "userError login_invalided";
                    small.innerText = 'Usuario ou Senha invalidos!'
                }

            }
        };
        
        xhttp.send(JSON.stringify(data));
    }
}