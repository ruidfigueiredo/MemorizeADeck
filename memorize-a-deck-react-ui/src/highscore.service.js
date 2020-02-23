/**@type {(numberOfCards: number, memorizationTime: string) => Promise} */
export const saveHighscore = window['highscoresService'].saveHighscore;


/** 
 * @typedef Highscore 
 * @property {number} numberOfCards
 * @property {string} memorizationTime
 */

/** @type {() => Highscore[]} */
export const getHighscores = window['highscoresService'].getHighscores;