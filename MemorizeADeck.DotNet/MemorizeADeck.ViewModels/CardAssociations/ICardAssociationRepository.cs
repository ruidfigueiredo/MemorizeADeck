using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blinkingcaret.MemorizeADeck.ViewModels.CardAssociations
{
    public interface ICardAssociationRepository
    {
        Task<IEnumerable<CardAssociationViewModel>> GetAssociationsAsync();
        Task SaveAssociationsAsync(IEnumerable<CardAssociationViewModel> associations);        
    }
}
