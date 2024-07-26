import './style.css'
import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application()

;(window as any).__PIXI_APP__ = app;

await app.init({ width: 640, height: 360 })

await Assets.load('./assets/sample.png')
const sprite = Sprite.from('./assets/sample.png')

app.stage.addChild(sprite)

let elapsed = 0.0;

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});


document.body.appendChild(app.canvas)
