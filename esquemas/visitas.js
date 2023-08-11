const {Schema, model} = require("mongoose");

const Visitas = new Schema({
	nombre: {
		type: String
	},
	cantidad: {
		type: Number
	}
});

module.exports = model("visitas", Visitas);