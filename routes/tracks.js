const express = require('express')
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')


const {
    getItems,
    getItem,
    createItem, 
    updateItem, 
    deleteItem
} = require("../controllers/tracks")


/* Lista items */
router.get("/", authMiddleware, getItems);

/* Obtener detalle de item */
router.get("/:id", authMiddleware, validatorGetItem, getItem);


/* Crear un item */
/* Solo pueden hacer peticiones post los usuarios que tengan permiso de "admin" */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem,createItem);

/* Actualizar un item */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem,updateItem);

/* Eliminar un item */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);





module.exports = router;