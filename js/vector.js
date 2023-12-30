class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    return new Vector(this.x+v.x, this.y+v.y)
  }

  subtr(v) {
    return new Vector(this.x-v.x, this.y-v.y)
  }

  mag() {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  normal() {
    return new Vector(-this.y, this.x).unit()
  }

  mult(n) {
    return new Vector(this.x*n, this.y*n)
  }

  unit() {
      if(this.mag() === 0){
          return new Vector(0,0)
      } else {
          return new Vector(this.x/this.mag(), this.y/this.mag())
      }
  }

  drawVec(start_x, start_y, n, color){
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  // Returns length between each vector

  static dot(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y
  }

}

// Rotation matrix

class Matrix {

  constructor(rows, cols){
    this.rows = rows
    this.cols = cols
    this.data = []

    for(let i = 0; i < this.rows; i++){
      this.data[i] = [];
      for(let j = 0; j < this.cols; j++){
        this.data[i][j] = 0;
      }
    }
  }

  multiplyVec(vec){
    let result = new Vector(0,0)
    result.x = this.data[0][0] * vec.x + this.data[0][1] * vec.y
    result.y = this.data[1][0] * vec.x + this.data[1][1] * vec.y
    return result
  }
}


function rotMx(angle){
  let mx = new Matrix(2,2)
  mx.data[0][0] = Math.cos(angle)
  mx.data[0][1] = -Math.sin(angle)
  mx.data[1][0] = Math.sin(angle)
  mx.data[1][1] = Math.cos(angle)
  return mx
}
