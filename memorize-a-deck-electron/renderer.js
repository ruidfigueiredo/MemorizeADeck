
function log(text, ...rest) { 
    var p = document.createElement('pre');
    p.innerHTML = text;
    document.body.appendChild(p);
    if (rest) {
        for(let i = 0; i < rest.length; i++){
            log(rest[i])
        }
    }
}

const { startMemorization, stopMemorization, turnCard, memorizationEvents } = memorizationService;

let areAllCardsTurned = false;
memorizationEvents.on('currentCardChanged', currentCard => {
    log(JSON.stringify(currentCard));
});
memorizationEvents.on('cardAssociationChanged', cardAssociation => {
    console.log(cardAssociation);
});
memorizationEvents.on('isLastCard', isLastCard => {
    areAllCardsTurned = isLastCard;
});
(async function () {
    await startMemorization({
        includeClubs: true,
        includeDiamonds: true
    });

    while (!areAllCardsTurned) {
        await new Promise(r => setTimeout(() => r(), 1000));
        await turnCard();        
    }
    await stopMemorization();
})();

// let isRecallCompleted = false
memorizationEvents.on('complete', async results => {
    console.log('memorization complete', results);
    console.log('Initiating recall');
    // await startRecall(results)
    // askTheUserToRecall();
    // isRecallCompleted = false;
});