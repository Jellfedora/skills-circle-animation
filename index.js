// -----------------------------------------------------------------
// Imports

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';

// Three JS Template

// -----------------------------------------------------------------
// BASIC parameters

const canvas = document.querySelector('#c');
var renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const width = canvas.clientWidth;
const height = canvas.clientHeight;
renderer.setSize(width, height, false);

if (window.innerWidth > 800) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
};

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

// -----------------------------------------------------------------
// CAMERA

var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 20, 30);


// -----------------------------------------------------------------
// SCENE

var scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// -----------------------------------------------------------------
// TOOLS

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.update();

// -----------------------------------------------------------------
// LIGHT

var light = new THREE.AmbientLight('white'); // soft white light
scene.add(light);

//----------------------------------------------------------------- 
// FUNCTION

var skillsNameArray = [
    "Html5",
    "Css3",
    "Sass",
    "Bootstrap",
    "Javascript",
    "ReactJs",
    "Redux",
    "NodeJs",
    "Symfony",
    "AngularJs",
    "Cakephp",
    "Codeigniter",
    "Three.js",
    "mysql",
    "php",
    "Wordpress",
    "Git",
    "Gitlab",
    "Github",
    "Linux",
    "Windows",
    "React Native"
];

//----------------------------------------------------------------- 
// Sphere

var radius = 5;
var widthSegments = 5;
var heightSegments = 5;
var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

// Transparent color
var material = new THREE.MeshPhongMaterial({
    color: 'white',
    opacity: 0,
    transparent: true,
});
var sphere = new THREE.Mesh(geometry, material);
var sphereVerticesArray = geometry.vertices;

//----------------------------------------------------------------- 
// INIT
function init() {

    const colorSkill = new THREE.MeshPhongMaterial({ color: 'white' });

    // Pour chaque élément du tableau on crée un mesh
    for (let index = 0; index < skillsNameArray.length; index++) {

        let skillName = skillsNameArray[index];
        var skill = new THREE.FontLoader();

        skill.load('Caveat_Regular.json', function (font) {

            let geometry = new THREE.TextGeometry(skillName, {
                font: font,
                size: 0.2,
                height: 0.1,
                curveSegments: 0.01,
            });
            let skillMesh = new THREE.Mesh(geometry, colorSkill);

            skillMesh.position.set(sphereVerticesArray[index].x, sphereVerticesArray[index].y, sphereVerticesArray[index].z);
            sphere.add(skillMesh)
        });
    }
};

scene.add(sphere);

//----------------------------------------------------------------- 
// ANIMATE

var animate = function () {
    requestAnimationFrame(animate);

    // Sphere Animation
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;


    // Sphere Children LookAt Camera position
    if (sphere) {

        for (let index = 0; index < sphere.children.length; index++) {
            sphere.children[index].lookAt(camera.position)
        }
    }

    renderer.render(scene, camera);
}

//----------------------------------------------------------------- 
// START FUNCTIONS

init();
animate();