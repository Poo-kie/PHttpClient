/**
 * @class PHttpResponseAttrValidator implement and pass to {@link PHttpResponseValidator} for 
 * resolve/reject 
 * of promises
 * @constructor
 * @public
 */
export default class PHttpResponseAttrValidator {
    constructor() {
        /**
         * @method
         * @param {PHttpResponse} response The response to validate
         * @returns {Boolean} True if the response is valid; otherwise, false.
         */
        this.isValid = (response) => {
            throw new Error("not implemented.");
        };
    }
}