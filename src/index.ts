export enum Color {
  Heart,
  Club,
  Spade,
  Diamond,
}

export enum CardValue {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
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
  Card,
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
  outcome: HandStrength
  result: Result
}

interface BestHand {
  cards: FiveCards
  handStrength: HandStrength
  highCards: number[]
}

function sortByStrength(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => CardStrength[b.value] - CardStrength[a.value])
}

function getValueCounts(cards: Card[]): Map<CardValue, number> {
  const counts = new Map<CardValue, number>()
  for (const card of cards) {
    counts.set(card.value, (counts.get(card.value) || 0) + 1)
  }
  return counts
}

function getColorCounts(cards: Card[]): Map<Color, Card[]> {
  const counts = new Map<Color, Card[]>()
  for (const card of cards) {
    if (!counts.has(card.color)) {
      counts.set(card.color, [])
    }
    counts.get(card.color)!.push(card)
  }
  return counts
}

function findFlush(cards: Card[]): FiveCards | false {
  const colorCounts = getColorCounts(cards)
  for (const [, colorCards] of colorCounts) {
    if (colorCards.length >= 5) {
      const sorted = sortByStrength(colorCards)
      return [sorted[0], sorted[1], sorted[2], sorted[3], sorted[4]]
    }
  }
  return false
}

function findStraight(cards: Card[]): FiveCards | false {
  const uniqueValues = [...new Set(cards.map(c => CardStrength[c.value]))].sort((a, b) => b - a)

  if (uniqueValues.includes(14) && uniqueValues.includes(2) && uniqueValues.includes(3) && uniqueValues.includes(4) && uniqueValues.includes(5)) {
    const straightCards: Card[] = []
    for (const val of [5, 4, 3, 2, 14]) {
      const card = cards.find(c => CardStrength[c.value] === val)
      if (card)
        straightCards.push(card)
    }
    if (straightCards.length === 5) {
      return straightCards as FiveCards
    }
  }

  for (let i = 0; i <= uniqueValues.length - 5; i++) {
    const slice = uniqueValues.slice(i, i + 5)
    if (slice[0] - slice[4] === 4) {
      const straightCards: Card[] = []
      for (const val of slice) {
        const card = cards.find(c => CardStrength[c.value] === val && !straightCards.includes(c))
        if (card)
          straightCards.push(card)
      }
      if (straightCards.length === 5) {
        return straightCards as FiveCards
      }
    }
  }
  return false
}

function findStraightFlush(cards: Card[]): FiveCards | false {
  const colorCounts = getColorCounts(cards)
  for (const [, colorCards] of colorCounts) {
    if (colorCards.length >= 5) {
      const straight = findStraight(colorCards)
      if (straight) {
        return straight
      }
    }
  }
  return false
}

function findRoyalFlush(cards: Card[]): FiveCards | false {
  const straightFlush = findStraightFlush(cards)
  if (straightFlush && CardStrength[straightFlush[0].value] === 14) {
    const values = straightFlush.map(c => CardStrength[c.value])
    if (values.includes(14) && values.includes(13) && values.includes(12) && values.includes(11) && values.includes(10)) {
      return straightFlush
    }
  }
  return false
}

function findFourOfAKind(cards: Card[]): FiveCards | false {
  const valueCounts = getValueCounts(cards)
  for (const [value, count] of valueCounts) {
    if (count === 4) {
      const fourCards = cards.filter(c => c.value === value)
      const kicker = sortByStrength(cards.filter(c => c.value !== value))[0]
      return [fourCards[0], fourCards[1], fourCards[2], fourCards[3], kicker]
    }
  }
  return false
}

function findFullHouse(cards: Card[]): FiveCards | false {
  const valueCounts = getValueCounts(cards)
  let threeValue: CardValue | null = null
  let pairValue: CardValue | null = null

  const threes: CardValue[] = []
  const pairs: CardValue[] = []

  for (const [value, count] of valueCounts) {
    if (count >= 3)
      threes.push(value)
    if (count >= 2)
      pairs.push(value)
  }

  if (threes.length === 0)
    return false

  threes.sort((a, b) => CardStrength[b] - CardStrength[a])
  threeValue = threes[0]

  const availablePairs = pairs.filter(v => v !== threeValue)
  if (availablePairs.length === 0 && threes.length < 2)
    return false

  if (availablePairs.length > 0) {
    availablePairs.sort((a, b) => CardStrength[b] - CardStrength[a])
    pairValue = availablePairs[0]
  }
  else {
    pairValue = threes[1]
  }

  const threeCards = cards.filter(c => c.value === threeValue).slice(0, 3)
  const pairCards = cards.filter(c => c.value === pairValue).slice(0, 2)

  return [threeCards[0], threeCards[1], threeCards[2], pairCards[0], pairCards[1]]
}

function findThreeOfAKind(cards: Card[]): FiveCards | false {
  const valueCounts = getValueCounts(cards)
  for (const [value, count] of valueCounts) {
    if (count === 3) {
      const threeCards = cards.filter(c => c.value === value)
      const kickers = sortByStrength(cards.filter(c => c.value !== value)).slice(0, 2)
      return [threeCards[0], threeCards[1], threeCards[2], kickers[0], kickers[1]]
    }
  }
  return false
}

function findTwoPair(cards: Card[]): FiveCards | false {
  const valueCounts = getValueCounts(cards)
  const pairs: CardValue[] = []

  for (const [value, count] of valueCounts) {
    if (count >= 2)
      pairs.push(value)
  }

  if (pairs.length < 2)
    return false

  pairs.sort((a, b) => CardStrength[b] - CardStrength[a])

  const pair1 = cards.filter(c => c.value === pairs[0]).slice(0, 2)
  const pair2 = cards.filter(c => c.value === pairs[1]).slice(0, 2)
  const kicker = sortByStrength(cards.filter(c => c.value !== pairs[0] && c.value !== pairs[1]))[0]

  return [pair1[0], pair1[1], pair2[0], pair2[1], kicker]
}

function findOnePair(cards: Card[]): FiveCards | false {
  const valueCounts = getValueCounts(cards)
  const pairs: CardValue[] = []

  for (const [value, count] of valueCounts) {
    if (count >= 2)
      pairs.push(value)
  }

  if (pairs.length === 0)
    return false

  pairs.sort((a, b) => CardStrength[b] - CardStrength[a])
  const pairValue = pairs[0]

  const pairCards = cards.filter(c => c.value === pairValue).slice(0, 2)
  const kickers = sortByStrength(cards.filter(c => c.value !== pairValue)).slice(0, 3)

  return [pairCards[0], pairCards[1], kickers[0], kickers[1], kickers[2]]
}

function getHighCard(cards: Card[]): FiveCards {
  const sorted = sortByStrength(cards)
  return [sorted[0], sorted[1], sorted[2], sorted[3], sorted[4]]
}

function evaluateBestHand(cards: Card[]): BestHand {
  const royalFlush = findRoyalFlush(cards)
  if (royalFlush) {
    return { cards: royalFlush, handStrength: HandStrength.RoyalFlush, highCards: royalFlush.map(c => CardStrength[c.value]) }
  }

  const straightFlush = findStraightFlush(cards)
  if (straightFlush) {
    return { cards: straightFlush, handStrength: HandStrength.StraightFlush, highCards: straightFlush.map(c => CardStrength[c.value]) }
  }

  const fourOfAKind = findFourOfAKind(cards)
  if (fourOfAKind) {
    return { cards: fourOfAKind, handStrength: HandStrength.FourOfAKind, highCards: fourOfAKind.map(c => CardStrength[c.value]) }
  }

  const fullHouse = findFullHouse(cards)
  if (fullHouse) {
    return { cards: fullHouse, handStrength: HandStrength.FullHouse, highCards: fullHouse.map(c => CardStrength[c.value]) }
  }

  const flush = findFlush(cards)
  if (flush) {
    return { cards: flush, handStrength: HandStrength.Flush, highCards: flush.map(c => CardStrength[c.value]) }
  }

  const straight = findStraight(cards)
  if (straight) {
    return { cards: straight, handStrength: HandStrength.Straight, highCards: straight.map(c => CardStrength[c.value]) }
  }

  const threeOfAKind = findThreeOfAKind(cards)
  if (threeOfAKind) {
    return { cards: threeOfAKind, handStrength: HandStrength.ThreeOfAKind, highCards: threeOfAKind.map(c => CardStrength[c.value]) }
  }

  const twoPair = findTwoPair(cards)
  if (twoPair) {
    return { cards: twoPair, handStrength: HandStrength.TwoPair, highCards: twoPair.map(c => CardStrength[c.value]) }
  }

  const onePair = findOnePair(cards)
  if (onePair) {
    return { cards: onePair, handStrength: HandStrength.OnePair, highCards: onePair.map(c => CardStrength[c.value]) }
  }

  const result = getHighCard(cards)
  const handStrength = HandStrength.HighCard
  return { cards: result, handStrength, highCards: result.map(c => CardStrength[c.value]) }
}

function compareHands(hand1: BestHand, hand2: BestHand): number {
  if (hand1.handStrength !== hand2.handStrength) {
    return hand1.handStrength - hand2.handStrength
  }

  for (let i = 0; i < hand1.highCards.length; i++) {
    if (hand1.highCards[i] !== hand2.highCards[i]) {
      return hand1.highCards[i] - hand2.highCards[i]
    }
  }

  return 0
}

export function HandEvaluator(board: FiveCards, firstHand: Hand, secondHand: Hand): GameResult {
  const player1Cards = [...board, ...firstHand]
  const player2Cards = [...board, ...secondHand]

  const player1Best = evaluateBestHand(player1Cards)
  const player2Best = evaluateBestHand(player2Cards)

  const comparison = compareHands(player1Best, player2Best)

  if (comparison > 0) {
    return { outcome: player1Best.handStrength, result: Result.Player1 }
  }
  else if (comparison < 0) {
    return { outcome: player2Best.handStrength, result: Result.Player2 }
  }
  else {
    return { outcome: player1Best.handStrength, result: Result.Tie }
  }
}
