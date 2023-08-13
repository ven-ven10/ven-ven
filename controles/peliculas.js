const path = require("path");
const fs = require("fs");
const Pelicula = require("./../esquemas/peliculas.js");
const {guardarPelicula,
guardarPortada,
eliminarPeliculaLocal,
eliminarPortadaLocal} = require("./../helpers/guardarArchivos.js");
require("dotenv").config();

const crearPelicula = async(req, res)=>{
	const {nombre, descripcion, categoria} = req.body;
	const {PELICULA, PORTADA} = req.files;
	console.log(req.files);
	//Verificando si ya esta registrada la pelicula
	const existe = await Pelicula.findOne({nombre});
	if(existe){
		return res.status(200).json({
			res: null
		});
	}
	//Guardando en el servidor la pelicula y portada
	const respuesta1 = await guardarPelicula(PELICULA);
	const respuesta2 = await guardarPortada(PORTADA);
	if(!respuesta1||!respuesta2){
		return res.status(200).json({
			res: false
		});
	}
	//Guardando en la base de datos la pelicula y portada
	let url = respuesta1;
	let portada = respuesta2;
	const nueva = new Pelicula({nombre, descripcion, url, portada, categoria});
	await nueva.save();
	res.status(200).json({
		res: true
	});
}

const eliminarPelicula = async(req, res)=>{
	//Obteniendo el nombre de la pelicula
	const {nombre} = req.params;
	const pelicula = await Pelicula.findOne({nombre});

	if(!pelicula){
		return res.status(200).json({
			res: null
		});
	}
	//Eliminando los archivos en el servidor
	const respuesta1 = eliminarPeliculaLocal(pelicula.url);
	const respuesta2 = eliminarPortadaLocal(pelicula.portada);

	if(!respuesta1||!respuesta2){
		return res.status(200).json({
			res: false
		});
	}
	//Eliminando la pelicula de la base de datos
	const id = pelicula.id;
	await Pelicula.findByIdAndDelete(id);

	return res.status(200).json({
		res: true
	});
}

const obtenerPortadas = async(req, res)=>{
	const listaPortadas = await Pelicula.find();
	const lista = [];

	if(listaPortadas==undefined||listaPortadas.length==0){
		return res.status(200).json({
			res: false
		});
	}
	
	listaPortadas.forEach(elemento=>{
		lista.push({
			nombre: elemento.nombre,
			portada: elemento.portada,
			categoria: elemento.categoria,
			id: elemento.id
		});
	});

	if(lista.length==0){
		res.status(200).json({
			res: false
		});
	}

	res.status(200).json({
		res: true,
		lista
	});
}

const obtenerPelicula = async(req, res)=>{
	const id = req.params.pelicula;
	try{
		const respuesta = await Pelicula.findById(id);
		const datos = {};
		datos.nombre = respuesta.nombre;
		datos.descripcion = respuesta.descripcion;
		datos.portada = respuesta.portada;
		datos.pelicula = respuesta.url;
		datos.categoria = respuesta.categoria;
		
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

const buscarPelicula = async(req, res)=>{
	const valor = req.body.pelicula;
	const nombre = RegExp(valor, "i");

	try{
		const lista = await Pelicula.find({nombre});
		if(lista.length!=0){
			const peliculas = [];
			lista.forEach(pelicula=>{
				peliculas.push({
					nombre: pelicula.nombre,
					portada: pelicula.portada,
					id: pelicula.id
				});
			});
			res.status(200).json({
				res: true,
				peliculas
			});
		}else{
			res.status(200).json({
				res: false
			});
		}
	}catch(e){
		res.status(200).json({
			res: false
		});
	}
}

module.exports = {
	crearPelicula,
	eliminarPelicula,
	obtenerPortadas,
	obtenerPelicula,
	buscarPelicula
}