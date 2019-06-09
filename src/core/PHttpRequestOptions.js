/**
 * @class
 * @constructor
 * @public
 */
export default class PHttpRequestOptions {

    constructor() {
        /**
         * DELETE, GET, PATCH, POST, PUT
         * @type {string}
         * @public
         */
        this.method = undefined;

        /**
         * The url for the request
         * @type {string} 
         * @public
         */
        this.url = undefined;

        /**
         * The timeout (in ms) after which the request will be rejected
         * @type {number?}
         * @public
         */
        this.timeout = undefined;    
    }
}   