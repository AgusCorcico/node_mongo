const jsonwebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


const tokenSign = async (user) => {
    /* recibe el obj de user  */
    const sign = jsonwebtoken.sign(
    {
        /* payload, que es lo que quiero pasar */
        _id: user._id,
        role: user.role
    },
    JWT_SECRET,
    {
        /* tiempo de expiracion del token */
        expiresIn: "2h",
    }
    );
    return sign

}

const verifyToken = async (tokenJwt) =>{
    /* recibe el token de sesion jwt */
    try {
        return jsonwebtoken.verify(tokenJwt,JWT_SECRET)
    } catch (error) {
        return null
    }

}

module.exports = { tokenSign, verifyToken };