import PHttpResponse from '../core/PHttpResponse'

/**
 * @class
 * 
 * @constructor
 * @param {XMLHttpRequest} xhr - The XMLHttpRequest to create the PHttpResponse from
 * @public
 */
export class PXMLHttpRequestResponseAdapter extends PHttpResponse {
    /**
     * 
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest to create the PHttpResponse from
     */
    constructor(xhr) {
        super();
        /**
         * @method 
         * @description Adapts the response object of a XMLHttpRequest to a PHttpResponse 
         * @public
         * @returns {PHttpResponse}
         */
        this.adapt = () => {
            this.rawResponse = xhr;

            this.status = xhr.status;
            this.statusText = xhr.statusText;
            this.url = xhr.responseURL;
            this.headers = this.processHeaders(xhr.getAllResponseHeaders());
            this.response = xhr.response;
            this.responseText = xhr.responseText;

            return this;
        };

        this.processHeaders = (headers) => {
            var arr = headers.trim().split(/[\r\n]+/);

            // Create a map of header names to values
            var headerMap = {};
            arr.forEach(function (line) {
                var parts = line.split(': ');
                var header = parts.shift();
                var value = parts.join(': ');
                headerMap[header] = value;
            });

            return headerMap;
        }
    }
}