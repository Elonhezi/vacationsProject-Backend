const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.description = vacation.description;
        this.img = vacation.img;
    }
    
    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(2).max(100),
        endDate: Joi.string().required().min(2).max(100),
        price: Joi.number().required(),
        description: Joi.string().required().min(2).max(300),
        img: Joi.string().optional().max(36)
    });

    // Create put validation schema only once as a private (#) static object:
    static #putValidationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(2).max(100),
        endDate: Joi.string().required().min(2).max(100),
        price: Joi.number().required(),
        description: Joi.string().required().min(2).max(300),
        img: Joi.string().optional().max(36)
    });


    validatePost() {
        const result = VacationModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = VacationModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

}

module.exports = VacationModel;
