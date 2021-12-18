const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcrypt");

const usuarioSchema = new Schema({
    usuario: {
        type: "string",
        required: true,
        unique: true,
        max: 100
    },
    contraseña: {
        type: "string",
        required: true,
        min: 3
    },
    rol: {
        type: "string",
        required: true
    },
    estado: { 
        type: "string",
        default: "Activo"
    }
});

usuarioSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.SALT_N);
    this.contraseña = await hash(this.contraseña, salt);
    next();
})

const usuariosModel = model("usuario", usuarioSchema);

exports.usuariosModel = usuariosModel;