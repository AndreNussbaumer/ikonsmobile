let LEFT, UP, RIGHT, DOWN, SPACE, LEFTCLICK

let angle = 0

let mobileX
let mobileY

// KEYBOARD

canvas.addEventListener('keydown', (e) => {

    if(e.keyCode === 65){
        LEFT = true
    }

    if(e.keyCode === 87){
        UP = true
    }

    if(e.keyCode === 68){
        RIGHT = true
    }

    if(e.keyCode === 83){
        DOWN = true
    }

    if(e.keyCode === 32){

        SPACE = true
    }

})

canvas.addEventListener('keyup', (e) => {


    if(e.keyCode === 65){
        LEFT = false
    }

    if(e.keyCode === 87){
        UP = false
    }

    if(e.keyCode === 68){
        RIGHT = false
    }

    if(e.keyCode === 83){
        DOWN = false
    }

    if(e.keyCode === 32){
        SPACE = false
    }

})



// MOBILE JOYSTICK

class Joystick {

  constructor(x,y,r){

    this.x = x
    this.y = y
    this.r = r

    this.X = x
    this.Y = y
    this.R = r * 2.5

    this.dx = 0
    this.dt = 0

  }

  draw() {

    if(mobile){

      ctx.save()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.beginPath()
      ctx.arc(this.X, this.Y, this.R, 0, Math.PI * 2)
      ctx.strokeStyle = "red"
      ctx.stroke()
      ctx.restore()

    }
  }

}

let positionJoystick = window.innerWidth / 9.1
let positionJoyLeft = window.innerHeight / 1.2

let ratio = window.innerHeight / window.innerWidth


let joystick = new Joystick(positionJoystick, positionJoyLeft, 20)


function boundingCircle() {

  joystick.dx = 0
  joystick.dy = 0

  let ax = joystick.x - joystick.X
  let ay = joystick.y - joystick.Y

  let mag = Math.sqrt(ax**2 + ay**2)

  joystick.dx = ax / mag
  joystick.dy = ay / mag

  if(mag > joystick.R){

    joystick.x = joystick.X + (joystick.dx * joystick.R)
    joystick.y = joystick.Y + (joystick.dy * joystick.R)

  }
}

class MobileButtons {

  constructor(x, y, r){

    this.x = x
    this.y = y
    this.r = r
    this.pressed = false

  }

  draw() {

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = "red"
    ctx.fill()

  }


}

let positionButtons = window.innerWidth / 1.10
let positionButtonsRight = window.innerHeight / 1.2

let mobileButtons = new MobileButtons(positionButtons, positionButtonsRight, 50)

let touchEvent

let touchStarting = false

canvas.addEventListener('touchstart', (e) => {

  if(e.touches[0].clientX < screen.width / 2){

    touchStarting = true

    joystick.x = e.touches[0].clientX
    joystick.y = e.touches[0].clientY

    boundingCircle()
  }

  if(e.touches){
    if(e.touches[0]){
      if(e.touches[1]){
        if(e.touches[1].clientX < screen.width / 2){

          touchStarting = true

          joystick.x = e.touches[1].clientX
          joystick.y = e.touches[1].clientY

          boundingCircle()
        }
      }
    }
  }



  if(e.touches){
    if(e.touches[0]){
      if(e.touches[1]){
          mobileX = e.touches[1].clientX
          mobileY = e.touches[1].clientY
          if(getDistance(mobileButtons) < 50){
            Hero.shooting = true
          }

      }
    }
  }


  if(e.touches[0].clientX > screen.width / 2 ){
    mobileX = e.touches[0].clientX
    mobileY = e.touches[0].clientY

    if(getDistance(mobileButtons) < 50){
      Hero.shooting = true
    }

    enemies.forEach((enemy) => {

      if(getDistance(enemy.pos) < enemy.r){
        if(enemy.locked){
          enemy.locked = false
        } else {
          enemy.locked = true
        }
      }
    })

  }

})


canvas.addEventListener('touchmove', (e) => {

  if(e.changedTouches[0].clientX < screen.width / 2){

    joystick.x = e.changedTouches[0].clientX
    joystick.y = e.changedTouches[0].clientY

    boundingCircle()
  }

})

canvas.addEventListener('touchend', (e) => {

  if(e.changedTouches[0].clientX < screen.width / 2){

    touchStarting = false

    joystick.x = joystick.X
    joystick.y = joystick.Y
    joystick.dx = 0
    joystick.dy = 0

  }
})

canvas.oncontextmenu = function(e) {
   e.preventDefault(); e.stopPropagation();
}

canvas.addEventListener('mousedown', function(e) {

  if(e.buttons === 1 ) {
    LEFTCLICK = true
    Hero.shooting = true
  }

})

canvas.addEventListener('mouseup', function(e) {

  if(e.button === 1 ) {
    LEFTCLICK = false
    Hero.shooting = false
  }

})

canvas.addEventListener('mousemove', (event) => {

    mouseX = event.clientX - canvas.offsetLeft
    mouseY = event.clientY - canvas.offsetTop
    /*
    console.log(mouseX + MainCamera.pos.x, mouseY + MainCamera.pos.y)
*/
    angle = new Vector(mouseX, mouseY)

})
