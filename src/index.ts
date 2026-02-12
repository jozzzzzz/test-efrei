export enum Color {
  Heart,
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

interface GameResult {
  outcome: FiveCards
  result: Result
}

interface BestHand {
  cards: FiveCards,
  handStrentgh: HandStrength
}

function HandEvaluator(board: FiveCards, firstHand: Hand, secondHand: Hand): GameResult {

}

function defineBestHand(cards: Card[]): BestHand | undefined {
  const royalFlush = isRoyalFlushCards(cards);
  if (royalFlush !== false) {
    return { cards: royalFlush, handStrentgh: HandStrength.RoyalFlush };
  }
}

function isRoyalFlushCards(cards: Card[]): FiveCards | false {
  const suits = [Color.Heart, Color.Club, Color.Spade, Color.Diamond];
  const royalValues = ['10', 'J', 'Q', 'K', 'A'];

  for (const suit of suits) {
    const sameColorCards = cards.filter(card => card.color === suit);

    if (sameColorCards.length < 5) continue;

    const royalCards: Card[] = [];
    
    for (const val of royalValues) {
      const foundCard = sameColorCards.find(c => c.value === val);
      if (foundCard) {
        royalCards.push(foundCard);
      }
    }

    if (royalCards.length === 5) {
      return royalCards as FiveCards;
    }
  }

  return false;
}
