const signUpTab = document.getElementById("signUpTab");
const signInTab = document.getElementById("signInTab");
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

signUpTab.addEventListener("click", () => {
  signUpTab.classList.add("active");
  signInTab.classList.remove("active");
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});

signInTab.addEventListener("click", () => {
  signInTab.classList.add("active");
  signUpTab.classList.remove("active");
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
});


// SIGN UP
const form = document.getElementById("signUpForm");
const btnSubmit = document.getElementById("btn-submit");

const errorUsername = document.getElementById("errorUsername");
const errorEmail = document.getElementById("errorEmail");
const errorGender = document.getElementById("errorGender");
const errorPassword = document.getElementById("errorPassword");
const errorAgree = document.getElementById("errorAgree");

function isEmpty(value) {
  return value.trim() === "";
}

function minValue(value, minimum) {
  return value.length >= minimum;
}

function maxValue(value, maximum) {
  return value.length <= maximum;
}

function isEmailValid(value) {
  return value.includes('@') && value.includes('.');
}

function validate() {
  let valid = true;
  const username = form.username.value;
  if (isEmpty(username)) {
    errorUsername.textContent = "Username can't be Empty";
    valid = false;
  } else if (!minValue(username, 3)) {
    errorUsername.textContent = "Username must be over 3 characters";
    valid = false;
  } else {
    errorUsername.textContent = "";
  }

  const email = form.email.value;
  if (isEmpty(email)) {
    errorEmail.textContent = "Email can't be Empty";
    valid = false;
  } else if (!isEmailValid(email)) {
    errorEmail.textContent = "Email must contain '@' and '.'";
  } else {
    errorEmail.textContent = "";
  }

  const genderChecked = form.gender.value;
  if (!genderChecked) {
    errorGender.textContent = "Please select a gender";
    valid = false;
  } else {
    errorGender.textContent = "";
  }

  const password = form.password.value;
  if (isEmpty(password)) {
    errorPassword.textContent = "Password can't be Empty";
    valid = false;
  } else if (!minValue(password, 6)) {
    errorPassword.textContent = "Password must be at least 6 characters";
    valid = false;
  } else {
    errorPassword.textContent = "";
  }


  if (!form.agree.checked) {
    errorAgree.textContent = "You must agree to our terms";
    valid = false;
  } else {
    errorAgree.textContent = "";
  }

  return valid;
}

form.addEventListener('input', validate);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validate()) return;

  const data = {
    username: form.username.value,
    email: form.email.value,
    gender: form.gender.value,
    password: form.password.value,
    agree: form.agree.checked
  };

  const returnMessage = `
    Username: ${data.username}
    Email: ${data.email}
    Gender: ${data.gender}
    Password: ${data.password}
    Agree: ${data.agree ? "agreed" : "not agreed"}
    `;

  alert(returnMessage);
  form.reset();
  validate();
});

// SIGN IN
const form2 = document.getElementById("signInForm");
const errorSignInEmail = document.getElementById("errorSignInEmail");
const errorSignInPassword = document.getElementById("errorSignInPassword");

function validateSignIn() {
  let valid = true;

  // email
  const email = form2.signInEmail.value;
  if (isEmpty(email)) {
    errorSignInEmail.textContent = "Email can't be empty";
    valid = false;
  } else if (!isEmailValid(email)) {
    errorSignInEmail.textContent = "Email must contain '@' and '.'";
    valid = false;
  } else {
    errorSignInEmail.textContent = "";
  }

  // password
  const password = form2.signInPassword.value;
  if (isEmpty(password)) {
    errorSignInPassword.textContent = "Password can't be empty";
    valid = false;
  } else if (!minValue(password, 6)) {
    errorSignInPassword.textContent =
      "Password must be at least 6 characters";
    valid = false;
  } else {
    errorSignInPassword.textContent = "";
  }

  return valid;
}

form2.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateSignIn()) return;

  const data = {
    email: form2.signInEmail.value,
    password: form2.signInPassword.value,
  };

  const msg = `
Email   : ${data.email}
Password: ${data.password}
`;

  alert(msg);
  form2.reset();
  validateSignIn();
});