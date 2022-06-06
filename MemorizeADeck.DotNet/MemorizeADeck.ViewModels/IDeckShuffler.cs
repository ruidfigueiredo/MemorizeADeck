using System.Collections.Generic;

namespace MemorizeADeck.ViewModels
{
    public interface IDeckShuffler
    {
        IEnumerable<PlayingCard> Shuffle(IEnumerable<PlayingCard> cards);
    }
}
