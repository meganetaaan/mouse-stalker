'use strict'
import 'babel-polyfill'
import BirdAvator from './BirdAvator'
const container = document.getElementsByTagName('body')[0]
const avators = []
const STEP_SIZE = 1
let posHist = []
const accs = []
container.addEventListener('contextmenu', (context) => {
  context.preventDefault()
  moveStrategyStr = moveStrategyStr === 'strict' ? 'moderate' : 'strict'
})
container.addEventListener('click', (context) => {
  const avator = new BirdAvator({x: context.pageX, y: context.pageY})
  avator.bind(container)
  avators.splice(0, 0, avator)
  const acc = {
    dA: BirdAvator.randomBetween(10, 30) / 100.0,
    maxVx: 3,
    maxVy: 3,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0
  }
  accs.splice(0, 0, acc)
})
let moveStrategyStr = 'strict'
const moveStrategy = {
  strict: function (i, avator) {
    const idx = Math.max(0, posHist.length - i * 10 - 1)
    const pos = posHist[idx]
    avator.moveTo(pos.x, pos.y)
  },
  moderate: function (i, avator) {
    const pos = i === 0 ? posHist[posHist.length - 1] : avators[i - 1]
    const acc = accs[i]
    let dx = pos.x - avator.x
    let dy = pos.y - avator.y
    acc.ax = dx !== 0 ? (dx > 0 ? acc.dA : -acc.dA) : 0
    acc.vx = Math.abs(dx) < 5 && Math.abs(acc.vx) < 3
      ? 0
      : Math.max(-acc.maxVx, Math.min(acc.maxVx, acc.vx + acc.ax))
    acc.ay = dy !== 0 ? (dy > 0 ? acc.dA : -acc.dA) : 0
    acc.vy = Math.abs(dy) < 5 && Math.abs(acc.vy) < 3
      ? 0
      : Math.max(-acc.maxVy, Math.min(acc.maxVy, acc.vy + acc.ay))
    avator.moveBy(acc.vx, acc.vy)
  }
}

function loop(){
  // const pos = posHist[posHist.length - 1]
  for (let i = 0, len = avators.length; i < len; i++) {
    const avator = avators[i]
    const func = moveStrategy[moveStrategyStr]
    func(i, avator)
  }
}

window.setInterval(loop, 15);
container.addEventListener('mousemove', (context) => {
  posHist.push({x: context.pageX, y: context.pageY})
  posHist = posHist.slice(-10 * avators.length)
})

BirdAvator.setChangeColorHandler((color) => {
  const highlight = document.getElementsByClassName('highlight')[0]
  highlight.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
})

// logo z-index
function resetZIndex () {
  for (const className of ['logo', 'description']) {
    const elem = document.getElementsByClassName(className)[0]
    elem.style.zIndex = Math.round(Number(elem.getBoundingClientRect().bottom))
  }
}

window.addEventListener('resize', resetZIndex)
resetZIndex()
