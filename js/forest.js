function startForest() {

  startObstacles()

  ctx.drawImage(sprites.stone, 133, 143.5, sprites.stone.width, sprites.stone.height)
  ctx.drawImage(sprites.trunk, 1090, 455, sprites.trunk.width / 2, sprites.trunk.height / 2)

}

function startObstacles() {

  if(obstacles.length <= 0){

    let aresta = new Obstacle(149, 255, 255, 405)
    let aresta1 = new Obstacle(255, 405, 381, 320)
    let aresta2 = new Obstacle(381, 320, 276, 165)
    let aresta3 = new Obstacle(276, 165, 149, 255)

    let trunk = new Obstacle(1395, 500, 1443, 522)
    let trunk1 = new Obstacle(1443, 522, 1481, 571)
    let trunk2 = new Obstacle(1481, 571, 1223, 935)
    let trunk3 = new Obstacle(1223, 935, 1167, 914)
    let trunk4 = new Obstacle(1167, 914, 1132, 860)
    let trunk5 = new Obstacle(1132, 860, 1271, 687)
    let trunk6 = new Obstacle(1271, 687, 1395, 500)

  } else {
    return
  }

}
