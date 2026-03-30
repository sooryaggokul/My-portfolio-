let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
2000
);

let renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


/* Tunnel */

let tunnelGeometry = new THREE.CylinderGeometry(
60,
60,
2000,
32,
32,
true
);

let tunnelMaterial = new THREE.MeshBasicMaterial({
color:0x002211,
wireframe:true
});

let tunnel = new THREE.Mesh(tunnelGeometry,tunnelMaterial);

tunnel.rotation.x = Math.PI/2;

scene.add(tunnel);


/* Matrix particles */

let particleCount = 3000;

let geometry = new THREE.BufferGeometry();

let positions = new Float32Array(particleCount*3);

for(let i=0;i<particleCount*3;i++){

positions[i]=(Math.random()-0.5)*800;

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
);

let material = new THREE.PointsMaterial({
color:0x00ff88,
size:1
});

let particles = new THREE.Points(geometry,material);

scene.add(particles);


/* Camera start */

camera.position.z = 10;


/* Scroll movement */

window.addEventListener("scroll",()=>{

let scroll = window.scrollY*0.05;

camera.position.z = 10 + scroll;

showPanels();

});


/* Panels appear */

function showPanels(){

let scroll = window.scrollY;

let panels = document.querySelectorAll(".panel");

panels.forEach((panel,i)=>{

let start = (i+1)*900;

if(scroll > start){

panel.style.opacity = 1;
panel.style.transform="translateY(0)";

}

});

}


/* Animation */

function animate(){

requestAnimationFrame(animate);

particles.rotation.z += 0.001;

renderer.render(scene,camera);

}

animate();


/* Responsive */

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
