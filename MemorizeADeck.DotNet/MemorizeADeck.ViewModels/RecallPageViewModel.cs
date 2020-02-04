using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Blinkingcaret.Cards;
using Blinkingcaret.Mvvm;

namespace Blinkingcaret.MemorizeADeck.ViewModels
{
    public delegate void RecallCompletedHandler(TimeSpan memorizationTime);
    public class RecallPageViewModel : BindableBase
    {
        private Suit? _selectedSuit;
        private Face? _selectedFace;
        private int _indexOfCardToRemember;
        private PlayingCard[] _cardsToRemember;
        private TimeSpan _memorizationTime;

        public RecallPageViewModel()
        {
            CardsRemembered = new ObservableCollection<PlayingCard>();
            SelectFaceCommand = new DelegateCommand(ExecuteSelectFace, CanExecuteSelect);
            SelectSuitCommand = new DelegateCommand(ExecuteSelectSuit, CanExecuteSelect);
            ShowNextCardCommand = new DelegateCommand(ExecuteShowNextCard, CanExecuteShowNextCard);
            _cardsToRemember = new PlayingCard[] { };            
        }

        public event RecallCompletedHandler RecallCompleted;
        public event EventHandler HintConfirmationRequired;
        
        public ObservableCollection<PlayingCard> CardsRemembered {get; private set;}        

        public Suit? SelectedSuit
        {
            get { return _selectedSuit; }
            set {
                if (_selectedSuit != value)
                {
                    UpdatePropertyAndRaisePropertyChanged(ref _selectedSuit, value);
                    RaisePropertyChanged("IsClubSelected");
                    RaisePropertyChanged("IsDiamondSelected");
                    RaisePropertyChanged("IsHeartSelected");
                    RaisePropertyChanged("IsSpadeSelected");
                }
            }
        }
        public Face? SelectedFace
        {
            get { return _selectedFace; }
            set
            {
                if (_selectedFace != value)
                {
                    UpdatePropertyAndRaisePropertyChanged(ref _selectedFace, value);
                    RaisePropertyChanged("IsTwoSelected");
                    RaisePropertyChanged("IsThreeSelected");
                    RaisePropertyChanged("IsFourSelected");
                    RaisePropertyChanged("IsFiveSelected");
                    RaisePropertyChanged("IsSixSelected");
                    RaisePropertyChanged("IsSevenSelected");
                    RaisePropertyChanged("IsEightSelected");
                    RaisePropertyChanged("IsNineSelected");
                    RaisePropertyChanged("IsTenSelected");
                    RaisePropertyChanged("IsJackSelected");
                    RaisePropertyChanged("IsQueenSelected");
                    RaisePropertyChanged("IsKingSelected");
                    RaisePropertyChanged("IsAceSelected");
                }
            }
        }

        public bool IsClubSelected { get { return SelectedSuit == Suit.Club; } }
        public bool IsDiamondSelected { get { return SelectedSuit == Suit.Diamond; } }
        public bool IsHeartSelected { get { return SelectedSuit == Suit.Heart; } }
        public bool IsSpadeSelected { get { return SelectedSuit == Suit.Spade; } }

        public bool IsTwoSelected { get { return SelectedFace == Face.Two; } }
        public bool IsThreeSelected { get { return SelectedFace == Face.Three; } }
        public bool IsFourSelected { get { return SelectedFace == Face.Four; } }
        public bool IsFiveSelected { get { return SelectedFace == Face.Five; } }
        public bool IsSixSelected { get { return SelectedFace == Face.Six; } }
        public bool IsSevenSelected { get { return SelectedFace == Face.Seven; } }
        public bool IsEightSelected { get { return SelectedFace == Face.Eight; } }
        public bool IsNineSelected { get { return SelectedFace == Face.Nine; } }
        public bool IsTenSelected { get { return SelectedFace == Face.Ten; } }
        public bool IsJackSelected { get { return SelectedFace == Face.Jack; } }
        public bool IsQueenSelected { get { return SelectedFace == Face.Queen; } }
        public bool IsKingSelected { get { return SelectedFace == Face.King; } }
        public bool IsAceSelected { get { return SelectedFace == Face.Ace; } }
        

        public IDelegateCommand SelectSuitCommand { get; private set; }
        public IDelegateCommand SelectFaceCommand { get; private set; }
        public IDelegateCommand ShowNextCardCommand { get; private set; }

        public virtual bool HasHintBeenConfirmed { get; set; }

        internal void ExecuteSelectSuit(object parameter)
        {
            var canExecuteSelect = CanExecuteSelect();
            SelectedSuit = (Suit)parameter;
            if (IsFullSelection() && IsCorrectCard())
            {
                AddCardToRememberedCards();
                ClearSelection();
            }
            if (canExecuteSelect != CanExecuteSelect())
            {
                SelectSuitCommand.RaiseCanExecuteChanged();
                SelectFaceCommand.RaiseCanExecuteChanged();
            }            
        }

        internal void ExecuteSelectFace(object parameter)
        {
            var canExecuteSelect = CanExecuteSelect();
            SelectedFace = (Face)parameter;
            if (IsFullSelection() && IsCorrectCard())
            {
                AddCardToRememberedCards();
                ClearSelection();
            }
            if (canExecuteSelect != CanExecuteSelect()) 
            {
                SelectSuitCommand.RaiseCanExecuteChanged();
                SelectFaceCommand.RaiseCanExecuteChanged();
            }
        }

        internal bool CanExecuteSelect(object parameter = null)
        {
            return !AreAllCardsRemembered();
        }
        
        internal virtual bool HasMoreCardsToRecall
        {
            get
            {
                return !AreAllCardsRemembered();
            }
        }        

        internal void ExecuteShowNextCard(object parameter = null)
        {
            if (!HasMoreCardsToRecall) return;
            if (!HasHintBeenConfirmed)
            {
                RaiseHintConfirmationRequired();
                return;
            }
            AddCardToRememberedCards();
            ClearSelection();
        }


        internal bool CanExecuteShowNextCard(object parameter = null)
        {
            return HasMoreCardsToRecall;
        }


        private bool AreAllCardsRemembered()
        {
            return _indexOfCardToRemember == _cardsToRemember.Length;
        }



        private void AddCardToRememberedCards()
        {
            CardsRemembered.Add(_cardsToRemember[_indexOfCardToRemember]);
            _indexOfCardToRemember++;
            if (AreAllCardsRemembered())
            {
                ShowNextCardCommand.RaiseCanExecuteChanged();
                RaiseRecallCompleted(_memorizationTime);
            }
        }

        public bool IsCorrectCard()
        {
            if (!(SelectedSuit.HasValue && SelectedFace.HasValue)) return false;

            var cardToRemember = _cardsToRemember[_indexOfCardToRemember];
            return cardToRemember.Suit == SelectedSuit.Value && cardToRemember.Face == SelectedFace.Value;
        }

        private bool IsFullSelection()
        {
            return SelectedFace.HasValue && SelectedSuit.HasValue;
        }

        private void ClearSelection()
        {
            SelectedFace = null;
            SelectedSuit = null;
        }

        public void Init(IEnumerable<PlayingCard> cardsToRemember, TimeSpan memorizationTime)
        {
            _cardsToRemember = cardsToRemember.ToArray();
            _indexOfCardToRemember = 0;
            _memorizationTime = memorizationTime;
        }

        private void RaiseRecallCompleted(TimeSpan memorizationTime)
        {
            var handler = RecallCompleted;
            if (handler != null)
                handler(memorizationTime);
        }

        private void RaiseHintConfirmationRequired()
        {
            var handler = HintConfirmationRequired;
            if (handler != null)
                handler(this, EventArgs.Empty);
        }
    }
}
