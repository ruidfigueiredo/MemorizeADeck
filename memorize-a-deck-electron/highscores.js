const { connection } = require('./connection');

exports.saveHighscore = (numberOfCards, memorizationTime) => {
    return connection.send('highscores.save', {numberOfCards, memorizationTime});
};

exports.getHighscores = () => {
    return connection.send('highscores.getAll');
}