import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './RecallPage.scss';
import { PlayingCardButton } from '../PlayingCardButton';
import { Options } from '../Options';
import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { CardWordLinksModal } from '../CardAssociations/CardWordLinksModal';
import { suit, face, selectFace, selectSuit, recallEvents, start, hint, sendHintRequestConfirmation } from './recall.service';
import { CardList } from '../CardList';
import { HintRequestConfirmationModal } from './HintRequestConfirmationModal';

export function RecallPage() {
    const [isInitialized, setIsInitialized] = useState(false)
    const [isKeyboardShortcutsModalVisible, setIsKeyboardShortcutsModalVisible] = useState(false);
    const [isCardWordLinksModalOpen, setIsCardWordLinksModalOpen] = useState(false);
    const [isClubSelected, setIsClubSelected] = useState(false);
    const [isDiamondSelected, setIsDiamondSelected] = useState(false);
    const [isHeartSelected, setIsHeartSelected] = useState(false);
    const [isSpadeSelected, setIsSpadeSelected] = useState(false);
    const [isTwoSelected, setIsTwoSelected] = useState(false);
    const [isThreeSelected, setIsThreeSelected] = useState(false);
    const [isFourSelected, setIsFourSelected] = useState(false);
    const [isFiveSelected, setIsFiveSelected] = useState(false);
    const [isSixSelected, setIsSixSelected] = useState(false);
    const [isSevenSelected, setIsSevenSelected] = useState(false);
    const [isEightSelected, setIsEightSelected] = useState(false);
    const [isNineSelected, setIsNineSelected] = useState(false);
    const [isTenSelected, setIsTenSelected] = useState(false);
    const [isJackSelected, setIsJackSelected] = useState(false);
    const [isQueenSelected, setIsQueenSelected] = useState(false);
    const [isKingSelected, setIsKingSelected] = useState(false);
    const [isAceSelected, setIsAceSelected] = useState(false);

    const [cardsRemembered, setCardsRemembered] = useState([]);
    const [isHintConfirmationModalVisible, setIsHintConfirmationModalVisible] = useState(false);

    const location = useLocation();

    const history = useHistory();

    useEffect(() => {
        recallEvents.on('isClubSelected', setIsClubSelected);
        recallEvents.on('isDiamondSelected', setIsDiamondSelected);
        recallEvents.on('isHeartSelected', setIsHeartSelected);
        recallEvents.on('isSpadeSelected', setIsSpadeSelected);
        recallEvents.on('isTwoSelected', setIsTwoSelected);
        recallEvents.on('isThreeSelected', setIsThreeSelected);
        recallEvents.on('isFourSelected', setIsFourSelected);
        recallEvents.on('isFiveSelected', setIsFiveSelected);
        recallEvents.on('isSixSelected', setIsSixSelected);
        recallEvents.on('isSevenSelected', setIsSevenSelected);
        recallEvents.on('isEightSelected', setIsEightSelected);
        recallEvents.on('isNineSelected', setIsNineSelected);
        recallEvents.on('isTenSelected', setIsTenSelected);
        recallEvents.on('isJackSelected', setIsJackSelected);
        recallEvents.on('isQueenSelected', setIsQueenSelected);
        recallEvents.on('isKingSelected', setIsKingSelected);
        recallEvents.on('isAceSelected', setIsAceSelected);

        recallEvents.on('cardsRemembered', setCardsRemembered);
        const handleHintConfirmationRequired = () => setIsHintConfirmationModalVisible(true);
        recallEvents.on('hintConfirmationRequired', handleHintConfirmationRequired);
        return () => {
            recallEvents.off('isClubSelected', setIsClubSelected);
            recallEvents.off('isDiamondSelected', setIsDiamondSelected);
            recallEvents.off('isHeartSelected', setIsHeartSelected);
            recallEvents.off('isSpadeSelected', setIsSpadeSelected);
            recallEvents.off('isTwoSelected', setIsTwoSelected);
            recallEvents.off('isThreeSelected', setIsThreeSelected);
            recallEvents.off('isFourSelected', setIsFourSelected);
            recallEvents.off('isFiveSelected', setIsFiveSelected);
            recallEvents.off('isSixSelected', setIsSixSelected);
            recallEvents.off('isSevenSelected', setIsSevenSelected);
            recallEvents.off('isEightSelected', setIsEightSelected);
            recallEvents.off('isNineSelected', setIsNineSelected);
            recallEvents.off('isTenSelected', setIsTenSelected);
            recallEvents.off('isJackSelected', setIsJackSelected);
            recallEvents.off('isQueenSelected', setIsQueenSelected);
            recallEvents.off('isKingSelected', setIsKingSelected);
            recallEvents.off('isAceSelected', setIsAceSelected);    

            recallEvents.off('cardsRemembered', setCardsRemembered);
            recallEvents.off('hintConfirmationRequired', handleHintConfirmationRequired);
        }
    }, [])

    useEffect(() => {
        const { cardsMemorized, memorizationTime } = location.state || {
            "cardsMemorized": [{ "suit": 1, "face": 5 }, { "suit": 1, "face": 9 }, { "suit": 1, "face": 8 }, { "suit": 1, "face": 4 }, { "suit": 1, "face": 1 }, { "suit": 1, "face": 2 }, { "suit": 1, "face": 11 }, { "suit": 1, "face": 6 }, { "suit": 1, "face": 0 }, { "suit": 1, "face": 12 }, { "suit": 1, "face": 7 }, { "suit": 1, "face": 3 }, { "suit": 1, "face": 10 }],
            "memorizationTime": "00:00:06.3177712"
        };
        start({ cardsMemorized, memorizationTime }).then(_ => {
            setIsInitialized(true);
        });
    }, [location]);

    return (
        <div className="recall-page">
            <div className="cards-recalled-container">
                <CardList cards={cardsRemembered}/>
            </div>
            <div className="controls">
                <div className="suits-container">
                    <div>
                        <PlayingCardButton className={`${isClubSelected ? 'selected' : ''}`} playingCardName="Club" onClick={async () => await selectSuit(suit.club)} />
                        <PlayingCardButton className={`${isDiamondSelected ? 'selected' : ''}`} playingCardName="Diamond" onClick={async () => await selectSuit(suit.diamond)} />
                        <PlayingCardButton className={`${isHeartSelected ? 'selected' : ''}`} playingCardName="Heart" onClick={async () => await selectSuit(suit.heart)} />
                        <PlayingCardButton className={`${isSpadeSelected ? 'selected' : ''}`} playingCardName="Spade" onClick={async () => await selectSuit(suit.spade)} />
                    </div>
                </div>
                <div className="faces-container">
                    <div>
                        <div>
                            <PlayingCardButton className={`${isTwoSelected ? 'selected' : ''}`} playingCardName="2" onClick={async () => await selectFace(face.two)} />
                            <PlayingCardButton className={`${isThreeSelected ? 'selected' : ''}`} playingCardName="3" onClick={async () => await selectFace(face.three)} />
                            <PlayingCardButton className={`${isFourSelected ? 'selected' : ''}`} playingCardName="4" onClick={async () => await selectFace(face.four)} />
                            <PlayingCardButton className={`${isFiveSelected ? 'selected' : ''}`}playingCardName="5" onClick={async () => await selectFace(face.five)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${ isSixSelected ? 'selected' : ''}`} playingCardName="6" onClick={async () => await selectFace(face.six)} />
                            <PlayingCardButton className={`${ isSevenSelected ? 'selected' : ''}`} playingCardName="7" onClick={async () => await selectFace(face.seven)} />
                            <PlayingCardButton className={`${ isEightSelected ? 'selected' : ''}`} playingCardName="8" onClick={async () => await selectFace(face.eight)} />
                            <PlayingCardButton className={`${ isNineSelected ? 'selected' : ''}`} playingCardName="9" onClick={async () => await selectFace(face.nine)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${ isTenSelected ? 'selected' : ''}`} playingCardName="10" onClick={async () => await selectFace(face.ten)} />
                            <PlayingCardButton className={`${ isJackSelected ? 'selected' : ''}`} playingCardName="J" onClick={async () => await selectFace(face.jack)} />
                            <PlayingCardButton className={`${ isQueenSelected ? 'selected' : ''}`} playingCardName="Q" onClick={async () => await selectFace(face.queen)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${ isKingSelected ? 'selected' : ''}`} playingCardName="K" onClick={async () => await selectFace(face.king)} />
                            <PlayingCardButton className={`${ isAceSelected ? 'selected' : ''}`} playingCardName="A" onClick={async () => await selectFace(face.ace)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hint-button" onClick={async () => await hint()}>
                HINT                
            </div>
            <Options>
                <Options.Option onClick={_ => history.push('/')} icon="&#9664;" title="Main Menu" />
                <Options.Option onClick={_ => setIsKeyboardShortcutsModalVisible(!isKeyboardShortcutsModalVisible)} icon="&#9000;" title="Keyboard Shortcuts" />
                <Options.Option onClick={_ => setIsCardWordLinksModalOpen(!isCardWordLinksModalOpen)} icon="&#8703;" title="Card Memory Association List" />
            </Options>
            <KeyboardShortcutsModal isOpen={isKeyboardShortcutsModalVisible} onClose={() => setIsKeyboardShortcutsModalVisible(false)} />
            <CardWordLinksModal isOpen={isCardWordLinksModalOpen} onClose={() => setIsCardWordLinksModalOpen(false)} />
            <HintRequestConfirmationModal isOpen={isHintConfirmationModalVisible} 
                onConfirmation={async () => {                    
                    await sendHintRequestConfirmation(true);
                    await hint();
                    setIsHintConfirmationModalVisible(false)
                }}
                onCancel={() => setIsHintConfirmationModalVisible(false)}/>
        </div>
    );
}