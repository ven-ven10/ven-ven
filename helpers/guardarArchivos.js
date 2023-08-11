const path = require("path");
const fs = require("fs");

const guardarPelicula = (pelicula)=>{
	return new Promise((resolve, reject)=>{
		const ruta = path.join(__dirname+"./../public/peliculas/peliculas/"+pelicula.name);
		pelicula.mv(ruta, function(err){
			if(err){
				reject(false);
			}else{
				resolve(pelicula.name);
			}
		});

	});
}

const guardarPortada = (portada)=>{
	return new Promise((resolve, reject)=>{
		const ruta = path.join(__dirname+"./../public/peliculas/portadas/"+portada.name);

		portada.mv(ruta, function(err){
			if(err){
				reject(false);
			}else{
				resolve(portada.name);
			}
		});
	});
}

const eliminarPeliculaLocal = (nombrePelicula)=>{
	const ruta = path.join(__dirname+"./../public/peliculas/peliculas/"+nombrePelicula);
	if(!fs.existsSync(ruta)){
		return false
	}

	try{
		fs.unlinkSync(ruta);
		return true;
	}catch(e){
		return false;
	}
}

const eliminarPortadaLocal = (nombrePortada)=>{
	const ruta = path.join(__dirname+"./../public/peliculas/portadas/"+nombrePortada);
	if(!fs.existsSync(ruta)){
		return false;
	}

	try{
		fs.unlinkSync(ruta);
		return true;
	}catch(e){
		return false;
	}
}


module.exports = {
	guardarPelicula,
	guardarPortada,
	eliminarPeliculaLocal,
	eliminarPortadaLocal
}