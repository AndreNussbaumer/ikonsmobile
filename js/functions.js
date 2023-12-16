function responsiveCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function toggleFullscreen() {

  if (!document.fullscreenElement) {
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

function shoot() {
  Hero.shooting = true
}
