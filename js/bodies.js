

class Body {

  constructor(x, y) {
    this.comp = []
    this.pos = new Vector(x, y)
    this.m = 0
    this.inv_m = 0
    this.inertia = 0
    this.inv_inertia = 0
    this.elasticity
    this.vel = new Vector(0, 0)
    this.acc = new Vector(0, 0)
    this.acceleration = 1
    this.accVel = 0
    bodies.push(this)
  }
}

class Line {

  constructor(x1, y1, x2, y2){
    this.start = new Vector(x1, y1)
    this.end = new Vector(x2, y2)
    this.vertex = [this.start, this.end]
    this.dir = this.end.subtr(this.start).unit()
    this.center = this.start.add(this.end).mult(0.5)
    this.length = this.end.subtr(this.start).mag()
    this.refStart = new Vector(x1, y1)
    this.refEnd = new Vector(x2, y2)
    this.refUnit = this.end.subtr(this.start).unit()
    this.angle = 0
    lines.push(this)
  }

  draw(){
    ctx.beginPath()
    ctx.moveTo(this.start.x, this.start.y)
    ctx.lineTo(this.end.x, this.end.y)
    ctx.strokeStyle = "rgba(255, 255, 255, 1)"
    ctx.stroke()
    ctx.closePath()
  }

  obstacleUnit(){
    let rotMat = rotMx(this.angle)
    let newDir = rotMat.multiplyVec(this.refUnit)
    this.start = this.center.add(newDir.mult(-this.length/2))
    this.end = this.center.add(newDir.mult(this.length/2))
  }

}

class Rectangle {

  constructor(x1, y1, x2, y2, w){

    this.vertex = []
    this.vertex[0] = new Vector(x1, y1)
    this.vertex[1] = new Vector(x2, y2)
    this.edge = this.vertex[1].subtr(this.vertex[0])
    this.length = this.edge.mag()
    this.dir = this.edge.unit()
    this.refDir = this.edge.unit()
    this.width = w
    this.pos = this.vertex[0].add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width / 2))
    this.angle = -0.05
    this.vertex[2] = this.vertex[1].add(this.dir.normal().mult(this.width))
    this.vertex[3] = this.vertex[2].add(this.dir.mult(-this.length))
    this.rotMat = new Matrix(2,2)

  }

  draw(){
    ctx.beginPath()
    ctx.moveTo(this.vertex[0].x, this.vertex[0].y)
    ctx.lineTo(this.vertex[1].x, this.vertex[1].y)
    ctx.lineTo(this.vertex[2].x, this.vertex[2].y)
    ctx.lineTo(this.vertex[3].x, this.vertex[3].y)
    ctx.lineTo(this.vertex[0].x, this.vertex[0].y)
    ctx.strokeStyle = "rgba(255, 255, 255, 1)"
    ctx.stroke()
    ctx.closePath()

  }

  getVertices(){
    this.rotMat = rotMx(this.angle)
    this.dir = this.rotMat.multiplyVec(this.refDir)
    this.vertex[0] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(this.width/2))
    this.vertex[1] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(-this.width/2))
    this.vertex[2] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(-this.width/2))
    this.vertex[3] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width/2))
  }



}

class Box {

  constructor(x1, y1, x2, y2, w, m){
    this.vertex = []
    this.vertex[0] = new Vector(x1, y1)
    this.vertex[1] = new Vector(x2, y2)
    this.edge = this.vertex[1].subtr(this.vertex[0])
    this.length = this.edge.mag()
    this.dir = this.edge.unit()
    this.refDir = this.edge.unit()
    this.width = w
    this.pos = this.vertex[0].add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width / 2))
    this.vel = new Vector(0,0)
    this.acc = new Vector(0,0)
    this.elasticity = 1
    this.acceleration = 1
    this.angVel = 0
    this.angle = -0.05
    this.vertex[2] = this.vertex[1].add(this.dir.normal().mult(this.width))
    this.vertex[3] = this.vertex[2].add(this.dir.mult(-this.length))
    this.m = m; if(this.m === 0){ this.inv_m = 0 } else { this.inv_m = 1 / this.m; }
    this.inertia = this.m * (this.width**2 + (this.length+2*this.width)**2) / 12
    if(this.m === 0){
      this.inv_inertia = 0
    } else {
      this.inv_inertia = 1 / this.inertia
    }
  }

  draw(){

    ctx.beginPath()
    ctx.moveTo(this.vertex[0].x, this.vertex[0].y)
    ctx.lineTo(this.vertex[1].x, this.vertex[1].y)
    ctx.lineTo(this.vertex[2].x, this.vertex[2].y)
    ctx.lineTo(this.vertex[3].x, this.vertex[3].y)
    ctx.lineTo(this.vertex[0].x, this.vertex[0].y)
    ctx.strokeStyle = "rgba(255, 255, 255, 1)"
    ctx.stroke()
    ctx.closePath()

  }

  obstacleUnit(){

    this.acc = this.acc.unit().mult(this.acceleration)
    // Ikons acceleration + velocity
    this.vel = this.vel.add(this.acc)
    // Ikons friction
    this.vel = this.vel.mult(1-friction)
    // Position for COLLISIONS
    this.pos = this.pos.add(this.vel)
    this.angle += this.angVel
    this.angVel *= 0.4
    let rotMat = rotMx(this.angle)
    this.dir = rotMat.multiplyVec(this.refDir)
    this.vertex[0] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(this.width/2))
    this.vertex[1] = this.pos.add(this.dir.mult(-this.length/2)).add(this.dir.normal().mult(-this.width/2))
    this.vertex[2] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(-this.width/2))
    this.vertex[3] = this.pos.add(this.dir.mult(this.length/2)).add(this.dir.normal().mult(this.width/2))


    if(LEFT){
      this.angVel = -0.1
    }

    if(UP){
      this.acc = this.dir.mult(-this.acceleration)
    }

    if(RIGHT){
      this.angVel = 0.1
    }

    if(DOWN){
      this.acc = this.dir.mult(this.acceleration)
    }

    if(!UP && !DOWN){
        this.acc = new Vector(0,0)
    }

  }
}

/*

let obst = new Line(200, 100, 200, 295)
let obst1 = new Line(150, 300, 350, 300)

let box = new Box(250, 410, 150, 250, 158)
let box1 = new Rectangle(650, 610, 150, 650, 158)
*/

function closestVertexToPoint(obj, p){

  let closestVertex
  let minDist = null

  for(let i = 0; i < obj.vertex.length; i++){
    if(p.subtr(obj.vertex[i]).mag() < minDist || minDist === null){
      closestVertex = obj.vertex[i];
      minDist = p.subtr(obj.vertex[i]).mag()
    }
  }

  return closestVertex

}

function sat(o1, o2) {

  let minOverlap = null
  let smallestAxis
  let vertexObj
  let firstShapeAxes = getFirstShapeAxes(o1)

  let axes = findAxes(o1, o2)

  let proj1, proj2 = 0

  for(let i=0; i < axes.length; i++){

    proj1 = projShapeOntoAxis(axes[i], o1)
    proj2 = projShapeOntoAxis(axes[i], o2)

    let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min)
    if(overlap < 0){
      return false
    }

    if((proj1.max > proj2.max && proj1.min < proj2.min) || (proj1.max < proj2.max && proj1.min > proj2.min)){
      let mins = Math.abs(proj1.min - proj2.min)
      let maxs = Math.abs(proj1.max - proj2.max)
      if(mins < maxs){
        overlap += mins
      } else {
        overlap += maxs
        axes[i] = axes[i].mult(-1)
      }
    }

    if(overlap < minOverlap || minOverlap === null){
      minOverlap = overlap
      smallestAxis = axes[i]
      if(i < 2){
        vertexObj = o2
        if(proj1.max > proj2.max){
          smallestAxis = axes[i].mult(-1)
        }
      } else {
        vertexObj = o1
        if(proj1.max < proj2.max){
          smallestAxis = axes[i].mult(-1)
        }
      }
    }
  }

  let contactVertex = projShapeOntoAxis(smallestAxis, vertexObj).collVertex
  smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue")

  return true

}

function projShapeOntoAxis(axis, obj){

  setIkonVerticesAlongAxis(obj, axis);
  let min = Vector.dot(axis, obj.vertex[0])
  let max = min
  let collVertex = obj.vertex[0]

  for(let i=0; i < obj.vertex.length; i++){
    let p = Vector.dot(axis, obj.vertex[i])
    if(p<min){
      min = p
      collVertex = obj.vertex[i]
    }
    if(p>max){
      max = p
    }
  }
  return {
    min: min,
    max: max,
    collVertex: collVertex
  }
}


function findAxes(o1, o2) {

  let axes = []

  if(o1 instanceof Ikon){
    axes.push(closestVertexToPoint(o2, o1.pos).subtr(o1.pos).unit())
  }

  if(o1 instanceof Box){
    axes.push(o1.dir.normal())
    axes.push(o1.dir)
  }

  if(o2 instanceof Ikon){
    axes.push(closestVertexToPoint(o1, o2.pos).subtr(o2.pos).unit())
  }

  if(o2 instanceof Box){
    axes.push(o2.dir.normal())
    axes.push(o2.dir)
  }

  return axes
}

function getFirstShapeAxes(obj){
    if(obj instanceof Ikon){
        return 1;
    } else {
        return 2;
    }
}

function setIkonVerticesAlongAxis(obj, axis){
    if(obj instanceof Ikon){
        obj.vertex[0] = obj.pos.add(axis.unit().mult(-obj.r));
        obj.vertex[1] = obj.pos.add(axis.unit().mult(obj.r));
    }
}
