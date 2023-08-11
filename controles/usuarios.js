const upload = require("express-fileupload");
const path = require("path");
const Usuario = require("./../esquemas/usuarios.js");
const {Encriptar} = require("./../helpers/encriptar.js");
const {verificarPwd} = require("./../helpers/verificarPwd.js");
const {actualizarFoto} = require("./../helpers/actualizarFoto.js");
const {crearToken} = require("./../helpers/token.js");
const Visitas = require("./../esquemas/visitas.js");
const fs = require("fs");

const crearUsuario = async(req, res)=>{
	const {nombre, apellido, correo, contraseña} = req.body; //Datos desde el front-end
	//Verificacion en la base de datos
	const existe = await Usuario.findOne({correo});
	if(existe){
		return res.json({
			res: false
		});
	}

	//Modelo de usuario
	const mensajes = "{}";
	const rol = "usuario";
	const usuario = new Usuario({nombre, apellido, correo, contraseña, mensajes, rol});
	usuario.contraseña = Encriptar(contraseña);

	//Crear token con el id del usuario
	const token = await crearToken(usuario.id);

	//Regisrando en la base de datos
	usuario.save();
	res.status(200).json({
		res: true,
		id: usuario.id,
		token
	});
}

const personalizaFoto = async(req, res)=>{
	const {nombre} = req.body;
	const {id} = req.params;

	try{
		const usuario = await Usuario.findById(id);
		if(!usuario){
			return res.status(200).json({
				res: false
			});
		}

		const imagenesEstaticas = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png", "img7.png",
			"img8.png", "img9.png", "img10.png", "img11.png", "img12.png", "sinfoto.png"];
		const fotoActual = usuario.foto;
		if(!imagenesEstaticas.includes(fotoActual)){
			const rutaActual = path.join(__dirname+"./../public/imagenes/usuarios/"+usuario.foto);
			if(fs.existsSync(rutaActual)){
				fs.unlinkSync(rutaActual);
			}
		}

		if(nombre != null){
			usuario.foto = nombre;
			await usuario.save();
			res.status(200).json({
				res: true
			});
		}else{
			usuario.foto = "sinfoto.png";
			await usuario.save();
			res.status(200).json({
				res: true
			});
		}
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

const ingresoUsuario = (req, res)=>{
	const {correo, contraseña} = req.body;
	verificarPwd(correo, contraseña).then(async(respuesta)=>{
		const {resp, id} = respuesta;
		if(resp != null){
			const token = await crearToken(id);
			res.status(200).json({
				res: true,
				id,
				token
			});
		}else{
			res.status(200).json({
				res: false
			});
		}
	});
}

const recuperarCuenta = async(req, res)=>{
	const {nombre, apellido, correo} = req.body;
	const usuario = await Usuario.findOne({correo});
	if(!usuario){
		return res.status(200).json({
			res: false
		});
	}

	if(usuario.nombre != nombre || usuario.apellido != apellido){
		return res.status(200).json({
			res: false
		});
	}

	res.status(200).json({
		res: true,
		id: usuario.id
	});
}

const obtenerDatos = async(req, res)=>{
	const {id} = req.params;
	try{
		const usuario = await Usuario.findById(id);
		if(!usuario){
			return res.status(200).json({
				res: false
			});
		}

		const datos = {};
		datos.nombre = usuario.nombre;
		datos.apellido = usuario.apellido;
		datos.correo = usuario.correo;
		datos.foto = usuario.foto;

		res.status(200).json({
			res: true,
			datos
		});
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

const actualizarDatos = async(req, res)=>{
	const {id} = req.params;
	try{
		const {nombre, apellido, correo, contraseña} = req.body;
		const usuario = await Usuario.findById(id);

		if(!usuario){
			return res.status(200).json({
				res: false
			});
		}

		if(nombre!=undefined&&nombre!=""){
			usuario.nombre = nombre;
			await usuario.save();
			return res.status(200).json({
				res: true
			});
		}else if(apellido!=undefined&&apellido!=""){
			usuario.apellido = apellido;
			await usuario.save();
			return res.status(200).json({
				res: true
			})
		}else if(correo!=undefined&&correo!=""){
			usuario.correo = correo;
			await usuario.save();
			return res.status(200).json({
				res: true
			});
		}else if(contraseña!=undefined&&contraseña!=""){
			//Crear token con el id de usuario
			const token = await crearToken(usuario.id);
			usuario.contraseña = Encriptar(contraseña);
			await usuario.save();
			return res.status(200).json({
				res: true,
				id: usuario.id,
				token
			});
		}else{
			console.log("No se que a pasao");
		}
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

const fotoPersonalizada = async(req, res)=>{
	try{
		const {id} = req.params;

		const usuario = await Usuario.findById(id);
		if(!usuario){
			return res.status(200).json({
				res: false
			});
		}

		if(!req.files.IMG){
			return res.status.json({
				res: false
			});
		}

		const imagenesEstaticas = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png", "img7.png",
			"img8.png", "img9.png", "img10.png", "img11.png", "img12.png", "sinfoto.png"];
		const fotoActual = usuario.foto;
		if(!imagenesEstaticas.includes(fotoActual)){
			const rutaActual = path.join(__dirname+"./../public/imagenes/usuarios/"+usuario.foto);
			if(fs.existsSync(rutaActual)){
				fs.unlinkSync(rutaActual);
			}
		}

		const respuesta = await actualizarFoto(req.files.IMG);
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

const eliminarUsuario = async(req, res)=>{
	const {id} = req.params;
	try{
		const usuario = await Usuario.findById(id);
		if(!usuario){
			return res.status(200).json({
				res: false
			});
		}

		const imagenesEstaticas = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png", "img7.png",
			"img8.png", "img9.png", "img10.png", "img11.png", "img12.png", "sinfoto.png"];
		const fotoActual = usuario.foto;
		if(!imagenesEstaticas.includes(fotoActual)){
			const rutaActual = path.join(__dirname+"./../public/imagenes/usuarios/"+usuario.foto);
			if(fs.existsSync(rutaActual)){
				fs.unlinkSync(rutaActual);
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

const cantidadVisitas = async(req, res, next)=>{
	const nombre = "visitas";
	const visitas = await Visitas.findOne({nombre});
	let sumador = visitas.cantidad;
	sumador++;
	visitas.cantidad = sumador;
	await visitas.save();

	next();
}

module.exports = {
	crearUsuario,
	personalizaFoto,
	ingresoUsuario,
	recuperarCuenta,
	actualizarDatos,
	obtenerDatos,
	fotoPersonalizada,
	eliminarUsuario,
	cantidadVisitas
}