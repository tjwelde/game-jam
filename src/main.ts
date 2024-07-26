import './style.css'
import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application()

await app.init({ width: 640, height: 360 })

await Assets.load('./Assets/sample.png')
const sprite = Sprite.from('./Assets/sample.png')

app.stage.addChild(sprite)

document.body.appendChild(app.canvas)
