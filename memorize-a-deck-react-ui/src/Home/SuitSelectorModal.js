import React, { useState } from 'react';
import './SuitSelectorModal.scss';
import { Modal } from '../Modal';

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
                    <button onClick={() => setIsSpadesSelected(!isSpadesSelected)} className={`${isSpadesSelected ? 'selected' : ''}`}><SuitImage suitName="Spade" /></button>
                    <button onClick={() => setIsDiamondsSelected(!isDiamondsSelected)} className={`${isDiamondsSelected ? 'selected' : ''}`}><SuitImage suitName="Diamond" /></button>
                    <button onClick={() => setIsClubsSelected(!isClubsSelected)} className={`${isClubsSelected ? 'selected' : ''}`}><SuitImage suitName="Club" /></button>
                    <button onClick={() => setIsHeartsSelected(!isHeartsSelected)} className={`${isHeartsSelected ? 'selected' : ''}`}><SuitImage suitName="Heart" /></button>
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

function SuitImage({ suitName }) {
    return <div className="suit-image" style={{ backgroundImage: `url(/PlayingCards/${suitName}.png)` }}></div>
}