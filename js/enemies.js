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
    this.rotation = 0
    this.locked = false
    this.visible = false
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

  rotating() {

    if(this.acc.x == 0 && this.acc.y == 0){
      this.rotation = this.rotation += 0.05
      if(this.rotation >= 360){
        this.rotation = 0
      }
    } else {
      this.rotation += 1
    }

  }

  lockedTarget() {

    if(!this.visible){
      this.locked = false
    }

    if(this.locked){
      ctx.save()
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 25, 0, 0.5)"
      ctx.lineWidth = 2;
      ctx.arc(this.pos.x, this.pos.y, this.r + 40, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()

      ctx.save()
      ctx.translate(this.pos.x, this.pos.y)
      ctx.rotate(this.rotation)
      ctx.translate(-this.pos.x, -this.pos.y)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 25, 0, 0.5)"
      ctx.lineWidth = 10;
      ctx.arc(this.pos.x, this.pos.y, this.r + 40, 0, 10, 90)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()

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

  visibility() {

    if(this.pos.x + this.r > MainCamera.pos.x || this.pos.y + this.r > MainCamera.pos.y && !this.visible){
      this.visible = true
    }

    if(this.pos.x + this.r < MainCamera.pos.x || this.pos.y + this.r < MainCamera.pos.y && this.visible){
      this.visible = false
    }

    if(this.visible){
      new EnemyDisplay(620, 20 * 30, 100, 25, 'rgba(255,0,0,1)')
    }

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
      enemy.rotating()
      enemy.lockedTarget()
      enemy.life()
      enemy.visibility()
    }
  })
}

enemiesDisplay = []

class EnemyDisplay {

  constructor(x, y, width, height, rgba) {

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.rgba = rgba
    enemiesDisplay.push(this)

  }

  draw(i, name) {
    ctx.save()
    box(this.x, this.y + i * 30, this.width, this.height, this.rgba)
    ctx.font = "16px Arial"
    ctx.fillText(name, 630, 40 + i * 30)
    ctx.restore()
    /*
    if(clickInside(this)){

      console.log('clicked')
    }
    */
  }
}

function displayEnemies() {
  enemiesDisplay.forEach((enemy, i) => {
    if(enemy.visible){
      enemy.draw(i, enemy.name)
    } else {
      enemiesDisplay.splice(i, 1)
    }
  })

}


let antiHero = new Enemy(630, 230, 20, 10, 'Enemy 1')

let antiHero1 = new Enemy(430, 130, 30, 5, 'Enemy 2')

let antiHero2 = new Enemy(400, 80, 25, 5, 'Enemy 3')
