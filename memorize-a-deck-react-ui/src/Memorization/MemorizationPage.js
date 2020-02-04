import React, { useEffect, useState } from 'react'
import { startMemorization, memorizationEvents, turnCard, getEllapsedTime, toggleIsCardAssociationVisible } from './memorization.service'
import { useLocation, useHistory } from 'react-router-dom';
import "./MemorizationPage.scss"
import { Card } from '../Card';

export function MemorizationPage() {
    const [isInitializing, setIsInitializing] = useState(true)
    const [currentCard, setCurrentCard] = useState()
    const [cardAssociation, setCardAssociation] = useState()
    const [isLastCard, setIsLastCard] = useState(false)
    const [isCardAssociationVisible, setIsCardAssociationVisible] = useState(false)
    const [cardsSeen, setCardsSeen] = useState([])
    const [cardsNotSeenCount, setCardsNotSeenCount] = useState(0)
    const [ellapsedTime, setEllapsedTime] = useState()    

    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        if (!isInitializing) return;
        const options = location.state || {};
        let ellapsedTimeIntervalId = null

        memorizationEvents.on('cardAssociationChanged', setCardAssociation);
        memorizationEvents.on('isLastCard', setIsLastCard);
        memorizationEvents.on('currentCardChanged', setCurrentCard);
        memorizationEvents.on('cardsSeen', setCardsSeen);
        memorizationEvents.on('cardsNotSeenCount', setCardsNotSeenCount);
        memorizationEvents.on('isCardAssociationVisible', setIsCardAssociationVisible)

        startMemorization({
            includeSpades: options.includeSpades || true,
            includeDiamonds: options.includeDiamonds || false,
            includeHearts: options.includeHearts || false,
            includeClubs: options.includeClubs || false,
        }).then(() => {
            setIsInitializing(false)
            ellapsedTimeIntervalId = window.setInterval(() => {
                getEllapsedTime().then(setEllapsedTime);
            }, 1000);
        });
        return () => {
            return () => {
                memorizationEvents.off('cardAssociationChanged', setCardAssociation);
                memorizationEvents.off('isLastCard', setIsLastCard);
                memorizationEvents.off('currentCardChanged', setCurrentCard);
                memorizationEvents.off('cardsSeen', setCardsSeen);
                memorizationEvents.off('cardsNotSeenCount', setCardsNotSeenCount);
                window.clearInterval(ellapsedTimeIntervalId);
            }
        }
    }, [location.state, isInitializing]);

    useEffect(() => {
        console.log('turn card effect')
        if (isInitializing) return;
        if (isLastCard) return;
        // (async function () {
        //     await new Promise(r => setTimeout(() => r(), 1000));
        //     await turnCard();
        // })();
    }, [isInitializing, currentCard, isLastCard])

    useEffect(() => {
        const container = document.querySelector('.cards-seen-container');
        container.scrollTop = container.scrollHeight;
    }, [cardsSeen])

    async function handleTurnCard() {
        if (isInitializing) return;
        await turnCard()
    }

    return (
        <div className="memorization-page">
            <div className="cards-seen-container">
                <CardList cards={cardsSeen} />
            </div>
            <div className="memorization-area">
                {/* <pre style={{ marginTop: '0', width: '200px' }}>
                    currentCard: {JSON.stringify(currentCard, null, 2)}<br />
                    cardAssociation: {JSON.stringify(cardAssociation, null, 2)}<br />
                    isLastCard: {JSON.stringify(isLastCard, null, 2)}<br />
                    cardsNotSeenCount: {cardsNotSeenCount}
                </pre> */}
                <div></div>
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
            <Options>
                <Options.Option onClick={_ => history.push('/')} icon="&#9664;" title="Main Menu"/>
                <Options.Option onClick={_ => history.push('/')} icon="&#9000;" title="Keyboard Shortcuts"/>
                <Options.Option onClick={_ => history.push('/')} icon="&#8703;" title="Card Memory Association List"/>
                <Options.Option onClick={async _ => await toggleIsCardAssociationVisible()} icon="&#128466;" title="Show Card Association"/>
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
