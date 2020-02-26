/** @typedef Suit 
 *  @property {number} diamond
 *  @property {number} heart
 *  @property {number} club
 *  @property {number} spade
 */

/** @typedef Face
 * @property {number} ace
 * @property {number} two
 * @property {number} three
 * @property {number} four
 * @property {number} five
 * @property {number} six
 * @property {number} seven
 * @property {number} eight
 * @property {number} nine
 * @property {number} ten
 * @property {number} jack
 * @property {number} queen
 * @property {number} king
 */


export const { start, selectFace, selectSuit, recallEvents, hint, sendHintRequestConfirmation } = window['recallService']

/**@type {Suit} */
export const suit = window['recallService'].suit;
/**@type {Face} */
export const face = window['recallService'].face;

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