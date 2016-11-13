'use strict'
import BirdAvator from './BirdAvator'
const container = document.getElementsByTagName('body')[0]
const avators = []
let posHist = []
container.addEventListener('click', (context) => {
  const avator = new BirdAvator({x: context.pageX, y: context.pageY})
  avator.bind(container)
  avators.splice(0, 0, avator)
})
container.addEventListener('mousemove', (context) => {
  posHist.push({x: context.pageX, y: context.pageY})
  posHist = posHist.slice(-10 * avators.length)
  for (let i = 0, len = avators.length; i < len; i++) {
    const idx = Math.max(0, posHist.length - i * 10 - 1)
    const pos = posHist[idx]
    avators[i].moveTo(pos.x, pos.y)
  }
})

// logo z-index
for (const className of ['logo', 'description']) {
  const elem = document.getElementsByClassName(className)[0]
  console.log(elem.getBoundingClientRect().bottom)
  elem.style.zIndex = Math.round(Number(elem.getBoundingClientRect().bottom))
}
