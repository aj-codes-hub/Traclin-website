
// toggle password function for password input feild

function togglePassword() {

    const passwordFeild = document.getElementById('PasswordFeild');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordFeild.type === 'password') {
        passwordFeild.type = 'text'
        toggleIcon.className = 'fa-regular fa-eye position-absolute '
    }
    else {
        passwordFeild.type = 'password'
        toggleIcon.className = 'fa-regular fa-eye-slash position-absolute '
    }

}
