const Usuario = require("./../esquemas/usuarios.js");
const Visitas = require("./../esquemas/visitas.js");

const verificarId = async(req, res)=>{
	const {id} = req.body;
	try{
		const usuario = await Usuario.findById(id);
		if(usuario){
			res.status(200).json({
				res: true,
				foto: usuario.foto
			});
		}
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

const obtenerVistas = async(req, res)=>{
	const nombre = "visitas";
	const visitas = await Visitas.findOne({nombre});
	if(!visitas){
		return res.status(200).json({
			res: false
		});
	}

	res.status(200).json({
		res: true,
		visitas: visitas.cantidad
	});
}

module.exports = {
	verificarId,
	obtenerVistas
};