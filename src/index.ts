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

export type Board = [
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

export interface GameResult {
  outcome: HandStrength
  result: Result
}

export function HandEvaluator(board: Board, firstHand: Hand, secondHand: Hand): GameResult {

}
