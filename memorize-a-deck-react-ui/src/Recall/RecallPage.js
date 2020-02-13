import React, {useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './RecallPage.scss';
import { PlayingCardButton } from '../PlayingCardButton';
import { Options } from '../Options';
import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { CardWordLinksModal } from '../CardAssociations/CardWordLinksModal';
import {suit, face, selectFace, selectSuit, recallEvents} from './recall.service';

export function RecallPage() {
    const [isKeyboardShortcutsModalVisible, setIsKeyboardShortcutsModalVisible] = useState(false);
    const [isCardWordLinksModalOpen, setIsCardWordLinksModalOpen] = useState(false);

    const state = useLocation().state || {
        "cardsMemorized": [{ "suit": 1, "face": 5 }, { "suit": 1, "face": 9 }, { "suit": 1, "face": 8 }, { "suit": 1, "face": 4 }, { "suit": 1, "face": 1 }, { "suit": 1, "face": 2 }, { "suit": 1, "face": 11 }, { "suit": 1, "face": 6 }, { "suit": 1, "face": 0 }, { "suit": 1, "face": 12 }, { "suit": 1, "face": 7 }, { "suit": 1, "face": 3 }, { "suit": 1, "face": 10 }],
        "memorizationTime": "00:00:06.3177712"
    };    
    console.log(state)
    const history = useHistory();

    return (
        <div className="recall-page">
            <div className="cards-recalled-container"></div>
            <div className="controls">
                <div className="suits-container">
                    <div>
                        <PlayingCardButton playingCardName="Club" onClick={async () => await selectSuit(suit.club)} />
                        <PlayingCardButton playingCardName="Diamond" onClick={async () => await selectSuit(suit.diamond)} />
                        <PlayingCardButton playingCardName="Heart" onClick={async () => await selectSuit(suit.heart)} />
                        <PlayingCardButton playingCardName="Spade" onClick={async () => await selectSuit(suit.spade)} />
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
            <Options>
                <Options.Option onClick={_ => history.push('/')} icon="&#9664;" title="Main Menu" />
                <Options.Option onClick={_ => setIsKeyboardShortcutsModalVisible(!isKeyboardShortcutsModalVisible)} icon="&#9000;" title="Keyboard Shortcuts" />
                <Options.Option onClick={_ => setIsCardWordLinksModalOpen(!isCardWordLinksModalOpen)} icon="&#8703;" title="Card Memory Association List" />
            </Options>    
            <KeyboardShortcutsModal isOpen={isKeyboardShortcutsModalVisible} onClose={() => setIsKeyboardShortcutsModalVisible(false)} />
            <CardWordLinksModal isOpen={isCardWordLinksModalOpen} onClose={() => setIsCardWordLinksModalOpen(false)} />
        </div>
    );
}