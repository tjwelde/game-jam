import { Graphics, Sprite, Texture } from 'pixi.js'
import { Level } from './level'
import { detectPlatformGround } from './detectCollision'

const MAX_VELOCITY_X = 12
const MAX_ACC_X = 1
const MAX_ACC_Y = 0.7

export class Player {
  x = 400
  y = 400
  width = 50
  height = 50
  acc = {
    x: 0,
    y: 0,
  }

  velocity = {
    x: 0,
    y: 0,
  }
  ground = 0
  constructor(app) {
    this.sprite = new Sprite({
      tint: 0x00ff00,
      texture: Texture.WHITE,
      width: 50,
      height: 50,
      x: this.x,
      y: this.y,
    })

    app.stage.addChild(this.sprite)
  }

  moveRight() {
    this.acc.x = MAX_ACC_X
  }

  moveLeft() {
    this.acc.x = MAX_ACC_X * -1
  }

  jump() {
    if (this.acc.y != 0) return
    this.velocity.y = -15
    this.acc.y = 0
  }

  update() {
    this.velocity.x += this.acc.x
    this.velocity.y += this.acc.y

    if (this.velocity.y < 0) {
      this.acc.y += 0.07
    }
    if (this.velocity.y < -15) {
      this.velocity.y = -5
    }

    if (this.acc.y > 1) {
      this.acc.y = 1
    }

    if (this.y + this.height > this.ground) {
      if (this.velocity.y >= 0) {
        this.y = this.ground - this.height
        this.acc.y = 0
        this.velocity.y = 0
      }
    } else if (this.y + this.height < this.ground) {
      this.acc.y = MAX_ACC_Y
    }

    if (this.velocity.x > MAX_VELOCITY_X) {
      this.velocity.x = MAX_VELOCITY_X
    } else if (this.velocity.x < MAX_VELOCITY_X * -1) {
      this.velocity.x = MAX_VELOCITY_X * -1
    }

    if (this.velocity.x > 0) {
      this.acc.x = MAX_ACC_X * -1
    } else if (this.velocity.x < 0) {
      this.acc.x = MAX_ACC_X
    }

    if (Math.abs(this.velocity.x) < MAX_ACC_X) {
      this.velocity.x = 0
      this.acc.x = 0
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.sprite.x = this.x
    this.sprite.y = this.y
  }

  /**
   * @param {Level} level 
   */
  handleCollision(level) {
    this.ground = detectPlatformGround(this, level.platforms)
  }
}
