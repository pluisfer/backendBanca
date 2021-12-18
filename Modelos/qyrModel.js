const { model, Schema } = require("mongoose");

const qyrSchema = new Schema({
    usuario:{
        type: 'string',
        required: true,
    },
    tipoSol:{
        type: 'string',
        required: true
    },
    fechaSol:{
        type: 'date',
        required: true
    },
    nomyap:{
        type: 'string',
        required: true
    },
    tipoDoc:{
        type: 'string',
        required: true
    },
    nDoc:{
        type: 'number',
        required: true,
    },
    nCuenta:{
        type: 'number',
        required: true,
    },
    tipoCuenta:{
        type: 'string',
        required: true
    },
    fechaTrans:{
        type: 'date',
    },
    nTransferencia:{
        type: 'number',
        required: true,
    },
    descTrans:{
        type: 'string',
    },
    descSol:{
        type: 'string',
        required: true
    }
});

const qyrModel = model("qyr",qyrSchema);
exports.qyrModel = qyrModel;