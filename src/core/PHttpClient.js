import PHttpRequestOptions from './PHttpRequestOptions'
import PHttpRequestProvider from './PHttpRequestProvider'
import PHttpRequest from './PHttpRequest'

/**
 * @class
 *
 * @constructor
 * @param {PHttpRequestProvider} requestProvider A provider to service specific types of requests
 * @public
 */
export default class PHttpClient {

    constructor(requestProvider) {

        /**
         * @type {PHttpRequestProvider}
         * @private
         */
        this.requestProvider = requestProvider;
        
        /**
         * @method
         * @param {string} url The URL for the GET request
         * @param {number?} timeout The timeout in ms after which the request will be rejected
         * @returns {Promise<PHttpResponse>}
         */
        this.get = (url, timeout) => {
            let options = new PHttpRequestOptions();
            options.url = url;
            options.timeout = timeout;

            return new Promise((resolve, reject) => {
                let request = this.requestProvider.get(options, resolve, reject);
                request.send(options);
            });
        };
    }
};