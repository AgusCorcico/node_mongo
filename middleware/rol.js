const { handleHttpError } = require('../utils/handleHttpError');



/**
 * array con los roles permitidos
 */

const checkRol = (roles) => (req, res, next) => {

    try {
        const { user } = req;
        const rolesByUser = user.role;
        
        /* checkear si el rol del user cumple con el rol requerido para esta ruta */
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
        }
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol