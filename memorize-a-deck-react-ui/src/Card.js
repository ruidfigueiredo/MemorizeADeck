import React from 'react';

//This is defined as an enum in .net
export const suitNames = ["Diamonds", "Hearts", "Clubs", "Spades"]; //0 - Diamond, 1...
export const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function Card({suit, face, mini}){    
    return <img src={`/PlayingCards/${suitNames[suit]}/${faces[face]}${suitNames[suit][0]}.png`} alt={`Playing card ${suitNames[suit]} ${faces[face]}`} width={mini ? '100px' : '150px'}/>
}