import PHttpResponseAttrValidator from './PHttpResponseAttrValidator'

/**
 * @class PHttpResponseValidator add validators and pass to {@link PHttpRequestProvider} for 
 * resolve/reject 
 * of promises
 * @constructor
 * @public
 */
export default class PHttpResponseValidator {
    
    /**
     * 
     * @param {PHttpResponseAttrValidator[]} validators a collection of validators
     */
    constructor(validators) {
        /**
         * @method
         * @param {PHttpResponse} response The response to validate
         * @returns {Boolean} True if the response is valid; otherwise, false.
         */
        this.isValid = (response) => {
            if (!validators) return;

            for(let validator of validators) {
                if (!validator.isValid(response)) return false;
            }

            return true;
        };
    }
}