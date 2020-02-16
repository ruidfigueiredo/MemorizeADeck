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

exports.start = ({cardsMemorized, memorizationTime}) => {
    return connection.send('recall.start', {cardsMemorized, memorizationTime});
}

exports.hint = () => {
    return connection.send('recall.hint');
}


connection.on('recall.isClubSelected', isClubSelected => recallEvents.emit('isClubSelected', isClubSelected));
connection.on('recall.isDiamondSelected', isDiamondSelected => recallEvents.emit('isDiamondSelected', isDiamondSelected));
connection.on('recall.isHeartSelected', isHeartSelected => recallEvents.emit('isHeartSelected', isHeartSelected));
connection.on('recall.isSpadeSelected', isSpadeSelected => recallEvents.emit('isSpadeSelected', isSpadeSelected));
connection.on('recall.isTwoSelected', isTwoSelected => recallEvents.emit('isTwoSelected', isTwoSelected));
connection.on('recall.isThreeSelected', isThreeSelected => recallEvents.emit('isThreeSelected', isThreeSelected));
connection.on('recall.isFourSelected', isFourSelected => recallEvents.emit('isFourSelected', isFourSelected));
connection.on('recall.isFiveSelected', isFiveSelected => recallEvents.emit('isFiveSelected', isFiveSelected));
connection.on('recall.isSixSelected', isSixSelected => recallEvents.emit('isSixSelected', isSixSelected));
connection.on('recall.isSevenSelected', isSevenSelected => recallEvents.emit('isSevenSelected', isSevenSelected));
connection.on('recall.isEightSelected', isEightSelected => recallEvents.emit('isEightSelected', isEightSelected));
connection.on('recall.isNineSelected', isNineSelected => recallEvents.emit('isNineSelected', isNineSelected));
connection.on('recall.isTenSelected', isTenSelected => recallEvents.emit('isTenSelected', isTenSelected));
connection.on('recall.isJackSelected', isJackSelected => recallEvents.emit('isJackSelected', isJackSelected));
connection.on('recall.isQueenSelected', isQueenSelected => recallEvents.emit('isQueenSelected', isQueenSelected));
connection.on('recall.isKingSelected', isKingSelected => recallEvents.emit('isKingSelected', isKingSelected));
connection.on('recall.isAceSelected', isAceSelected => recallEvents.emit('isAceSelected', isAceSelected));

connection.on('recall.cardsRemembered', cardsRemembered => recallEvents.emit('cardsRemembered', cardsRemembered));