const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');
const { handleHttpError } = require('../utils/handleHttpError');


/* Obtener lista de la base de datos */
const getItems = async (req,res) => {

    try {
        const user = req.user
    /* find({}) se trae todo */
    const data = await tracksModel.findAllData({})
    res.send({data,user});
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }



}
/* Obtener un detalle */
const getItem = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({data});
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEM")
    }
}
/* Insertar un registro */
const createItem = async (req,res) => {

    try {
        const body = matchedData(req);
        /* matchedData limpia la data y se encarga de dejar el objeto de la data que cumple las validaciones especificadas */
        const data = await tracksModel.create(body);
        res.send({data});
        } catch (error) {
            handleHttpError(res, 'ERROR_CREATE_ITEMS')
        }
}
/* Actualizar un registro */
const updateItem = async (req,res) => {
    try {
        /* creo dos obj: id(que trae solo id) y body(que trae todo menos id) */
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({data});
        } catch (error) {
            handleHttpError(res, 'ERROR_UPDATE_ITEMS')
        }

}
/* Eliminar un registro */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({data});
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}