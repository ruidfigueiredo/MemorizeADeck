import React, { useEffect, useState, useCallback } from 'react'
import { startMemorization, memorizationEvents, turnCard, getEllapsedTime, toggleIsCardAssociationVisible, stopMemorization } from './memorization.service'
import { useLocation, useHistory } from 'react-router-dom';
import "./MemorizationPage.scss"
import { Card } from '../Card';
import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { CardWordLinksModal } from '../CardAssociations/CardWordLinksModal';

export function MemorizationPage() {
    const [isInitialized, setIsInitialized] = useState(true);
    const [currentCard, setCurrentCard] = useState();
    const [cardAssociation, setCardAssociation] = useState();
    const [isLastCard, setIsLastCard] = useState(false);
    const [isCardAssociationVisible, setIsCardAssociationVisible] = useState(false);
    const [cardsSeen, setCardsSeen] = useState([]);
    const [cardsNotSeenCount, setCardsNotSeenCount] = useState(0);
    const [ellapsedTime, setEllapsedTime] = useState();

    const [isKeyboardShortcutsModalVisible, setIsKeyboardShortcutsModalVisible] = useState(false);
    const [isCardWordLinksModalOpen, setIsCardWordLinksModalOpen] = useState(false);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {        
        const handleMemorizationComplete = ({ cardsMemorized, memorizationTime }) => {
            history.push({
                pathname: '/recall',
                state: {
                    cardsMemorized,
                    memorizationTime
                }
            });
        };

        memorizationEvents.on('cardAssociationChanged', setCardAssociation);
        memorizationEvents.on('isLastCard', setIsLastCard);
        memorizationEvents.on('currentCardChanged', setCurrentCard);
        memorizationEvents.on('cardsSeen', setCardsSeen);
        memorizationEvents.on('cardsNotSeenCount', setCardsNotSeenCount);
        memorizationEvents.on('isCardAssociationVisible', setIsCardAssociationVisible)
        memorizationEvents.on('complete', handleMemorizationComplete)

        return () => {
            memorizationEvents.off('cardAssociationChanged', setCardAssociation);
            memorizationEvents.off('isLastCard', setIsLastCard);
            memorizationEvents.off('currentCardChanged', setCurrentCard);
            memorizationEvents.off('cardsSeen', setCardsSeen);
            memorizationEvents.off('cardsNotSeenCount', setCardsNotSeenCount);
        }
    }, [history]);

    useEffect(() => {
        let ellapsedTimeIntervalId = null
        const options = location.state || {};
        startMemorization({
            includeSpades: options.includeSpades || true,
            includeDiamonds: options.includeDiamonds || false,
            includeHearts: options.includeHearts || false,
            includeClubs: options.includeClubs || false,
        }).then(() => {
            setIsInitialized(true)
            ellapsedTimeIntervalId = window.setInterval(() => {
                getEllapsedTime().then(setEllapsedTime);
            }, 1000);
        });
        return () => {
            window.clearInterval(ellapsedTimeIntervalId);
        }
    }, [location.state]);

    useEffect(() => {
        const container = document.querySelector('.cards-seen-container');
        container.scrollTop = container.scrollHeight;
    }, [cardsSeen])


    const handleTurnCard = useCallback(async function handleTurnCard() {
        if (!isInitialized) return;
        await turnCard()
    }, [isInitialized]);

    useEffect(() => {
        const handleKeydown = async e => {
            if (e.key === 't' || e.key === 'T' || e.key === 'Enter') {
                await handleTurnCard();
            }
        };
        document.body.addEventListener('keydown', handleKeydown);
        return () => {
            document.body.removeEventListener("keydown", handleKeydown);
        }
    }, [handleTurnCard])



    return (
        <div className="memorization-page">
            <KeyboardShortcutsModal isOpen={isKeyboardShortcutsModalVisible} onClose={() => setIsKeyboardShortcutsModalVisible(false)} />
            <div className="cards-seen-container">
                <CardList cards={cardsSeen} />
            </div>
            <div className="memorization-area">
                <div className="stop" onClick={async () => await stopMemorization()}>Stop</div>
                <div></div>
                <div className="current-card-container">
                    {currentCard && <Card suit={currentCard.suit} face={currentCard.face} />}
                </div>
                <div className="card-association-container">{isCardAssociationVisible && <h3>{cardAssociation}</h3>}</div>
                <TurnedDeck cardCount={cardsNotSeenCount} onClick={handleTurnCard} />
            </div>
            <div className="time-container">
                {ellapsedTime && <h3>{ellapsedTime}</h3>}
            </div>
            <CardWordLinksModal isOpen={isCardWordLinksModalOpen} onClose={() => setIsCardWordLinksModalOpen(false)} />
            <Options>
                <Options.Option onClick={_ => history.push('/')} icon="&#9664;" title="Main Menu" />
                <Options.Option onClick={_ => setIsKeyboardShortcutsModalVisible(!isKeyboardShortcutsModalVisible)} icon="&#9000;" title="Keyboard Shortcuts" />
                <Options.Option onClick={_ => setIsCardWordLinksModalOpen(!isCardWordLinksModalOpen)} icon="&#8703;" title="Card Memory Association List" />
                <Options.Option onClick={async _ => await toggleIsCardAssociationVisible()} icon="&#128466;" title="Show Card Association" />
            </Options>
        </div>
    );
}

function CardList({ cards }) {
    return (<div className="cards-list">
        {cards.map((playingCard, index) => <Card key={index} suit={playingCard.suit} face={playingCard.face} mini />)}
    </div>)
}

function TurnedDeck({ cardCount = 52, onClick }) {
    return (<div className="turned-deck" onClick={onClick}>
        {Array(cardCount).fill(null).map((_, index) => <img key={index} src="/PlayingCards/BlueBack.png" width="150px" style={{ position: 'absolute', top: `-${Math.round(index / 2.0)}px`, right: `${Math.round((index + 1) / 2.0)}.px` }} alt="turned card" />)}
    </div>)
}


function Options({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleRightClick = e => {
            if (e.button === 2 /*right click*/) {
                setIsOpen(!isOpen);
            }
        }
        document.addEventListener('mousedown', handleRightClick);
        return () => {
            document.removeEventListener('mousedown', handleRightClick);
        }
    }, [isOpen]);

    return (
        <>
            <div className={`options ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
            <div className={`options-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>&#9650;</div>
        </>
    );
}

Options.Option = function ({ icon, title, onClick }) {
    return (<div onClick={onClick}>
        <div>{icon}</div>
        <div>{title}</div>
    </div>)
}
