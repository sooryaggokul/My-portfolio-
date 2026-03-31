const btn = document.getElementById("enterBtn");
const doorContainer = document.querySelector(".door-container");
const content = document.getElementById("content");

btn.addEventListener("click", () => {

    doorContainer.classList.add("open");
    btn.style.display = "none";

    setTimeout(()=>{
        content.classList.add("show");
    },1500)

});
