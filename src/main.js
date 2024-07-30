import './style.css'
import { Player } from './player'
import './style.css'
import { Application, Graphics } from 'pixi.js'
import { Level } from './level'

const app = new Application()

window.__PIXI_APP__ = app

await app.init({ width: 1200, height: 600 })

const level = new Level(app.screen.width)
app.stage.addChild(level)

const isKeyPressed = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
}

const player = new Player(app, level)

document.addEventListener(
  'keydown',
  (e) => {
    if (['ArrowRight', 'd'].includes(e.key)) {
      isKeyPressed.ArrowRight = true
    } else if (['ArrowLeft', 'a'].includes(e.key)) {
      isKeyPressed.ArrowLeft = true
    } else if (['ArrowUp', 'w', ' '].includes(e.key)) {
      isKeyPressed.ArrowUp = true
    } else if (['ArrowDown', 's'].includes(e.key)) {
      isKeyPressed.ArrowDown = trueadsa
    }
  },
  false,
)

document.addEventListener('keyup', (e) => {
  if (['ArrowRight', 'd'].includes(e.key)) {
    isKeyPressed.ArrowRight = false
  } else if (['ArrowLeft', 'a'].includes(e.key)) {
    isKeyPressed.ArrowLeft = false
  } else if (['ArrowUp', 'w', ' '].includes(e.key)) {
    isKeyPressed.ArrowUp = false
  } else if (['ArrowDown', 's'].includes(e.key)) {
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

  player.handleCollision()
  player.update()
})

document.querySelector('#app').appendChild(app.canvas)
