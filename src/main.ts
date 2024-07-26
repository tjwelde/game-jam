import './style.css'
import { Application } from 'pixi.js'

const app = new Application();
await app.init({ width: 640, height: 360 });
document.body.appendChild(app.canvas);
