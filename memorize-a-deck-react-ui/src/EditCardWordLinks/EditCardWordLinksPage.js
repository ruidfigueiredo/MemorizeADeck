import React, { useState, useEffect } from 'react';
import './EditCardWordLinksPage.scss';
import { getCardAssociations } from '../CardAssociations/card-associations.service';
import { Card } from '../Card';

export function EditCardWordLinksPage() {
    const [cardAssociations, setCardAssociations] = useState([])
    useEffect(() => {
        getCardAssociations().then(setCardAssociations);
    }, []);

    function updateAssociation(playingCard, newAssociation) {
        console.log(cardAssociations)
        const indexOfPlayingCard = cardAssociations.map(ca => ca.playingCard).indexOf(playingCard);        
        setCardAssociations([...cardAssociations.slice(0, indexOfPlayingCard), {playingCard, association: newAssociation}, ...cardAssociations.slice(indexOfPlayingCard+1)]);        
    }
    return (
        <div className="edit-card-word-links">
            <h1>Edit Card-Word Links</h1>
            <div className="card-associations-container">
                {cardAssociations.map((cardAssociation, i) => (
                    <div className="card-association" key={i}>
                        <div><Card suit={cardAssociation.playingCard.suit} face={cardAssociation.playingCard.face} mini /></div>
                        <div><input type="text" value={cardAssociation.association} onChange={e => updateAssociation(cardAssociation.playingCard, e.target.value)}/></div>
                    </div>
                ))}
            </div>
            <div className="actions-container"></div>
        </div>
    );
}