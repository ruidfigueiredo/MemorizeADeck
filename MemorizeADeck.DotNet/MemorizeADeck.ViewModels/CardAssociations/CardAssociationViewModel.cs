namespace MemorizeADeck.ViewModels.CardAssociations
{
    public class CardAssociationViewModel : BindableBase
    {
        private PlayingCard _playingCard;
        public PlayingCard PlayingCard
        {
            get { return _playingCard; }
            set
            {
                UpdatePropertyAndRaisePropertyChanged(ref _playingCard, value);
            }
        }

        private string _association;

        public string Association
        {
            get { return _association; }
            set 
            {
                UpdatePropertyAndRaisePropertyChanged(ref _association, value);
            }
        }
    }
}
