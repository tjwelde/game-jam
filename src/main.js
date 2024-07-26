import './style.css'
import { Application, Container, Sprite, Texture, Text, Graphics } from 'pixi.js'

const app = new Application()

window.__PIXI_APP__ = app;

await app.init({ width: 800, height: 600 })

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
    this.velocity.x = 1
  }

  moveLeft() {
    this.velocity.x = -1
  }

  jump() {
    this.acc.y = -1
  }

  stopMoving() {
    this.velocity.x = 0
  }

  update() {
    
    this.velocity.y += this.acc.y
    
    if (this.velocity.y < 0) {
      this.acc.y += 0.1
    }

    if (this.acc.y > 1) {
      this.acc.y = 1;
    }

    if (this.y > 400) {
      this.y = 400
      this.acc.y = 0
      this.velocity.y = 0
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
    player.moveRight()
  } else if (e.key === 'ArrowLeft') {
    player.moveLeft()
  } else if (e.key === 'ArrowUp') {
    player.jump()
  } else if (e.key === 'ArrowDown') {
    // obj.y += 10
  }
}, false)

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    player.stopMoving()
  }
})


app.ticker.add(() => {
  player.update()
})

document.querySelector('#app').appendChild(app.canvas)
