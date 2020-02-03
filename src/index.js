// lodash might not be necessary
import _ from 'lodash';

import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

var scene;
var camera;
var canvas;
var renderer;
var cube;

function init() {
    setupScene();
    animate();

    window.addEventListener('resize', onWindowResize, false);
}

function setupScene() {
    scene = new THREE.Scene();
    setupLights(scene);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    canvas = document.createElement( 'canvas' );
    var context = canvas.getContext( 'webgl2', { alpha: false } );
    renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    //var material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    scene.add(cube);

    camera.position.z = 5;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    webglRenderer.setSize(window.innerWidth, window.innerHeight);

    canvas.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}

function setupLights(scene) {
    // LIGHTS
    scene.add(new THREE.AmbientLight(0x666666));

    var light;

    light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(300, 400, 50);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;
    light.shadowCameraVisible = true;

    light.shadowMapWidth = 512;
    light.shadowMapHeight = 512;

    var d = 200;

    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;

    light.shadowCameraFar = 1000;
    light.shadowDarkness = 0.2;

    scene.add(light);
}

// Once everything is loaded, let's run this thing :) !
if ( WEBGL.isWebGL2Available() === false ) {
    document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
} else {
    console.debug('Let\'s rock \'n roll!');
    init();
}
