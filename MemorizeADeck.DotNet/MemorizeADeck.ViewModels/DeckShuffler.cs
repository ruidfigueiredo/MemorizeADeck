using System;
using System.Collections.Generic;
using System.Linq;

namespace MemorizeADeck.ViewModels
{
    public class DeckShuffler : IDeckShuffler
    {
        private readonly Random _random;

        public DeckShuffler()
        {
            _random = new Random((int)DateTime.Now.Ticks % int.MaxValue);
        }

        public IEnumerable<PlayingCard> Shuffle(IEnumerable<PlayingCard> cards)
        {
            PlayingCard[] shuffledCards = cards.ToArray();
            int numberOfCards = shuffledCards.Length;
            for (int i = 0; i < numberOfCards; i++)
            {
                var randomIndex = _random.Next(numberOfCards);
                var cardToSwap = shuffledCards[randomIndex];
                shuffledCards[randomIndex] = shuffledCards[i];
                shuffledCards[i] = cardToSwap;
            }
            return shuffledCards;
        }
    }
}
