'use strict'
import Avator from './Avator'
import ColorChanger from './ColorChanger'
// XXX: 'BirdAvator' isn't an Avator anymore so better to use composition

const _img = new Image()
_img.src = 'img/tori.png'
class BirdAvator extends Avator { static randomBetween (from, to) { return from + Math.floor(Math.random() * (to - from))
}

static getImage (destColor) {
  if (BirdAvator._colorChanger == null) {
    BirdAvator._colorChanger = new ColorChanger()
  }
  const targetColor = [0, 255, 255]
  if(destColor == null) {
    destColor = [
      BirdAvator.randomBetween(0, 255),
      BirdAvator.randomBetween(0, 255),
      BirdAvator.randomBetween(0, 255)
    ]
  }
  return BirdAvator._colorChanger.getModifiedImage(_img, targetColor, destColor)
}

static setChangeColorHandler (f) {
  this._changeColorHandler = f
}

static init (color) {
  const elem = document.createElement('div')
  elem.classList.add('bird', 'avator')
  elem.style.position = 'absolute'
  const img = document.createElement('img')
  img.setAttribute('width', '20px')
  img.setAttribute('height', '20px')
  img.setAttribute('src', BirdAvator.getImage(color))
  elem.appendChild(img)
  return elem
}

static render (elem) {
  const posHist = this.positionHistory
  let range = 0
  let sumX = 0
  let sumY = 0
  for (let i = 0, len = posHist.length; i < len; i++) {
    const pos = posHist[i]
    range += 1 / (i + 1)
    sumX += pos.x / (i + 1)
    sumY += pos.y / (i + 1)
  }
  const aveX = sumX / range
  // let a bird jump
  const angle = Math.PI * ++this._count / this._tick * 1.0
  const offsetY = Math.abs(10 * Math.sin(angle))
  const aveY = (sumY / range) - offsetY
  if (this._count % this._tick === 0) this._count = 0

  let transform = `translate(${aveX}px, ${aveY}px)`
  if (aveX < this.x) {
    transform += ' scaleX(-1)'
  }
  elem.style.setProperty('transform', transform)
  elem.style.zIndex = this.y + 35
}

constructor ({x, y, callback} = {x: 0, y: 0}) {
  x = x != null ? x : 0
  y = y != null ? y : 0
  const destColor = [
    BirdAvator.randomBetween(0, 255),
    BirdAvator.randomBetween(0, 255),
    BirdAvator.randomBetween(0, 255)
  ]
  super({x, y, init: BirdAvator.init.bind(null, destColor), render: BirdAvator.render})
  this._tick = 30
  this._count = BirdAvator.randomBetween(0, this._tick)
  if (BirdAvator._changeColorHandler) {
    BirdAvator._changeColorHandler(destColor)
  }
}
}
export default BirdAvator
