# Pages

- Memorization
- Recall
- CardAssociation


## Memorization

### (Bindable) Properties

- CurrentCard
- CardAssociation
  - need to be loaded at start (see Init and LoadCardAssociationsAsync)
- IsCardAssociationVisible
- CardsSeen
- EllapsedTime
    - Timer is updated from the view (this needs to happen from react to keep the example "faithful" to the original?):

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            dynamic suitsSelected = e.Parameter;

            _viewModel.InitDeck(suitsSelected.IncludeSpades, suitsSelected.IncludeDiamonds, suitsSelected.IncludeClubs, suitsSelected.IncludeHearts);

            _timer.Interval = TimeSpan.FromMilliseconds(500);
            _timer.Tick += (_, __) =>
            {
                EllapsedTimeTextBox.Text = _viewModel.EllapsedTime;
            };
            _timer.Start();
            
        }

- IsCurrentCardVisible
- IsLastCard
- CardsNotSeenCount

### Actions

- TurnCard
- Stop

### Events

- MemorizationCompletedHandler(`IEnumerable<PlayingCard>` cardsMemorized, TimeSpan ellapsedTime)

## Recall
 
Needs init: 
`void Init(IEnumerable<PlayingCard> cardsToRemember, TimeSpan memorizationTime)`

### (Bindable) Properties

- CardsRemembered (`ObservableCollection<PlayingCard>`)
- IsClubSelected
- IsDiamondSelected
- IsHeartSelected
- IsSpadeSelected

- IsTwoSelected
- IsThreeSelected
- IsFourSelected
- IsFiveSelected
- IsSixSelected
- IsSevenSelected
- IsEightSelected
- IsNineSelected
- IsTenSelected
- IsJackSelected
- IsQueenSelected
- IsKingSelected
- IsAceSelected


### Actions
 - SelectFace
 - SelectSuit
 - ShowNextCard
 - HasHintBeenConfirmed (from node to .net true/false)

### Events
- RecallCompleted(Timespan memorizationTime)
- HintConfirmationRequired -> sends event to nodejs
