using System;

namespace Blinkingcaret.MemorizeADeck.ViewModels.Highscores
{
    public class Highscore
    {
        public int NumberOfCards { get; private set; }
        public TimeSpan MemorizationTime { get; private set; }

        public Highscore(int numberOfCards, TimeSpan memorizationTime)
        {
            NumberOfCards = numberOfCards;
            MemorizationTime = memorizationTime;
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Highscore)) return false;
            Highscore highscore = (Highscore)obj;
            return NumberOfCards == highscore.NumberOfCards && MemorizationTime == highscore.MemorizationTime;
        }

        public override int GetHashCode()
        {
            return (NumberOfCards + MemorizationTime.ToString()).GetHashCode();
        }
    }

}
