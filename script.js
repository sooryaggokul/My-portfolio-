// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 5);

// Lighting - Dark Cave Vibe
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
const pointLight = new THREE.PointLight(0x00ff41, 2, 50);
scene.add(ambientLight, pointLight);

// Create the Cave (A Large Inverted Cylinder with texture)
const caveGeometry = new THREE.CylinderGeometry(10, 10, 100, 32, 1, true);
const caveMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    side: THREE.BackSide,
    roughness: 1
});
const cave = new THREE.Mesh(caveGeometry, caveMaterial);
cave.rotation.x = Math.PI / 2;
scene.add(cave);

// Helper function to create Text Planes
function createTextPlane(text, position, rotationY = 0) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 512;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = 'Bold 30px Courier New';
    
    // Wrap text logic
    const words = text.split(' ');
    let line = '';
    let y = 60;
    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > 900) {
            ctx.fillText(line, 50, y);
            line = words[n] + ' ';
            y += 40;
        } else { line = testLine; }
    }
    ctx.fillText(line, 50, y);

    const texture = new THREE.CanvasTexture(canvas);
    const geometry = new THREE.PlaneGeometry(8, 4);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.rotation.y = rotationY;
    scene.add(mesh);
    return mesh;
}

// Section 1: Intro (Center)
createTextPlane("CERTIFIED PENETRATION TESTER\nEthical Hacking & Bug Hunting Enthusiast...", new THREE.Vector3(0, 0, -5));

// Section 2: Skills (Right)
createTextPlane("SKILLS: OWASP Top 10, Burp Suite, Metasploit, Nmap, SQLMap...", new THREE.Vector3(15, 0, -15), -Math.PI/4);

// Section 3: Certs (Left)
createTextPlane("CERTIFICATIONS: 1. RedTeam Hacker Academy 2. ISO 27001 Lead Auditor", new THREE.Vector3(-15, 0, -15), Math.PI/4);

// Section 4: The Door (Deep End)
const doorGeo = new THREE.BoxGeometry(2, 4, 0.1);
const doorMat = new THREE.MeshStandardMaterial({ color: 0x00ff41, emissive: 0x00ff41, emissiveIntensity: 0.5 });
const door = new THREE.Mesh(doorGeo, doorMat);
door.position.set(0, 0, -30);
scene.add(door);

// Camera Navigation Logic
let currentStep = 0;
const positions = [
    { x: 0, z: 5, ry: 0 },      // Intro
    { x: 8, z: -10, ry: -0.5 }, // Skills (Right)
    { x: -8, z: -10, ry: 0.5 }, // Certs (Left)
    { x: 0, z: -25, ry: 0 }     // Door
];

function moveCamera() {
    const target = positions[currentStep];
    gsap.to(camera.position, { x: target.x, z: target.z, duration: 2, ease: "power2.inOut" });
    gsap.to(camera.rotation, { y: target.ry, duration: 2 });
    
    // Check if at door
    if(currentStep === 3) {
        setTimeout(() => document.getElementById('contactPopup').classList.remove('hidden'), 2000);
    }
}

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentStep < positions.length - 1) { currentStep++; moveCamera(); }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; moveCamera(); }
});

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('contactPopup').classList.add('hidden');
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
