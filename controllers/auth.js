const { matchedData } = require('express-validator');
const { encrypt } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleHttpError');
const { usersModel } = require('../models');
const { compare } = require('bcryptjs');

const registerController = async (req,res) => {    
    try {
                /* encargado de registrar un usuario */
    
    req = matchedData(req);
    const password = await encrypt(req.password)
    const body = {...req, password}
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, {strict:false}) /* para que no se vea la password hasheada en el response */

    const data = {
        token: await tokenSign(dataUser),
        user: dataUser,
    };
    res.send({data});
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
};

const loginController = async (req,res) => {

    try {
    /* encargado de logear usuario */
    req = matchedData(req); /* para que solo venga email y password */
    const user = await usersModel.findOne({email:req.email}).select('password name role email');
    /* el ".select('password')" es porque nosotros lo seteamos en false en el modelo para que no lo retorne
    y asi tenerla privada, pero ahora la necesitamos, es por es que hay que usar el select aca. 
    Todo lo que pasamos en el select lo tenemos como response en el login*/
    if(!user){
        handleHttpError(res, "USER_NOT_EXISTS", 404);
    }
    const hashPassword = user.password;
    /* comparo la password que recibo por req del usuario con la hasheada de la base de datos.Retorna un booleano */
    const check = await compare(req.password, hashPassword)
    if(!check) {
        handleHttpError(res, "PASSWORD_INVALID", 401); 
        /* 401 => UNAUTHORIZED */
    }
    user.set('password', undefined,{strict:false})
    /* este user.set es para que la password se coloque como undefined y no lo devuelva en el res*/
    const data = {
        token: await tokenSign(user),
        user
    }
    res.send({data})

} catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER")
}

}
module.exports = {registerController, loginController};