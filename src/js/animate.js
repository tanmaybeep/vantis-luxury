import { renderer, scene, camera } from './scene';
import { watchModel } from './watch';

function animate() {
  requestAnimationFrame(animate);

  if (watchModel) {
    watchModel.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

animate();