import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// 4 important elements to get started!
// - A scene that contains
// - Some objects
// - A camera
// - A renderer

// Scene
const scene = new THREE.Scene();

/**
 * Object
 *
 * A Mesh is combination of a geometry(the shape) and a material(how it looks)
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xd7790f });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 *
 * The first parameter is the field of view(angle of camera)
 * Second parameter is the aspect ratio (가로 세로 비율). 왜 필요할까?
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 0.5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
