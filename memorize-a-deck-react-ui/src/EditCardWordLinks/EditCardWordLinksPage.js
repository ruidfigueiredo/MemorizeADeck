import React, { useState, useEffect } from 'react';
import './EditCardWordLinksPage.scss';
import { getCardAssociations, saveCardAssociations } from '../CardAssociations/card-associations.service';
import { Card } from '../Card';
import { useHistory } from 'react-router-dom';

export function EditCardWordLinksPage() {
    const [cardAssociations, setCardAssociations] = useState([])
    useEffect(() => {
        getCardAssociations().then(setCardAssociations);
    }, []);
    const history = useHistory();

    function updateAssociation(playingCard, newAssociation) {        
        const indexOfPlayingCard = cardAssociations.map(ca => ca.playingCard).indexOf(playingCard);
        setCardAssociations([...cardAssociations.slice(0, indexOfPlayingCard), { playingCard, association: newAssociation }, ...cardAssociations.slice(indexOfPlayingCard + 1)]);
    }

    async function handleSave() {
        try {
            await saveCardAssociations(cardAssociations);
            history.push('/');
        } catch (error) {
            alert(`Failed to save associations: ${error}`);
        }

    }

    return (
        <div className="edit-card-word-links">
            <h1>Edit Card-Word Links</h1>
            <div className="card-associations-container">
                {cardAssociations.map((cardAssociation, i) => (
                    <div className="card-association" key={i}>
                        <div><Card suit={cardAssociation.playingCard.suit} face={cardAssociation.playingCard.face} mini /></div>
                        <div><input type="text" value={cardAssociation.association} onChange={e => updateAssociation(cardAssociation.playingCard, e.target.value)} /></div>
                    </div>
                ))}
            </div>
            <div className="actions-container">
                <div className="button" onClick={() => history.push('/')}>
                    Cancel
                </div>
                <div className="button" onClick={handleSave}>
                    Save
                </div>
            </div>
        </div>
    );
}