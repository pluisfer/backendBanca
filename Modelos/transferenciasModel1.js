const { model, Schema } = require("mongoose");

const transferencias1Schema = new Schema({
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

const transferenciasModel1 = model("transferenciaas1",transferencias1Schema);
exports.transferenciasModel1 = transferenciasModel1;