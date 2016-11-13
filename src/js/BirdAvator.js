import Avator from './Avator'
// XXX: 'BirdAvator' isn't an Avator anymore so better to use composition

class ColorChanger {
  constructor () {
    this._canvas = document.createElement('canvas')
  }
}

function changeColor (img, srcColor, destColor) {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const image = document.getElementById('testImage')
  ctx.drawImage(image, 0, 0)
  const imgd = ctx.getImageData(0, 0, 128, 128)
  const pix = imgd.data

  // Loops through all of the pixels and modifies the components.
  for (let i = 0, n = pix.length; i < n; i += 4) {
    pix[i] = destColor[0]   // Red component
    pix[i + 1] = destColor[1] // Blue component
    pix[i + 2] = destColor[2] // Green component
    // pix[i+3] is the transparency.
  }

  ctx.putImageData(imgd, 0, 0)

  const savedImageData = document.getElementById('imageData')
  savedImageData.src = canvas.toDataURL('image/png')
}

class BirdAvator extends Avator {
  static randomBetween (from, to) {
    return from + Math.floor(Math.random() * (to - from))
  }
  static init () {
    const elem = document.createElement('div')
    elem.classList.add('bird', 'avator')
    elem.style.position = 'absolute'
    const img = document.createElement('img')
    img.setAttribute('width', '20px')
    img.setAttribute('height', '20px')
    img.setAttribute('src', 'img/tori.png')
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
    elem.style.zIndex = this.y + 25
  }
  constructor ({x, y} = {x: 0, y: 0}) {
    x = x != null ? x : 0
    y = y != null ? y : 0
    super({x, y, init: BirdAvator.init, render: BirdAvator.render})
    this._tick = 30
    this._count = BirdAvator.randomBetween(0, this._tick)
  }
}
export default BirdAvator
