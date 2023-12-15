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
