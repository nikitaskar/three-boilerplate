import EventEmitter from './EventEmitter'

class Viewport {
	constructor() {
		this.set()
	}

	set() {
		this.bind()

		this.width = window.innerWidth
		this.height = window.innerHeight
		this.ratio = this.width / this.height
	}

	bind = () => {
		window.addEventListener('resize', this.resize)
	}

	unbind = () => {
		window.removeEventListener('resize', this.resize)
	}

	reset() {
		this.unbind()

		this.width = null
		this.height = null
		this.ratio = null
	}

	resize = () => {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.ratio = this.width / this.height
		EventEmitter.emit('resize', {
			width: this.width,
			height: this.height,
			ratio: this.ratio
		})
	}
}

export default new Viewport()