import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import shapes from './SimpleShapes.js'

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
scene.add(camera);

camera.position.set(0, 50, 280);
camera.lookAt(0, 10, 0);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);


// Recursively add branches to the "tree" group at position x,y,z with a rotation of rz about the z axis and ry about the y axis 
function makeTree(n, x, y, z, rz, ry, tree) {

  // Get a cylinder mesh
  let segment = shapes.getCylinder(n * 0.75 / 2, n / 2, 8, "#e0a872")

  //Create a group that will serve as te center of rotation
  const group = new THREE.Group();
  const dir = new THREE.Vector3(0, 1, 0) 
  group.position.x = x;
  group.position.y = y;
  group.position.z = z;

  group.add(segment)
  tree.add(group)
  segment.position.y += 4;
  // The rotation is done in two steps, a rotation around the Z axis followed by a rotation around the Y axis
  group.rotation.z = rz;
  let axis = new THREE.Vector3(0, 0, 1);
  let angle = rz;
  dir.applyAxisAngle(axis, angle)
  group.rotation.y = ry;
  axis = new THREE.Vector3(0, 1, 0)
  angle = ry;
  dir.applyAxisAngle(axis, angle)
  
  // Scale the direction vector to easily find the endpoint of the branch (which is also the start point of the next branches)
  dir.multiply(new THREE.Vector3(8, 8, 8));

  // num dictates how many branches branch off this branch
  let num = Math.floor(Math.random() * 2 * n)
  if(tree.children.length < 10) { // If the tree is too small, add an extra child branch
    num ++
  }
  for (let i = 0; i < num; i++) {
    makeTree(n * 0.75, x + dir.x, y + dir.y, z + dir.z, Math.random() * Math.PI / 2, ry + Math.PI * 2 / num * i + Math.random() * Math.PI / 6 - Math.PI / 3, tree)
  }

  // If this is a terminal branch then attach a bushel of leaves
  if (num == 0) {
    let leaves = shapes.getSphere(Math.log(n * 10.75), `rgb(${Math.floor(Math.random() * 100)}, 255, ${Math.floor(Math.random() * 100)})`)
    leaves.position.x = x + dir.x
    leaves.position.y = y + dir.y
    leaves.position.z = z + dir.z
    tree.add(leaves)
  }

}

let trees = []

// Create nine trees and add them to the scene
for(let i = 0; i < 9; i++) {
  trees[i] = new THREE.Group();
  trees[i].position.x = (i % 3) * 60 - 60;
  trees[i].position.y = Math.floor(i / 3) * -60 + 60
  makeTree(4,0,0 ,0 ,0,0,trees[i])
  scene.add(trees[i])
}

// Rotate the trees about their Y axis
function animate(time) {
  requestAnimationFrame(animate)
  trees.forEach(t => {
    t.rotation.y += 0.02

  })

  renderer.render(scene, camera)
}

animate()

