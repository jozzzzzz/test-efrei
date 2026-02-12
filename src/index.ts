export enum Color {
  Heart,
  Club,
  Spade,
  Diamond,
}

export enum CardValue {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
  Ace = "A"
}

export interface Card {
  color: Color
  value: CardValue
}

export type FiveCards = [
  Card,
  Card,
  Card,
  Card,
  Card
]

export type Hand = [
  Card,
  Card,
]

export enum Result {
  Tie,
  Player1,
  Player2,
}

export enum HandStrength {
  RoyalFlush = 10,
  StraightFlush = 9,
  FourOfAKind = 8,
  FullHouse = 7,
  Flush = 6,
  Straight = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

export const CardStrength: Record<CardValue, number> = {
  [CardValue.Two]: 2,
  [CardValue.Three]: 3,
  [CardValue.Four]: 4,
  [CardValue.Five]: 5,
  [CardValue.Six]: 6,
  [CardValue.Seven]: 7,
  [CardValue.Eight]: 8,
  [CardValue.Nine]: 9,
  [CardValue.Ten]: 10,
  [CardValue.Jack]: 11,
  [CardValue.Queen]: 12,
  [CardValue.King]: 13,
  [CardValue.Ace]: 14,
}

export interface GameResult {
  outcome: FiveCards
  result: Result
}

interface BestHand {
  cards: FiveCards,
  handStrentgh: HandStrength
}

export function HandEvaluator(board: FiveCards, firstHand: Hand, secondHand: Hand): GameResult {

}

function defineBestHand(cards: Card[]): BestHand | undefined {
  const royalFlush = isRoyalFlushCards(cards);
  if (royalFlush) {
    return { cards: royalFlush, handStrentgh: HandStrength.RoyalFlush }
  }

  const straightFlush = isStraightFlush(cards);
  if (straightFlush) {
    return { cards: straightFlush, handStrentgh: HandStrength.StraightFlush }
  }

  const fourOfAKind = isFourOfAKind(cards);
  if (fourOfAKind) {
    return { cards: fourOfAKind, handStrentgh: HandStrength.FourOfAKind }
  }
}

function isRoyalFlushCards(cards: Card[]): FiveCards | false {
  const suits = [Color.Heart, Color.Club, Color.Spade, Color.Diamond]
  const royalValues = ['10', 'J', 'Q', 'K', 'A'];

  for (const suit of suits) {
    const sameColorCards = cards.filter(card => card.color === suit)

    if (sameColorCards.length < 5) continue

    const royalCards: Card[] = []
    
    for (const val of royalValues) {
      const foundCard = sameColorCards.find(c => c.value === val)
      if (foundCard) {
        royalCards.push(foundCard)
      }
    }

    if (royalCards.length === 5) {
      return royalCards as FiveCards
    }
  }

  return false
}

function isStraightFlush(cards: Card[]): FiveCards | false {
  const suits = [Color.Heart, Color.Club, Color.Spade, Color.Diamond]

  for (const suit of suits) {
    const suitCards = cards.filter(c => c.color === suit)
    if (suitCards.length < 5) continue

    const sorted = suitCards.sort((a, b) => CardStrength[b.value] - CardStrength[a.value])

    for (let i = 0; i <= sorted.length - 5; i++) {
      const sequence: Card[] = [sorted[i]]
      
      for (let j = i + 1; j < sorted.length; j++) {
        const lastCardValue = CardStrength[sequence[sequence.length - 1].value]
        const currentCardValue = CardStrength[sorted[j].value]

        if (lastCardValue - currentCardValue === 1) {
          sequence.push(sorted[j])
        } else if (lastCardValue === currentCardValue) {
          continue
        } else {
          break
        }

        if (sequence.length === 5) {
          return sequence as FiveCards
        }
      }
    }

    // case if straight is A, 2, 3, 4, 5
    const values = suitCards.map(c => CardStrength[c.value])
    const aceLowValues = [14, 5, 4, 3, 2]
    
    if (aceLowValues.every(v => values.includes(v))) {
      const wheel = [
        suitCards.find(c => CardStrength[c.value] === 5)!,
        suitCards.find(c => CardStrength[c.value] === 4)!,
        suitCards.find(c => CardStrength[c.value] === 3)!,
        suitCards.find(c => CardStrength[c.value] === 2)!,
        suitCards.find(c => CardStrength[c.value] === 14)!,
      ]
      return wheel as FiveCards
    }
  }

  return false
}

function isFourOfAKind(cards: Card[]): FiveCards | false {
  const counts: Record<string, number> = {}

  for (const card of cards) {
    const val = card.value
    counts[val] = (counts[val] || 0) + 1
  }

  const quadValue = Object.keys(counts).find(val => counts[val] === 4) as CardValue | undefined

  if (!quadValue) return false

  const quadCards = cards.filter(c => c.value === quadValue)

  const bestKicker = cards
    .filter(c => c.value !== quadValue)
    .sort((a, b) => CardStrength[b.value] - CardStrength[a.value])[0]

  return [...quadCards, bestKicker] as FiveCards
}
