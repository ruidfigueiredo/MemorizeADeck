import React from 'react';
import './MemorizationCompleteModal.scss';
import { Modal } from '../Modal';


export function MemorizationCompleteModal({ isOpen, wereHintsUsed, count, timespan, onOk}) {
    if (!timespan) return null;

    const timespanRegex = /^(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})\.(?<milliseconds>\d+)$/; //if you are looking and this and thinking: WTF? it's late and this was the first thing I coult think of when I realised that javascript doen't have a native way to represent durations in time
    const timespanMatch = timespan.match(timespanRegex)
    if (timespanMatch === null) {
        alert('Could not parse timespan from dotnet: ' + timespan);
        return;
    }
    const recallDuration = {
        hours: timespanMatch.groups.hours,
        minutes: timespanMatch.groups.minutes,
        seconds: timespanMatch.groups.seconds,
        milliseconds: timespanMatch.groups.milliseconds,        
    }

    let message = `Congratulations, you've memorized ${count} cards in ${recallDuration.hours !== '00' ? `${recallDuration.hours}:` : ''}${recallDuration.minutes}:${recallDuration.seconds}.`
    if (wereHintsUsed) {
        message += "\nYou've used hints so your score will not be kept.\nPractice makes perfection, maybe next time you won't need them.";
    }
    return (<Modal isOpen={isOpen} className="memorization-complete-modal" onClose={onOk}>
            <h3>Completed</h3>
            <div>{message}</div>
            <div className="footer">
                <button className="positive" onClick={onOk}>OK</button>                
            </div>
    </Modal>)
}
