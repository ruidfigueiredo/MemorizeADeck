using System;
using System.Collections.Generic;

namespace MemorizeADeck.ViewModels
{

    public interface IDeckBuilder
    {
        void IncludeSpades();
        void IncludeDiamonds();
        void IncludeClubs();
        void IncludeHearts();

        void Shuffle();
        IEnumerable<PlayingCard> Build();
    }

    public class DeckBuilder
    {
        private List<PlayingCard> _cards;
        private readonly IDeckShuffler _deckShuffler;

        public DeckBuilder()
        {
            _cards = new List<PlayingCard>();
            _deckShuffler = new DeckShuffler();
        }

        public void Shuffle()
        {
            _cards = new List<PlayingCard>(_deckShuffler.Shuffle(_cards));
        }

        public IEnumerable<PlayingCard> Build()
        {
            return _cards;
        }

        public void IncludeSpades()
        {
            _cards.AddRange(CreateCardsWithSuit(Suit.Spade));
        }

        public void IncludeDiamonds()
        {
            _cards.AddRange(CreateCardsWithSuit(Suit.Diamond));
        }

        public void IncludeClubs()
        {
            _cards.AddRange(CreateCardsWithSuit(Suit.Club));
        }

        public void IncludeHearts()
        {
            _cards.AddRange(CreateCardsWithSuit(Suit.Heart));
        }

        private IEnumerable<PlayingCard> CreateSpades()
        {
            return CreateCardsWithSuit(Suit.Spade);
        }

        private IEnumerable<PlayingCard> CreateDiamonds()
        {
            return CreateCardsWithSuit(Suit.Diamond);
        }

        private IEnumerable<PlayingCard> CreateClubs()
        {
            return CreateCardsWithSuit(Suit.Club);
        }

        private IEnumerable<PlayingCard> CreateHearts()
        {
            return CreateCardsWithSuit(Suit.Heart);
        }

                       
        private IEnumerable<PlayingCard> CreateCardsWithSuit(Suit suit)
        {
            foreach (Face face in (Face[])Enum.GetValues(typeof(Face)))
            {
                yield return new PlayingCard(suit, face);
            }
        }
    }
}
