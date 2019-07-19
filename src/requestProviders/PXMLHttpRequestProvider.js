import { PHttpRequestProvider, PHttpRequest, PHttpResponseValidator } from '../core/index';
import { PXMLHttpRequestResponseAdapter } from '../responseAdapters/PXMLHttpRequestResponseAdapter';
import { PHttpResponseSerializer } from '../core/PHttpResponseSerializer';

/**
 * @class {PXMLHttpRequestProvider} PXMLHttpRequestProvider
 * 
 * @constructor
 * @param {XMLHttpRequest?} request (optional) An XMLHttpRequest.  If not supplied, an xhr will be supplied with default
 * properties.
 * @param {PHttpResponseValidator?} validator (optional) A response validator.  Implement one for use cases like rejecting
 * the promise for specific http status codes and such.
 * @public
 */
export default class PXMLHttpRequestProvider extends PHttpRequestProvider {
    
    /**
     * 
     * @param {XMLHttpRequest?} request 
     * @param {PHttpResponseValidator?} validator 
     */
    constructor(request, validator) {
        super();

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
                if (xhr.readyState === 4) {
                    let response = new PXMLHttpRequestResponseAdapter(xhr).adapt();
                    if (!validator || validator.isValid(response)) {
                        resolve(response);
                    } else {
                        let serializer = new PHttpResponseSerializer();
                        reject(serializer.serialize(response));
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
        super();

        /**
         * @type {XMLHttpRequest}
         * @private
         */
        this.request = request;

        /**
         * @method
         * @param {PHttpRequestOptions} options options for the request
         * @param {any?} data data to send with the request
         */
        this.send = (options, data) => {
            this.request.open(options.method, options.url, true)
            this.request.send(data);
        };
    }
}