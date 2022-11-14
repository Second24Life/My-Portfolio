import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, sphere, controls;
// const sdBtn = document.querySelector(".sd");
// const hdBtn = document.querySelector(".hd");
const locationWrapper = document.getElementById("my_location");

// sdBtn.onclick = () => changeTextQuality("low");
// hdBtn.onclick = () => changeTextQuality("high");

export function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  loadTexture("../img/earth_texture.jpg");
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  locationWrapper.appendChild(renderer.domElement);
  renderer.domElement.id = "c";

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 100;

  camera.position.z = 10;
}

function loadTexture(texture) {
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load(texture);
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });

  sphere = new THREE.Mesh(geometry, material);
}

// function changeTextQuality(quality) {
//   switch (quality) {
//     case "high":
//       scene.remove(sphere);
//       loadTexture("../img/earth_hd.jpg");
//       scene.add(sphere);
//       break;
//     case "low":
//       scene.remove(sphere);
//       loadTexture("../img/earth_texture.jpg");
//       scene.add(sphere);
//       break;
//     default:
//       console.log("error must choose between values: high / low");
//   }
// }

export function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
