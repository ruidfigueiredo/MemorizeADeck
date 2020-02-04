const readline = require('readline');
const { startMemorization, stopMemorization, turnCard, memorizationEvents } = require('./memorization');
const { startRecall, recallEvents, selectFace, selectSuit } = require('./recall')

let areAllCardsTurned = false;
memorizationEvents.on('currentCardChanged', currentCard => {
    console.log(currentCard);
});
memorizationEvents.on('cardAssociationChanged', cardAssociation => {
    console.log(cardAssociation);
});
memorizationEvents.on('isLastCard', isLastCard => {
    areAllCardsTurned = isLastCard;
});
(async function () {
    await startMemorization({
        includeClubs: true
    });
    await readLine('To turn a card press enter');
    while (!areAllCardsTurned) {
        await turnCard();
        await readLine('');
    }
    await stopMemorization();
})();

let isRecallCompleted = false
memorizationEvents.on('complete', async results => {
    console.log('memorization complete', results);
    console.log('Initiating recall');
    await startRecall(results)
    askTheUserToRecall();
    isRecallCompleted = false;
});

recallEvents.on('completed', time => {
    console.log('onCompleted from index');
    isRecallCompleted = true;
})
async function askTheUserToRecall() {
    while (!isRecallCompleted) {
        const suitAndFace = await askForSuitAndFace();
        await selectSuit(suitAndFace.suit); //await is important because we can actually access/change the view model concurrently if we don't wait for the response
        await selectFace(suitAndFace.face);
    }
}

// var _isLastCard = false;
// connection.on('memorization.currentCard', currentCard => {
//     console.log(`memorization.currentCard ->`, currentCard);
// });

// connection.on('memorization.cardAssociation', cardAssociation => {
//     console.log(`memorization.cardAssociation ->`, cardAssociation);
// });


// connection.on('memorization.isCardAssociationVisible', isCardAssociationVisible => {
//     console.log(`memorization.isCardAssociationVisible -> ${isCardAssociationVisible}`);
// });

// connection.on('memorization.cardsSeen', cardsSeen => {
//     console.log(`memorization.cardsSeen -> ${cardsSeen}`);
// });

// connection.on('memorization.isCurrentCardVisible', isCurrentCardVisible => {
//     console.log(`memorization.isCurrentCardVisible -> ${isCurrentCardVisible}`);
// });

// connection.on('memorization.isLastCard', isLastCard => {
//     console.log(`memorization.isLastCard -> ${isLastCard}`);
//     _isLastCard = isLastCard;
// });

// connection.on('memorization.cardsNotSeenCount', cardsNotSeenCount => {
//     console.log();
//     console.log(`memorization.cardsNotSeenCount -> ${cardsNotSeenCount}`);
//     console.log();
// });

// function startMemorization({
//     includeSpades,
//     includeDiamonds,
//     includeClubs,
//     includeHearts
// }) {
//     return connection.send('memorization.start', {
//         IncludeSpades: includeSpades,
//         IncludeDiamonds: includeDiamonds,
//         IncludeClubs: includeClubs,
//         IncludeHearts: includeHearts
//     }).catch(error => {
//         console.log('There was an error starting the memorization process', error);
//         return Promise.reject(error);
//     });
// }

// connection.send('memorization.start', {
//     IncludeSpades: true,
//     IncludeDiamonds: false,
//     IncludeClubs: false,
//     IncludeHearts: false
// }).then(() => {
//     console.log('started');
//     startClockDisplay();
//     turnCardsUntilDeckFinishes();
// }, error => {
//     console.log(error);
// });

// connection.on('memorization.complete', result => {
//     console.log('memorization.complete', result);
//     connection.send('recall.start', result, async err => {
//         if (err) {
//             console.log('recall.start failed');
//             console.log(err)
//         } else {
//             let faceAndSuit = await askForSuitAndFace();
//             connection.send('recall.selectSuit', faceAndSuit.suit)
//             connection.send('recall.selectFace', faceAndSuit.face)
//             console.log(faceAndSuit);
//         }
//     });
// });


// function turnCardsUntilDeckFinishes() {
//     setTimeout(() => {
//         if (!_isLastCard) {
//             connection.send('memorization.turnCard').then(wasCardTurned => {
//                 console.log(`memorization.turnCard: ${wasCardTurned}`);
//             })
//             turnCardsUntilDeckFinishes();
//         } else {
//             connection.send('memorization.stop').then(result => {
//                 console.log('memorization.stop', result);
//             }, error => {
//                 console.log('memorization.stop error', error);
//             });
//         }
//     }, 1);
// }

function askForSuitAndFace() {
    return readLine('Enter a suit followed by a face number (e.g. S 9) for nine of spades').then(response => {
        const suitAndFace = response.split(' ');
        let suit;
        switch (suitAndFace[0]) {
            case 'd':
            case 'D':
                suit = 0;
                break;
            case 'h':
            case 'H':
                suit = 1;
                break;
            case 'c':
            case 'C':
                suit = 2;
                break;
            case 's':
            case 'S':
                suit = 3;
                break;
        }
        let face = suitAndFace[1] && Number(suitAndFace[1])
        if (suit === undefined || face === undefined)
            return askForSuitAndFace();
        else
            return { suit, face };
    });
}

function readLine(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(`${question}\n`, response => {
            rl.close();
            resolve(response)
        });
    });

}
