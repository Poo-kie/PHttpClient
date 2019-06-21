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
         * @param {String} url The URL for the GET request
         * @param {Number?} timeout The timeout in ms after which the request will be rejected
         * @param {Object<string,string>?} tokenHeader * An Authorization token to set for the request. e.g. { "Authorization", "tOkEn123" }
         * @returns {Promise<PHttpResponse>}
         */
        this.get = (url, timeout, tokenHeader) => {
            let options = new PHttpRequestOptions();
            options.url = url;
            options.timeout = timeout;
            options.method = "GET";
            
            return new Promise((resolve, reject) => {
                let request = this.requestProvider.get(options, resolve, reject);
                request.send(options);
            });
        };
    }
};