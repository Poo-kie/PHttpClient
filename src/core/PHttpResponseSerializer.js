/**
 * @class PHttpResponseSerializer
 * @constructor
 * @public
 */
export class PHttpResponseSerializer {
    
    constructor() {

        /**
         * @method
         * @param {PHttpResponse} response an http response
         * @returns {String} a serialized json response
         * @public
         */
        this.serialize = (response) => {
            let cache = [];
            
            let retVal = JSON.stringify(response, function(key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Duplicate reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            });

            cache = null;
            return retVal;
        };
    }
}