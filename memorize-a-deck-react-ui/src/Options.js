import React, {useState, useEffect} from 'react';
import './Options.scss'


export function Options({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleRightClick = e => {
            if (e.button === 2 /*right click*/) {
                setIsOpen(!isOpen);
            }
        }
        document.addEventListener('mousedown', handleRightClick);
        return () => {
            document.removeEventListener('mousedown', handleRightClick);
        }
    }, [isOpen]);

    return (
        <>
            <div className={`options ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
            <div className={`options-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>&#9650;</div>
        </>
    );
}

Options.Option = function ({ icon, title, onClick }) {
    return (<div onClick={onClick}>
        <div>{icon}</div>
        <div>{title}</div>
    </div>)
}
