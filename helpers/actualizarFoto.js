const path = require("path");

const actualizarFoto = async(imagen)=>{
	return new Promise((resolve, reject)=>{
		const extencionesValidas = ["png", "jpg", "gif"];
		const separacionNombre = (imagen.name).split(".");
		const extencion = separacionNombre[separacionNombre.length-1].toLowerCase();

		if(!extencionesValidas.includes(extencion)){
			return reject(false);
		}

		const ruta = path.join(__dirname+"./../public/imagenes/usuarios/"+imagen.name);
		imagen.mv(ruta, function(err){
			if(err){
				reject(false);
			}else{
				resolve(imagen.name);
			}
		});

	});
}

module.exports = {
	actualizarFoto
}