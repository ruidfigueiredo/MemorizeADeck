using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blinkingcaret.Cards
{
    public interface IDeck
    {
        PlayingCard CurrentCard { get; }
        void TurnCard();
        bool HasMoreCards();
        bool HasNoCardsTurned();
        void Restart();
        int CardsNotTurnedCount { get; }
    }
}
