let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


let geometry = new THREE.BoxGeometry(50,20,50);

let material = new THREE.MeshBasicMaterial({
color:0x111111,
wireframe:false
});

let cave = new THREE.Mesh(geometry,material);

scene.add(cave);


camera.position.z = 20;

let section = 0;

let sections = [

{
title:"Welcome Explorer",
content:`Certified Penetration Tester with a deep interest in ethical hacking, penetration testing, and bug hunting.

I enjoy exploring how systems work, finding vulnerabilities, and turning challenges into learning opportunities.

With a blend of technical skills and a constant eagerness to grow, I strive to make the digital world safer while evolving every day as a security professional.`
},

{
title:"Skills",
content:`• Strong understanding of OWASP Top 10 (Web & API)

• Web testing using Burp Suite, OWASP ZAP and Postman

• Security tools: Nmap, Metasploit, Nikto, Hydra, SQLMap, Wfuzz

• Traffic interception and request manipulation

• Active bug hunter reporting vulnerabilities`
},

{
title:"Certifications",
content:`1. Certified Penetration Tester
RedTeam Hacker Academy

2. ISO/IEC 27001:2022 Lead Auditor
Mastermind Assurance`
},

{
title:"Secret Door",
content:`You found the hacker cave door.

Click again to open communication portal.`

}

]


function updateContent(){

document.getElementById("sectionTitle").innerText=sections[section].title;

document.getElementById("sectionContent").innerText=sections[section].content;

}

updateContent();


document.getElementById("right").onclick=function(){

if(section<sections.length-1){

section++;

camera.position.x+=10;

updateContent();

}

else{

document.getElementById("popup").style.display="block";

}

}


document.getElementById("left").onclick=function(){

if(section>0){

section--;

camera.position.x-=10;

updateContent();

}

}



function animate(){

requestAnimationFrame(animate);

cave.rotation.y +=0.001;

renderer.render(scene,camera);

}

animate();
