// Camera Object

class Camera {

  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.width = canvas.width
    this.height = canvas.height
  }

  get left() {
    return this.leftEdge()
  }

  get right() {
    return this.rightEdge()
  }

  get top() {
    return this.topEdge()
  }

  get bottom() {
    return this.bottomEdge()
  }

  leftEdge() {
    return this.pos.x + (this.width * 0.25)
  }

  rightEdge() {
    return this.pos.x + (this.width * 0.75)
  }

  topEdge() {
    return this.pos.y + (this.height * 0.25)
  }

  bottomEdge() {
    return this.pos.y + (this.height * 0.75)
  }

}

function cameraMoves() {
  // Camera movements

  if(Hero.pos.x < MainCamera.left) {
    MainCamera.pos.x = Hero.pos.x - (MainCamera.width * 0.25)
  }

  if(Hero.pos.x + Hero.img.width > MainCamera.right) {
    MainCamera.pos.x = Hero.pos.x + Hero.img.width - (MainCamera.width * 0.75)
  }

  if(Hero.pos.y < MainCamera.top) {
    MainCamera.pos.y = Hero.pos.y - (MainCamera.height * 0.25)
  }

  if(Hero.pos.y + Hero.img.height > MainCamera.bottom) {
    MainCamera.pos.y = Hero.pos.y + Hero.img.height - (MainCamera.height * 0.75)
  }

  if(MainCamera.pos.x < 0){
    MainCamera.pos.x = 0
  }

  if(MainCamera.pos.x + MainCamera.width > Dungeon.width){
    MainCamera.pos.x = Dungeon.width - MainCamera.width
  }

  if(MainCamera.pos.y < 0){
    MainCamera.pos.y = 0
  }

  if(MainCamera.pos.y + MainCamera.height > Dungeon.height){
    MainCamera.pos.y = Dungeon.height - MainCamera.height
  }

  // Character limit edge

  if(Hero.pos.x < 0){
    Hero.pos.x = 0
  }

  if(Hero.pos.x > Dungeon.width){
    Hero.pos.x = Dungeon.width
  }

  if(Hero.pos.y < 0){
    Hero.pos.y = 0
  }

  if(Hero.pos.y > Dungeon.height){
    Hero.pos.y = Dungeon.height
  }
}


let MainCamera = new Camera(0, 0)

class Map {

  constructor() {
    this.x = 0
    this.y = 0
    this.img = sprites.background
    this.width = 1920
    this.height = 1080
  }
}

let Dungeon = new Map()

// Camera center

MainCamera.pos.x = (Dungeon.width - MainCamera.width) / 2
MainCamera.pos.y = (Dungeon.height - MainCamera.height) / 2
