let lasers = []

class Lasers {

  constructor(x, y, angle) {

    this.pos = new Vector(x, y)
    this.parent = false
    this.spdX = Math.cos(angle) * 8
    this.spdY = Math.sin(angle) * 8
    this.timer = 0
    this.toRemove = false
    this.radius = 6

  }

  updatePosition() {

    // this.power = Math.floor((Math.random() * Ikon1.power) + Ikon1.naturalPower)

    this.pos.x += this.spdX
    this.pos.y += this.spdY

    if(this.timer++ > 100){
      this.toRemove = true
    }

    /*
    enemies.forEach((enemy) => {

      enemy.hit = false

      if(getDistance(this, Ikon1) < 30 && this.parent !== Ikon1.id ) {
        enemy.hit = true
        this.toRemove = true
    })
    */
  }
}

function laserUpdate() {

  lasers.forEach((laser, index) => {

    if(laser.toRemove){
      lasers.splice(index, 1)
    } else {
      ctx.beginPath();
      ctx.arc(laser.pos.x, laser.pos.y, laser.radius, 0, 2 * Math.PI)
      ctx.fillStyle = "blue"
      ctx.fill()
      laser.updatePosition()
    }
  })
}
