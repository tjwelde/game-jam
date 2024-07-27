import "./style.css";
import { Player } from "./player";
import "./style.css";
import {
  Application,
  Container,
  Sprite,
  Texture,
  Text,
  Graphics,
  Point,
} from "pixi.js";
import { detectPlatformGround } from "./detectCollision";

const app = new Application();

window.__PIXI_APP__ = app;

await app.init({ width: 1200, height: 600 });

const platform1 = new Graphics().rect(0, 450, 1200, 50).fill(0xff0000);
console.log("🚀 ~ platform1:", platform1.getBounds())
const platform2 = new Graphics().rect(1000, 350, 100, 100).fill(0xff0000);
console.log("🚀 ~ platform2:", platform2.getBounds())


app.stage.addChild(platform1);
app.stage.addChild(platform2);

const isKeyPressed = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};

const player = new Player(app);

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "ArrowRight") {
      isKeyPressed.ArrowRight = true;
    } else if (e.key === "ArrowLeft") {
      isKeyPressed.ArrowLeft = true;
    } else if (e.key === "ArrowUp") {
      isKeyPressed.ArrowUp = true;
    } else if (e.key === "ArrowDown") {
      isKeyPressed.ArrowDown = true;
    }
  },
  false
);

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    isKeyPressed.ArrowRight = false;
  } else if (e.key === "ArrowLeft") {
    isKeyPressed.ArrowLeft = false;
  } else if (e.key === "ArrowUp") {
    isKeyPressed.ArrowUp = false;
  } else if (e.key === "ArrowDown") {
    isKeyPressed.ArrowDown = false;
  }
});

app.ticker.add(() => {
  if (isKeyPressed.ArrowRight) {
    player.moveRight();
  } else if (isKeyPressed.ArrowLeft) {
    player.moveLeft();
  }

  if (isKeyPressed.ArrowUp) {
    player.jump();
  }
// console.log("🚀 ~ player:", player.sprite.getBounds().y)
// console.log("🚀 ~ platform2:", platform2.getBounds().y)

  const ground = detectPlatformGround(player.sprite, [platform1, platform2])
  player.update(ground)
});

document.querySelector("#app").appendChild(app.canvas);
