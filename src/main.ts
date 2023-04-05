import { Actor, Color, DisplayMode, Engine, Loader } from "excalibur";
import { Cell } from "./cell";
import { Resources } from "./resources";
import { ReverseMap, ReverseMapState } from "./reverse";

class Game extends Engine {
  private board: number[][] = [];
  private currentPlayer: number = ReverseMapState.BLACK
  private reverseMap: ReverseMap

  constructor() {
    super({ width: 600, height: 600 });
  }

  initialize() {
    this.reverseMap = new ReverseMap((x, y, color) => {
      this.add(new Cell(x, y, color));
    })

    this.input.pointers.primary.on('down', (event) => {
      // console.log(e)
      const x = Math.floor(event.worldPos.x / 50);
      const y = Math.floor(event.worldPos.y / 50);

      const player = this.reverseMap.current_color;

      this.reverseMap.put(x, y, player)
    })

    this.start()
  }
}

export const game = new Game();
game.initialize();