const { connection } = require('./connection')
const { EventEmitter } = require('events')

const recallEvents = new EventEmitter();

exports.recallEvents = recallEvents;

exports.suit = {
    diamond: 0,
    heart: 1,
    club: 2,
    spade: 3
}

exports.face = {
    ace: 0,
    two: 1,
    three: 2,
    four: 3,
    five: 4,
    six: 5,
    seven: 6,
    eight: 7,
    nine: 8,
    ten: 9,
    jack: 10,
    queen: 11,
    king: 12    
}

exports.selectFace = face => {
    return connection.send('recall.selectFace', face);
}

exports.selectSuit = suit => {
    return connection.send('recall.selectSuit', suit);
}


connection.on('recall.isClubSelected', isClubSelected => recallEvents.emit('isClubSelected', isClubSelected));
connection.on('recall.isDiamondSelected', isDiamondSelected => recallEvents.emit('isDiamondSelected', isDiamondSelected));
connection.on('recall.isHeartSelected', isHeartSelected => recallEvents.emit('isHeartSelected', isHeartSelected));
connection.on('recall.isSpadeSelected', isSpadeSelected => recallEvents.emit('isSpadeSelected', isSpadeSelected));
connection.on('recal.isTwoSelected', isTwoSelected => recallEvents.emit('isTwoSelected', isTwoSelected));
connection.on('recal.isThreeSelected', isThreeSelected => recallEvents.emit('isThreeSelected', isThreeSelected));
connection.on('recal.isFourSelected', isFourSelected => recallEvents.emit('isFourSelected', isFourSelected));
connection.on('recal.isFiveSelected', isFiveSelected => recallEvents.emit('isFiveSelected', isFiveSelected));
connection.on('recal.isSixSelected', isSixSelected => recallEvents.emit('isSixSelected', isSixSelected));
connection.on('recal.isSevenSelected', isSevenSelected => recallEvents.emit('isSevenSelected', isSevenSelected));
connection.on('recal.isEightSelected', isEightSelected => recallEvents.emit('isEightSelected', isEightSelected));
connection.on('recal.isNineSelected', isNineSelected => recallEvents.emit('isNineSelected', isNineSelected));
connection.on('recal.isTenSelected', isTenSelected => recallEvents.emit('isTenSelected', isTenSelected));
connection.on('recal.isJackSelected', isJackSelected => recallEvents.emit('isJackSelected', isJackSelected));
connection.on('recal.isQueenSelected', isQueenSelected => recallEvents.emit('isQueenSelected', isQueenSelected));
connection.on('recal.isKingSelected', isKingSelected => recallEvents.emit('isKingSelected', isKingSelected));
connection.on('recal.isAceSelected', isAceSelected => recallEvents.emit('isAceSelected', isAceSelected));