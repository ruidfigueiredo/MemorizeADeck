import {connection} from './connection.service';


export function saveHighscore(numberOfCards, memorizationTime) {
    return connection.send('highscores.save', {numberOfCards, memorizationTime});
};

export function getHighscores() {
    return connection.send('highscores.getAll');
}