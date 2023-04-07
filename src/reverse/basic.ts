import { AICallback, ReverseMap } from ".";

export const basicAICallback: AICallback = (self: ReverseMap) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (self.check(i, j, self.current_color)) {
        return {
          x: i,
          y: j
        }
      }
    }
  }

  return {
    x: 0,
    y: 0
  }
}