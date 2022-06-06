namespace MemorizeADeck.ViewModels
{
    public interface IDeck
    {
        PlayingCard CurrentCard { get; }
        void TurnCard();
        bool HasMoreCards();
        bool HasNoCardsTurned();
        void Restart();
        int CardsNotTurnedCount { get; }
    }
}
