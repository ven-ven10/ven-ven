const {verificarToken} = require("./../helpers/token.js");

const validarToken = (req, res)=>{
	const {token} = req.body;

	const {respuesta, id} = verificarToken(token);
	if(respuesta){
		res.status(200).json({
			res: true,
			id
		});
	}else{
		res.status(200).json({
			res: false
		});
	}
}

module.exports = {
	validarToken
}