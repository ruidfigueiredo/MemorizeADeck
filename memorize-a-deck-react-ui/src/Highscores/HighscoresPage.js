import React, { useState, useEffect } from 'react'
import { getHighscores } from '../highscore.service';
import './HighscoresPage.scss'
import { useLocation, useHistory } from 'react-router-dom';
import { getRecallDuration } from '../Recall/recall.service';

export function HighscoresPage() {
    const [highscores, setHighscores] = useState([])

    useEffect(() => {
        getHighscores().then(setHighscores);
    }, [])

    const location = useLocation();
    const history = useHistory()
    const { count, timespan } = location.state || {};

    return (
        <div className="highscores-page">
            <div className="highscores-container">
                {highscores.sort((highscore1, highscore2) => highscore1.numberOfCards === highscore2.numberOfCards ? (highscore1.memorizationTime < highscore2.memorizationTime ? -1 : 1) : highscore1.numberOfCards > highscore2.numberOfCards ? -1 : 1).map((highscore, index) => (
                    <div key={index}>
                        <Highscore index={index}
                            memorizationTime={highscore.memorizationTime}
                            numberOfCards={highscore.numberOfCards}
                            isHighlighted={count === highscore.numberOfCards && timespan === highscore.memorizationTime}
                        />
                    </div>
                ))}
            </div>
            <div className="bottom-button" onClick={() => history.push('/')}>Main Menu</div>
        </div>
    );
}

function unitToString(unitValue, unitName) {
    return `${unitValue} ${unitName}${unitValue > 1 ? 's' : ''}`
}

function Highscore({ index, numberOfCards, memorizationTime, isHighlighted }) {
    const recallDuration = getRecallDuration(memorizationTime);
    const durationDescription = `${recallDuration.hours !== 0 ? unitToString(recallDuration.hours, 'hour') + ' and ' : ''}${recallDuration.minutes !== 0 ? unitToString(recallDuration.minutes, 'minute') + ' and ' : ''}${unitToString(recallDuration.seconds, 'second')}`

    return (
        <div className={`highscore ${isHighlighted ? 'highlighted' : ''}`}>
            <div>
                <span>{index + 1}.</span> <span>{unitToString(numberOfCards, 'card')}</span>
            </div>
            <div>
                in {durationDescription}
            </div>
        </div>
    )
}