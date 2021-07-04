const Joi = require("joi");

class CredentialsModel {

    constructor(credentials) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }

    static #postValidationSchema = Joi.object({
        userName: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(128)
    });

    validatePost() {
        const result = CredentialsModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
}

module.exports = CredentialsModel;