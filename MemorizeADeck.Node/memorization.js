const { connection } = require('./connection')
const {EventEmitter} = require('events')

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

exports.turnCard = function() {
    return connection.send('memorization.turnCard').then(wasCardTurned => {
        if (!wasCardTurned){
            console.log('Could not turn card...');
        }            
    });
}

exports.stopMemorization = function(){
    return connection.send('memorization.stop');
}

connection.on('memorization.currentCard', currentCard => {
   memorizationEvents.emit('currentCardChanged', currentCard); 
});

connection.on('memorization.cardAssociation', cardAssociation => {    
    memorizationEvents.emit('cardAssociationChanged', cardAssociation);
});


connection.on('memorization.isCardAssociationVisible', isCardAssociationVisible => {
    console.log(`memorization.isCardAssociationVisible -> ${isCardAssociationVisible}`);
});

connection.on('memorization.cardsSeen', cardsSeen => {
    console.log(`memorization.cardsSeen ->`, cardsSeen);
});

connection.on('memorization.isCurrentCardVisible', isCurrentCardVisible => {
    //console.log(`memorization.isCurrentCardVisible -> ${isCurrentCardVisible}`);
});

connection.on('memorization.isLastCard', isLastCard => {
    memorizationEvents.emit('isLastCard', isLastCard);
});

connection.on('memorization.cardsNotSeenCount', cardsNotSeenCount => {
    // console.log();
    // console.log(`memorization.cardsNotSeenCount -> ${cardsNotSeenCount}`);
    // console.log();
});



connection.on('memorization.complete', result => {
    exports.memorizationEvents.emit('complete', result);
});