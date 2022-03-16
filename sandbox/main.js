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
      200
    );
    this._camera.position.set(0, 5, 80);
    // this._camera.rotation.set(0, 0, 0);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x202020,
      })
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 100, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
      })
    );
    ceiling.castShadow = true;
    ceiling.receiveShadow = false;
    ceiling.rotation.x = -Math.PI / 2;
    ceiling.position.set(0, 10, 0);
    this._scene.add(ceiling);

    let light = new THREE.AmbientLight(0xffffff, 0.5);
    this._scene.add(light);

    this._CreateWalls();

    let rectLight = new THREE.RectAreaLight(0xffffff, 20, 2, 10);
    rectLight.position.set(0, 3, 40);
    rectLight.lookAt(0, 0, 0);
    this._scene.add(rectLight);

    this._RAF();
  }

  _CreateWalls() {
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 30),
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
      })
    );
    wall.castShadow = false;
    wall.receiveShadow = true;
    wall.rotation.z = -Math.PI / 2;
    wall.rotation.y = Math.PI;
    wall.position.set(0, 5, -50);
    this._scene.add(wall);
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
