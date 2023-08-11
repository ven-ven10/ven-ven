const {Schema, model} = require("mongoose");

const Pelicula = new Schema({
	nombre: {
		type: String,
		required: true
	},
	descripcion: {
		type: String
	},
	url: {
		type: String
	},
	portada: {
		type: String
	},
	categoria: {
		type: String
	}
});

module.exports = model("peliculas", Pelicula);