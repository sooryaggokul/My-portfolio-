const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector("#bg")
});

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.set(0,0,5);

// LIGHT

const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

// CAVE TUNNEL

const geometry = new THREE.CylinderGeometry(10,10,200,32,1,true);

const textureLoader = new THREE.TextureLoader();

const caveTexture = textureLoader.load("assets/cave1.jpg");

const material = new THREE.MeshStandardMaterial({
map:caveTexture,
side:THREE.BackSide
});

const tunnel = new THREE.Mesh(geometry,material);

tunnel.rotation.x = Math.PI/2;

scene.add(tunnel);

// ANIMATION

function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}

animate();

// ROOMS DATA

const rooms = [

{
title:"Cave Entrance",
content:"Welcome. Click Enter to explore my cybersecurity cave portfolio."
},

{
title:"About Me Chamber",
content:`Penetration Tester with 7 months of hands-on experience in web application security testing, having assessed 10+ applications and delivered vulnerability reports aligned with OWASP Top 10 standards.

Actively engaged in bug hunting to gain real-world attack exposure and continuously sharpen exploitation skills.

Proficient in tools such as Nmap, Burp Suite, Metasploit, and Python for vulnerability discovery, automation, and analysis.`
},

{
title:"Skills Tunnel",
content:`• Strong understanding of OWASP Top 10 (Web & API) vulnerabilities.

• Web testing using Burp Suite, OWASP ZAP and Postman.

• Security tools: Nmap, Metasploit, Nikto, Hydra, SQLMap, Wfuzz, Wireshark, JWT Tool, PyInstxtractor.

• Skilled in request manipulation and vulnerability analysis.

• Active bug hunter with responsible disclosure experience.`
},

{
title:"Certifications Chamber",
content:`Certified Penetration Tester
RedTeam Hacker Academy

ISO/IEC 27001:2022 Lead Auditor
Mastermind Assurance`
},

{
title:"Final Chamber",
content:"Thank you for exploring my cyber cave portfolio."
}

];

// CAMERA POSITIONS FOR ROOMS

const positions = [5,-20,-45,-70,-95];

let currentRoom = 0;

// UPDATE CONTENT

function updateRoom(){

document.getElementById("roomTitle").innerText = rooms[currentRoom].title;

document.getElementById("contentBox").innerText = rooms[currentRoom].content;

}

// CAMERA ANIMATION

function moveCamera(target){

const start = camera.position.z;

const duration = 800;

let startTime = null;

function animateMove(time){

if(!startTime) startTime = time;

const progress = (time-startTime)/duration;

camera.position.z = start + (target-start)*progress;

if(progress < 1){

requestAnimationFrame(animateMove);

}else{

camera.position.z = target;

}

}

requestAnimationFrame(animateMove);

}

// NEXT ROOM

function nextRoom(){

if(currentRoom < rooms.length-1){

currentRoom++;

moveCamera(positions[currentRoom]);

updateRoom();

}

}

// PREVIOUS ROOM

function prevRoom(){

if(currentRoom > 0){

currentRoom--;

moveCamera(positions[currentRoom]);

updateRoom();

}

}
