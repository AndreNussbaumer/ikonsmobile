
const topIkon = new Image()
topIkon.src = "images/junkarmortop.png"



let sprites = {}
let assetsStillLoading = 0

const loadingText = document.getElementById('loadingText')
const pressToPlay = document.getElementById('pressToPlay')

function assetsLoadingLoop(callback) {

  if(assetsStillLoading) {
    pressToPlay.style.display = 'none'
    loadingText.style.display = 'flex'
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    loadingText.style.display = 'none'
    pressToPlay.style.display = 'flex'
    requestAnimationFrame(mainLoop)
  }
}

function loadAssets(callback) {

  function loadSprite(fileName) {

    assetsStillLoading++

    let spriteImage = new Image()
    spriteImage.src = "images/" + fileName

    spriteImage.onload = function() {
      assetsStillLoading--
    }
    return spriteImage
  }

  sprites.stone = loadSprite("stone.png")
  sprites.trunk = loadSprite("trunk.png")
  sprites.shadowikon = loadSprite("shadow.png")
  sprites.shadowsbg = loadSprite("shadows.png")
  sprites.background = loadSprite("bg.png")

  assetsLoadingLoop(callback)

}
