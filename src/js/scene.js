import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const container = document.getElementById('hero-model');

// ====================
// SCENE
// ====================
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);

// ====================
// CAMERA
// ====================
export const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

// ====================
// RENDERER
// ====================
export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Better physically-based rendering
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;

container.appendChild(renderer.domElement);

// ====================
// LIGHTS
// ====================

// Soft overall light
const frontLight = new THREE.DirectionalLight(0xffffff, 1.8);
frontLight.position.set(0, 2, 8);
scene.add(frontLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Main studio key light
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Rim light for metallic edges
const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
rimLight.position.set(-5, 3, -5);
scene.add(rimLight);

// Fill light from below
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(0, -5, 2);
scene.add(fillLight);

// ====================
// HDR ENVIRONMENT
// ====================

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader().load(
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr',

  (hdr) => {
    const envMap = pmremGenerator.fromEquirectangular(hdr).texture;

    // This is what gives the watch realistic reflections
    scene.environment = envMap;

    // Keep our custom black background
    scene.background = new THREE.Color(0x050505);

    hdr.dispose();
    pmremGenerator.dispose();

    console.log('HDR loaded successfully');
  },

  undefined,

  (error) => {
    console.error('HDR failed to load:', error);
  }
);

// ====================
// RESIZE HANDLING
// ====================

window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});