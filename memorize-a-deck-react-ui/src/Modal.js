import React from 'react';
import './Modal.scss'

export function Modal({ isOpen, children, onClose, className }) {
    return (
        <>{isOpen && (<div className="modal-container">
            <div className={`modal ${className || ''}`}>
                <div className="close-button" onClick={onClose}>
                    &times;
                </div>
                {children}
            </div>
        </div>)}
        </>);
}