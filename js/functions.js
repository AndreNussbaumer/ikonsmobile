

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

function getDistanceObj(pt1, pt2) {
  return Math.sqrt(Math.pow(pt1.pos.x - pt2.pos.x, 2) + Math.pow(pt1.pos.y - pt2.pos.y, 2))
}

function shoot() {
  Hero.shooting = true
}

function checkLocks() {
  return enemies.locked
}

// Healthbar

function healthBar(x, y, width, height, health, max_health) {
  if(health >= max_health){
    health = max_health
  }
  if(health <= 0){
    health = 0
  }
  ctx.fillStyle = '#000'
  ctx.fillRect(x,y,width,height)
  let colorNumber = Math.round((1-(health/max_health))*0xff)*0x10000+Math.round((health/max_health)*0xff)*0x100
  let colorString = colorNumber.toString(16)
  if(colorNumber >= 0x100000){
    ctx.fillStyle = '#'+colorString
  } else if(colorNumber << 0x100000 && colorNumber >= 0x10000){
    ctx.fillStyle = '#0'+colorString
  } else if(colorNumber<< 0x10000){
    ctx.fillStyle = '#00'+colorString
  }
  ctx.fillRect(x, y,(health/max_health)*(width),height)
}
