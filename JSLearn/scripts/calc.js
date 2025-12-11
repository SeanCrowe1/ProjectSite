let display = document.getElementsByClassName("div1");
let inputSum = "";

const calcInput = (id) => {
    let current = document.getElementsByClassName(id);
    if (inputSum !== "") {
        inputSum += " ";
    }
    inputSum += current.value;
    display.innerHTML = inputSum;
}