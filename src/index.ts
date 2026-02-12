enum Color {
  Hearth,
  Club,
  Spade,
  Diamond,
}

interface Card {
  color: Color
  value: string
}

type Board = [
  Card,
  Card,
  Card,
  Card,
  Card
]

type Hand = [
  Card,
  Card
]

enum Result {
  Tie,
  Player1,
  Player2,
}

enum HandStrength {
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

interface GameResult {
  outcome: HandStrength
  result: Result
}

function HandEvaluator(board: Board, firstHand: Hand, secondHand: Hand): GameResult {

}
