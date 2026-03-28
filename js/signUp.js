// Get DOM elements
const form = document.getElementById('signupForm');
const fullNameInput = document.getElementById('fullName');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('termsCheckbox');
const submitBtn = document.getElementById('submitBtn');
const errorMessageDiv = document.getElementById('errorMessage');

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-Z\s]{2,50}$/;
const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

// Flag to track if form has been submitted
let formSubmitted = false;

// ========== VALIDATION FUNCTIONS ==========

// Validate full name
function validateFullName(showError = true) {
    const name = fullNameInput.value.trim();
    const nameErrorDiv = document.getElementById('nameError');
    
    if (name === '') {
        if (showError) {
            fullNameInput.classList.add('is-invalid');
            fullNameInput.classList.remove('is-valid');
            if (nameErrorDiv) {
                nameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Full name is required';
            }
        } else {
            fullNameInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else if (!namePattern.test(name)) {
        if (showError) {
            fullNameInput.classList.add('is-invalid');
            fullNameInput.classList.remove('is-valid');
            if (nameErrorDiv) {
                nameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Name should contain only letters and spaces (2-50 characters)';
            }
        } else {
            fullNameInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else {
        fullNameInput.classList.remove('is-invalid');
        fullNameInput.classList.add('is-valid');
        return true;
    }
}

// Validate username
function validateUsername(showError = true) {
    const username = usernameInput.value.trim();
    const usernameErrorDiv = document.getElementById('usernameError');
    
    if (username === '') {
        if (showError) {
            usernameInput.classList.add('is-invalid');
            usernameInput.classList.remove('is-valid');
            if (usernameErrorDiv) {
                usernameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Username is required';
            }
        } else {
            usernameInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else if (!usernamePattern.test(username)) {
        if (showError) {
            usernameInput.classList.add('is-invalid');
            usernameInput.classList.remove('is-valid');
            if (usernameErrorDiv) {
                usernameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Username must be 3-20 characters (letters, numbers, underscore)';
            }
        } else {
            usernameInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
        return true;
    }
}

// Validate email
function validateEmail(showError = true) {
    const email = emailInput.value.trim();
    const emailErrorDiv = document.getElementById('emailError');
    
    if (email === '') {
        if (showError) {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            if (emailErrorDiv) {
                emailErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Email is required';
            }
        } else {
            emailInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else if (!emailPattern.test(email)) {
        if (showError) {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            if (emailErrorDiv) {
                emailErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address';
            }
        } else {
            emailInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        return true;
    }
}

// Validate password
function validatePassword(showError = true) {
    const password = passwordInput.value;
    const passwordErrorDiv = document.getElementById('passwordError');
    
    if (password === '') {
        if (showError) {
            passwordInput.classList.add('is-invalid');
            passwordInput.classList.remove('is-valid');
            if (passwordErrorDiv) {
                passwordErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Password is required';
            }
        } else {
            passwordInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else if (password.length < 6) {
        if (showError) {
            passwordInput.classList.add('is-invalid');
            passwordInput.classList.remove('is-valid');
            if (passwordErrorDiv) {
                passwordErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Password must be at least 6 characters';
            }
        } else {
            passwordInput.classList.remove('is-valid', 'is-invalid');
        }
        return false;
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
        return true;
    }
}

// Validate terms checkbox
function validateTerms(showError = true) {
    if (!termsCheckbox.checked) {
        if (showError) {
            showErrorMessage('Please agree to the terms of service and privacy policy');
        }
        return false;
    }
    return true;
}

// Validate entire form
function validateForm() {
    if (!formSubmitted) {
        // Just check validity without showing errors
        const nameValid = validateFullName(false);
        const usernameValid = validateUsername(false);
        const emailValid = validateEmail(false);
        const passwordValid = validatePassword(false);
        const termsValid = validateTerms(false);
        return nameValid && usernameValid && emailValid && passwordValid && termsValid;
    } else {
        // Show errors with proper messages
        const nameValid = validateFullName(true);
        const usernameValid = validateUsername(true);
        const emailValid = validateEmail(true);
        const passwordValid = validatePassword(true);
        const termsValid = validateTerms(true);
        return nameValid && usernameValid && emailValid && passwordValid && termsValid;
    }
}

// Show loading state
function showLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Creating account...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Sign up';
    }
}

// Show error message
function showErrorMessage(message) {
    errorMessageDiv.style.display = 'block';
    const errorText = document.getElementById('errorText');
    if (errorText) {
        errorText.innerHTML = message;
    } else {
        errorMessageDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    }
}

// Hide error message
function hideError() {
    errorMessageDiv.style.display = 'none';
}

// Clear all validation styles
function clearValidationStyles() {
    fullNameInput.classList.remove('is-valid', 'is-invalid');
    usernameInput.classList.remove('is-valid', 'is-invalid');
    emailInput.classList.remove('is-valid', 'is-invalid');
    passwordInput.classList.remove('is-valid', 'is-invalid');
}

// Show success message and redirect to DASHBOARD
function showSuccessAndRedirect() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 15px 20px;
        border-radius: 8px;
        background-color: #198754;
        color: white;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
    `;
    successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Account created successfully! Redirecting to dashboard...';
    document.body.appendChild(successDiv);
    
    // Store user info in session storage for dashboard
    const userInfo = {
        fullName: fullNameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        isLoggedIn: true
    };
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // Redirect to dashboard after 1.5 seconds
    setTimeout(() => {
        window.location.href = '../Dashboard.html';
    }, 1500);
}

// ========== MAIN HANDLE SIGNUP FUNCTION ==========
function handleSignup(event) {
    event.preventDefault();
    
    // Set form submitted flag to true
    formSubmitted = true;
    
    // Hide any previous error messages
    hideError();
    
    // Validate the form
    const isValid = validateForm();
    
    if (!isValid) {
        // Scroll to first invalid field
        const firstInvalid = document.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // If validation passes, process signup
    const fullName = fullNameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Show loading state
    showLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
        // Show success and redirect to dashboard
        showSuccessAndRedirect();
    }, 800);
}

// ========== REAL-TIME VALIDATION ==========

// Validate full name as user types
fullNameInput.addEventListener('input', function() {
    if (formSubmitted) {
        validateFullName(true);
        hideError();
    } else {
        const name = fullNameInput.value.trim();
        if (name === '') {
            fullNameInput.classList.remove('is-valid', 'is-invalid');
        } else if (namePattern.test(name)) {
            fullNameInput.classList.add('is-valid');
            fullNameInput.classList.remove('is-invalid');
        } else {
            fullNameInput.classList.remove('is-valid', 'is-invalid');
        }
    }
});

// Validate username as user types
usernameInput.addEventListener('input', function() {
    if (formSubmitted) {
        validateUsername(true);
        hideError();
    } else {
        const username = usernameInput.value.trim();
        if (username === '') {
            usernameInput.classList.remove('is-valid', 'is-invalid');
        } else if (usernamePattern.test(username)) {
            usernameInput.classList.add('is-valid');
            usernameInput.classList.remove('is-invalid');
        } else {
            usernameInput.classList.remove('is-valid', 'is-invalid');
        }
    }
});

// Validate email as user types
emailInput.addEventListener('input', function() {
    if (formSubmitted) {
        validateEmail(true);
        hideError();
    } else {
        const email = emailInput.value.trim();
        if (email === '') {
            emailInput.classList.remove('is-valid', 'is-invalid');
        } else if (emailPattern.test(email)) {
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
        } else {
            emailInput.classList.remove('is-valid', 'is-invalid');
        }
    }
});

// Validate password as user types
passwordInput.addEventListener('input', function() {
    if (formSubmitted) {
        validatePassword(true);
        hideError();
    } else {
        const password = passwordInput.value;
        if (password === '') {
            passwordInput.classList.remove('is-valid', 'is-invalid');
        } else if (password.length >= 6) {
            passwordInput.classList.add('is-valid');
            passwordInput.classList.remove('is-invalid');
        } else {
            passwordInput.classList.remove('is-valid', 'is-invalid');
        }
    }
});

// Validate terms checkbox on change
termsCheckbox.addEventListener('change', function() {
    if (formSubmitted) {
        if (!termsCheckbox.checked) {
            showErrorMessage('Please agree to the terms of service and privacy policy');
        } else {
            hideError();
        }
    }
});

// ========== PASSWORD TOGGLE FUNCTION ==========
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

// ========== PAGE LOAD INITIALIZATION ==========
window.onload = function() {
    // Reset form submitted flag
    formSubmitted = false;
    clearValidationStyles();
    hideError();
    
    // Reset error messages to default
    const nameErrorDiv = document.getElementById('nameError');
    const usernameErrorDiv = document.getElementById('usernameError');
    const emailErrorDiv = document.getElementById('emailError');
    const passwordErrorDiv = document.getElementById('passwordError');
    
    if (nameErrorDiv) {
        nameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter your full name';
    }
    if (usernameErrorDiv) {
        usernameErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Username must be at least 3 characters';
    }
    if (emailErrorDiv) {
        emailErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address';
    }
    if (passwordErrorDiv) {
        passwordErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Password must be at least 6 characters';
    }
};

// Attach event listener to form
form.addEventListener('submit', handleSignup);