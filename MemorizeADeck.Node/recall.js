const { connection } = require('./connection');
const { EventEmitter } = require('events');

const recallEvents = new EventEmitter();

connection.on('recall.cardsRemembered', cardsRemembered => {
    console.log('Cards correctly remembered: ', cardsRemembered);
    recallEvents.emit('cardsRemembered', cardsRemembered);
});

connection.on('recall.completed', memorizationTime => {
    console.log('completed successfully in', memorizationTime)
    recallEvents.emit('completed', memorizationTime);
    connection.close();
})

function selectFace(face) {
    return connection.send('recall.selectFace', face);
}

function selectSuit(suit) {
    return connection.send('recall.selectSuit', suit);
}

function startRecall(memorizationResult) {
    return connection.send('recall.start', memorizationResult);
}

module.exports = {
    recallEvents,
    selectFace,
    selectSuit,
    startRecall
};