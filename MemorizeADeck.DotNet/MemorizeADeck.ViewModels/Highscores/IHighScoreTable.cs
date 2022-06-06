using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MemorizeADeck.ViewModels.HighScores
{
    public interface IHighScoreTable
    {
        Task SaveHighScoreAsync(int numberOfCards, TimeSpan memorizationTime);
        Task<IEnumerable<HighScore>> GetHighScoresAsync();
    }


}
