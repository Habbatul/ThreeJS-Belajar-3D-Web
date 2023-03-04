import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
camera.position.setX(-3);

//agar resize saat scene dikecilkan
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


// Torus

var geometry = new THREE.TorusGeometry(10, 0.7, 16, 4);
var material = new THREE.MeshStandardMaterial({ color: 0xbf47ff });
var torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//torus 2
var geometry2 = new THREE.TorusGeometry(12, 0.7, 16, 20);
var material2 = new THREE.MeshStandardMaterial({ color: 0x681E4E });
var torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2);

// Lights

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 10000000);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

// Helpers

// var lightHelper = new THREE.PointLightHelper(pointLight)
// var gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// var controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  var star = new THREE.Mesh(geometry, material);

  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

var spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

var jeffTexture = new THREE.TextureLoader().load('jeff.png');

var jeff = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

var moonTexture = new THREE.TextureLoader().load('rustediron2_basecolor.png');
var normalTexture = new THREE.TextureLoader().load('rustediron2_normal.png');

var moon = new THREE.Mesh(
  new THREE.CylinderGeometry( 3, 3, 10, 32 ),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);




//control mouse



// Scroll Animation

function moveCamera() {
  var t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.00018;
}

document.body.onscroll = moveCamera;
moveCamera();


//ukuran untuk objek cilinder
//di mobile
var moonX_mob=-15;
var moonY_mob=0;
var moonZ_mob=4;
//di desktop
var moonX=-23;
var moonY=0;
var moonZ=32;

//inisialisasi secara realtime
function myFunction(x) {
  if (x.matches) { // If media query matches


    moon.position.z = moonZ_mob;
    moon.position.x =moonX_mob;
    moon.position.y =moonY_mob;
    
    jeff.position.z = -8;
    jeff.position.x = 1;
    jeff.position.y = -3;
    
    torus.position.z = -8;
    torus.position.x = 1;
    torus.position.y = -3;
    
    torus2.position.z = -8;
    torus2.position.x = 1;
    torus2.position.y = -3;

  } else {
  moon.position.z = moonZ;
  moon.position.x=moonX;
  moon.position.y =moonY;
  
  jeff.position.z = -5;
  jeff.position.x = 3;
  jeff.position.y =0;
  
  torus.position.z = -5;
  torus.position.x = 3;
  jeff.position.y =0;
  
  torus2.position.z = -5;
  torus2.position.x = 3;
  jeff.position.y =0;
  }
}
var x = window.matchMedia("(max-width: 991px)");
myFunction(x);
x.addListener(myFunction);



//buat durasi
let j=0;


// Animation Loop

function animate() {

//animasi yang dilakukan 
  var t = document.body.getBoundingClientRect().bottom;
  requestAnimationFrame(animate);

  j++;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x -= 0.01;
  torus2.rotation.y -= 0.01;
  torus2.rotation.z -= 0.01;

  moon.rotation.x += 0.005;

  if ((window.matchMedia("(max-width: 991px)")).matches) {
    if(window.pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight){
      if(moon.position.x <= moonX_mob+1 || moon.position.z >= moonZ_mob-1){
        moon.position.x +=0.08;
        moon.position.z -=0.05;
      }else{
        moon.position.x +=0;
        moon.position.z -=0;
      }

    }
    else if(window.pageYOffset<document.documentElement.scrollHeight - document.documentElement.clientHeight){ 
      if(moon.position.z < moonZ_mob || moon.position.x > moonX_mob || moon.position.y != moonY_mob){
        moon.position.x -=0.08;
        moon.position.z +=0.05;
      }
    }
  }else {
    if(window.pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight){
      if(moon.position.x <= moonX+9 || moon.position.z >= moonZ-9){
        moon.position.x +=0.08;
        moon.position.z -=0.05;
      }else{
        moon.position.x +=0;
        moon.position.z -=0;
      }

    }
    else if(window.pageYOffset<document.documentElement.scrollHeight - document.documentElement.clientHeight){ 
      if(moon.position.z < moonZ || moon.position.x > moonX || moon.position.y != moonY){
        moon.position.x -=0.08;
        moon.position.z +=0.05;
      }
    }
  }
  

  console.log(t, " ==> ", moon.position.x, ", ", moon.position.y, ", ", moon.position.z);
  if(j<=100)
    jeff.position.y +=0.01;
  else
    jeff.position.y -=0.01;
  if(j==200)
    j=0;
  // controls.update();
  renderer.render(scene, camera)
}

animate();
