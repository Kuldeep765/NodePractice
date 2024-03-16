const Joi = require('joi');


const userValidation = (req, res, next) => {


    try {

        const {
            fname,
            lname,
            city,
            state,
            country,
            numbers,
            email,
            password,
            confirmPassword
        } = req.body;

        const userInfo = {
            fname,
            lname,
            city,
            state,
            country,
            numbers,
            email,
            password,
            confirmPassword
        }

        const Schema = Joi.object({
            fname: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            lname: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            city: Joi.string()
                .alphanum()
                .max(30)
                .required(),

            state: Joi.string()
                .max(30)
                .required(),

            country: Joi.string()
                .max(30)
                .required(),

            numbers: Object.keys({
                numbers: Joi.number().max(10)
            }),

            // numbers: Joi.json()
            //     .max(10)
            //     .required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            confirmPassword: Joi.ref('password'),


        })

        const { error } = Schema.validate(userInfo)
        if (error) {
            return res.status(501).json({ error: error.details[0].message })
        }
        next();

    } catch (error) {
        return res.status(400).json({ message: "something wrong" })
    }


}
module.exports = { userValidation }
