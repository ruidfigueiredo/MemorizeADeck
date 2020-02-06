import React from 'react';
import './Modal.scss'

export function Modal({ isOpen, children, onClose }) {
    return (
        <>{isOpen && (<div className="modal">
            <div className="close-button" onClick={onClose}>
                &times;
            </div>
            {children}
        </div>)}
        </>);
}