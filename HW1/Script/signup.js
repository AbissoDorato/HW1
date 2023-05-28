function checkEmail(event) {
  event.preventDefault();
  const emailInput = document.querySelector(".email input");
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailInput.value)) {
    document.querySelector(".email div span").textContent = "Email non valida";
    document.querySelector(".email div").classList.remove("hidden");
    document.querySelector(".email").classList.add("errorj");
    formStatus.email = false;
  } else {
    fetch(
      "check_email.php?q=" +
        encodeURIComponent(String(emailInput.value).toLowerCase())
    )
      .then(fetchResponse)
      .then(jsonCheckEmail);
  }
}
function checkPassword(event) {
  const passwordInput = document.querySelector(".password input");
  if ((formStatus.password = passwordInput.value.length >= 8)) {
    document.querySelector(".password").classList.remove("errorj");
    document.querySelector(".password div").classList.add("hidden");
  } else {
    document.querySelector(".password").classList.add("errorj");
    document.querySelector(".password div").classList.remove("hidden");
  }
}

function checkConfirmPassword(event) {
  event.preventDefault();
  const confirmPasswordInput = document.querySelector(
    ".confirm_password input"
  );
  if (
    (formStatus.confirmPassord =
      confirmPasswordInput.value ===
      document.querySelector(".password input").value)
  ) {
    document.querySelector(".confirm_password").classList.remove("errorj");
    document.querySelector(".confirm_password div").classList.add("hidden");
  } else {
    document.querySelector(".confirm_password").classList.add("errorj");
    document.querySelector(".confirm_password div").classList.remove("hidden");
  }
}

function fetchResponse(response) {
  if (!response.ok) return null;
  return response.json();
}

function jsonCheckEmail(json) {
  // Controllo il campo exists ritornato dal JSON
  if ((formStatus.email = !json.exists)) {
    document.querySelector(".email").classList.remove("errorj");
    document.querySelector(".email div").classList.add("hidden");
    document.querySelector(".email input").classList.remove("errorj");
  } else {
    document.querySelector(".email div span").textContent =
      "Email già utilizzata";
    document.querySelector(".email div").classList.remove("hidden");
    document.querySelector(".email").classList.add("errorj");
  }
}
function checkUser(event) {
  event.preventDefault();
  const input = document.querySelector(".user input");

  if (!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)) {
    input.parentNode.querySelector("div span").textContent =
      "Sono ammesse lettere, numeri e underscore. Max. 15";
    input.parentNode.classList.add("errorj");
    input.parentNode.querySelector(".user div").classList.remove("hidden");
    formStatus.username = false;
  } else {
    fetch("check_username.php?q=" + encodeURIComponent(input.value))
      .then(fetchResponse)
      .then(jsonCheckUser);
  }
}

function jsonCheckUser(json) {
  // Controllo il campo exists ritornato dal JSON
  console.log(json);
  if ((formStatus.username = !json.exists)) {
    document.querySelector(".user").classList.remove("errorj");
    document.querySelector(".user div").classList.add("hidden");
  } else {
    document.querySelector(".user div span").textContent =
      "Nome utente già utilizzato";
    document.querySelector(".user div ").classList.remove("hidden");
    document.querySelector(".user").classList.add("errorj");
  }
}

function checkSignup(event) {
  const checkbox = document.querySelector(".allow input");
  formStatus[checkbox.name] = checkbox.checked;
  if (
    Object.keys(formStatus).length !== 8 ||
    Object.values(formStatus).includes(false)
  ) {
    event.preventDefault();
  }
}

const formStatus = { upload: true };
document.querySelector(".email input").addEventListener("blur", checkEmail);
document.querySelector(".user input").addEventListener("blur", checkUser);
document
  .querySelector(".password input")
  .addEventListener("blur", checkPassword);
document
  .querySelector(".confirm_password input")
  .addEventListener("blur", checkConfirmPassword);
