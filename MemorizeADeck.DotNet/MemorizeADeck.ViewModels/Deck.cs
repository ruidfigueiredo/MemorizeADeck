using System;
using System.Collections.Generic;
using System.Linq;

namespace MemorizeADeck.ViewModels
{
    public class Deck : IDeck
    {
        private PlayingCard[] _cards;
        private int _index;

        public Deck(IEnumerable<PlayingCard> cards)
        {
            _index = -1;
            _cards = cards.ToArray();
        }


        public PlayingCard CurrentCard
        {
            get
            {
                if (HasNoCardsTurned()) throw new InvalidOperationException("No card was turned yet");

                return _cards[_index];
            }
        }

        public void TurnCard()
        {
            if (!HasMoreCards()) throw new InvalidOperationException("No more cards to turn");
            _index++;
        }

        public bool HasMoreCards()
        {
            return _index < _cards.Length - 1;
        }

        public bool HasNoCardsTurned()
        {
            return _index == -1;
        }

        public void Restart()
        {
            _index = -1;
        }


        public int CardsNotTurnedCount
        {
            get
            {
                return _cards.Length - (_index + 1);
            }
        }
    }
}
