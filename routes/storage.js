const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage')
const {validatorGetItem} = require('../validators/storage')
const {
    getItems,
    getItem,
    createItem, 
    updateItem, 
    deleteItem
} = require("../controllers/storage")

/* Lista de items */
router.get("/", getItems);

/* Detalle de item */
router.get("/:id", validatorGetItem,getItem);

/* Eliminar item */
router.delete("/:id", validatorGetItem, deleteItem);

/* Crear item */
router.post('/',uploadMiddleware.single('myfile'),createItem)



module.exports = router;