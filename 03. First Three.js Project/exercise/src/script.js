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

const geoProperty = {
  xPos: 0,
  yPos: 0,
  zPos: 0,
  count: 1,
};

while (geoProperty.count <= 33) {
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshBasicMaterial({ color: 0x68feff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(geoProperty.xPos, geoProperty.yPos, geoProperty.zPos);
  scene.add(mesh);

  geoProperty.xPos += 0.2;
  geoProperty.yPos += 0.2;
  geoProperty.zPos += 0.2;
  geoProperty.count += 1;
}

/**
 * Sizes
 */
const sizes = {
  width: 900,
  height: 700,
};

/**
 * Camera
 *
 * The first parameter is the field of view(angle of camera)
 * Second parameter is the aspect ratio (가로 세로 비율). 왜 필요할까? => to determine the proportion(비율) of the camera's view, this could prevent distortion
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x053aff);
renderer.render(scene, camera);
