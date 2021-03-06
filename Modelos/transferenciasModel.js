const { model, Schema } = require("mongoose");

const transferenciasSchema = new Schema({
    nCuenta:{
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
    saldo:{
        type: 'number',
        required: true
    }
});

const transferenciasModel = model("transferenciaas",transferenciasSchema);
exports.transferenciasModel = transferenciasModel;