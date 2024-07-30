import { Container, Graphics } from "pixi.js";

export class Level extends Container {
  platforms = []
  constructor() {
    super();

    this.platforms = [
      new Graphics().rect(100, 550, 1100, 50).fill(0xcbc3e3),
      new Graphics().rect(700, 300, 250, 250).fill(0x800080),
      new Graphics().rect(1000, 450, 100, 100).fill(0xff0000),
    ]

    this.platforms.forEach((platform) => {
      this.addChild(platform)
    })
  }
}
