import { PHttpRequestProvider, PHttpRequest } from '../core/index'
import { PXMLHttpRequestResponseAdapter } from '../responseAdapters/PXMLHttpRequestResponseAdapter'

/**
 * @class
 * 
 * @constructor
 * @param {XMLHttpRequest?} - (optional) An XMLHttpRequest.  If not supplied, an xhr will be supplied with default
 * properties.
 * @public
 */
export default class PXMLHttpRequestProvider extends PHttpRequestProvider {
    
    constructor(request) {
        super();

        if (request && !(request instanceof XMLHttpRequest)) throw new Error('');

        /**
         * @method
         * @param {PHttpRequestOptions} options - Options for the request
         * @param {function(any?):void} resolve - Callback used to resolve the request promise
         * @param {function(any?):void} reject - Callback used to reject the request promise
         * @returns {PHttpRequest}
         */
        this.get = (options, resolve, reject) => {
            const xhr = request || new XMLHttpRequest();
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let response = new PXMLHttpRequestResponseAdapter(xhr).adapt();
                    if (response.status === 200) {
                        resolve(response);
                    } else {
                        reject(JSON.stringify(response));
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
         * @returns {Promise<>}
         */
        this.send = (options, data) => {
            this.request.open(options.method, options.url, true)
            this.request.send(data);
        };
    }
}