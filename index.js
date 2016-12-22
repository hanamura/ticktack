'use strict'

const EventEmitter = require('eventemitter2').EventEmitter2

let tick = null;

module.exports = class Tick extends EventEmitter {
  get requestAnimationFrame() {
    return this._raf
  }

  constructor() {
    super(...arguments)

    this._id   = null
    this._tick = this._tick.bind(this)

    try {
      this._request = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame
      ).bind(window)
      this._cancel = (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame
      ).bind(window)
      this._raf = true
    } catch (e) {
      this._request = f => setTimeout(f, 1000 / 60)
      this._cancel  = i => clearTimeout(i)
      this._raf     = false
    }
  }

  on() {
    const _ = super.on(...arguments)

    if (this._id) return _
    if (!this.listeners('tick')) return _

    this._id = this._request(this._tick)

    return _
  }

  off() {
    const _ = super.off(...arguments)

    if (!this._id) return _
    if (this.listeners('tick').length) return _

    this._cancel(this._id)
    this._id = null

    return _
  }

  _tick() {
    this._id = this._request(this._tick)
    this.emit('tick', this, new Date)
  }
}
