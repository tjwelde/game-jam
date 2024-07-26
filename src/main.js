import './style.css'
import { Application, Container, Sprite, Texture, Text, Graphics } from 'pixi.js'

const app = new Application()

window.__PIXI_APP__ = app;

await app.init({ width: 800, height: 600 })

const MAX_VELOCITY_X = 15
const MAX_ACC_X = 0.8

const isKeyPressed = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false
}

class Player {
  x = 0
  y = 0
  acc = {
    x: 0,
    y: 0
  }

  velocity = {
    x: 0,
    y: 0
  }

  constructor() {
    this.sprite = new Graphics()
      .rect(400, 400, 50, 50)
      .fill(0x00ff00)

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
      this.acc.y = 1;
    }

    if (this.y > 0) {
      this.y = 0
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
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.sprite.x = this.x
    this.sprite.y = this.y
  }
}

const player = new Player()

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    isKeyPressed.ArrowRight = true
  } else if (e.key === 'ArrowLeft') {
    isKeyPressed.ArrowLeft = true
  } else if (e.key === 'ArrowUp') {
    isKeyPressed.ArrowUp = true
  } else if (e.key === 'ArrowDown') {
    isKeyPressed.ArrowDown = true
  }
}, false)

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    isKeyPressed.ArrowRight = false
  } else if (e.key === 'ArrowLeft') {
    isKeyPressed.ArrowLeft = false
  } else if (e.key === 'ArrowUp') {
    isKeyPressed.ArrowUp = false
  } else if (e.key === 'ArrowDown') {
    isKeyPressed.ArrowDown = false
  }
})

app.ticker.add(() => {
  if (isKeyPressed.ArrowRight) {
    player.moveRight()
  } else if (isKeyPressed.ArrowLeft) {
    player.moveLeft()
  }

  if (isKeyPressed.ArrowUp) {
    player.jump()
  }

  player.update()
})

document.querySelector('#app').appendChild(app.canvas)
