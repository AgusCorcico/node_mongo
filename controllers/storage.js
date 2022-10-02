const fs = require("fs")
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');
const storage = require('../models/nosql/storage');
const { handleHttpError } = require('../utils/handleHttpError');


const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;



/* Obtener lista de la base de datos */
const getItems = async (req,res) => {
    try {
        /* find({}) se trae todo */
        const data = await storageModel.find({});
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEMS_STORAGE");
    }
}
/* Obtener un detalle */
const getItem = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await storageModel.findById(id);
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEM_STORAGE");
    }
}
/* Insertar un registro */
const createItem = async (req,res) => {
    try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url : `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (error) {
        handleHttpError(res,"CREATE");
    }

}

/* Eliminar un registro */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id})
        const { filename } = dataFile;
        /* tomar el filename que viene por data */
        const filePath = `${MEDIA_PATH}/${filename}`

        fs.unlinkSync(filePath);
        /* eliminar archivo pasando ruta del storage*/
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEM_STORAGE");
    }
}

module.exports = {getItems, getItem, createItem, deleteItem}