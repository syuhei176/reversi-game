import { AICallback, ReverseMap } from ".";

export const basicAICallback: AICallback = (self: ReverseMap) => {
  let bestMove: { x: number, y: number } = { x: 0, y: 0 }
  let bestScore = 0

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const score = self.check(i, j, self.current_color)
      if (score > 0) {
        if (bestScore < score) {
          bestScore = score
          bestMove = {
            x: i,
            y: j
          }
        }
      }
    }
  }

  return bestMove
}