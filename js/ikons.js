let ikons = []


class Ikon {

  constructor(x, y, r, m) {

    this.pos = new Vector(x,y)
    this.acc = new Vector(0,0)
    this.vel = new Vector(0,0)
    this.r = r
    this.m = m; if(this.m === 0){ this.inv_m = 0 } else { this.inv_m = 1 / this.m; }
    this.elasticity = 1
    this.acceleration = 0.7
    this.angle = 0
    this.stickAngle = 0
    ikons.push(this)

  }

  drawIkon() {

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = "green"
    ctx.fill()

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

    ikons.forEach((ikon) => {
      if(col_det_bb(this, ikon)){
        pen_res_bb(this, ikon)
        col_res_bb(this, ikon)
      }
    })
  }

  direction() {

    let opposite = angle.y - this.pos.y
    let adjacent = angle.x - this.pos.x

    this.angle = Math.atan2(opposite, adjacent)

    this.stickAngle = Math.atan2(this.vel.y, this.vel.x)
  }

  shoot() {

    if(this.shooting){
      lasers.push(new Lasers(this.pos.x, this.pos.y, this.stickAngle))
    }

    this.shooting = false

  }


}

let Hero = new Ikon(510, 210, 20, 10)

let antiHero = new Ikon(630, 230, 20, 10)

let antiHero1 = new Ikon(430, 130, 30, 15)

function heroFunctions() {

  ikons.forEach((ikon) => {
    ikon.drawIkon()
    ikon.collisions()
    ikon.updatePosition()
    ikon.direction()
    ikon.shoot()
  })

  Hero.controls()

}
