import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

const lib = {}

lib.getCube = function (w, h, d, col) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshPhongMaterial({ color: col });
  const cube = new THREE.Mesh(geometry, material);
  return cube
}

lib.getCylinder = function (rTop, rBottom, h, col) {
  const geometry = new THREE.CylinderGeometry(rTop, rBottom, h, 4);
  const material = new THREE.MeshLambertMaterial({ color: col });
  const cylinder = new THREE.Mesh(geometry, material);

  return cylinder
}

lib.getSphere = function (r, col) {
  // const geometry = new THREE.SphereGeometry(r, 32, 16);
  const material = new THREE.MeshLambertMaterial({ color: col });
  const geometry = new THREE.DodecahedronGeometry(r);
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

export default lib;