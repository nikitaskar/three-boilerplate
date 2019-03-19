import {
	ShaderLib,
	MeshPhongMaterial,
	UniformsUtils
} from 'three'

import vert from '../shaders/sphere/vert.glsl'
import frag from '../shaders/sphere/frag.glsl'

export default class SphereMaterial extends MeshPhongMaterial {
	  constructor(parameters) {
		super(parameters)
		this.type = 'PhongMaterial'
		this.vertexShader = vert
		this.fragmentShader = frag
		
		this.set()
	}

	set = () => {
		this.uniforms = {
			...UniformsUtils.clone(ShaderLib.phong.uniforms)
		}
	}

	reset = () => {

	}

	update = () => {

	}
}