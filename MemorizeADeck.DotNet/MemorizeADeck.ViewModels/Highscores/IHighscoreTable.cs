using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blinkingcaret.MemorizeADeck.ViewModels.Highscores
{
    public interface IHighscoreTable
    {
        Task SaveHighScoreAsync(int numberOfCards, TimeSpan memorizationTime);
        Task<IEnumerable<Highscore>> GetHighscoresAsync();
    }


}
