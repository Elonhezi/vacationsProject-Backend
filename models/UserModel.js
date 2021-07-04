const Joi = require("joi");

class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.uuid = user.uuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }
    
    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        userId: Joi.forbidden(), 
        uuid: Joi.string().optional(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        userName: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(4).max(128),
        isAdmin: Joi.boolean().optional()
    });

    // Create put validation schema only once as a private (#) static object:
    static #putValidationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        uuid: Joi.string().optional(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        userName: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(4).max(128),
        isAdmin: Joi.boolean().optional()
    });

    validatePost() {
        const result = UserModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = UserModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
}

module.exports = UserModel;