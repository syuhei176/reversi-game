


export enum ReverseMapState {
  BLOCK,
  EMPTY,
  WHITE,
  BLACK
}

export type ChangeColorCallback = (x: number, y: number, color: ReverseMapState) => void


type AICallbackResult = { x: number, y: number }

export type AICallback = (data: number[]) => AICallbackResult


export class ReverseMap {
  data: number[]
  current_color: ReverseMapState
  changeColorCallback: ChangeColorCallback
  aiCallback: AICallback | undefined

  constructor(changeColorCallback: ChangeColorCallback) {
    this.changeColorCallback = changeColorCallback
    this.data = [];
    this.current_color = ReverseMapState.WHITE;

    for (var i = 0; i < 8 * 8; i++) this.data[i] = ReverseMapState.EMPTY;

    this.change_color(3, 3, ReverseMapState.BLACK);
    this.change_color(3, 4, ReverseMapState.WHITE);
    this.change_color(4, 3, ReverseMapState.WHITE);
    this.change_color(4, 4, ReverseMapState.BLACK);

  }

  put(x: number, y: number, color: ReverseMapState) {
    if (this.check(x, y, color)) {
      this.change_color(x, y, color);
      this.turn();

      if (this.aiCallback) {
        const result = this.aiCallback(this.data)
        this.change_color(result.x, result.y, this.current_color);
      }
    }
  }

  check(x: number, y: number, color: ReverseMapState) {
    return this.checkPart(x - 1, y, color, [-1, 0]) > 1 ||
      this.checkPart(x + 1, y, color, [1, 0]) > 1 ||
      this.checkPart(x, y + 1, color, [0, 1]) > 1 ||
      this.checkPart(x, y - 1, color, [0, -1]) > 1 ||
      this.checkPart(x - 1, y - 1, color, [-1, -1]) > 1 ||
      this.checkPart(x + 1, y + 1, color, [1, 1]) > 1 ||
      this.checkPart(x - 1, y + 1, color, [-1, 1]) > 1 ||
      this.checkPart(x + 1, y - 1, color, [1, -1]) > 1;
  }

  checkPart(x: number, y: number, color: ReverseMapState, d: number[]) {
    var col = this.get_color(x, y);
    if (col == ReverseMapState.BLOCK) {
      return 0;
    } else if (col == ReverseMapState.EMPTY) {
      return 0;
    } else {
      if (col == color) {
        return 1;
      } else {
        var c = this.checkPart(x + d[0], y + d[1], color, d);
        if (c > 0) {
          this.change_color(x, y, color);
          return c + 1;
        }
      }
    }
    return 0;

  }

  change_color(x: number, y: number, color: ReverseMapState) {
    // this.map.put(x, y, color);
    this.changeColorCallback(x, y, color)
    this.set_color(x, y, color);
  }

  get_color(x: number, y: number) {
    if (x >= 0 && y >= 0 && x < 8 && y < 8)
      return this.data[x + y * 8];
    else
      return ReverseMapState.BLOCK;
  }

  set_color = function (x: number, y: number, color: ReverseMapState) {
    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      this.data[x + y * 8] = color;
      return color;
    } else {
      return ReverseMapState.BLOCK;
    }
  }


  setAI(aiCallback: AICallback) {
    this.aiCallback = aiCallback
  }

  turn() {
    if (this.current_color == ReverseMapState.WHITE) {
      this.current_color = ReverseMapState.BLACK;
    } else if (this.current_color == ReverseMapState.BLACK) {
      this.current_color = ReverseMapState.WHITE;
    }

  }
}



