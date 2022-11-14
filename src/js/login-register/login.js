'use script';

const form = document.getElementById('form');
const Email = document.getElementById('Email');
const Password = document.getElementById('Password');

form.addEventListener('submit', (ev) => {
   ev.preventDefault();
   
   checkInputs()
});

function checkInputs(){
    const emailValue = Email.value.trim();
    const passwordValue = Password.value.trim();

    if(emailValue === ''){
        errorValidation(Email, 'Preencha esse campo');
    }
    if(passwordValue === ''){
        errorValidation(Password, 'Preencha esse campo');
    }
    if(emailValue !== 'adm@qt.com' || passwordValue !== '123'){
        const formControl = document.getElementById('errorLogin');
        const small = formControl.querySelector('small');

        formControl.className="userError login_invalided";
        small.innerText = 'Usuario ou Senha invalidos!'
    }else{
        const formControl = document.getElementById('errorLogin');
        formControl.className="userInvalided";
    }
}

Email.addEventListener('keyup', () => {
    if(validationEmail(Email.value) !== true){
        errorValidation(Email, 'O formato do email deve ser Ex. nome@exemplo.com');
    }else{
        const formControl = Email.parentElement;
        formControl.className="form-control";
    }
});

// Password.addEventListener('keyup', () => {
//     if(validationEmail(Password.value.trim()) === true){
//         errorValidation(Password, '');
//     }else{
//         const formControl = Email.parentElement;
//         formControl.className="form-control";
//     }
// });

function validationEmail(Email){
    let emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(Email);
}

// function validatorPassword(password) {
//     let passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//     return passwordPattern.test(password);
// }

function errorValidation(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className="form-control error";
    small.innerText = message;
}

// function successValidation(input){
//     const formControl = input.parentElement;

//     formControl.className="form-control success";
// }