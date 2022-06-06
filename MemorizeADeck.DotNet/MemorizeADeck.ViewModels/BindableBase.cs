using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace MemorizeADeck.ViewModels
{
    public class BindableBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        protected void UpdatePropertyAndRaisePropertyChanged<T>(ref T storage, T newValue, [CallerMemberName] string propertyName = null)
        {        
            storage = newValue;
            RaisePropertyChanged(propertyName);
        }

        protected void RaisePropertyChanged([CallerMemberName] string propertyName = null)
        {
            var handler = PropertyChanged;
            if (handler != null)
                handler(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
