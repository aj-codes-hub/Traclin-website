// Mock login credentials
const MOCK_EMAIL = "user@gmail.com";
const MOCK_PASSWORD = "user123";

// Get DOM elements
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('PasswordFeild');
const submitBtn = document.getElementById('submitBtn');
const errorMessageDiv = document.getElementById('errorMessage');

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Flag to track if form has been submitted
let formSubmitted = false;

// ========== VALIDATION FUNCTIONS ==========

// Function to validate email field with proper messages
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

// Function to validate password field with proper messages
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

// Function to validate entire form (only shows errors if form was submitted)
function validateForm() {
    if (!formSubmitted) {
        // Just check validity without showing errors
        const emailValid = validateEmail(false);
        const passwordValid = validatePassword(false);
        return emailValid && passwordValid;
    } else {
        // Show errors with proper messages
        const emailValid = validateEmail(true);
        const passwordValid = validatePassword(true);
        return emailValid && passwordValid;
    }
}

// Function to show loading state
function showLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Log in';
    }
}

// Function to show error message
function showError(message) {
    errorMessageDiv.style.display = 'block';
    const errorText = document.getElementById('errorText');
    if (errorText) {
        errorText.innerHTML = message;
    } else {
        errorMessageDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    }
}

// Function to hide error message
function hideError() {
    errorMessageDiv.style.display = 'none';
}

// Function to clear all validation styles
function clearValidationStyles() {
    emailInput.classList.remove('is-valid', 'is-invalid');
    passwordInput.classList.remove('is-valid', 'is-invalid');
}

// Function to show success message and redirect
function showSuccessAndRedirect() {
    // Create temporary success message
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
    successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Login successful! Redirecting to dashboard...';
    document.body.appendChild(successDiv);
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
        window.location.href = '../Dashboard.html';
    }, 1500);
}

// ========== MAIN HANDLE LOGIN FUNCTION ==========
function handleLogin(event) {
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
    
    // If validation passes, process login
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Show loading state
    showLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
        // Check if credentials match
        if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
            // Store login state if remember me is checked
            if (rememberMe) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
                // Clear localStorage if remember me is not checked
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
            }
            
            // Show success and redirect
            showSuccessAndRedirect();
        } else {
            // Hide loading state
            showLoading(false);
            
            // Show error message
            showError('Invalid email or password. Please try again.');
            
            // Clear valid styles and show invalid
            clearValidationStyles();
            emailInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
            
            // Update error messages for invalid credentials
            const emailErrorDiv = document.getElementById('emailError');
            const passwordErrorDiv = document.getElementById('passwordError');
            
            if (emailErrorDiv) {
                emailErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email address';
            }
            if (passwordErrorDiv) {
                passwordErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid password';
            }
        }
    }, 800);
}

// ========== REAL-TIME VALIDATION ==========
// Validate email as user types
emailInput.addEventListener('input', function() {
    const email = emailInput.value.trim();
    const emailErrorDiv = document.getElementById('emailError');
    
    if (formSubmitted) {
        validateEmail(true);
        hideError();
    } else {
        // Just update validity without showing error styles
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
    const password = passwordInput.value;
    const passwordErrorDiv = document.getElementById('passwordError');
    
    if (formSubmitted) {
        validatePassword(true);
        hideError();
    } else {
        // Just update validity without showing error styles
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

// ========== PASSWORD TOGGLE FUNCTION ==========
function togglePassword() {
    const passwordField = document.getElementById('PasswordFeild');
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

// ========== REMEMBER ME FUNCTIONALITY ==========
// Check if user was previously logged in
window.onload = function() {
    const remembered = localStorage.getItem('isLoggedIn');
    if (remembered === 'true') {
        // Auto-fill email if remembered
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            document.getElementById('rememberMe').checked = true;
            // Add valid class without triggering error
            if (emailPattern.test(savedEmail)) {
                emailInput.classList.add('is-valid');
            }
        }
    }
    
    // Reset form submitted flag on page load
    formSubmitted = false;
    clearValidationStyles();
    hideError();
    
    // Reset error messages to default
    const emailErrorDiv = document.getElementById('emailError');
    const passwordErrorDiv = document.getElementById('passwordError');
    if (emailErrorDiv) {
        emailErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address';
    }
    if (passwordErrorDiv) {
        passwordErrorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Password must be at least 6 characters';
    }
};

// Attach event listener to form
form.addEventListener('submit', handleLogin);