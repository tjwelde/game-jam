import './style.css'
import { Application, Container, Sprite, Texture, Text } from 'pixi.js'

const app = new Application()

window.__PIXI_APP__ = app;

await app.init({ width: 800, height: 600 })

document.querySelector('#app').appendChild(app.canvas)


