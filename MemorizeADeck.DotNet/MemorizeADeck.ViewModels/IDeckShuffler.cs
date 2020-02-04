using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blinkingcaret.Cards
{
    public interface IDeckShuffler
    {
        IEnumerable<PlayingCard> Shuffle(IEnumerable<PlayingCard> cards);
    }
}
