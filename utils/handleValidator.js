const { validationResult } = require('express-validator');
/* validationResult es un metodo de express validator */

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
/* si no hay error continua hacia el controller(next) */
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

module.exports =  {validateResult};