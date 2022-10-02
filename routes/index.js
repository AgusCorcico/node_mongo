const express = require('express')
const fs = require('fs')
const router = express.Router();

const PATH_ROUTES = __dirname; /* direname es una const de node que nos da la ruta absoluta */

const removeExtension = (fileName) => {
    /* separamos el nombre del archivo de la extension y nos lo quedamos */
    return fileName.split('.').shift() 
}

fs.readdirSync(PATH_ROUTES).filter((file) => {  
    /* llega el nombre del file ej: tracks */
    const name = removeExtension(file)
    if(name !== 'index'){
        /* hacemos uso del mismo, agregamos / ej=>http://localhost:3000/api/tracks */
        router.use(`/${name}`, require(`./${file}`))
    }
})









module.exports = router