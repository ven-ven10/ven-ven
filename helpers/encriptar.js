const bcrypt = require("bcryptjs");

const Encriptar = (contraseña)=>{
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(contraseña, salt);
}

module.exports = {
	Encriptar
}