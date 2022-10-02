require('dotenv').config() /* para que la app use las variables de entorno */
const express = require('express') /* para levantar un server */
const cors = require('cors')
const dbConnect = require('./config/mongo')
const app = express() 



app.use(cors()) /* cors permite evitar error de origen cruzado entre navegadores */
app.use(express.json())/* para poder recibir informacion a traves de un POST */
app.use(express.static("storage")) /* para que saque los recursos estaticos de la carpeta storage */

const port = process.env.PORT || 3000

/* Aqui invocamos a las rutas */
/* localhost/api/..... */
app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`Tu app esta lista por http://localhost:${port}`)
})

dbConnect();
