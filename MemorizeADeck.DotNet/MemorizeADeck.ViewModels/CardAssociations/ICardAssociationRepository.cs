using System.Collections.Generic;
using System.Threading.Tasks;

namespace MemorizeADeck.ViewModels.CardAssociations
{
    public interface ICardAssociationRepository
    {
        Task<IEnumerable<CardAssociationViewModel>> GetAssociationsAsync();
        Task SaveAssociationsAsync(IEnumerable<CardAssociationViewModel> associations);        
    }
}
