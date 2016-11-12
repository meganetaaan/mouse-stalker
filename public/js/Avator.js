window.sample = window.sample || {}
;(function (namespace) {
  class Avator {
    static _loop () {
      Avator.isLooping = true
      Avator.__raf()
      window.requestAnimationFrame(Avator._loop)
    }
    static __raf () {
      const func = function (funcs) {
        Avator.current = Date.now()
        if (Avator.prev && Avator.current - Avator.prev < 15) {
          return
        }
        Avator.prev = Avator.current
        for (const f of funcs) {
          f()
        }
      }.bind(null, Avator._functions)
      Avator._functions = []
      window.requestAnimationFrame(func)
    }
    static _raf (f) {
      Avator._functions.push(f)
    }
    constructor ({x, y, init, render}) {
      this.x = x != null ? x : 0
      this.y = y != null ? y : 0
      this._init = init != null ? init : () => { return document.createElement('div') }
      this._render = render != null ? render : () => {}
      this._elem = this._init()
      this._positionHistory = []
      this._positionHistory.push({x: this.x, y: this.y})
      if (Avator._functions == null) {
        Avator._functions = []
      }
      if (!Avator.isLooping) {
        // TODO: stop looping when no Avator exists
        Avator._loop()
      }
    }
    bind (container) {
      container.appendChild(this._elem)
      setTimeout(this.render.bind(this), 0)
      // Avator._raf(this.render.bind(this))
    }
    render () {
      this._render(this._elem)
    }
    unbind () {
      const parent = this._elem.parentElement
      if (parent) parent.removeChild(this._elem)
    }
    dispose () {
      // TODO: dispose
    }
    moveTo (x, y) {
      if (this._positionHistory.length >= 10) {
        this._positionHistory.shift()
      }
      this._positionHistory.push({x: this.x, y: this.y})
      this.x = x
      this.y = y
      Avator._raf(this.render.bind(this))
    }
    moveBy (dx, dy) {
      this.moveTo(this.x + dx, this.y + dy)
    }
    get positionHistory () {
      return this._positionHistory
    }
  }
  namespace.Avator = Avator
})(window.sample)
