import React, { useState, useEffect } from 'react';
import './Home.scss'
import { useHistory, Link } from 'react-router-dom'
import { SuitSelectorModal } from './SuitSelectorModal';
import { Card, suitNames, faces } from '../Card';

export function HomePage() {
    const [randomCardSuitAndFace, setRandomCardSuitAndFace] = useState(null);
    useEffect(() => {
        setRandomCardSuitAndFace({
            suit: Math.floor(Math.random() * suitNames.length),
            face: Math.floor(Math.random() * faces.length)
        })
    }, []);


    const history = useHistory();
    function handleSuitsSelected({
        isSpadesSelected,
        isDiamondsSelected,
        isClubsSelected,
        isHeartsSelected
    }) {
        history.push('/memorization', {
            includeSpades: isSpadesSelected,
            includeDiamonds: isDiamondsSelected,
            includeHearts: isHeartsSelected,
            includeClubs: isClubsSelected
        });
    }

    const [isSuitSelectorOpen, setIsSuitsSelectorOpen] = useState(false);

    return (<>
        <div className="home">
            <div onClick={() => setIsSuitsSelectorOpen(true)}>Start</div>
            <Link to="/instructions">Instructions</Link>
            <Link to="/highscores">Highscores</Link>
            <Link to="/edit-card-word-links">Edit Card Word Links</Link>
            <a href="mailto:rui@blinkingcaret.com?subject=Feedback%20Memory%20Ace%20.NET%20Core%20-%20Electron-CGI%20Demo%20Project">Feedback/Support/Feature Request</a>
        </div>
        {randomCardSuitAndFace && <div className="random-card-container"><Card suit={randomCardSuitAndFace.suit} face={randomCardSuitAndFace.face} mini /></div>}
        <SuitSelectorModal isOpen={isSuitSelectorOpen} onSuitsSelected={handleSuitsSelected} onClose={() => setIsSuitsSelectorOpen(false)} />
    </>)
}