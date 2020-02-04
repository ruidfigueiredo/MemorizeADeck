using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blinkingcaret.Mvvm
{
    public interface ITimeTracker
    {
        void Start();
        void Stop();
        TimeSpan EllapsedTime { get; }
    }
}
