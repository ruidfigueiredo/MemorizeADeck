import React, { useState } from 'react';
import './Home.scss'
import { useHistory, Link } from 'react-router-dom'
import { SuitSelectorModal } from './SuitSelectorModal';

export function HomePage() {
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
            <div>Feedback/Support/Feature Request</div>
        </div>
        <SuitSelectorModal isOpen={isSuitSelectorOpen} onSuitsSelected={handleSuitsSelected} onClose={() => setIsSuitsSelectorOpen(false)} />
    </>)
}