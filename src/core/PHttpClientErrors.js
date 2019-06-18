export default class PHttpClientErrors {
    constructor() {
        this.incorrectArgumentType = (arg, expectedType) => new PHttpClientError('IncorrectArgumentType', `The argument ${arg} is not of the correct type. Expected ${expectedType}`);
    }
}

/**
 * @class
 * 
 * @param {String} - The error code to associate this error with
 * @param {String} - The error message used to describe this error
 */
class PHttpClientError {

    constructor(errorCode, errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}