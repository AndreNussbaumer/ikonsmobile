const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



// GLOBAL VARIABLES

let friction = 0.07

// Collision detection

function col_det_bb(m1, m2){
    if(m1.r + m2.r >= m2.pos.subtr(m1.pos).mag()){
        return true
    } else {
        return false
    }
}

// Collision resolution

function pen_res_bb(m1, m2){
    let dist = m1.pos.subtr(m2.pos)
    let pen_depth = m1.r + m2.r - dist.mag()
    let pen_res = dist.unit().mult(pen_depth /2)
    m1.pos = m1.pos.add(pen_res)
    m2.pos = m2.pos.add(pen_res.mult(-1))
}

// Calculates the ikons new velocity after the collision

function col_res_bb(m1, m2){

  // Normal collision vector
  let normal = m1.pos.subtr(m2.pos).unit()
  // Relative velocity vector
  let relVel = m1.vel.subtr(m2.vel)
  // Separating velocity
  let sepVel = Vector.dot(relVel, normal)
  // Projection value after the collision
  let new_sepVel = -sepVel * Math.min(m1.elasticity, m2.elasticity)
  let vsep_diff = new_sepVel - sepVel

  // Dividing the impulse value in the ration of the inverse masses
  // Adding the impulse vector to the original velocity vectors according to their inverse mass
  let impulse = vsep_diff / (m1.inv_m + m2.inv_m)
  let impulseVec = normal.mult(impulse)

  // Adding the separating velocity vector to the original vel. vector
  m1.vel = m1.vel.add(impulseVec.mult(m1.inv_m))
  // Adding its opposite to the other ikons original vel. vector
  m2.vel = m2.vel.add(impulseVec.mult(-m2.inv_m))
}
