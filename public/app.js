const signinForm = document.querySelector('#signin-form');
const signinEmail = document.querySelector('#signin-email');
const signinPassword = document.querySelector('#signin-password');
const signupForm = document.querySelector('#signup-form');
const signupName = document.querySelector('#signup-name');
const signupEmail = document.querySelector('#signup-email');
const signupPassword = document.querySelector('#signup-password');

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signinEmail.value;
  const password = signinPassword.value;
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // addition if we qwant any response like redirecting it
  })
  .catch(error => {
    console.log(error);
    console.error(error);
    //error handling
  })
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signupName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // do something with the response data
  })
  .catch(error => {
    console.error(error);
    // handle the error
  })
});
