import React from 'react';
import './Home.scss'
import { Link } from 'react-router-dom'

export function HomePage() {
    return (<div className="home">
        <Link to={{pathname: '/memorization', state: {
            includeSpades: true,
            includeDiamonds: false,
            includeHearts: false,
            includeClubs: false
        }}}>Start</Link>
        <div>Instructions</div>
        <div>Highscores</div>
        <div>Edit Card-Word Links</div>
        <div>Feedback/Support/Feature Request</div>
    </div>)
}