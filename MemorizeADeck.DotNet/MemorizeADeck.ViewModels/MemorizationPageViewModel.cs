using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using MemorizeADeck.ViewModels.CardAssociations;

namespace MemorizeADeck.ViewModels
{
    public delegate void MemorizationCompletedHandler(IEnumerable<PlayingCard> cardsMemorized, TimeSpan ellapsedTime);

    public class MemorizationPageViewModel : BindableBase
    {
        private IDeck _deck;
        private PlayingCard _currentCard;
        private readonly ITimeTracker _timeTracker;
        private ICardAssociationRepository _cardAssociationRepository;

        //So that we can still use the parameterless constructor to instantiate the viewModel in XAML and then in the page's code behind set the repo
        public ICardAssociationRepository CardAssociationRepository
        {
            set => _cardAssociationRepository = value;
        }


        public MemorizationPageViewModel(IDeck deck, ITimeTracker timeTracker, ICardAssociationRepository repo)
            : this()
        {
            _timeTracker = timeTracker;
            _deck = deck;
            _cardAssociationRepository = repo;
        }

        public MemorizationPageViewModel()
        {
            CardsSeen = new ObservableCollection<PlayingCard>();
            DeckBuilder deckBuilder = new DeckBuilder();
            deckBuilder.IncludeSpades();
            deckBuilder.IncludeDiamonds();
            deckBuilder.IncludeClubs();
            deckBuilder.IncludeHearts();
            deckBuilder.Shuffle();
            _deck = new Deck(deckBuilder.Build());
            TurnCardCommand = new DelegateCommand(ExecuteTurnCard, CanExecuteTurnCard);
            StopCommand = new DelegateCommand(ExecuteStop, CanExecuteStop);
            _timeTracker = new TimeTracker();
        }

        public void InitDeck(bool includeSpades, bool includeDiamonds, bool includeClubs, bool includeHearts)
        {
            DeckBuilder deckBuilder = new DeckBuilder();
            if (includeSpades)
                deckBuilder.IncludeSpades();
            if (includeDiamonds)
                deckBuilder.IncludeDiamonds();
            if (includeClubs)
                deckBuilder.IncludeClubs();
            if (includeHearts)
                deckBuilder.IncludeHearts();
            deckBuilder.Shuffle();
            _deck = new Deck(deckBuilder.Build());
        }

        public event MemorizationCompletedHandler MemorizationCompleted;

        public IDelegateCommand TurnCardCommand { get; private set; }
        public IDelegateCommand StopCommand { get; private set; }

        public PlayingCard CurrentCard
        {
            get => _currentCard;
            set
            {
                if (object.Equals(_currentCard, value)) return;
                UpdatePropertyAndRaisePropertyChanged(ref _currentCard, value);
                RaisePropertyChanged("CardAssociation");
            }
        }

        private IEnumerable<CardAssociationViewModel> _cardAssociations;

        public async Task LoadCardAssociationsAsync()
        {
            _cardAssociations = await _cardAssociationRepository.GetAssociationsAsync();
        }

        public string CardAssociation
        {
            get
            {
                if (CurrentCard == null || _cardAssociations == null) return string.Empty;
                var cardAssociation = _cardAssociations.Single(a => a.PlayingCard.Equals(CurrentCard));
                return cardAssociation.Association;
            }
        }

        private bool _isCardAssociationVisible;

        public bool IsCardAssociationVisible
        {
            get { return _isCardAssociationVisible; }
            set
            {
                if (_isCardAssociationVisible == value) return;
                UpdatePropertyAndRaisePropertyChanged(ref _isCardAssociationVisible, value);
            }
        }

        public ObservableCollection<PlayingCard> CardsSeen { get; private set; }

        //hack: there's no timer in PCL yet: http://stackoverflow.com/questions/12555049/timer-in-portable-library
        //view has the timer and queries the vm for the ellapsed time
        public string EllapsedTime
        {
            get { return _timeTracker.EllapsedTime == TimeSpan.FromSeconds(0) ? string.Empty : _timeTracker.EllapsedTime.ToString(@"mm\:ss"); }
        }

        public bool IsCurrentCardVisible
        {
            get
            {
                return CurrentCard != null;
            }
        }

        public bool IsLastCard
        {
            get
            {
                return CardsNotSeenCount == 0;
            }
        }

        public int CardsNotSeenCount
        {
            get
            {
                return _deck.CardsNotTurnedCount;
            }
        }

        private bool IsNoCardTurnedYet()
        {
            return CardsSeen.Count == 0 && CurrentCard == null;
        }

        internal void ExecuteTurnCard(object param = null)
        {
            var isCurrentCardVisibleBefore = IsCurrentCardVisible;
            var canExecuteStop = CanExecuteStop();
            var canExecute = CanExecuteTurnCard(param);

            if (IsNoCardTurnedYet())
                _timeTracker.Start();
            else
                CardsSeen.Add(CurrentCard);


            if (_deck.HasMoreCards())
            {
                _deck.TurnCard();
                CurrentCard = _deck.CurrentCard;
            }
            else
                CurrentCard = null;


            RaisePropertyChanged("CardsNotSeenCount");

            if (canExecute != CanExecuteTurnCard(param))
                TurnCardCommand.RaiseCanExecuteChanged();

            if (isCurrentCardVisibleBefore != IsCurrentCardVisible)
                RaisePropertyChanged("IsCurrentCardVisible");

            if (canExecuteStop != CanExecuteStop())
                StopCommand.RaiseCanExecuteChanged();

            if (!_deck.HasMoreCards()) RaisePropertyChanged("IsLastCard");
        }

        internal bool CanExecuteTurnCard(object param = null)
        {
            return _deck.HasMoreCards() || CurrentCard != null;
        }

        internal void ExecuteStop(object param = null)
        {
            if (CardsSeen.Count == 0 && IsNoCardTurnedYet()) return;
            var cardsMemorized = CardsSeen.ToList();
            if (IsCurrentCardVisible)
                cardsMemorized.Add(CurrentCard);
            RaiseMemorizationCompleted(cardsMemorized);
        }

        internal bool CanExecuteStop(object param = null)
        {
            return !IsNoCardTurnedYet();
        }

        private void RaiseMemorizationCompleted(IEnumerable<PlayingCard> memorizedCards)
        {
            var handler = MemorizationCompleted;
            if (handler != null)
                handler(memorizedCards, _timeTracker.EllapsedTime);
        }

    }
}
