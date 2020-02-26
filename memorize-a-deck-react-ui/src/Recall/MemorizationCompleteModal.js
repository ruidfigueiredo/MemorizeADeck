import React from 'react';
import './MemorizationCompleteModal.scss';
import { Modal } from '../Modal';
import { getRecallDuration } from './recall.service';


export function MemorizationCompleteModal({ isOpen, wereHintsUsed, count, timespan, onOk}) {
    if (!timespan) return null;

    const recallDuration = getRecallDuration(timespan);

    let message = `Congratulations, you've memorized ${count} cards in ${recallDuration.hours !== 0 ? `${String(recallDuration.hours).padStart(2, "0")}:` : ''}${String(recallDuration.minutes).padStart(2, "0")}:${String(recallDuration.seconds).padStart(2, "0")}.`
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
