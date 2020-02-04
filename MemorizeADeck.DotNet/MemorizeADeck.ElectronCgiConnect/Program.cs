using System;
using System.Collections.Generic;
using Blinkingcaret.Cards;
using Blinkingcaret.MemorizeADeck.ViewModels;
using ElectronCgi.DotNet;

namespace MemorizeADeck.ElectronCgiConnect
{
    class Program
    {
        static void SetupMemorizationPageViewModel(Connection connection)
        {
            MemorizationPageViewModel memorizationPageViewModel = null;
            connection.OnAsync<dynamic>("memorization.start", async options =>
            {
                memorizationPageViewModel = new MemorizationPageViewModel();
                memorizationPageViewModel.CardAssocationRepository = new CardAssociationRepository();
                await memorizationPageViewModel.LoadCardAssociationsAsync();
                memorizationPageViewModel.InitDeck(
                    (bool)options.IncludeSpades,
                    (bool)options.IncludeDiamonds,
                    (bool)options.IncludeClubs,
                    (bool)options.IncludeHearts);


                //send initial value for properties in view model:
                connection.Send("memorization.currentCard", memorizationPageViewModel.CurrentCard);
                connection.Send("memorization.cardAssociation", memorizationPageViewModel.CardAssociation);
                connection.Send("memorization.isCurrentCardVisible", memorizationPageViewModel.IsCurrentCardVisible);
                connection.Send("memorization.isCardAssociationVisible", memorizationPageViewModel.IsCardAssociationVisible);
                connection.Send("memorization.isLastCard", memorizationPageViewModel.IsLastCard);
                connection.Send("memorization.cardsNotSeenCount", memorizationPageViewModel.CardsNotSeenCount);
                connection.Send("memorization.cardsSeen", memorizationPageViewModel.CardsSeen);
                
                memorizationPageViewModel.PropertyChanged += (_, propertyChangedEventArgs) =>
                {
                    switch (propertyChangedEventArgs.PropertyName)
                    {
                        case "CurrentCard":
                            connection.Send("memorization.currentCard", memorizationPageViewModel.CurrentCard);
                            break;
                        case "CardAssociation":
                            connection.Send("memorization.cardAssociation", memorizationPageViewModel.CardAssociation);
                            break;
                        case "IsCardAssociationVisible":
                            connection.Send("memorization.isCardAssociationVisible", memorizationPageViewModel.IsCardAssociationVisible);
                            break;
                        case "IsCurrentCardVisible":
                            connection.Send("memorization.isCurrentCardVisible", memorizationPageViewModel.IsCurrentCardVisible);
                            break;
                        case "IsLastCard":
                            connection.Send("memorization.isLastCard", memorizationPageViewModel.IsLastCard);
                            break;
                        case "CardsNotSeenCount":
                            connection.Send("memorization.cardsNotSeenCount", memorizationPageViewModel.CardsNotSeenCount);
                            break;
                        default:
                            Console.Error.WriteLine("Unhandled propertychange event: " + propertyChangedEventArgs.PropertyName);
                            break;
                    }
                };

                memorizationPageViewModel.MemorizationCompleted += (IEnumerable<PlayingCard> cardsMemorized, TimeSpan memorizationTime) =>
                {
                    connection.Send("memorization.complete", new
                    {
                        CardsMemorized = cardsMemorized,
                        MemorizationTime = memorizationTime
                    });
                };

                memorizationPageViewModel.CardsSeen.CollectionChanged += (e, args) =>
                {
                    connection.Send("memorization.cardsSeen", memorizationPageViewModel.CardsSeen);
                };
            });

            connection.On("memorization.ellapsedTime", () =>
            {
                return memorizationPageViewModel.EllapsedTime;
            });

            connection.On("memorization.turnCard", () =>
            {
                if (memorizationPageViewModel.TurnCardCommand.CanExecute(null))
                {
                    memorizationPageViewModel.TurnCardCommand.Execute(null);
                    return true;
                }
                return false;
            });

            connection.On("memorization.stop", () =>
            {
                if (memorizationPageViewModel.StopCommand.CanExecute(null))
                {
                    memorizationPageViewModel.StopCommand.Execute(null);
                    return true;
                }
                return false;
            });

            connection.On("memorization.toggleIsCardAssociationVisible", () => {
                memorizationPageViewModel.IsCardAssociationVisible = !memorizationPageViewModel.IsCardAssociationVisible;
            });
        }
        class RecalPageStartParameters
        {
            public IEnumerable<PlayingCard> CardsMemorized { get; set; }
            public TimeSpan MemorizationTime { get; set; }
        }


        static void SetupRecallPageViewModel(Connection connection)
        {
            RecallPageViewModel viewModel = null;
            connection.On<RecalPageStartParameters>("recall.start", arg =>
            {
                viewModel = new RecallPageViewModel();
                viewModel.Init(arg.CardsMemorized, arg.MemorizationTime);

                viewModel.CardsRemembered.CollectionChanged += (e, args) =>
                {
                    connection.Send("recall.cardsRemembered", viewModel.CardsRemembered);
                };

                viewModel.RecallCompleted += memorizationTime =>
                {
                    connection.Send("recall.completed", memorizationTime);
                };

                viewModel.PropertyChanged += (_, propertyChangedEventArgs) =>
                {
                    switch (propertyChangedEventArgs.PropertyName)
                    {
                        case "IsClubSelected":
                            connection.Send("recall.isClubSelected", viewModel.IsClubSelected);
                            break;
                        case "IsDiamondSelected":
                            connection.Send("recall.isDiamondSelected", viewModel.IsDiamondSelected);
                            break;
                        case "IsHeartSelected":
                            connection.Send("recall.isHeartSelected", viewModel.IsHeartSelected);
                            break;
                        case "IsSpadeSelected":
                            connection.Send("recall.isSpadeSelected", viewModel.IsSpadeSelected);
                            break;
                        case "IsTwoSelected":
                            connection.Send("recal.isTwoSelected", viewModel.IsTwoSelected);
                            break;
                        case "IsThreeSelected":
                            connection.Send("recal.isThreeSelected", viewModel.IsThreeSelected);
                            break;
                        case "IsFourSelected":
                            connection.Send("recal.isFourSelected", viewModel.IsFourSelected);
                            break;
                        case "IsFiveSelected":
                            connection.Send("recal.isFiveSelected", viewModel.IsFiveSelected);
                            break;
                        case "IsSixSelected":
                            connection.Send("recal.isSixSelected", viewModel.IsSixSelected);
                            break;
                        case "IsSevenSelected":
                            connection.Send("recal.isSevenSelected", viewModel.IsSevenSelected);
                            break;
                        case "IsEightSelected":
                            connection.Send("recal.isEightSelected", viewModel.IsEightSelected);
                            break;
                        case "IsNineSelected":
                            connection.Send("recal.isNineSelected", viewModel.IsNineSelected);
                            break;
                        case "IsTenSelected":
                            connection.Send("recal.isTenSelected", viewModel.IsTenSelected);
                            break;
                        case "IsJackSelected":
                            connection.Send("recal.isJackSelected", viewModel.IsJackSelected);
                            break;
                        case "IsQueenSelected":
                            connection.Send("recal.isQueenSelected", viewModel.IsQueenSelected);
                            break;
                        case "IsKingSelected":
                            connection.Send("recal.isKingSelected", viewModel.IsKingSelected);
                            break;
                        case "IsAceSelected":
                            connection.Send("recal.isAceSelected", viewModel.IsAceSelected);
                            break;
                    }
                };

            });

            connection.On("recall.selectFace", (Face face) =>
            {
                if (viewModel.SelectFaceCommand.CanExecute(face))
                {
                    viewModel.SelectFaceCommand.Execute(face);
                    return true;
                }
                return false;
            });

            connection.On("recall.selectSuit", (Suit suit) =>
            {
                if (viewModel.SelectSuitCommand.CanExecute(suit))
                {
                    viewModel.SelectSuitCommand.Execute(suit);
                    return true;
                }
                return false;
            });

        }
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder().WithLogging(minimumLogLevel: Microsoft.Extensions.Logging.LogLevel.Trace).Build();

            SetupMemorizationPageViewModel(connection);
            SetupRecallPageViewModel(connection);

            connection.Listen();

            // var deckBuilder = new DeckBuilder();
            // deckBuilder.IncludeClubs();
            // deckBuilder.IncludeSpades();
            // deckBuilder.IncludeHearts();
            // deckBuilder.IncludeDiamonds();
            // deckBuilder.Shuffle();
            // var deck = new Deck(deckBuilder.Build());

            // var counter = 0;
            // while(deck.HasMoreCards()) {
            //     Console.ReadLine();
            //     deck.TurnCard();
            //     Console.WriteLine($"{++counter} - {deck.CurrentCard}");                
            // }
            // var memorizationPageViewModel = new MemorizationPageViewModel();
            // var canExecuteTurnCommand = true;
            // var counter = 0;
            // while(canExecuteTurnCommand) {
            //     Console.ReadLine();
            //     memorizationPageViewModel.TurnCardCommand.Execute(null);
            //     Console.WriteLine($"{++counter} - {(memorizationPageViewModel.CurrentCard == null ? "N/A" : memorizationPageViewModel.CurrentCard.ToString())}"); 
            //     canExecuteTurnCommand = memorizationPageViewModel.TurnCardCommand.CanExecute(null);
            // }
            // Console.WriteLine(memorizationPageViewModel.EllapsedTime);

        }
    }
}
