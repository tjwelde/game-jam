import { Graphics, Sprite, Texture, Point } from 'pixi.js'

const MAX_VELOCITY_X = 15
const MAX_ACC_X = 0.8

export class Player {
  acc = {
    x: 0,
    y: 0,
  }

  velocity = {
    x: 0,
    y: 0,
  }

  constructor(app) {
    this.sprite = new Sprite({
      texture: Texture.WHITE,
    })
    this.sprite.position.set(400, 400)

    this.sprite.width = 50
    this.sprite.height = 50
    this.sprite.tint = 0x00ff00
    app.stage.addChild(this.sprite)

    this.x = this.sprite.x
    this.y = this.sprite.y
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

    if (this.sprite.y > 0) {
      this.sprite.y = 0
      this.acc.y = 0
      this.velocity.y = 0
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
}
