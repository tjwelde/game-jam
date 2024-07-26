import './style.css'
import { Application, Container, Sprite, Texture, Text, Graphics } from 'pixi.js'
import { Player } from './player'

const app = new Application()

window.__PIXI_APP__ = app;

await app.init({ width: 1200, height: 600 })

const isKeyPressed = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false
}

const player = new Player(app)

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
