const menuButton = document.querySelector('.menu-toggle');
const toggleLight = document.querySelector('.mode-toggle-day');
const nav = document.querySelector('.main-nav');
const mode = document.getElementById('style');
let darkMode = false;



if (darkMode) {
    mode.setAttribute("href", "./styles/dark.css");
    toggleLight.textContent = "☾";
} else {
    mode.setAttribute("href", "./styles/light.css");
    toggleLight.textContent = "☼";
}

const OnButtonClick = () => {
    alert("You did it!");
    console.log("Secret Message...");
}

const OnFormSubmit = () => {

    let fName = document.getElementById("firstNameInput");
    let lName = document.getElementById("lastNameInput");
    let age = document.getElementById("ageInput");
    let email = document.getElementById("emailInput");

    const responseHeader = document.getElementById('responseHeader');
    responseHeader.textContent = `Applicant: ${fName.value} ${lName.value}`

    const response = document.getElementById('response');
    response.innerHTML = `Thank you for your application ${fName.value}.<br>In 10 years you will be ${parseInt(age.value) + 10} years old.<br>When this happens, you will receive a mysterious email at ${email.value}.`;

    event.preventDefault();
}



menuButton.addEventListener('click', function () {
  nav.classList.toggle('open');
});

toggleLight.addEventListener('click', function () {
    if (darkMode) {
        mode.setAttribute("href", "./styles/light.css");
        darkMode = false;
        toggleLight.textContent = "☼"
    } else {
        mode.setAttribute("href", "./styles/dark.css");
        darkMode = true;
        toggleLight.textContent = "☾"
    }
})

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}