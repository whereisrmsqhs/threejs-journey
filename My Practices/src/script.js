import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Debug
 */
const gui = new GUI({
  width: 300,
  title: "놀아보자",
});
gui.close();
const debugObject = {};

// 4 important elements to get started!
// - A scene that contains
// - Some objects
// - A camera
// - A renderer

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

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

let mesh_list = [];

debugObject.color = "0x68feff";
debugObject.subdivision = 2;
const Xtweaks = gui.addFolder("x축 이동");
const Ytweaks = gui.addFolder("y축 이동");
const Ztweaks = gui.addFolder("z축 이동");
const Wireframe = gui.addFolder("와이어프레임");
const Subdivision = gui.addFolder("썹디비젼 (와이어프레임 체크 필요)");

Xtweaks.close();
Ytweaks.close();
Ztweaks.close();
Wireframe.close();
Subdivision.close();

while (geoProperty.count <= 4) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const material = new THREE.MeshBasicMaterial({ color: 0x68feff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(geoProperty.xPos, geoProperty.yPos, geoProperty.zPos);
      mesh_list.push(mesh);
      scene.add(mesh);

      Xtweaks.add(mesh.position, "x")
        .min(-5)
        .max(5)
        .step(0.01)
        .name("elevation");

      Ytweaks.add(mesh.position, "y")
        .min(-5)
        .max(5)
        .step(0.01)
        .name("elevation");

      Ztweaks.add(mesh.position, "z")
        .min(-5)
        .max(5)
        .step(0.01)
        .name("elevation");

      Wireframe.add(material, "wireframe");
      Subdivision.add(debugObject, "subdivision")
        .min(1)
        .max(20)
        .step(1)
        .onFinishChange(() => {
          mesh.geometry.dispose();
          mesh.geometry = new THREE.BoxGeometry(
            0.1,
            0.1,
            0.1,
            debugObject.subdivision,
            debugObject.subdivision,
            debugObject.subdivision
          );
        });

      geoProperty.xPos += 0.2;
      geoProperty.count += 1;
    }
    geoProperty.xPos = 0;
    geoProperty.yPos += 0.2;
  }
  geoProperty.xPos = 0;
  geoProperty.yPos = 0;
  geoProperty.zPos += 0.2;
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

// window.addEventListener("mousemove", (event) => {
//   // 0.5로 빼는건 값의 범위가 -0.5 ~ 0.5사이로 나타나게 할려고 하는 것임.
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
//   // console.log(event.clientX, event.clientY);
// });

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

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

/**
 * Axes Helper
 */
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x053aff);
renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime);

  control.update();

  mesh_list.forEach(function (mesh) {
    mesh.rotation.y = elapsedTime;
    mesh.rotation.z = elapsedTime;
  });

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});
