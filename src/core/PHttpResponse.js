/**
 * @class
 * 
 * @constructor
 * @param {XMLHttpResponse | Response} response - The raw response object to wrap with this PHttpResponse
 * @public
 */
export default class PHttpResponse {

    constructor() {
        /**
         * @type {XMLHttpResponse | Response}
         * @description - The raw response object
         * @public
         */
        this.rawResponse = undefined;

        /**
         * @type {Number}
         * @public
         */
        this.status = undefined;

        /**
         * @type {String}
         * @public
         */
        this.statusText = undefined;

        /**
         * @type {String}
         * @public
         */
        this.url = undefined;

        /**
         * @type {Boolean}
         */
        this.redirected = undefined;

        /**
         * @type {any}
         */
        this.response = undefined;

        /**
         * @type {String}
         */
        this.responseText = undefined;
    }
}