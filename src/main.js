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

const platform1 = new Graphics().rect(100, 550, 1100, 50).fill(0xCBC3E3);
const platform2 = new Graphics().rect(700, 300, 250, 250).fill(0x800080);
const platform3 = new Graphics().rect(1000, 450, 100, 100).fill(0xff0000);

app.stage.addChild(platform1);
app.stage.addChild(platform2);
app.stage.addChild(platform3);

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

  const ground = detectPlatformGround(player, [platform1, platform2, platform3]);
  player.update(ground);
});

document.querySelector("#app").appendChild(app.canvas);
