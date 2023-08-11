const fs = require("fs");
const path = require("path");
const {Encriptar} = require("./../helpers/encriptar.js");
const Usuario = require("./../esquemas/usuarios.js");
const Pelicula = require("./../esquemas/peliculas.js");
const {verificarContraseña} = require("./../helpers/verificarPwd.js");
const {crearToken,
verificarToken} = require("./../helpers/token.js");
const {actualizarFoto} = require("./../helpers/actualizarFoto.js");

const loginAdmin = async(req, res)=>{
	const {correo, contraseña} = req.body;
	const usuario = await Usuario.findOne({correo});

	if(!usuario){
		return res.status(200).json({
			res: false
		});
	}

	if(usuario.rol != "admin"){
		return res.status(200).json({
			res: false
		});
	}

	const respuesta = await verificarContraseña(contraseña, usuario.contraseña);
	if(!respuesta){
		return res.status(200).json({
			res: false
		});
	}

	//Creacion de token con el id del usuario
	const token = await crearToken(usuario.id);

	res.status(200).json({
		res: true,
		token
	});

}

const createAdmin = async(req, res)=>{
	const {nombre, apellido, correo, contraseña} = req.body;
	const existe = await Usuario.findOne({correo});
	if(existe){
		return res.status(200).json({
			res: false
		});
	}

	//Registrar datos de usuario en la base de datos
	const mensajes = "{}";
	const rol = "admin";
	const foto = "sinfoto.png";
	const usuario = new Usuario({nombre, apellido, correo, contraseña, mensajes, rol, foto});
	usuario.contraseña = Encriptar(contraseña);

	//Guardar en DB
	await usuario.save();

	//Crear token
	const token = await crearToken(usuario.id);
	
	res.status(200).json({
		res: true,
		token
	});

}

const obtenerUsuarios = async(req, res)=>{
	const todos = await Usuario.find();
	let lista = [];

	todos.forEach(usuario=>{
		if(usuario.rol!="admin"){
			lista.push({
				foto: usuario.foto,
				nombre: usuario.nombre+" "+usuario.apellido,
				correo: usuario.correo,
				id: usuario.id
			});
		}
	});

	if(!lista){
		return res.json(200).json({
			res: false
		});
	}

	if(lista.length==0){
		return res.status(200).json({
			res: null
		});
	}

	res.status(200).json({
		res: true,
		lista
	});
}

const obtenerPeliculas = async(req, res)=>{
	const todos = await Pelicula.find();
	let lista = [];

	todos.forEach(pelicula=>{
		lista.push({
			foto: pelicula.portada,
			nombre: pelicula.nombre,
			categoria: pelicula.categoria
		});
	});

	if(!lista){
		return res.json(200).json({
			res: false
		});
	}

	if(lista.length==0){
		return res.status(200).json({
			res: null
		});
	}

	res.status(200).json({
		res: true,
		lista
	});
}

const obtenerInfo = async(req, res)=>{
	const {token} = req. body;
	const {respuesta, id} = verificarToken(token);
	if(!respuesta){
		return res.status(200).json({
			res: false
		});
	}

	try{
		const usuario = await Usuario.findById(id);
		const datos = {
			foto: usuario.foto,
			nombre: usuario.nombre,
			apellido: usuario.apellido,
			correo: usuario.correo
		};

		return res.status(200).json({
			res: true,
			datos
		});
	}catch(e){
		return res.status(200).json({
			res: false
		});
	}
}

const agregarFoto = async(req, res)=>{
	const {token} = req.body;
	const {respuesta, id} = verificarToken(token);
	if(!respuesta){
		return res.status(200).json({
			res: false
		});
	}

	if(!req.files.FOTO){
		return res.status(200).json({
			res: false
		});
	}

	try{
		const usuario = await Usuario.findById(id);
		if(usuario.foto!="sinfoto.png"){
			const ruta = path.join(__dirname+"./../public/imagenes/usuarios/"+usuario.foto);
			if(fs.existsSync(ruta)){
				fs.unlinkSync(ruta);
			}
		}

		const respuesta = await actualizarFoto(req.files.FOTO);
		if(!respuesta){
			return res.status(200).json({
				res: false
			});
		}

		usuario.foto = respuesta;
		await usuario.save();

		res.status(200).json({
			res: true
		});

	}catch(e){
		res.status(200).json({
			res: false
		});
	}

}

const actualizarInfo = async(req, res)=>{
	const {token, nombre, apellido, correo, contraseña} = req.body;
	const {respuesta, id} = verificarToken(token);
	if(!respuesta){
		return res.status(200).json({
			res: false
		});
	}

	try{
		const usuario = await Usuario.findById(id);
		if(nombre){
			usuario.nombre = nombre;
		}else if(apellido){
			usuario.apellido = apellido;
		}else if(correo){
			usuario.correo = correo;
		}else if(contraseña){
			usuario.contraseña = Encriptar(contraseña);
		}

		await usuario.save();
		res.status(200).json({
			res: true
		});
	}catch(e){
		return res.status(200).json({
			res: false
		});
	}
}

const eliminarCuenta = async(req, res)=>{
	const {token} = req.headers;

	const {respuesta, id} = verificarToken(token);
	if(!respuesta){
		return res.status(200).json({
			res: false
		});
	}

	try{
		const usuario = await Usuario.findById(id);
		if(usuario.foto!="sinfoto.png"){
			const ruta = path.join(__dirname+"./../public/imagenes/usuarios/"+usuario.foto);
			if(fs.existsSync(ruta)){
				fs.unlinkSync(ruta);
			}
		}
		await Usuario.findByIdAndDelete(id);
		res.status(200).json({
			res: true
		});
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

module.exports = {
	loginAdmin,
	createAdmin,
	obtenerUsuarios,
	obtenerPeliculas,
	obtenerInfo,
	agregarFoto,
	actualizarInfo,
	eliminarCuenta
}