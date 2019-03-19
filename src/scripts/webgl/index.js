import Viewport from '../services/utils/Viewport'
import Raf from '../services/utils/Raf'
import * as THREE from 'three'
import EventEmitter from '../services/utils/EventEmitter';
import SphereMaterial from './materials/SphereMaterial'
import OrbitControls from './controllers/OrbitControls'
import GLTFLoader from './vendors/loaders/GLTFLoader'

class WebGL {
	constructor() {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(50, Viewport.ratio, 0.1, 100)
		this.camera.position.z = 10
		this.cubeMat = new SphereMaterial({
			color: 'red'
		})

		this.controls = new OrbitControls(this.camera)

		this.cubeGeo = new THREE.SphereBufferGeometry(1,16,16)
		this.mesh = new THREE.Mesh(this.cubeGeo, this.cubeMat) 

		// this.scene.add(this.mesh)

		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: true
		})

		this.renderer.setSize(Viewport.width, Viewport.height)
		this.renderer.setPixelRatio(1.7)
		document.body.appendChild(this.renderer.domElement)
		this.set()
		this.preRender()
	}

	set() {
		this.bind()
		this.setLights()

		this.loader = new GLTFLoader()
		this.loader.load('src/assets/head.glb', (gltf)=>{
			let scene = gltf.scene
			scene.traverse((child)=>{
				if(child.isMesh) {
					this.mesh = child
					this.mesh.material = new SphereMaterial()
					this.scene.add(this.mesh)
				}
			})
		})
	}

	setLights() {
		this.light = new THREE.DirectionalLight('0xffffff', 1)
		this.scene.add(this.light)
	}

	reset() {
	}

	bind() {
		EventEmitter.on('resize', this.resize)
	}

	unbind() {
		EventEmitter.removeListener('resize', this.resize)
	}

	resize = (params) => {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	preRender() {
		Raf.add(this.update)
	}

	update = () => {
		this.controls.update()
		this.renderer.render(this.scene, this.camera)
	}
}

export default new WebGL()