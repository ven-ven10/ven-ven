const jwt = require("jsonwebtoken");
require("dotenv").config();

const crearToken = (id)=>{
	const payload = {id};

	return new Promise((resolve, reject)=>{
		jwt.sign(payload, process.env.JWT, {
			expiresIn: "7day"
		}, function(err, token){
			if(err){
				reject(false);
			}else{
				resolve(token);
			}
		})
	});
}

const verificarToken = (token)=>{
	try{
		const respuesta = jwt.verify(token, process.env.JWT);
		const {id} = jwt.verify(token, process.env.JWT);
		return {respuesta, id};
	}catch(e){
		return {respuesta: false};
	}
}

module.exports = {
	crearToken,
	verificarToken
}