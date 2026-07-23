import { renderer, scene, camera } from './scene';
import { watchModel } from './watch';

// Mouse position variables
let mouseX = 0;
let mouseY = 0;

// Track mouse movement
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

function animate() {
  requestAnimationFrame(animate);

  if (watchModel) {
    // Very slow luxury rotation
    watchModel.rotation.y += 0.0009;

    // Smooth mouse tilt with inertia
    watchModel.rotation.x +=
      (-mouseY * 0.12 - watchModel.rotation.x) * 0.04;

    watchModel.rotation.z +=
      (mouseX * 0.06 - watchModel.rotation.z) * 0.04;
  }

  renderer.render(scene, camera);
}

animate();