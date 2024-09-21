import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// // Clock
// const clock = new THREE.Clock();

// 아래는 GSAP 라이브러리를 사용해서 만든 애니메이션이다.
// 해당 함수에서 아래의 tick에서 배운것 처럼 Gsap만의 tick을 가지고 있다고 생각하면 된다.

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animations
const tick = () => {
  // Clock
  // 강의 극초반부에서는 현재 시간과 tick안에서의 시간 차이를 통해서 동일한 값을 매 렌더링마다 구할 수 있었음
  // 반면에 elapsedTime을 사용하면 0부터 시작하는 초 단위의 매 렌더링마다 조금씩 증가하는 값을 가질 수 없음.
  // 그러면 rotation.y를 매 렌더링마다 해당 값으로 넣어주게 되면 애니메이션이 완성이 됨.
  //   const elaspedTime = clock.getElapsedTime();

  //   // Update Objects
  //   mesh.rotation.y = elaspedTime * Math.PI * 2;

  // Update objects
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
