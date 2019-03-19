class Raf {
	constructor() {
		this.callbacks = []
		this.play()
		this.update()
	}

	add = (callback) => {
		this.callbacks.push(callback)
	}

	remove = (callback) => {
		let removeId = this.callbacks.indexOf(callback)

		if (this.remove < 0) return
		this.callbacks.splice(removeId, 1)
	}

	play = () => {
		this.playing = true
	}

	stop = () => {
		this.playing = false
	}

	update = () => {
		requestAnimationFrame(this.update)
		if (this.playing) {
			for (let i = 0; i < this.callbacks.length; i++) {
				this.callbacks[i].call()
			}
		}
	}
}

export default new Raf()