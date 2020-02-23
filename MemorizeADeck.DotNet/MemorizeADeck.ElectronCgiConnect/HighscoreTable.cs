
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Blinkingcaret.MemorizeADeck.ViewModels.Highscores;
using Newtonsoft.Json;
using System.Linq;

namespace MemorizeADeck.ElectronCgiConnect
{
    public class HighscoreTable : IHighscoreTable
    {
        private const string HighscoreFileName = "highscores.json";

        public Task<IEnumerable<Highscore>> GetHighscoresAsync()
        {
            if (File.Exists(HighscoreFileName)) {
                string highscoresJson = File.ReadAllText(HighscoreFileName);
                return Task.FromResult(JsonConvert.DeserializeObject<IEnumerable<Highscore>>(highscoresJson));
            }
            return Task.FromResult(Enumerable.Empty<Highscore>());
            
        }

        public async Task SaveHighScoreAsync(int numberOfCards, TimeSpan memorizationTime)
        {
            var highscores = (await GetHighscoresAsync()).ToList();
            highscores.Add(new Highscore(numberOfCards, memorizationTime));
            File.WriteAllText(HighscoreFileName, JsonConvert.SerializeObject(highscores));
        }
    }
}