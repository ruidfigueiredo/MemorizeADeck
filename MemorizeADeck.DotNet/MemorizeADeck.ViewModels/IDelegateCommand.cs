using System.Windows.Input;

namespace MemorizeADeck.ViewModels
{
    public interface IDelegateCommand : ICommand
    {
        void RaiseCanExecuteChanged();
    }
}
