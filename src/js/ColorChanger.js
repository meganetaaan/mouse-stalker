'use strict'

class ColorChanger {
  constructor () {
    this._canvas = document.createElement('canvas')
  }
  static isSameColor(r, g, b, target) {
    return r === target[0] && g === target[1] && b === target[2]
  }
  getModifiedImage (img, targetColor, destColor) {
    const canvas = this._canvas
    canvas.width = 20
    canvas.height = 20
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0)
    const imgd = context.getImageData(0, 0, img.width, img.height)
    const pix = imgd.data

    // Loops through all of the pixels and modifies the components.
    for (let i = 0, n = pix.length; i < n; i += 4) {
      if (ColorChanger.isSameColor(pix[i], pix[i + 1], pix[i + 2], targetColor)){
        pix[i] = destColor[0]   // Red component
        pix[i + 1] = destColor[1] // Blue component
        pix[i + 2] = destColor[2] // Green component
        // pix[i+3] is the transparency.
      }
    }
    context.putImageData(imgd, 0, 0)
    return canvas.toDataURL('image/png')
  }
}

export default ColorChanger
