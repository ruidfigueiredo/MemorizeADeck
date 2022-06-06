using System;

namespace MemorizeADeck.ViewModels.HighScores
{
    public class HighScore
    {
        public int NumberOfCards { get; private set; }
        public TimeSpan MemorizationTime { get; private set; }

        public HighScore(int numberOfCards, TimeSpan memorizationTime)
        {
            NumberOfCards = numberOfCards;
            MemorizationTime = memorizationTime;
        }

        public override bool Equals(object obj)
        {
            if (!(obj is HighScore)) return false;
            HighScore highScore = (HighScore)obj;
            return NumberOfCards == highScore.NumberOfCards && MemorizationTime == highScore.MemorizationTime;
        }

        public override int GetHashCode()
        {
            return (NumberOfCards + MemorizationTime.ToString()).GetHashCode();
        }
    }

}
