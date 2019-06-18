/**
 * @class
 * @constructor
 * @public
 */
export default class PHttpRequestOptions {

    constructor() {
        /**
         * DELETE, GET, PATCH, POST, PUT
         * @type {String}
         * @public
         */
        this.method = undefined;

        /**
         * The url for the request
         * @type {String} 
         * @public
         */
        this.url = undefined;

        /**
         * The timeout (in ms) after which the request will be rejected
         * @type {Number?}
         * @public
         */
        this.timeout = undefined;    

        /**
         * An Authorization token to set for the request
         * e.g. { "Authorization", "tOkEn123" }
         * @type {Object.<String,String>?}
         * @public
         */
        this.tokenHeader = undefined;
    }
}   