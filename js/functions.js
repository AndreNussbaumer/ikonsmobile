

const pressToPlay = document.getElementById('pressToPlay')

function toggleFullscreen() {

  if (!document.fullscreenElement) {

    pressToPlay.style.display = 'none'

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    loadAssets()

    canvas.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      )
    })
  } else {
    document.exitFullscreen();
  }
}

function getDistance(pt1) {
  let pos = { x: mobileX, y: mobileY }
  return Math.sqrt(Math.pow(pt1.x - pos.x, 2) + Math.pow(pt1.y - pos.y, 2))
}

function getDistanceObj(pt1, pt2) {
  return Math.sqrt(Math.pow(pt1.pos.x - pt2.pos.x, 2) + Math.pow(pt1.pos.y - pt2.pos.y, 2))
}

function shoot() {
  Hero.shooting = true
}



function checkLocks() {
  return enemies.locked
}
