/**
 * @class
 * @constructor
 * @public
 */
export default class PHttpRequestProvider {
    
    constructor() {

        /**
         * @method
         * @param {PHttpRequestOptions} options - Options for the request
         * @param {function(any?):void} resolve - Callback used to resolve the request promise
         * @param {function(any?):void} reject - Callback used to reject the request promise
         * @returns {PHttpRequest}
         */
        this.get = (options, resolve, reject) => {
            throw new Error("not implemented");
        };
    }
}