using System;
using System.Diagnostics;

namespace MemorizeADeck.ViewModels
{
    public class TimeTracker : ITimeTracker
    {
        private readonly Stopwatch _stopWatch;
        public TimeTracker()
        {
            _stopWatch = new Stopwatch();
        }

        public void Start()
        {
            _stopWatch.Reset();
            _stopWatch.Start();
        }

        public void Stop()
        {
            _stopWatch.Stop();
        }

        public TimeSpan EllapsedTime
        {
            get { return _stopWatch.Elapsed; }
        }
    }
}
