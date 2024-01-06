let enemies = []

class Enemy {

  constructor(x, y, r, m, name) {

    this.pos = new Vector(x,y)
    this.acc = new Vector(0,0)
    this.vel = new Vector(0,0)
    this.r = r
    this.m = m; if(this.m === 0){ this.inv_m = 0 } else { this.inv_m = 1 / this.m; }
    this.elasticity = 1
    this.acceleration = 0.7
    this.angle = 0
    this.locked = false
    this.name = name
    this.hp = 10
    this.hit = false
    this.toRemove = false
    enemies.push(this)

  }

  drawEnemy() {

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI)
    healthBar(this.pos.x - 50,this.pos.y -40, 100, 10, this.hp, 100)
    ctx.fillStyle = "yellow"
    ctx.fill()

  }

  updatePosition() {

    this.acc = this.acc.unit().mult(this.acceleration)
    // Ikons acceleration + velocity
    this.vel = this.vel.add(this.acc)
    // Ikons friction
    this.vel = this.vel.mult(1-friction)
    // Position for COLLISIONS
    this.pos = this.pos.add(this.vel)

  }

  direction() {

    let opposite = angle.y - this.pos.y
    let adjacent = angle.x - this.pos.x

    this.angle = Math.atan2(opposite, adjacent)

  }

  life() {
    if(this.hp <= 0){
      this.toRemove = true
    }
  }

  lockedTarget() {

    if(getDistanceObj(this, Hero) > 400){
      this.locked = false
    }

    if(this.locked){

      ctx.beginPath();
      ctx.strokeStyle = "red"
      ctx.arc(this.pos.x, this.pos.y, this.r + 40, 0, 2 * Math.PI)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(Hero.pos.x, Hero.pos.y)
      ctx.lineTo(this.pos.x, this.pos.y)
      ctx.strokeStyle = "rgba(255, 255, 255, 1)"
      ctx.stroke()
      ctx.closePath()
    }

  }


  shoot() {

    if(this.shooting){
      lasers.push(new Lasers(this.pos.x, this.pos.y, this.stickAngle))
    }

    this.shooting = false
  }
}

function enemyFunctions() {

  enemies.forEach((enemy, i) => {
    if(enemy.toRemove){
      enemies.splice(i, 1)
    } else {
      enemy.drawEnemy()
      enemy.updatePosition()
      enemy.direction()
      enemy.shoot()
      enemy.lockedTarget()
      enemy.life()
    }
  })

}

let antiHero = new Enemy(630, 230, 20, 10, 'Enemy 1')

let antiHero1 = new Enemy(430, 130, 30, 5, 'Enemy 2')
