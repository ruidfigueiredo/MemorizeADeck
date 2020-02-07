import React, { useEffect, useState } from 'react';
import './CardWordLinksModal.scss'
import {getCardAssociations} from './card-associations.service';
import { Card } from '../Card';
import { Modal } from '../Modal';

export function CardWordLinksModal(props) {
    const [cardAssociations, setCardAssociations] = useState([]);
    useEffect(() => {
        getCardAssociations().then(setCardAssociations);
    }, []);
    return (<Modal {...props}>
        <div className="card-word-links">
            {cardAssociations.map((cardAssociation, index) => (<div key={index}>
                <Card face={cardAssociation.playingCard.face} suit={cardAssociation.playingCard.suit} mini/>
                <div>{cardAssociation.association}</div>
            </div>))}
        </div>
    </Modal>)
}

