import {PHttpRequestProvider, PHttpRequest} from 'core/index.js'

/**
 * @class
 * @constructor
 * @public
 */
export default class PXMLHttpRequestProvider extends PHttpRequestProvider {
    
    constructor() {
        /**
         * @method
         * @param {PHttpRequestOptions} options - Options for the request
         * @param {function(any?):void} resolve - Callback used to resolve the request promise
         * @param {function(any?):void} reject - Callback used to reject the request promise
         * @returns {PHttpRequest}
         */
        this.get = (options, resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }
                }
            }
            xhr.ontimeout = function () {
                reject('timeout');
            }
            
            return new PXMLHttpRequest(xhr);
        };   
    }
}

/**
 * @class
 * @constructor
 * @public
 */
export class PXMLHttpRequest extends PHttpRequest {
    
    /**
     * @param {XMLHttpRequest} request the request to send
     */
    constructor(request) {
        /**
         * @type {XMLHttpRequest}
         * @private
         */
        this.request = request;

        /**
         * @method
         * @param {PHttpRequestOptions} options options for the request
         * @param {any?} data data to send with the request
         * @returns {PHttpResponse}
         */
        this.send = (options, data) => {
            this.request.open(options.method, options.url, true)
            this.request.send(data);
        };
    }
}