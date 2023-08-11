const bcrypt = require("bcryptjs");
const Usuario = require("./../esquemas/usuarios.js");

const verificarPwd = async(correo, contraseña)=>{
	const usuario = await Usuario.findOne({correo});
	const valor = {};

	if(!usuario){
		valor.resp = null;
		valor.id = null;
		return valor;
	}

	if(usuario.rol=="admin"){
		valor.resp = null;
		valor.id = null;
		return valor;
	}

	const verificacion = bcrypt.compareSync(contraseña, usuario.contraseña);

	if(!verificacion){
		valor.resp = null;
		valor.id = null;
		return valor;
	}

	valor.resp = verificacion;
	valor.id = usuario.id;
	return valor;
}

const verificarContraseña = async(contraseña1, contraseña2)=>{
	return await bcrypt.compareSync(contraseña1, contraseña2);
}

module.exports = {
	verificarPwd,
	verificarContraseña
}