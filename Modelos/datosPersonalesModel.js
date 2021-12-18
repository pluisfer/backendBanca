const { model, Schema } = require("mongoose");

const datosPersonalesSchema = new Schema({
    usuario:{
        type: 'string',
        required: true,
        unique: true
    },
    nombre:{
        type: "string",
        required: true
    },
    apellidos:{
        type: "string",
        required: true
    },
    tipoDoc:{
        type: "string",
        required: true
    },
    doc:{
        type: "number",
        required: true,
        unique: true,
    },
    fechaNac:{
        type: "date",
        required: true
    },
    fechaDoc:{
        type: "date",
        required: true
    },
    correo:{
        type: "string",
        required: true
    },
    ciudad:{
        type: "string",
        required: true
    },
    direccion:{
        type: "string",
        required: true
    }
});

const datosPersonalesModel = model("datosPersonales",datosPersonalesSchema);
exports.datosPersonalesModel = datosPersonalesModel;