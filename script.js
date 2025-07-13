import Lenis from "https://esm.sh/@studio-freight/lenis";
import * as THREE from "https://esm.sh/three@0.136.0";
import { GLTFLoader } from "https://esm.sh/three@0.136.0/examples/jsm/loaders/GLTFLoader";
import { gsap } from "https://esm.sh/gsap@3.12.5";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { SplitText } from "https://esm.sh/gsap/SplitText";

import { RGBELoader } from "https://esm.sh/three@0.136.0/examples/jsm/loaders/RGBELoader.js";

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".hero-text-panel");
const totalPanels = panels.length;

const clock = new THREE.Clock();
gsap.to(panels, {
  opacity: 1,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: `+=${totalPanels * 100}%`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      let progress = self.progress;
      let panelIndex = Math.floor(progress * totalPanels);
      panels.forEach((panel, index) => {
        panel.style.opacity = index === panelIndex ? 1 : 0;
      });
    },
  },
});

let scene2, camera2, renderer2, device;

function initIntroSection() {
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer2 = new THREE.WebGLRenderer({ alpha: true });
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.setPixelRatio(window.devicePixelRatio);

  document.querySelector(".devicecontainer").appendChild(renderer2.domElement);

  // Load device model
  const loader2 = new GLTFLoader();

  loader2.load(
    "assets/remote_control_device.glb",
    function (gltf) {
      device = gltf.scene;
      device.scale.set(0.4, 0.4, 0.4);

      device.rotation.set(Math.PI / 2, Math.PI / 2, 0);

      // Optional: center the model if it's not centered
      const box = new THREE.Box3().setFromObject(device);
      const center = box.getCenter(new THREE.Vector3());
      device.position.sub(center); // center the model around origin
      device.position.x -= 5.0;
      device.position.y += 2.2;
      console.log("Device position:", device.position);

      // Add lights to make the model visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene2.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 10, 7);
      scene2.add(directionalLight);

      // Add the device to the scene
      scene2.add(device);

      // Position camera
      camera2.position.set(0, 2, 5);
      camera2.lookAt(0, 0, 0);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );

  // Render loop for intro section
  function animateIntro() {
    requestAnimationFrame(animateIntro);

    if (device) {
      device.rotation.y += 0.01;
      device.rotation.x += 0.02;
    }

    renderer2.render(scene2, camera2);
  }
  animateIntro();
}

initIntroSection();

let scene, camera, renderer, truck;

function initIntroSection2() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  // Enable physically correct lighting
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.querySelector(".devicecontainer2").appendChild(renderer.domElement);

  // Add environment lighting (optional but recommended)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const rgbeLoader = new RGBELoader();
  rgbeLoader.setPath("assets/env/").load("studio.hdr", function (texture) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.environment = envMap;

    texture.dispose();
    pmremGenerator.dispose();
  });

  // Load truck model
  const loader2 = new GLTFLoader();

  loader2.load(
    "assets/animated_sci-fi_globe_test.glb",
    function (gltf) {
      truck = gltf.scene;
      truck.scale.set(1.5, 1.5, 1.5);
      truck.rotation.set(0, 2, 0);

      // Center the model
      const box = new THREE.Box3().setFromObject(truck);
      const center = box.getCenter(new THREE.Vector3());
      truck.position.sub(center);
      truck.position.x -= 3.5;
      truck.position.y += 0;

      // Enable shadows
      truck.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.envMapIntensity = 1; // reflect environment
        }
      });

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.set(1024, 1024);
      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 20;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
      scene.add(directionalLight);

      // Optional: add a ground plane to receive shadows
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.ShadowMaterial({ opacity: 0.3 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1;
      ground.receiveShadow = true;
      scene.add(ground);

      scene.add(truck);

      camera.position.set(0, 2, 5);
      camera.lookAt(0, 0, 0);
      console.log("animation we are looking for: ", gltf.animations);
      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(truck);
        const action = mixer.clipAction(gltf.animations[0]); // play the first animation
        action.play();

        // Store mixer to update in render loop
        truck.userData.mixer = mixer;
      }
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );

  function animateIntro2() {
    requestAnimationFrame(animateIntro2);
    const delta = clock.getDelta();
    if (truck.userData.mixer) {
      truck.userData.mixer.update(delta);
    }
    renderer.render(scene, camera);
  }
  animateIntro2();
}

initIntroSection2();

document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("popupTrigger");
  if (img) {
    img.addEventListener("click", () => {
      const popup = document.getElementById("popup");
      if (popup) {
        if (popup.classList.contains("visible-popup")) {
          popup.classList.remove("visible-popup");
          popup.classList.add("hidden-popup");
        } else {
          popup.classList.remove("hidden-popup");
          popup.classList.add("visible-popup");
        }
      }
    });
  }
});
