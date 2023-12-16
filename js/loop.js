function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  responsiveCanvas()
  heroFunctions()
  joystick.draw()
  mobileButtons.draw()
  laserUpdate()
  requestAnimationFrame(mainLoop)
}

mainLoop()
