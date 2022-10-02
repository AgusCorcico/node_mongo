const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const TracksSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate:{
                validator: (req)=> {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist:{
            name: {
                type:String,
            },
            nickname: {
                type:String,
            },
            nacionality: {
                type:String,
            },
        },
        duration: {
            start:{
                type:Number,
            },
            end:{
                type:Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId, 
            /* tipo de dato que debe cumplir con ciertos requerimientos y una estructura requerida por mongoose */
        },
    },
    {
        timestamps:true, /* registra el createAt y updateAt */
        versionKey: false,
    }
);

/* Implementar metodo estatico propio con relacion a storage */
/* con lookup hacemos una relacion entre tracks y storages, utilizamos Tracks.mediaId y lo relacionamos con
Storages._id y el resultado conseguido lo coloca en el alias audio*/
TracksSchema.statics.findAllData = function() {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            /*  para que audio no venga como un array sino como un obj */
            $unwind: "$audio"
        }
    ])
    return joinData
}

TracksSchema.statics.findOneData = function(id) {
    const joinData = this.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            /*  para que audio no venga como un array sino como un obj */
            $unwind: "$audio"
        },
    ])
    return joinData
}

TracksSchema.plugin(mongooseDelete, {overrideMethods:'all'})
/* se le pasa el mongooseDelete como plugin, el overrideMethods es para que sobreescriba los metodos
que vienen por defecto o nativos en mongoose con la opcion del mongooseDelete */
/* esto lo hacemos para hacer un delete "ficticio" que se mantenga el item en la db */
module.exports = mongoose.model("tracks", TracksSchema) 