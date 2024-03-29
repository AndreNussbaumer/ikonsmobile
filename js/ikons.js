let ikons = []
let lasers = []

class Ikon {

  constructor(x, y, r, m) {

    this.pos = new Vector(x,y)
    this.acc = new Vector(0,0)
    this.vel = new Vector(0,0)
    this.r = r
    this.m = m; if(this.m === 0){ this.inv_m = 0 } else { this.inv_m = 1 / this.m; }
    this.img = topIkon
    this.elasticity = 1
    this.acceleration = 0.4
    this.angle = 0
    this.stickAngle = 0
    this.lockedAngle = 0
    this.rotation = 0
    this.hp = 60
    ikons.push(this)

  }

  drawIkon() {

    /*
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(this.pos.x + this.vel.x * 100, this.pos.y + this.vel.y * 100)
    ctx.strokeStyle = "rgba(255, 155, 55, 0.5)"
    ctx.lineWidth = 20
    ctx.stroke()
    ctx.closePath()
    */

    ctx.save()
    ctx.translate(this.pos.x, this.pos.y)
    ctx.rotate(this.rotation)
    ctx.translate(-this.pos.x, -this.pos.y)
    ctx.drawImage(this.img, this.pos.x - this.img.width/2, this.pos.y - this.img.height/2)
    ctx.restore()

    ctx.save()
    healthBar(this.pos.x - 50, this.pos.y -40, 100, 10, this.hp, 100)
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.pos.x - 50, this.pos.y - 55, this.shieldTime, 10)
    ctx.restore()

    ctx.drawImage(sprites.shadowikon, this.pos.x - this.img.width/2 + 20, this.pos.y - this.img.height/2 + 20)
  }

  controls() {

    // joystick

    if(mobile){

      if(touchStarting){
        this.acc.x = this.acceleration * joystick.dx
        this.acc.y = this.acceleration * joystick.dy
      }

      if(!touchStarting){
        this.acc.y = 0
        this.acc.x = 0
      }

      } else {

      if(LEFT){
        this.acc.x =- this.acceleration
      }

      if(UP){
        this.acc.y =- this.acceleration
      }

      if(RIGHT){
        this.acc.x = this.acceleration
      }

      if(DOWN){
        this.acc.y = this.acceleration
      }

      if(!LEFT && !RIGHT){
          this.acc.x = 0;
      }

      if(!UP && !DOWN){
          this.acc.y = 0;
      }
    }

    // keyboard

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

  updatePosition() {

    this.acc = this.acc.unit().mult(this.acceleration)
    // Ikons acceleration + velocity
    this.vel = this.vel.add(this.acc)
    // Ikons friction
    this.vel = this.vel.mult(1-friction)
    // Position for COLLISIONS
    this.pos = this.pos.add(this.vel)

  }

  collisions() {

    enemies.forEach((enemy) => {
    if(col_det_bb(this, enemy)){
      pen_res_bb(this, enemy)
      col_res_bb(this, enemy)
       }
     })
    }

  direction() {

    let opposite = angle.y - this.pos.y
    let adjacent = angle.x - this.pos.x

    this.angle = Math.atan2(opposite, adjacent)

    this.stickAngle = Math.atan2(this.vel.y, this.vel.x)

  }

  lockingTarget() {


    /*
    enemies.forEach((enemy, i) => {
      if(visibleEnemy){
        if(getDistanceObj(this, enemy) < 400 && !enemy.locked && lockedEnemy == undefined){
          enemy.locked = true
        }
      }
    })
*/
    for(let i = 0; i < enemies.length; i++){

      let lockedEnemy = enemies.find(enemy => enemy.locked)

      let enemy = enemies[i]

      if(enemy.visible){
        if(!lockedEnemy){
          enemy.locked = true
        }
      }
    }
  }


  shoot() {

    let found = enemies.find(enemy => enemy.locked)

    if(this.shooting && found == undefined){

      lasers.push(new Lasers(this.pos.x, this.pos.y, this.stickAngle))

    } else if(this.shooting && found){

      let opp = found.pos.y - this.pos.y
      let adj = found.pos.x - this.pos.x

      this.lockedAngle = Math.atan2(opp, adj)

      lasers.push(new Lasers(this.pos.x, this.pos.y, this.lockedAngle))
    }

    this.shooting = false
  }

}

let Hero = new Ikon(1010, 510, 14, 10)

function heroFunctions() {

  ikons.forEach((ikon) => {

    ikon.drawIkon()
    ikon.collisions()
    ikon.updatePosition()
    ikon.direction()
    ikon.lockingTarget()
    ikon.shoot()
    ikon.controls()
    ikon.rotating()

  })
}
