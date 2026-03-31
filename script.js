const btn = document.getElementById("enterBtn");
const door = document.getElementById("doorFrame");
const about = document.getElementById("about");

btn.addEventListener("click", () => {

door.classList.add("open");

btn.style.display = "none";

setTimeout(() => {

about.classList.add("show");

},2000);

});
