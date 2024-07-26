import './style.css'
import { Application, Assets, Container, Sprite } from 'pixi.js'

const app = new Application()

window.__PIXI_APP__ = app;

await app.init({ width: 640, height: 360 })

const container = new Container({
  x:app.screen.width / 2,
  y:app.screen.height / 2
});

app.stage.addChild(container);

// load the texture
await Assets.load('assets/sample.png');

// Create the 3 sprites, each a child of the last
const sprites = [];
let parent = container;
for (let i = 0; i < 3; i++) {
  let wrapper = new Container();
  let sprite = Sprite.from('assets/sample.png');
  sprite.anchor.set(0.5);
  wrapper.addChild(sprite);
  parent.addChild(wrapper);
  sprites.push(wrapper);
  parent = wrapper;
}

// Set all sprite's properties to the same value, animated over time
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta.deltaTime / 60;
  const amount = Math.sin(elapsed);
  const scale = 1.0 + 0.25 * amount;
  const alpha = 0.75 + 0.25 * amount;
  const angle = 40 * amount;
  const x = 75 * amount;
  for (let i = 0; i < sprites.length; i++) {
    const sprite = sprites[i];
    sprite.scale.set(scale);
    sprite.alpha = alpha;
    sprite.angle = angle;
    sprite.x = x;
  }
});


document.body.appendChild(app.canvas)
