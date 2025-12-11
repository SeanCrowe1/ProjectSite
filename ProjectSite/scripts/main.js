const toggleLight = document.querySelector('.mode-toggle-day');
const mode = document.getElementById('style');
const sep = document.getElementById('seperator');
const current = document.getElementById('pageTitle').textContent;
let comics = document.getElementById('comics');

if (getCookie("darkMode") === "true") {
  mode.setAttribute("href", "./css/dark.css");
  toggleLight.textContent = "☾"
}

toggleLight.addEventListener('click', () => {
  if (getCookie("darkMode") === "true") {
    mode.setAttribute("href", "./css/light.css");
    setCookie("darkMode", "false", 365);
    toggleLight.textContent = "☼";
  } else {
    mode.setAttribute("href", "./css/dark.css");
    setCookie("darkMode", "true", 365);
    toggleLight.textContent = "☾";
  }
})

const openNav = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function displayComics(category) {
  if (category === "Marvel") {
  } else if (category === "DC") {
  } else {
  }
}

// Cookie Functions

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

window.onload = function checkCookie() {
  if (document.cookie === "") {
    document.cookie = "darkMode:false;expires=Thur, 31 Dec 2099 23:59:59 UTC";
    return;
  }
  let status = getCookie("darkMode");
  if (status === "true") {
    mode.setAttribute("href", "./css/dark.css");
    toggleLight.textContent = "☾";
    console.log("Dark Mode enabled");
  } else {
    console.log("Light Mode enabled");
  }
  // setCookie("cart", "Amazing Fantasy #15 (1965), Incredible Hulk #1 (1966)")
}
