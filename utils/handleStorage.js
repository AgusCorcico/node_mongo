const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pathStorage =  `${__dirname}/../storage`;
        cb(null, pathStorage)/* primer arg: un error(si existe), segundo arg: destino */
    },
    filename: function(req, file, cb){

        const ext = file.originalname.split('.').pop(); /* para obtener la extension del archivo */
        const filename = `file-${Date.now()}.${ext}`; /* para generar nombres aleatorios de los archivos */
        cb(null, filename)
    },
});

const uploadMiddleware = multer({storage: storage}) /* este middleware va en el post
para que "agarre" un archivo */

module.exports = uploadMiddleware;