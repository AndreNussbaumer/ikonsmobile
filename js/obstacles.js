let lines = []
let obstacleStones = []
let bodies = []

let obstacles = []

class Obstacle {

  constructor(x1, y1, x2, y2){
    this.start = new Vector(x1, y1)
    this.end = new Vector(x2, y2)
    obstacles.push(this)
  }

  drawObstacle(){
    ctx.beginPath()
    ctx.moveTo(this.start.x, this.start.y)
    ctx.lineTo(this.end.x, this.end.y)
    ctx.strokeStyle = "rgba(255, 0, 0, 0)"
    ctx.stroke()
    ctx.closePath()
  }

  obstacleUnit(){
    return this.end.subtr(this.start).unit()
  }

}

function drawEveryObstacle() {

  obstacles.forEach((obstacle) => {

    obstacle.drawObstacle()

    if(col_det_mo(Hero, obstacle)){
      pen_res_mo(Hero, obstacle)
      col_res_mo(Hero, obstacle)
    }

  })

  lines.forEach((line) => {

    line.draw()
    line.obstacleUnit()

  })

}
