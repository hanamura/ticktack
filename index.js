var EventEmitter = require('eventemitter2').EventEmitter2;

function Tick() {
  EventEmitter.apply(this, Array.prototype.slice.apply(arguments));
  try {
    this._request = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame
    ).bind(window);
    this._cancel = (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame
    ).bind(window);
    this._raf = true;
  } catch (e) {
    this._request = function(f) { return setTimeout(f, 1000 / 60) };
    this._cancel  = function(i) { clearTimeout(i) };
    this._raf     = false;
  }
}

Tick.prototype = Object.create(EventEmitter.prototype, {
  requestAnimationFrame: {
    get: function() { return this._raf },
  },
});

Tick.prototype.on = function() {
  var _ = EventEmitter.prototype.on.apply(this, Array.prototype.slice.call(arguments));
  if (this._id) {
    return _;
  }
  if (!this.listeners('tick')) {
    return _;
  }
  this._id = this._request(this._onTick.bind(this));
  return _;
};

Tick.prototype.off = function() {
  var _ = EventEmitter.prototype.off.apply(this, Array.prototype.slice.call(arguments));
  if (!this._id) {
    return _;
  }
  if (this.listeners('tick').length) {
    return _;
  }
  this._cancel(this._id);
  this._id = null;
  return _;
};

Tick.prototype._onTick = function() {
  this._id = this._request(this._onTick.bind(this));
  this.emit('tick', this, new Date);
};

module.exports = Tick;
