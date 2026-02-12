import type { FiveCards, Hand } from './index'
import { CardValue, Color, HandEvaluator, HandStrength, Result } from './index'

describe('HandEvaluator', () => {
  describe('HighCard', () => {
    it('should detect high card and player 1 wins with Ace high', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Spade, value: CardValue.Jack },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.King },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.HighCard)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('OnePair', () => {
    it('should detect a pair of kings for player 2', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Queen },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.King },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.OnePair)
      expect(result.result).toBe(Result.Player2)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('TwoPair', () => {
    it('should detect two pairs for player 1', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Five },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Diamond, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Spade, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Eight },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.TwoPair)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('ThreeOfAKind', () => {
    it('should detect three of a kind for player 2', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.ThreeOfAKind)
      expect(result.result).toBe(Result.Player2)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('Straight', () => {
    it('should detect a straight for player 1', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Four },
        { color: Color.Diamond, value: CardValue.Eight },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Spade, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Four },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('Flush', () => {
    it('should detect a flush for player 2', () => {
      const board: FiveCards = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Two },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Flush)
      expect(result.result).toBe(Result.Player2)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('FullHouse', () => {
    it('should detect a full house for player 1', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Seven },
        { color: Color.Spade, value: CardValue.Three },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Seven },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Spade, value: CardValue.Three },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.FullHouse)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('FourOfAKind', () => {
    it('should detect four of a kind for player 2', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Three },
        { color: Color.Diamond, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Eight },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.FourOfAKind)
      expect(result.result).toBe(Result.Player2)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('StraightFlush', () => {
    it('should detect a straight flush for player 1', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Eight },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Spade, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Heart, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Four },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.StraightFlush)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('RoyalFlush', () => {
    it('should detect a royal flush for player 2', () => {
      const board: FiveCards = [
        { color: Color.Spade, value: CardValue.Ten },
        { color: Color.Spade, value: CardValue.Jack },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Heart, value: CardValue.King },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Ace },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Spade, value: CardValue.Ace },
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Spade, value: CardValue.Jack },
        { color: Color.Spade, value: CardValue.Ten },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.RoyalFlush)
      expect(result.result).toBe(Result.Player2)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })
})
