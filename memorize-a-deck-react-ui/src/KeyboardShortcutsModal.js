import React from 'react';
import { Modal } from './Modal';
import './KeyboardShortcutsModal.scss'

export function KeyboardShortcutsModal(props) {
    return (<Modal {...props}>
        <div className="keyboard-shortcuts">
            <h2>Keyboard Shortcuts</h2>
            <div className="title">
                Memorization
            </div>
            <div className="keys">
                <strong>T, Enter</strong>
                <span>- Turn Card</span>
            </div>
            <div className="keys">
                <strong>S</strong>
                <span>- Stop</span>
            </div>
            <div className="title">
                Recall
            </div>
            <div className="keys">
                <strong>S</strong>
                <span>- Spades</span>
            </div>
            <div className="keys">
                <strong>D</strong>
                <span>- Diamonds</span>
            </div>
            <div className="keys">
                <strong>C</strong>
                <span>- Clubs</span>
            </div>
            <div className="keys">
                <strong>H</strong>
                <span>- Hearts</span>
            </div>
            <div className="keys">
                <strong>A, 1</strong>
                <span>- Ace</span>
            </div>
            <div className="keys">
                <strong>2..9</strong>
                <span>- Two..Nine</span>
            </div>
            <div className="keys">
                <strong>J</strong>
                <span>- Jack</span>
            </div>
            <div className="keys">
                <strong>Q</strong>
                <span>- Queen</span>
            </div>
            <div className="keys">
                <strong>K</strong>
                <span>- King</span>
            </div>
        </div>
    </Modal>)
}