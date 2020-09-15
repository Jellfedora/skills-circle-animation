// -----------------------------------------------------------------
// Imports

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
// import * as TWEEN from '<script src="https://code.createjs.com/1.0.0/tweenjs.min.js'

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
camera.position.set(0, 0, 30);


// -----------------------------------------------------------------
// SCENE

var scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// -----------------------------------------------------------------
// TOOLS

// OrbitControls
// const controls = new OrbitControls(camera, canvas);
// controls.update();

// -----------------------------------------------------------------
// LIGHT

var light = new THREE.AmbientLight('white'); // soft white light
scene.add(light);

//----------------------------------------------------------------- 
// FUNCTION

// 0,272727273
var skillsArray = [
    {
        name: 'Html5',
        position: [0, 6, 0]
    },
    {
        name: 'Css3',
        position: [0, 5, 0]
    },
    {
        name: 'Sass',
        position: [0, 4, 0]
    },
    {
        name: 'Bootstrap',
        position: [0, 3, 0]
    },
    {
        name: 'Javascript',
        position: [0, 2, 0]
    },
    {
        name: 'ReactJs',
        position: [1, 6, 0]
    },
    {
        name: 'Redux',
        position: [1, 5, 1]
    },
    {
        name: 'NodeJs',
        position: [1, 4, 1]
    },
    {
        name: 'Symfony',
        position: [1, 3, 1]
    },
    {
        name: 'AngularJs',
        position: [1, 2, 1]
    },
    {
        name: 'Cakephp',
        position: [0, 1, 1]
    },
    {
        name: 'Codeigniter',
        position: [0, 1, 1]
    },
    {
        name: 'Three.js',
        position: [0, 1, 1]
    },
    {
        name: 'mysql',
        position: [0, 1, 1]
    },
    {
        name: 'php',
        position: [0, 1, 1]
    },
    {
        name: 'Wordpress',
        position: [0, 1, 1]
    },
    {
        name: 'Git',
        position: [0, 1, 1]
    },
    {
        name: 'Gitlab',
        position: [0, 1, 1]
    },
    {
        name: 'Github',
        position: [0, 1, 1]
    },
    {
        name: 'Linux',
        position: [0, 1, 1]
    },
    {
        name: 'Windows',
        position: [0, 1, 1]
    },
    {
        name: 'React Native',
        position: [0, 1, 1]
    },
    {
        name: 'Electron',
        position: [0, 1, 1]
    },
    {
        name: 'Agile',
        position: [0, 1, 1]
    },
    {
        name: 'Merise',
        position: [0, 1, 1]
    },
];


//----------------------------------------------------------------- 
// Sphere

var radius = 5;
var widthSegments = 6;
var heightSegments = 5;
var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

// Sphere Transparent color
var material = new THREE.MeshPhongMaterial({
    color: 'white',
    opacity: 0,
    transparent: true,
});
var sphere = new THREE.Mesh(geometry, material);
var sphereVerticesArray = geometry.vertices;
var sphereIsAnimate = true;

// Plane

var planeGeometry = new THREE.PlaneGeometry(7, 4, 4, 4);
// var planeMaterial = new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide });
var plane = new THREE.Mesh(planeGeometry, material);
var planeVerticesArray = plane.geometry.vertices;
scene.add(plane);

// Create Text Elements
function createTextElements() {
    const colorSkill = new THREE.MeshPhongMaterial({ color: 'white' });
    console.log(plane.geometry)
    console.log(sphere.geometry)
    // Pour chaque élément du tableau on crée un mesh
    for (let index = 0; index < skillsArray.length; index++) {

        let skillName = skillsArray[index].name;
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
}

// function createTextElements() {
//     const colorSkill = new THREE.MeshPhongMaterial({ color: 'white' });
//     console.log(plane.geometry)
//     console.log(sphere.geometry)
//     // Pour chaque élément du tableau on crée un mesh
//     for (let index = 0; index < skillsArray.length; index++) {

//         let skillName = skillsArray[index].name;
//         var skill = new THREE.FontLoader();

//         skill.load('Caveat_Regular.json', function (font) {

//             let geometry = new THREE.TextGeometry(skillName, {
//                 font: font,
//                 size: 0.2,
//                 height: 0.1,
//                 curveSegments: 0.01,
//             });
//             let skillMesh = new THREE.Mesh(geometry, colorSkill);

//             skillMesh.position.set(plane.geometry.vertices[index].x, plane.geometry.vertices[index].y, plane.geometry.vertices[index].z);
//             plane.add(skillMesh)
//         });
//     }
// }

// Sphere vertices alignement
function alignTextOnSphereVertices() {

    // SI position différente on rapproche lelement dans animate par tranche de 0.1
    for (let index = 0; index < skillsArray.length; index++) {

        var tween = new TWEEN.Tween(sphere.children[index].position)
            .to({ y: sphereVerticesArray[index].y, x: sphereVerticesArray[index].x, z: sphereVerticesArray[index].z }, 1000)
            // .delay(500)
            .onComplete(function () {
                sphere.children[index].position
            })
            .start();
    }

}

// Sphere vertices alignement
function alignText() {
    // On réinitialise la rotation de la sphere
    sphere.rotation.y = 0;
    sphere.rotation.x = 0;

    // On aligne les elements l'un en dessous l'autre
    for (let index = 0; index < skillsArray.length; index++) {
        // Changer la position
        var tween = new TWEEN.Tween(sphere.children[index].position)
            .to({ x: planeVerticesArray[index].x, y: planeVerticesArray[index].y, z: planeVerticesArray[index].z }, 1000)
            // .delay(500)
            .onComplete(function () {
                // sphere.children[index].position
            })
            .start();
    }
}

// Change Text Position onclick
function changeGeometry() {

    // On stop ou relance la rotation de la sphere
    if (sphereIsAnimate) {
        alignText();
        sphereIsAnimate = false;
    } else {
        alignTextOnSphereVertices();
        sphereIsAnimate = true;
    }
}

//----------------------------------------------------------------- 
// INIT
function init() {
    createTextElements();
};

scene.add(sphere);

//----------------------------------------------------------------- 
// ANIMATE

var animate = function (time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);

    // Sphere Animation
    if (sphereIsAnimate) {
        console.log(sphere.rotation.y)
        console.log(sphere.rotation.x)

        sphere.rotation.y += 0.01;
        sphere.rotation.x += 0.01;
    }


    // Sphere Children LookAt Camera position
    if (sphere) {
        for (let index = 0; index < sphere.children.length; index++) {
            sphere.children[index].lookAt(camera.position)
            // console.log(sphere.children[0].position)
        }
    }


    renderer.render(scene, camera);
}



//----------------------------------------------------------------- 
// LISTENER
renderer.domElement.addEventListener("click", changeGeometry, true);

//----------------------------------------------------------------- 
// START FUNCTIONS

init();
animate();