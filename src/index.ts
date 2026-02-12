export enum Color {
  Hearth,
  Club,
  Spade,
  Diamond,
}

export interface Card {
  color: Color
  value: string
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

export interface GameResult {
  outcome: FiveCards
  result: Result
}

export function HandEvaluator(board: FiveCards, firstHand: Hand, secondHand: Hand): GameResult {

}

function defineBestHand(cards: Card[]): FiveCards {
  let royalFlush = false;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === "A") 
  }

  return [cards[0], cards[1], cards[2], cards[3], cards[4]];
}