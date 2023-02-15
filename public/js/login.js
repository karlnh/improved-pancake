const loginFormHandler = async (event) => {
    event.preventDefault();

    console.log("Login attempted.");
  
    // grabbing username and password values entered
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
        // post to login route
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            // if login route was successful, bring to homepage
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        };
    };
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
    
    // grabbing username and password values entered
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
         // post to user-routes which will create a new User
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            // if user creation successful, take home
            document.location.replace('/');
        } else {
            alert('Failed to sign up. User could not be created.');
        };
    };
  };

// adding eventlisteners for the different forms
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);