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

// -----------------------------------------------------------------
// CAMERA
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
if (window.innerWidth < 1024) {
    camera.position.set(0, 0, 50);
} else {
    camera.position.set(0, 0, 35);
}


// -----------------------------------------------------------------
// SCENE

var scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// -----------------------------------------------------------------
// TOOLS

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.update();
controls.enableDamping = true;
controls.dampingFactor = 0.08;

// -----------------------------------------------------------------
// LIGHT

var light = new THREE.AmbientLight('white'); // soft white light
scene.add(light);

//----------------------------------------------------------------- 
// FUNCTIONS

var skillsArray = [
    {
        name: 'Html5'
    },
    {
        name: 'Css3'
    },
    {
        name: 'Sass'
    },
    {
        name: 'Bootstrap'
    },
    {
        name: 'Javascript'
    },
    {
        name: 'ReactJs'
    },
    {
        name: 'Redux'
    },
    {
        name: 'NodeJs'
    },
    {
        name: 'Symfony'
    },
    {
        name: 'AngularJs'
    },
    {
        name: 'Cakephp'
    },
    {
        name: 'Codeigniter'
    },
    {
        name: 'Three.js'
    },
    {
        name: 'mysql'
    },
    {
        name: 'php'
    },
    {
        name: 'Wordpress'
    },
    {
        name: 'Git'
    },
    {
        name: 'Gitlab'
    },
    {
        name: 'Github'
    },
    {
        name: 'Linux'
    },
    {
        name: 'Windows'
    },
    {
        name: 'React Native'
    },
    {
        name: 'Electron'
    },
    {
        name: 'Agile'
    },
    {
        name: 'Merise'
    },
];


//----------------------------------------------------------------- 
// Sphere
var radius = 5;
var widthSegments = 6;
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
var sphereIsAnimate = true;

// Plane
var planeGeometry = new THREE.PlaneGeometry(7, 4, 4, 4);
var plane = new THREE.Mesh(planeGeometry, material);
var planeVerticesArray = plane.geometry.vertices;
scene.add(plane);

// Create Text Elements
function createTextElements() {
    const colorSkill = new THREE.MeshPhongMaterial({ color: 'white' });
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
    // On réinitialise la position de la caméra
    controls.reset()
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
        sphere.rotation.y += 0.01;
        sphere.rotation.x += 0.01;
    }


    // Sphere Children LookAt Camera position
    if (sphere) {
        for (let index = 0; index < sphere.children.length; index++) {
            sphere.children[index].lookAt(camera.position)
        }
    }

    renderer.render(scene, camera);
}

//----------------------------------------------------------------- 
// RESIZE

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//----------------------------------------------------------------- 
// LISTENER
window.addEventListener('click', changeGeometry, false);
window.addEventListener('resize', onWindowResize, false);
//----------------------------------------------------------------- 
// START FUNCTIONS

init();
animate();