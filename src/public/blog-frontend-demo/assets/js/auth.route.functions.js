/* Verifications */
const token = localStorage.getItem('token');

/* API url */
// const url = 'https://altschoolblogapp.herokuapp.com/auth/';
const url = 'http://localhost:8000/auth/';

// Get input value from login form
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Get buttons
const loginButton = document.getElementById('login');
const signupButton = document.getElementById('signup');

/* API Auth Route Method Functions */
const signup = (signupDetails) => {
  fetch(`${url}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    });
};

const login = (loginDetails) => {
  fetch(`${url}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
  })
    .then((response) => response.json())
    .then((token) => {
      // console.log('Success:', token);
      localStorage.setItem('token', token.token);

      console.log(localStorage.getItem('token'));
    });
};

const logout = () => {
  localStorage.removeItem('token');
};

/* Action for login button */
loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const loginDetails = {};

  loginDetails.email = loginForm.elements.email.value;
  loginDetails.password = loginForm.elements.password.value;

  login(loginDetails);
});

/* Actions for signup button */
signupButton.addEventListener('click', (e) => {
  e.preventDefault();

  const signupDetails = {};

  signupDetails.firstName = signupForm.elements.firstname.value;
  signupDetails.lastName = signupForm.elements.lastname.value;
  signupDetails.email = signupForm.elements.email.value;
  signupDetails.password = signupForm.elements.password.value;

  signup(signupDetails);
});

