import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from './scene';
import watchUrl from '../assets/models/watch.glb';

export let watchModel = null;

const loader = new GLTFLoader();

loader.load(
  watchUrl,

  (gltf) => {
    watchModel = gltf.scene;

    // ADD IMMEDIATELY
    scene.add(watchModel);

    // FORCE VISIBILITY
    watchModel.scale.set(32, 32, 32);

    // PUT IT DIRECTLY IN FRONT OF CAMERA
    watchModel.position.set(-0.15, -0.75, 0);

    // NO ROTATION
    watchModel.rotation.set(0, 0, 0);

    console.log('WATCH ADDED TO SCENE');
  },

  undefined,

  (error) => {
    console.error(error);
  }
);