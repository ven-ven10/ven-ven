const {Schema, model} = require("mongoose");

const Usuario = new Schema({
	nombre: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		required: true
	},
	correo: {
		type: String,
		required: true
	},
	contraseña: {
		type: String,
		required: true
	},
	mensajes: {
		type: String,
		required: true
	},
	rol: {
		type: String,
		required: true
	},
	foto: {
		type: String
	}
});

module.exports = model("Usuarios", Usuario);