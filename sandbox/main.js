import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

class BasicGallery {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(this._sizes.width, this._sizes.height);
    document.body.appendChild(this._renderer.domElement);

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      75,
      this._sizes.width / this._sizes.height,
      0.1,
      100
    );
    this._camera.position.set(10, 15, 10);

    let light = new THREE.AmbientLight(0xffffff, 4.0);
    this._scene.add(light);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x202020,
      })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._RAF();
  }

  _RAF() {
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => {
      this._RAF();
    });
  }
}

let APP = null;

document.addEventListener("DOMContentLoaded", () => {
  APP = new BasicGallery();
});
