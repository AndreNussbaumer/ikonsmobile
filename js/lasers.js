
class Lasers {

  constructor(x, y, angle) {

    this.pos = new Vector(x, y)
    this.acc = new Vector(0,0)
    this.vel = new Vector(0,0)
    this.m = 10; if(this.m === 0){ this.inv_m = 0 } else { this.inv_m = 1 / this.m; }
    this.elasticity = 1
    this.parent = false
    this.spdX = Math.cos(angle) * 8
    this.spdY = Math.sin(angle) * 8
    this.timer = 0
    this.toRemove = false
    this.r = 6
    this.acceleration = 1

  }

  updatePosition() {

    // this.power = Math.floor((Math.random() * Ikon1.power) + Ikon1.naturalPower)

    this.acc.x = this.acceleration * this.spdX
    this.acc.y = this.acceleration * this.spdY

    this.acc = this.acc.unit().mult(this.acceleration)
      // Ikons acceleration + velocity
    this.vel = this.vel.add(this.acc)
        // Ikons friction
    this.vel = this.vel.mult(1-friction)
        // Position for COLLISIONS
    this.pos = this.pos.add(this.vel)

    if(this.timer++ > 100){
      this.toRemove = true
    }

    obstacles.forEach((obstacle, i) => {
      if(col_det_mo(this, obstacle)){
        this.toRemove = true
      }
    })

    enemies.forEach((enemy) => {

      enemy.hit = false

      if(getDistanceObj(this, enemy) < 30) {
        enemy.hit = true
        this.toRemove = true
      }

    })
  }
}

function laserUpdate() {

  lasers.forEach((laser, index) => {

    if(laser.toRemove){
      lasers.splice(index, 1)
    } else {
      ctx.beginPath();
      ctx.arc(laser.pos.x, laser.pos.y, laser.r, 0, 2 * Math.PI)
      ctx.fillStyle = "blue"
      ctx.fill()
      laser.updatePosition()
    }
  })
}
