import type { FiveCards, Hand } from './index'
import { Color, HandEvaluator, HandStrength, Result } from './index'

describe('HandEvaluator', () => {
  describe('HighCard', () => {
    it('should detect high card and player 1 wins with Ace high', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '2' },
        { color: Color.Club, value: '5' },
        { color: Color.Spade, value: '7' },
        { color: Color.Club, value: '9' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: 'A' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'Q' },
        { color: Color.Spade, value: 'J' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.HighCard)
      expect(result.result).toBe(Result.Player1)
    })
  })

  describe('OnePair', () => {
    it('should detect a pair of kings for player 2', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '2' },
        { color: Color.Club, value: '5' },
        { color: Color.Spade, value: '7' },
        { color: Color.Club, value: '8' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: 'A' },
        { color: Color.Diamond, value: 'Q' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'K' },
        { color: Color.Spade, value: 'K' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.OnePair)
      expect(result.result).toBe(Result.Player2)
    })
  })

  describe('TwoPair', () => {
    it('should detect two pairs for player 1', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '2' },
        { color: Color.Club, value: '5' },
        { color: Color.Spade, value: '7' },
        { color: Color.Club, value: '8' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: '2' },
        { color: Color.Diamond, value: '5' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'K' },
        { color: Color.Spade, value: 'Q' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.TwoPair)
      expect(result.result).toBe(Result.Player1)
    })
  })

  describe('ThreeOfAKind', () => {
    it('should detect three of a kind for player 2', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '9' },
        { color: Color.Club, value: '5' },
        { color: Color.Spade, value: '9' },
        { color: Color.Club, value: '8' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: 'A' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: '9' },
        { color: Color.Diamond, value: '2' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.ThreeOfAKind)
      expect(result.result).toBe(Result.Player2)
    })
  })

  describe('Straight', () => {
    it('should detect a straight for player 1', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '5' },
        { color: Color.Club, value: '6' },
        { color: Color.Spade, value: '7' },
        { color: Color.Club, value: '2' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: '4' },
        { color: Color.Diamond, value: '8' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'A' },
        { color: Color.Spade, value: 'Q' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Player1)
    })
  })

  describe('Flush', () => {
    it('should detect a flush for player 2', () => {
      const board: FiveCards = [
        { color: Color.Club, value: '2' },
        { color: Color.Club, value: '5' },
        { color: Color.Club, value: '9' },
        { color: Color.Hearth, value: '8' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: 'A' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'K' },
        { color: Color.Club, value: 'Q' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.Flush)
      expect(result.result).toBe(Result.Player2)
    })
  })

  describe('FullHouse', () => {
    it('should detect a full house for player 1', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '7' },
        { color: Color.Club, value: '7' },
        { color: Color.Spade, value: '3' },
        { color: Color.Club, value: '8' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: '7' },
        { color: Color.Diamond, value: '3' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'K' },
        { color: Color.Spade, value: 'Q' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.FullHouse)
      expect(result.result).toBe(Result.Player1)
    })
  })

  describe('FourOfAKind', () => {
    it('should detect four of a kind for player 2', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '8' },
        { color: Color.Club, value: '8' },
        { color: Color.Spade, value: '3' },
        { color: Color.Diamond, value: '5' },
        { color: Color.Diamond, value: '4' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: 'A' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: '8' },
        { color: Color.Diamond, value: '8' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.FourOfAKind)
      expect(result.result).toBe(Result.Player2)
    })
  })

  describe('StraightFlush', () => {
    it('should detect a straight flush for player 1', () => {
      const board: FiveCards = [
        { color: Color.Hearth, value: '5' },
        { color: Color.Hearth, value: '6' },
        { color: Color.Hearth, value: '7' },
        { color: Color.Club, value: '2' },
        { color: Color.Diamond, value: 'K' },
      ]

      const player1Hand: Hand = [
        { color: Color.Hearth, value: '4' },
        { color: Color.Hearth, value: '8' },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: 'A' },
        { color: Color.Spade, value: 'Q' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.StraightFlush)
      expect(result.result).toBe(Result.Player1)
    })
  })

  describe('RoyalFlush', () => {
    it('should detect a royal flush for player 2', () => {
      const board: FiveCards = [
        { color: Color.Spade, value: '10' },
        { color: Color.Spade, value: 'J' },
        { color: Color.Spade, value: 'Q' },
        { color: Color.Club, value: '2' },
        { color: Color.Diamond, value: '3' },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: 'A' },
        { color: Color.Hearth, value: 'K' },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: 'K' },
        { color: Color.Spade, value: 'A' },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.outcome).toBe(HandStrength.RoyalFlush)
      expect(result.result).toBe(Result.Player2)
    })
  })
})
