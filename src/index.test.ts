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

    it('should tie-break high card by kicker - player 2 wins with better second card', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Ten },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Spade, value: CardValue.King },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.HighCard)
      expect(result.result).toBe(Result.Player2)
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

    it('should tie-break same pair by kicker - player 1 wins with Ace kicker', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Heart, value: CardValue.Ace },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Diamond, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Seven },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.OnePair)
      expect(result.result).toBe(Result.Player1)
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

    it('should tie-break two pair by higher pair - player 2 wins with higher top pair', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: CardValue.Five },
        { color: Color.Diamond, value: CardValue.Seven },
      ]

      const player2Hand: Hand = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Seven },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.TwoPair)
      expect(result.result).toBe(Result.Player2)
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

    it('should tie-break three of a kind by kicker - player 1 wins with Ace kicker', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Two },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Nine },
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.ThreeOfAKind)
      expect(result.result).toBe(Result.Player1)
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

    it('should detect Ace-low straight (wheel) A-2-3-4-5', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Three },
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Diamond, value: CardValue.Queen },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Five },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Ten },
        { color: Color.Spade, value: CardValue.Nine },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Diamond, value: CardValue.Five },
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Club, value: CardValue.Three },
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Heart, value: CardValue.Ace },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should tie-break straight by high card - player 2 wins with higher straight', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Three },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Two },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Player2)
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

    it('should tie-break flush by highest card - player 1 wins with Ace high flush', () => {
      const board: FiveCards = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Club, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Three },
        { color: Color.Club, value: CardValue.Two },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Flush)
      expect(result.result).toBe(Result.Player1)
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

    it('should tie-break full house by trips - player 2 wins with higher three of a kind', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Seven },
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const player2Hand: Hand = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Seven },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.FullHouse)
      expect(result.result).toBe(Result.Player2)
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

    it('should tie-break four of a kind by kicker - player 1 wins with Ace kicker', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Four },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.King },
        { color: Color.Diamond, value: CardValue.Queen },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Club, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Ace },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.FourOfAKind)
      expect(result.result).toBe(Result.Player1)
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

    it('should tie-break straight flush by high card - player 2 wins with higher straight flush', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Heart, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Diamond, value: CardValue.King },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Four },
        { color: Color.Club, value: CardValue.Two },
      ]

      const player2Hand: Hand = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Spade, value: CardValue.Two },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Nine },
        { color: Color.Heart, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Seven },
        { color: Color.Heart, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.StraightFlush)
      expect(result.result).toBe(Result.Player2)
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

  describe('Board Plays', () => {
    it('should detect when board plays - both players use all 5 board cards', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Ten },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Ten },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should use board flush when neither player can improve it', () => {
      const board: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Jack },
        { color: Color.Club, value: CardValue.Nine },
      ]

      const player1Hand: Hand = [
        { color: Color.Heart, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Jack },
        { color: Color.Club, value: CardValue.Nine },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Flush)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('Split/Tie Outcomes', () => {
    it('should result in tie when both players have identical high cards', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Nine },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Nine },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.HighCard)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should result in tie when both players have same pair with same kickers', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Nine },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Nine },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.OnePair)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should result in tie when both players have same two pair', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Queen },
        { color: Color.Heart, value: CardValue.Ace },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Two },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Five },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Queen },
        { color: Color.Heart, value: CardValue.Ace },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.TwoPair)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should result in tie when both players have same straight', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Heart, value: CardValue.Two },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Four },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Four },
        { color: Color.Heart, value: CardValue.Three },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Diamond, value: CardValue.Eight },
        { color: Color.Spade, value: CardValue.Seven },
        { color: Color.Club, value: CardValue.Six },
        { color: Color.Heart, value: CardValue.Five },
        { color: Color.Club, value: CardValue.Four },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })

  describe('Best-of-7 Selection', () => {
    it('should select best 5 cards from 7 available - ignoring weaker hole cards', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Ten },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Nine },
        { color: Color.Diamond, value: CardValue.Eight },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Two },
        { color: Color.Heart, value: CardValue.Three },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Heart, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Spade, value: CardValue.Queen },
        { color: Color.Diamond, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Ten },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Tie)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should select best 5 from 7 - using one hole card for better hand', () => {
      const board: FiveCards = [
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Spade, value: CardValue.Jack },
        { color: Color.Diamond, value: CardValue.Ten },
        { color: Color.Heart, value: CardValue.Two },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Diamond, value: CardValue.Three },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Nine },
        { color: Color.Heart, value: CardValue.Eight },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Heart, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Spade, value: CardValue.Jack },
        { color: Color.Diamond, value: CardValue.Ten },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Straight)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })

    it('should select best 5 from 7 - using both hole cards for flush', () => {
      const board: FiveCards = [
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Jack },
        { color: Color.Heart, value: CardValue.Ten },
        { color: Color.Diamond, value: CardValue.Two },
      ]

      const player1Hand: Hand = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.Nine },
      ]

      const player2Hand: Hand = [
        { color: Color.Spade, value: CardValue.Ace },
        { color: Color.Heart, value: CardValue.King },
      ]

      const expectedHandStrength: FiveCards = [
        { color: Color.Club, value: CardValue.Ace },
        { color: Color.Club, value: CardValue.King },
        { color: Color.Club, value: CardValue.Queen },
        { color: Color.Club, value: CardValue.Jack },
        { color: Color.Club, value: CardValue.Nine },
      ]

      const result = HandEvaluator(board, player1Hand, player2Hand)

      expect(result.handStrength).toBe(HandStrength.Flush)
      expect(result.result).toBe(Result.Player1)
      expect(result.outcome).toEqual(expectedHandStrength)
    })
  })
})
