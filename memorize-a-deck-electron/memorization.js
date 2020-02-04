const { connection } = require('./connection')
const { EventEmitter } = require('events')

const memorizationEvents = new EventEmitter();

exports.memorizationEvents = memorizationEvents;

exports.startMemorization = function startMemorization({
    includeSpades = false,
    includeDiamonds = false,
    includeClubs = false,
    includeHearts = false
}) {
    return connection.send('memorization.start', {
        IncludeSpades: includeSpades,
        IncludeDiamonds: includeDiamonds,
        IncludeClubs: includeClubs,
        IncludeHearts: includeHearts
    }).catch(error => {
        console.log('There was an error starting the memorization process', error);
        return Promise.reject(error);
    });
}

exports.turnCard = function () {
    return connection.send('memorization.turnCard').then(wasCardTurned => {
        if (!wasCardTurned) {
            console.log('Could not turn card...');
        }
        return wasCardTurned;
    });
}

exports.toggleIsCardAssociationVisible = function() {
    return connection.send('memorization.toggleIsCardAssociationVisible');
}

exports.stopMemorization = function () {
    return connection.send('memorization.stop');
}

exports.getEllapsedTime = function () {
    return connection.send('memorization.ellapsedTime');
}

connection.on('memorization.currentCard', currentCard => {
    memorizationEvents.emit('currentCardChanged', currentCard);
});

connection.on('memorization.cardAssociation', cardAssociation => {
    memorizationEvents.emit('cardAssociationChanged', cardAssociation);
});


connection.on('memorization.isCardAssociationVisible', isCardAssociationVisible => {
    memorizationEvents.emit('isCardAssociationVisible', isCardAssociationVisible);
});

connection.on('memorization.cardsSeen', cardsSeen => {
    memorizationEvents.emit('cardsSeen', cardsSeen);
});

connection.on('memorization.isCurrentCardVisible', isCurrentCardVisible => {
    memorizationEvents.emit('isCurrentCardVisible', isCurrentCardVisible);
});

connection.on('memorization.isLastCard', isLastCard => {
    memorizationEvents.emit('isLastCard', isLastCard);
});

connection.on('memorization.cardsNotSeenCount', cardsNotSeenCount => {
    memorizationEvents.emit('cardsNotSeenCount', cardsNotSeenCount);
});

connection.on('memorization.complete', result => {
    memorizationEvents.emit('complete', result);
});