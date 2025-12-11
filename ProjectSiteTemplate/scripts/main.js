const toggleLight = document.querySelector('.mode-toggle-day');
const mode = document.getElementById('style');
const sep = document.getElementById('seperator');
let darkMode = false;

toggleLight.addEventListener('click', () => {
    if (darkMode) {
        mode.setAttribute("href", "./css/light.css");
        darkMode = false;
        toggleLight.textContent = "☼"
    } else {
        mode.setAttribute("href", "./css/dark.css");
        darkMode = true;
        toggleLight.textContent = "☾"
    }
})

const myFunction = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    sep.innerHTML = "";
  } else {
    x.className = "topnav";
    sep.innerHTML = "<br><br><br>";
  }
}
