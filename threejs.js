import * as THREE from 'three';

// Créez une scène, une caméra et un renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créez un matériau de base pour les maisons
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// Créez 4 maisons et ajoutez-les à la scène
for(let i = 0; i < 4; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const house = new THREE.Mesh(geometry, material);

    // Placez chaque maison à une position différente le long de l'axe des x
    house.position.x = i * 2;
    scene.add(house);
}

// Positionnez la caméra de sorte qu'elle regarde les maisons
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 3;

// Fonction de rendu
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();