const mongoose = require("mongoose");
require("dotenv").config();

const conectar = process.env.CONECTAR;

const Conexion = async()=>{
	try{
		await mongoose.connect(conectar);
		console.log("Conectado a la base de datos");
	}catch(e){
		console.log("No se ah podido conectar con la base de datos");
	}
}

module.exports = {
	Conexion
}