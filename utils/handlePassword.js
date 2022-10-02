const bcryptjs = require('bcryptjs')

/* recibo una contraseña sin encriptar => passwordPlain */
/* el segundo argumento es el salt, que le da mas aleatoriedad a la encriptacion */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}

const compare = async (passwordPlain, hashPassword) => {
    /* matchea el hash con la clave */
    return await bcryptjs.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt, compare };