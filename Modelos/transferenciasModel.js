const { model, Schema } = require("mongoose");

const transferenciasSchema = new Schema({
    usuarioOrigen:{
        type: 'string',
        required: true,
    },
    usuarioDestino:{
        type: 'string',
        required: true,
    },
    fecha:{
        type: "date",
        required: true,
        default: new Date
    },
    nTransferencia:{
        type: 'number',
        required: true,
        unique: true
    },
    descripcion:{
        type: 'string',
        required: true,
        default: 'Transferencia'
    },
    valor:{
        type: 'number',
        required: true
    },
    saldoOrigen:{
        type: 'number',
        required: true
    },
    saldoDestino:{
        type: 'number',
        required: true
    }
});

const transferenciasModel = model("transferencias",transferenciasSchema);
exports.transferenciasModel = transferenciasModel;