/**
 * @class
 * @constructor
 * @public
 */
export default class PHttpRequest {
    
    constructor() {
        /**
         * @method
         * @param {PHttpRequestOptions} options options for the request
         * @param {any?} data data to send with the request
         * @returns {PHttpResponse}
         */
        this.send = (options, data) => {
            throw new Error("not implemented");
        };
    }
}