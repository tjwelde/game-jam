import './style.css'
import { Player } from './player'
import './style.css'
import { Application, Graphics } from 'pixi.js'
import { detectPlatformGround } from './detectCollision'

const app = new Application()

window.__PIXI_APP__ = app

await app.init({ width: 1200, height: 600 })

const scene = new Container()
app.stage.addChild(scene)

const platform1 = new Graphics().rect(100, 550, 1100, 50).fill(0xcbc3e3)
const platform2 = new Graphics().rect(700, 300, 250, 250).fill(0x800080)
const platform3 = new Graphics().rect(1000, 450, 100, 100).fill(0xff0000)

scene.addChild(platform1)
scene.addChild(platform2)
scene.addChild(platform3)

const isKeyPressed = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
}

const player = new Player(app)

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

  const ground = detectPlatformGround(player, [platform1, platform2, platform3])
  player.update(ground)
})

document.querySelector('#app').appendChild(app.canvas)
