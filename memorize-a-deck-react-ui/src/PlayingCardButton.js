import React from 'react';
import './PlayingCardButton.scss';


export function PlayingCardButton({playingCardName, className, ...restOfProps}) {
    return <button {...restOfProps} className={`playing-card-button ${className}`}><div className="playing-card-image" style={{ backgroundImage: `url(/PlayingCards/${playingCardName}.png)` }}></div></button>
}