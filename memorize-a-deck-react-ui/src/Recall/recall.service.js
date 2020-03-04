import {connection, EventEmitter} from '../connection.service';

export const recallEvents = new EventEmitter();

export const suit = {
    diamond: 0,
    heart: 1,
    club: 2,
    spade: 3
}

export const face = {
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

export function selectFace(face) {
    return connection.send('recall.selectFace', face);
}

export function selectSuit(suit) {
    return connection.send('recall.selectSuit', suit);
}

export function start({cardsMemorized, memorizationTime}) {
    return connection.send('recall.start', {cardsMemorized, memorizationTime});
}

export function hint() {
    return connection.send('recall.hint');
}

export function sendHintRequestConfirmation(isHintRequestConfirmed) {
    return connection.send('recall.hintRequestConfirmation', isHintRequestConfirmed);
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

connection.on('recall.hintConfirmationRequired', hintConfirmationRequired => recallEvents.emit('hintConfirmationRequired', hintConfirmationRequired));

connection.on('recall.completed', timeSpan => recallEvents.emit('completed', timeSpan));


export function getRecallDuration(timespan) {
    const timespanRegex = /^(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})\.(?<milliseconds>\d+)$/; //if you are looking and this and thinking: WTF? it's late and this was the first thing I coult think of when I realised that javascript doen't have a native way to represent durations in time
    const timespanMatch = timespan.match(timespanRegex)
    if (timespanMatch === null) {
        alert('Could not parse timespan from dotnet: ' + timespan);
        return;
    }
    return {
        hours: Number(timespanMatch.groups.hours),
        minutes: Number(timespanMatch.groups.minutes),
        seconds: Number(timespanMatch.groups.seconds),
        milliseconds: Number(timespanMatch.groups.milliseconds),        
    };
}