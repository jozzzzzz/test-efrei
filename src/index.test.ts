import type { Board, Hand } from './index'
import { Color, HandEvaluator, HandStrength, Result } from './index'

describe('handEvaluator', () => {
  it('should detect a pair of aces for player 1', () => {
    const board: Board = [
      { color: Color.Hearth, value: '2' },
      { color: Color.Club, value: '5' },
      { color: Color.Spade, value: '7' },
      { color: Color.Club, value: '8' },
      { color: Color.Diamond, value: '4' },
    ]

    const player1Hand: Hand = [
      { color: Color.Hearth, value: 'A' },
      { color: Color.Diamond, value: 'A' },
    ]

    const player2Hand: Hand = [
      { color: Color.Club, value: 'K' },
      { color: Color.Spade, value: 'Q' },
    ]

    const result = HandEvaluator(board, player1Hand, player2Hand)

    expect(result.outcome).toBe(HandStrength.OnePair)
    expect(result.result).toBe(Result.Player1)
  })
})
