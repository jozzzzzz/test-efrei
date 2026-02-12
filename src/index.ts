enum Color {
  Hearth,
  Club,
  Spade,
  Diamond,
}

interface Hand {
  color: Color
  value: string
}

enum Result {
  Tie,
  Player1,
  Player2,
}

enum HandStrength {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalFlush,
}

interface GameResult {
  outcome: Outcome
  result: Result
}

function HandEvaluator(board: Hand[], firstHand: Hand[], secondHand: Hand[]): GameResult {

}
