import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecallPage.scss';

export function RecallPage() {
    const state = useLocation().state || {
        "cardsMemorized": [{"suit": 1,  "face": 5},{"suit": 1,  "face": 9},{"suit": 1,  "face": 8},{"suit": 1,  "face": 4},{"suit": 1,  "face": 1},{"suit": 1,  "face": 2},{"suit": 1,  "face": 11},{"suit": 1,  "face": 6},{"suit": 1,  "face": 0},{"suit": 1,  "face": 12},{"suit": 1,  "face": 7},{"suit": 1,  "face": 3},{"suit": 1,  "face": 10}],
        "memorizationTime": "00:00:06.3177712"
      };
    console.log(state)
    return (
        <div className="recall-page">
            <div className="cards-recalled-container"></div>
            <div className="controls">
                <div className="suits-container"></div>
                <div className="faces-container"></div>
            </div>
        </div>
    );
}