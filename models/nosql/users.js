const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select:false /* para que no aparezca la password en la respuesta */
        },
        role:{
            type:["user","admin"],
            default:"user",
        },
    },
    {
        timestamps:true, /* registra el createAt y updateAt */
        versionKey: false,
    }
);
UserSchema.plugin(mongooseDelete, {overrideMethods:'all'})
module.exports = mongoose.model("users", UserSchema) 
/* exportamos un modelo de mongoose que sigue las reglas del modelo UserSchema */
/* "users" seria el nombre de la coleccion( tabla si fuera una db relacional) */