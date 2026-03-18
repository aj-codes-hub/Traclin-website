 // Mock login credentials
        const MOCK_EMAIL = "demo@traclin.com";
        const MOCK_PASSWORD = "demo123";

        function handleLogin(event) {
            event.preventDefault(); // Form submit ko rokna
            
            // Get values from form
            const email = document.getElementById('email').value;
            const password = document.getElementById('PasswordFeild').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Check if credentials match
            if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
                // Store login state if remember me is checked
                const rememberMe = document.getElementById('rememberMe').checked;
                if (rememberMe) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('isLoggedIn', 'true');
                }
                
                // Redirect to dashboard
                window.location.href = '../Dashboard.html';
            } else {
                // Show error message
                errorMessage.style.display = 'block';
                
                // Highlight fields with error
                document.getElementById('email').style.border = '1px solid red';
                document.getElementById('PasswordFeild').style.border = '1px solid red';
                
                // Remove red border after 3 seconds
                setTimeout(() => {
                    document.getElementById('email').style.border = '';
                    document.getElementById('PasswordFeild').style.border = '';
                }, 3000);
            }
        }

        // Password toggle function
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

        // Check if user was previously logged in
        window.onload = function() {
            const remembered = localStorage.getItem('isLoggedIn');
            if (remembered === 'true') {
                // Auto-fill email if remembered
                const savedEmail = localStorage.getItem('userEmail');
                if (savedEmail) {
                    document.getElementById('email').value = savedEmail;
                    document.getElementById('rememberMe').checked = true;
                }
            }
        }