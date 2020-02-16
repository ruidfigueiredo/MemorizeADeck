import React from 'react';
import './CardList.scss';
import { Card } from './Card';

export function CardList({ cards }) {
    return (<div className="cards-list">
        {cards.map((playingCard, index) => <Card key={index} suit={playingCard.suit} face={playingCard.face} mini />)}
    </div>)
}
