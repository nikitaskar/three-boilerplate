import * as THREE from 'three'

export default class PostProcessing {
	constructor(renderer, renderTarget, renderScene, renderCam) {
		this.passes = []

		this.parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		}

		this.renderer = renderer
		this.size = this.renderer.getDrawingBufferSize()


		if (renderTarget === null) {
			renderTarget = new THREE.WebGLRenderTarget(
				this.size.width, this.size.height, this.parameters
			)
		}

		this.renderTarget1 = renderTarget
		this.renderTarget2 = this.renderTarget1.clone()

		this.writeBuffer = this.renderTarget1
		this.readBuffer = this.renderTarget2

		this.renderScene = renderScene
		this.renderCam = renderCam
	}

	swapBuffers() {
		let tmp = this.readBuffer
		this.readBuffer = this.writeBuffer
		this.writeBuffer = tmp
	}

	addPass(pass) {
		this.passes.push(pass)
	}

	render() {
		if (this.passes.length) {
			this.renderer.render(this.renderScene, this.renderCam, this.writeBuffer, false)
			this.swapBuffers()
			for (let i = 0; i < this.passes.length; i++) {
				const pass = this.passes[i]
				pass.render(this.renderer, this.readBuffer, this.writeBuffer)

				this.swapBuffers()
			}
		} else {
			this.renderer.render(this.renderScene, this.renderCam)
		}
	}
}