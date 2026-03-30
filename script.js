let current = 1;
let total = 5;

function nextSection(){

document.getElementById("section"+current).classList.remove("active");

current++;

if(current > total){
current = total;
}

document.getElementById("section"+current).classList.add("active");

}
