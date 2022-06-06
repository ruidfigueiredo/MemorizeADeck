using System;

namespace MemorizeADeck.ViewModels
{
    public interface ITimeTracker
    {
        void Start();
        void Stop();
        TimeSpan EllapsedTime { get; }
    }
}
