window.sample = window.sample || {}
;(function (namespace) {
  const BirdAvator = namespace.BirdAvator
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
})(window.sample)
