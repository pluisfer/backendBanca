const { model, Schema } = require("mongoose");

const crearCuentaSchema = new Schema({
    usuario:{
        type: 'string',
        required: true,
    },
    fondoInversion:{
        type: 'string',
        required: true
    },
    tipoCuenta:{
        type: 'string',
        required: true
    },
    nCuenta:{
        type: 'number',
        required: true,
        unique: true
    },
    valor:{
        type: 'number',
        required: true
    },
    estado:{
        type: 'string',
        required: true,
        default: 'Activo'
    }
});

const crearCuentaModel = model("crearCuentaa",crearCuentaSchema);
exports.crearCuentaModel = crearCuentaModel;