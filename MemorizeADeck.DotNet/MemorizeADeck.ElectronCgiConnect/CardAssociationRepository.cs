using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blinkingcaret.Cards;
using Blinkingcaret.MemorizeADeck.ViewModels.CardAssociations;
using Newtonsoft.Json;

namespace MemorizeADeck.ElectronCgiConnect
{
    public class CardAssociationRepository : ICardAssociationRepository
    {
        const string CustomAssociationsFileName = "associations.json";
        const string DefaultAssociationsFileName = "defaultAssociations.json";
        class CardAssociation
        {
            public Suit Suit { get; set; }
            public Face Face { get; set; }
            public string Association { get; set; }

            public CardAssociation()
            {
            }
            public CardAssociation(Suit suit, Face face, string association)
            {
                Suit = suit;
                Face = face;
                Association = association;
            }
        }

        private IEnumerable<CardAssociationViewModel> _cardAssociations;

        public CardAssociationViewModel GetCardAssociationAsync(PlayingCard card)
        {
            if (_cardAssociations == null)
            {
                Task.Run(() => _cardAssociations = GetAssociationsAsync().Result).Wait();
            }

            return _cardAssociations.Single(association => association.PlayingCard.Equals(card));
        }

        public async Task<IEnumerable<CardAssociationViewModel>> GetAssociationsAsync()
        {
            List<CardAssociation> associations = null;
            associations = await LoadAssociationsFromDisk();
            if (associations != null) return ConvertStorageAssociationsToViewModelAssociations(associations);

            return await LoadDefaultAssociationsAsync();
        }

        private async Task<IEnumerable<CardAssociationViewModel>> LoadDefaultAssociationsAsync()
        {
            var associationsJson = await ReadPathFileContentsAndReturnNullIfFileDoesNotExistAsync(DefaultAssociationsFileName);
            if (associationsJson == null)
                throw new InvalidOperationException("Missing association's json file in assets");
            return ConvertStorageAssociationsToViewModelAssociations(DeserializeAssociations(associationsJson));
        }

        private async Task<List<CardAssociation>> LoadAssociationsFromDisk()
        {
            string associationsJson = await ReadPathFileContentsAndReturnNullIfFileDoesNotExistAsync(CustomAssociationsFileName);
            if (string.IsNullOrEmpty(associationsJson))
                return null;
            return DeserializeAssociations(associationsJson);
        }

        private async Task<string> ReadPathFileContentsAndReturnNullIfFileDoesNotExistAsync(string path)
        {
            string contents = null;
            try
            {
                using (var reader = File.OpenText(path))
                {
                    contents = await reader.ReadToEndAsync();
                }
            }
            catch (FileNotFoundException) { }
            return contents;
        }


        public async Task SaveAssociationsAsync(IEnumerable<CardAssociationViewModel> associations)
        {
            _cardAssociations = null;
            IEnumerable<CardAssociation> storageAssociations = ConvertViewModelAssociationsToStorageAssociations(associations);
            var storageAssociationsJson = SerializeAssociations(storageAssociations.ToList());
            await File.WriteAllTextAsync(CustomAssociationsFileName, storageAssociationsJson);
        }

        private string SerializeAssociations(List<CardAssociation> associations)
        {
            return JsonConvert.SerializeObject(associations);
        }
        private List<CardAssociation> DeserializeAssociations(string associationsJson)
        {
            return JsonConvert.DeserializeObject<List<CardAssociation>>(associationsJson);
        }

        private IEnumerable<CardAssociationViewModel> ConvertStorageAssociationsToViewModelAssociations(List<CardAssociation> associations)
        {
            return associations.Select(a => new CardAssociationViewModel
            {
                PlayingCard = new PlayingCard(a.Suit, a.Face),
                Association = a.Association
            });
        }

        private IEnumerable<CardAssociation> ConvertViewModelAssociationsToStorageAssociations(IEnumerable<CardAssociationViewModel> associations)
        {
            return associations.Select(a => new CardAssociation
            {
                Suit = a.PlayingCard.Suit,
                Face = a.PlayingCard.Face,
                Association = a.Association
            });
        }



        //mixed responsabilities (will this come back and bite me sometime in the future?)
        //-Serialize/Deserialize StorageCards
        //-StorageRepresentation of playingcards - association
        //Conversion between Stoirage association and VM
        //shady behavior on GetAssociation (stores associations, clears on Save)
    }
}