import _ from 'lodash';
import * as THREE from 'three';

function component() {
    const element = document.createElement('div');

    const scene = new THREE.Scene();

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());