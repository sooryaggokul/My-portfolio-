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

camera.position.z = 5;


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


// ANIMATION LOOP

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}

animate();


// CAMERA MOVEMENT

let depth = 5;

const title = document.getElementById("title");

function moveForward(){

depth -= 10;

if(depth < -100){
depth = -100;
}

camera.position.z = depth;

updateTitle();

}


function moveBack(){

depth += 10;

if(depth > 5){
depth = 5;
}

camera.position.z = depth;

updateTitle();

}


function updateTitle(){

if(depth >= 5){
title.innerText = "Enter My Cyber Cave";
}

else if(depth < 5 && depth > -20){
title.innerText = "About Me Chamber";
}

else if(depth <= -20 && depth > -50){
title.innerText = "Skills Tunnel";
}

else if(depth <= -50 && depth > -80){
title.innerText = "Certifications Chamber";
}

else{
title.innerText = "Treasure Chamber";
}

}
