/**
 * @typedef Connection 
 * @property {(eventName: string, args?: any, handlerFn?: (err: any, result: any) => void | any) => void | Promise<any>} send
 * @property {(eventName: string, handlerFn?: (arg: any) => any) => void} on
 */

/** @type {Connection} */
export const connection = window['connection'];

/** @type {{on: (eventName: string, handler: Function) => void}} */
export const EventEmitter = window['EventEmitter'];