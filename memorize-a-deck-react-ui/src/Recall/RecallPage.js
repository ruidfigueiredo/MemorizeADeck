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
import { useScrollToBottomOnChange } from '../use-scroll-to-bottom-on-change';

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
        const handleRecallComplete = timespan => {
            const timespanRegex = /^(?<hours>\d{2})\:(?<minutes>\d{2})\:(?<seconds>\d{2})\.(?<milliseconds>\d+)$/; //if you are looking and this and thinking: WTF? it's late and this was the first thing I coult think of when I realised that javascript doen't have a native way to represent durations in time
            const timespanMatch = timespan.match(timespanRegex)
            if (timespanMatch === null) {
                alert('Could not parse timespan from dotnet: ' + timespan);
                return;
            }

            const recallDuration = {
                hours: timespanMatch.groups.hours,
                minutes: timespanMatch.groups.minutes,
                seconds: timespanMatch.groups.seconds,
                milliseconds: timespanMatch.groups.milliseconds
            };

            console.log(recallDuration);
        };
        recallEvents.on('completed', handleRecallComplete);

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
            recallEvents.off('complete', handleRecallComplete);
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

    useScrollToBottomOnChange(cardsRemembered, '.cards-recalled-container');

    async function performSelectSuit(suit) {
        if (!isInitialized) return;
        await selectSuit(suit);
    }

    async function performSelectFace(face) {
        if (!isInitialized) return;
        await selectFace(face);
    }

    async function requestHint() {
        if (!isInitialized) return;
        await hint();
    }

    useEffect(() => {
        const handleKeyDown = async e => {
            switch (e.key.toLowerCase()) {
                case 's':
                    await performSelectSuit(suit.spade);
                    break;
                case 'd':
                    await performSelectSuit(suit.diamond);
                    break;
                case 'c':
                    await performSelectSuit(suit.club);
                    break;
                case 'h':
                    await performSelectSuit(suit.heart);
                    break;
                case '1':
                case 'a':
                    await performSelectFace(face.ace);
                    break;
                case '2':
                    await performSelectFace(face.two);
                    break;
                case '3':
                    await performSelectFace(face.three);
                    break;
                case '4':
                    await performSelectFace(face.four);
                    break;
                case '5':
                    await performSelectFace(face.five);
                    break;
                case '6':
                    await performSelectFace(face.six);
                    break;
                case '7':
                    await performSelectFace(face.seven);
                    break;
                case '8':
                    await performSelectFace(face.eight);
                    break;
                case '9':
                    await performSelectFace(face.nine);
                    break;
                case '0':
                    await performSelectFace(face.ten);
                    break;
                case 'j':
                    await performSelectFace(face.jack);
                    break;
                case 'q':
                    await performSelectFace(face.queen);
                    break;
                case 'k':
                    await performSelectFace(face.king);
                    break;
                default:
                    break;
            }
        }
        document.body.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        }
    }, [performSelectSuit, performSelectFace])


    return (
        <div className="recall-page">
            <div className="cards-recalled-container">
                <CardList cards={cardsRemembered} />
            </div>
            <div className="controls">
                <div className="suits-container">
                    <div>
                        <PlayingCardButton className={`${isClubSelected ? 'selected' : ''}`} playingCardName="Club" onClick={async () => await performSelectSuit(suit.club)} />
                        <PlayingCardButton className={`${isDiamondSelected ? 'selected' : ''}`} playingCardName="Diamond" onClick={async () => await performSelectSuit(suit.diamond)} />
                        <PlayingCardButton className={`${isHeartSelected ? 'selected' : ''}`} playingCardName="Heart" onClick={async () => await performSelectSuit(suit.heart)} />
                        <PlayingCardButton className={`${isSpadeSelected ? 'selected' : ''}`} playingCardName="Spade" onClick={async () => await performSelectSuit(suit.spade)} />
                    </div>
                </div>
                <div className="faces-container">
                    <div>
                        <div>
                            <PlayingCardButton className={`${isTwoSelected ? 'selected' : ''}`} playingCardName="2" onClick={async () => await performSelectFace(face.two)} />
                            <PlayingCardButton className={`${isThreeSelected ? 'selected' : ''}`} playingCardName="3" onClick={async () => await performSelectFace(face.three)} />
                            <PlayingCardButton className={`${isFourSelected ? 'selected' : ''}`} playingCardName="4" onClick={async () => await performSelectFace(face.four)} />
                            <PlayingCardButton className={`${isFiveSelected ? 'selected' : ''}`} playingCardName="5" onClick={async () => await performSelectFace(face.five)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${isSixSelected ? 'selected' : ''}`} playingCardName="6" onClick={async () => await performSelectFace(face.six)} />
                            <PlayingCardButton className={`${isSevenSelected ? 'selected' : ''}`} playingCardName="7" onClick={async () => await performSelectFace(face.seven)} />
                            <PlayingCardButton className={`${isEightSelected ? 'selected' : ''}`} playingCardName="8" onClick={async () => await performSelectFace(face.eight)} />
                            <PlayingCardButton className={`${isNineSelected ? 'selected' : ''}`} playingCardName="9" onClick={async () => await performSelectFace(face.nine)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${isTenSelected ? 'selected' : ''}`} playingCardName="10" onClick={async () => await performSelectFace(face.ten)} />
                            <PlayingCardButton className={`${isJackSelected ? 'selected' : ''}`} playingCardName="J" onClick={async () => await performSelectFace(face.jack)} />
                            <PlayingCardButton className={`${isQueenSelected ? 'selected' : ''}`} playingCardName="Q" onClick={async () => await performSelectFace(face.queen)} />
                        </div>
                        <div>
                            <PlayingCardButton className={`${isKingSelected ? 'selected' : ''}`} playingCardName="K" onClick={async () => await performSelectFace(face.king)} />
                            <PlayingCardButton className={`${isAceSelected ? 'selected' : ''}`} playingCardName="A" onClick={async () => await performSelectFace(face.ace)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hint-button" onClick={async () => await requestHint()}>
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
                    await requestHint();
                    setIsHintConfirmationModalVisible(false)
                }}
                onCancel={() => setIsHintConfirmationModalVisible(false)} />
        </div>
    );
}