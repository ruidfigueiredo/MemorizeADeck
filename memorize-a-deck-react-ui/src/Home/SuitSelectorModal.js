import React, { useState } from 'react';
import './SuitSelectorModal.scss';
import { Modal } from '../Modal';
import { PlayingCardButton } from '../PlayingCardButton';

export function SuitSelectorModal({ isOpen, onSuitsSelected, onClose }) {
    const [isSpadesSelected, setIsSpadesSelected] = useState(true);
    const [isDiamondsSelected, setIsDiamondsSelected] = useState(true);
    const [isClubsSelected, setIsClubsSelected] = useState(true);
    const [isHeartsSelected, setIsHeartsSelected] = useState(true);
    return (
        <div className="suit-selector-modal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <h2>Selected Suits</h2>
                <div className="suits-container">
                    <PlayingCardButton onClick={() => setIsSpadesSelected(!isSpadesSelected)} className={`${isSpadesSelected ? 'selected' : ''}`} playingCardName="Spade"/>
                    <PlayingCardButton onClick={() => setIsDiamondsSelected(!isDiamondsSelected)} className={`${isDiamondsSelected ? 'selected' : ''}`} playingCardName="Diamond"/>
                    <PlayingCardButton onClick={() => setIsClubsSelected(!isClubsSelected)} className={`${isClubsSelected ? 'selected' : ''}`} playingCardName="Club"/>
                    <PlayingCardButton onClick={() => setIsHeartsSelected(!isHeartsSelected)} className={`${isHeartsSelected ? 'selected' : ''}`} playingCardName="Heart"/>
                </div>
                <button disabled={!isSpadesSelected && !isDiamondsSelected && !isClubsSelected && !isHeartsSelected} onClick={() => {                    
                    onSuitsSelected({
                        isSpadesSelected,
                        isDiamondsSelected,
                        isClubsSelected,
                        isHeartsSelected
                    });
                }}>Go</button>
            </Modal>
        </div>)
}

