import PHttpRequestOptions from './PHttpRequestOptions'

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
         * @returns {PHttpResponse}
         */
        this.get = (url, timeout) => {
            let options = new PHttpRequestOptions();
            options.url = url;
            options.timeout = timeout;

            return new Promise((resolve, reject) => {
                this.requestProvider.get(options, resolve, reject);
            });
        };
    }
};