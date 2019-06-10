import { PHttpRequestProvider, PHttpRequest, PHttpResponse } from '../core/index.js'

/**
 * @class
 * @constructor
 * @param {PHttpResponse?} response (optional) a response to return from the client
 * @param {boolean} isRejected
 * @public
 */
export default class PStubHttpRequestProvider extends PHttpRequestProvider {
    
    constructor(response, isRejected) {
        super();

        /**
         * @method
         * @param {PHttpRequestOptions} options - Options for the request
         * @param {function(any?):void} resolve - Callback used to resolve the request promise
         * @param {function(any?):void} reject - Callback used to reject the request promise
         * @returns {PHttpRequest}
         */
        this.get = (options, resolve, reject) => {
            return new PStubHttpRequest(resolve, reject, response, isRejected);
        };   
    }
}

/**
 * @class
 * @constructor
 * @param {function(any?):void} resolve - Callback used to resolve the request promise
 * @param {function(any?):void} reject - Callback used to reject the request promise
 * @param {PHttpResponse?} response - Specify a response to resolve or display as stringified JSON
 * @param {boolean} isRejected - Specify whether the promise for the http request is rejected
 * @public
 */
export class PStubHttpRequest extends PHttpRequest {
    
    constructor(resolve, reject, response, isRejected) {
        super();

        /**
         * @method
         * @param {PHttpRequestOptions} options options for the request
         * @param {any?} data data to send with the request
         * @returns {PHttpResponse}
         */
        this.send = (options, data) => {
            let res = response || new PHttpResponse();
            
            if (isRejected) {
                return reject(new Error(JSON.stringify(response)));
            } 
            
            return resolve(res);
        };
    }
}