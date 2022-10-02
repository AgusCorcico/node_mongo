const { handleHttpError } = require('../utils/handleHttpError');
const { verifyToken } = require('../utils/handleJwt');
const { usersModel } = require('../models')



const authMiddleware =  async (req, res , next) => {
/* 
    capturamos el token. 
    los jwt se usan para pasar como un metodo de autorizacion en el encabezado.
    si queremos protejer x ruta, para que solo apliquen los usuarios que poseen jwt en el header
    tengo que poner el authorization(key) y bearer+token(value)
    Postman tiene la opcion authorization con la opcion "bearer token" donde pegamos el token
*/
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            /* si no existe el authorization en el header => error */
        }
        const token = req.headers.authorization.split(' ').pop();
        /* req.headers.authorization => "bearer+token"*/
        /* hay que sacar el bearer => dividimos con el split y tomamos el ultimo valor */

        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
        }
        /* tenemos que saber cual es el payload, cual es la carga util del token, para saber el id
        para poder comprobar si tiene permisos para poder continuar */


        const user = await usersModel.findById(dataToken._id) /* para saber quien esta haciendo la peticion */
        req.user = user /* inyecto una propiedad user en la peticion y asi sabemos la persona que hace las peticiones */
        next()/* deje pasar al usuario */


    } catch (error) {
        handleHttpError(res, "ERROR_SESSION", 401)
    }
}

module.exports = authMiddleware;