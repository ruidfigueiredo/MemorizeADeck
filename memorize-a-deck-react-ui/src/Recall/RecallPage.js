import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecallPage.scss';
import { PlayingCardButton } from '../PlayingCardButton';

export function RecallPage() {
    const state = useLocation().state || {
        "cardsMemorized": [{ "suit": 1, "face": 5 }, { "suit": 1, "face": 9 }, { "suit": 1, "face": 8 }, { "suit": 1, "face": 4 }, { "suit": 1, "face": 1 }, { "suit": 1, "face": 2 }, { "suit": 1, "face": 11 }, { "suit": 1, "face": 6 }, { "suit": 1, "face": 0 }, { "suit": 1, "face": 12 }, { "suit": 1, "face": 7 }, { "suit": 1, "face": 3 }, { "suit": 1, "face": 10 }],
        "memorizationTime": "00:00:06.3177712"
    };
    console.log(state)
    return (
        <div className="recall-page">
            <div className="cards-recalled-container"></div>
            <div className="controls">
                <div className="suits-container">
                    <div>
                        <PlayingCardButton playingCardName="Club" onClick={() => console.log('club')} />
                        <PlayingCardButton playingCardName="Diamond" onClick={() => console.log('Diamond')} />
                        <PlayingCardButton playingCardName="Heart" onClick={() => console.log('Heart')} />
                        <PlayingCardButton playingCardName="Spade" onClick={() => console.log('Spade')} />
                    </div>
                </div>
                <div className="faces-container">
                    <div>
                    <div>
                        <PlayingCardButton playingCardName="2" onClick={() => console.log('2')} />
                        <PlayingCardButton playingCardName="3" onClick={() => console.log('3')} />
                        <PlayingCardButton playingCardName="4" onClick={() => console.log('4')} />
                        <PlayingCardButton playingCardName="5" onClick={() => console.log('5')} />                        
                    </div>
                    <div>
                        <PlayingCardButton playingCardName="6" onClick={() => console.log('6')} />
                        <PlayingCardButton playingCardName="7" onClick={() => console.log('7')} />
                        <PlayingCardButton playingCardName="8" onClick={() => console.log('8')} />
                        <PlayingCardButton playingCardName="9" onClick={() => console.log('9')} />                        
                    </div>
                    <div>
                        <PlayingCardButton playingCardName="10" onClick={() => console.log('10')} />
                        <PlayingCardButton playingCardName="J" onClick={() => console.log('J')} />
                        <PlayingCardButton playingCardName="Q" onClick={() => console.log('Q')} />                        
                    </div>
                    <div>
                        <PlayingCardButton playingCardName="K" onClick={() => console.log('K')} />
                        <PlayingCardButton playingCardName="A" onClick={() => console.log('A')} />
                    </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}