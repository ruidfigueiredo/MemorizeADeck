namespace Blinkingcaret.Cards
{
    public enum Suit
    {
        Diamond,
        Heart,
        Club,
        Spade
    }

    public enum Face
    {
        Ace,
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
        Nine,
        Ten,
        Jack,
        Queen,
        King
    }

    public class PlayingCard
    {
        public Suit Suit { get; set; }
        public Face Face { get; set; }


        public PlayingCard()
        {
            Suit = Suit.Club;
            Face = Face.Ace;
        }

        public PlayingCard(Suit suit, Face face)
        {
            Suit = suit;
            Face = face;
        }

        public override bool Equals(object obj)
        {
            if (!(obj is PlayingCard)) return false;

            PlayingCard card = (PlayingCard)obj;
            return card.Suit == Suit && card.Face == Face;
        }

        public override int GetHashCode()
        {
            return (Suit.ToString() + Face.ToString()).GetHashCode();
        }

        public override string ToString()
        {
            return Face + "|" + Suit;
        }
    }
}
