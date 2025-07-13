

let scene, camera, renderer, truck;

function initIntroSection2() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.truckPixelRatio);

  document.querySelector(".truckcontainer2").appendChild(renderer.domElement);

  // Load truck model
  const loader2 = new GLTFLoader();

  loader2.load(
    "assets/finaltruck.glb",
    function (gltf) {
      truck = gltf.scene;
      truck.scale.set(0.4, 0.4, 0.4);

      truck.rotation.set(Math.PI/2, Math.PI/2, 0);

      // Optional: center the model if it's not centered
      const box = new THREE.Box3().setFromObject(truck);
      const center = box.getCenter(new THREE.Vector3());
      truck.position.sub(center); // center the model around origin
      truck.position.x -= 5.35;
      truck.position.y += 2.3;
      console.log("truck position:", truck.position);

      // Add lights to make the model visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 10, 7);
      scene.add(directionalLight);


      // Add the truck to the scene
      scene.add(truck);

     
     ; 
      // Position camera
      camera.position.set(0, 2, 5);
      camera.lookAt(0, 0, 0);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened while loading the GLTF model:", error);
    }
  );

  // Render loop for intro section
  function animateIntro2() {
    requestAnimationFrame(animateIntro2);

    if (truck) {
      
      truck.rotation.y += 0.01; 
      truck.rotation.x += 0.02; 
      
    }

    renderer.render(scene, camera);
  }
  animateIntro2();
}


initIntroSection2();
