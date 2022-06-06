using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using System.Linq;
using MemorizeADeck.ViewModels.HighScores;

namespace MemorizeADeck.ElectronCgiConnect
{
    public class HighScoreTable : IHighScoreTable
    {
        private const string HighScoreFileName = "highscores.json";

        public Task<IEnumerable<HighScore>> GetHighScoresAsync()
        {
            if (File.Exists(HighScoreFileName)) {
                string highscoresJson = File.ReadAllText(HighScoreFileName);
                return Task.FromResult(JsonConvert.DeserializeObject<IEnumerable<HighScore>>(highscoresJson));
            }
            return Task.FromResult(Enumerable.Empty<HighScore>());
            
        }

        public async Task SaveHighScoreAsync(int numberOfCards, TimeSpan memorizationTime)
        {
            var highscores = (await GetHighScoresAsync()).ToList();
            highscores.Add(new HighScore(numberOfCards, memorizationTime));
            File.WriteAllText(HighScoreFileName, JsonConvert.SerializeObject(highscores));
        }
    }
}