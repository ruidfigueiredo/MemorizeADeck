import React from 'react';
import { Modal } from '../Modal';
import './HintRequestConfirmationModal.scss';

export function HintRequestConfirmationModal({ isOpen, onConfirmation, onCancel}) {
    return (<Modal isOpen={isOpen} className="hint-confirmation-modal" onClose={onCancel}>
            <h3>Are you sure?</h3>
            <div>If you use hints your score will not be kept</div>
            <div className="footer">
                <button className="positive" onClick={onConfirmation}>OK</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
    </Modal>)
}