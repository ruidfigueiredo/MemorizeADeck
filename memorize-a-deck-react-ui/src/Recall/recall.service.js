/** @typedef Suit 
 *  @property {number} diamond
 *  @property {number} heart
 *  @property {number} club
 *  @property {number} space
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