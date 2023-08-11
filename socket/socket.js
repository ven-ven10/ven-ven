const {crearToken,
verificarToken} = require("./../helpers/token.js");
const ChatMensajes = require("./../esquemas/mensajes.js");
const Usuario = require("./../esquemas/usuarios.js");
let listaConectados = [];

const Controlador = async(socket, io)=>{
	//Iniciando el sistema de chat
	const chatMensajes = new ChatMensajes();
	//Obteniendo el token desde el cliente
	const token = socket.handshake.headers["token"];
	//Verificando si el token es valido
	const {respuesta, id} = verificarToken(token);
	//Token==falso
	if(!respuesta){
		socket.emit("usuario-conectado", {
			res: false
		});
		return socket.disconnect();
	}

	try{
		//Obteniendo el usuario desde la base de datos
		const usuario = await Usuario.findById(id);
		listaConectados[id] = id;
		chatMensajes.actualizarMensajes(JSON.parse(usuario.mensajes));
		//Creando la sala única personal
		socket.join(usuario.id);
		//Enviando datos del cliente al mismo cliente
		socket.emit("usuario-conectado", {
			res: true,
			nombre: usuario.nombre+" "+usuario.apellido,
			id: usuario.id
		});
		//Enviando la lista de usuarios al cliente y viendo si tiene nuevos mensajes
		enviarListaUsuarios(usuario.rol, socket, chatMensajes, usuario);

		socket.on("lista-mensajes", async({id})=>{
			const lista = chatMensajes.ultimos12(id);
			if(!lista){
				socket.emit("lista-mensajes", {res:false});
			}else{
				chatMensajes.modificarNuevo(id);
				enviarListaUsuarios(usuario.rol, socket, chatMensajes, usuario);
				socket.emit("lista-mensajes", {res:true, lista});
			}
		});

		socket.on("nuevo-mensaje", async({mensaje, id})=>{
			const nombre = usuario.nombre+" "+usuario.apellido;
			chatMensajes.nuevoMensaje(nombre, mensaje, usuario.id, id, false);
			const lista = chatMensajes.ultimos12(id);
			socket.emit("lista-mensajes", {res: true, lista});
			if(listaConectados[id]==undefined){
				try{
					const recibidor = await Usuario.findById(id);
					const chatMsj = new ChatMensajes();
					chatMsj.actualizarMensajes(JSON.parse(recibidor.mensajes));
					chatMsj.nuevoMensaje(nombre, mensaje, usuario.id, usuario.id, true);
					recibidor.mensajes = JSON.stringify(chatMsj.guardarMensajes());
					await recibidor.save();
				}catch(e){
					console.log(e);
				}
			}else{
				socket.to(id).emit("recibir-mensaje", {nombre, mensaje, id:usuario.id});
			}
		});

		socket.on("recibir-mensaje", async({nombre, mensaje, id})=>{
			chatMensajes.nuevoMensaje(nombre, mensaje, id, id, true);
			const lista = chatMensajes.ultimos12(id);

			enviarListaUsuarios(usuario.rol, socket, chatMensajes, usuario);

			socket.emit("lista-mensajes", {res:true, lista});
		});

		socket.on("disconnect", async()=>{
			delete listaConectados[id];
			usuario.mensajes = JSON.stringify(chatMensajes.guardarMensajes());
			await usuario.save();
		});
	}catch(e){
		console.log(e);
	}
}

const enviarListaUsuarios = async(valor, socket, chatMensajes, usuario)=>{
	if(valor=="usuario"){
		const rol = "admin";
		const listaAdmin = await Usuario.find({rol});
		let lista = [];
		if(listaAdmin==undefined||listaAdmin==null||listaAdmin.length==0){
			socket.emit("lista-usuarios", {res:false});
		}else{
			listaAdmin.forEach(admin=>{
				let respuesta = chatMensajes.verNuevo(admin.id);
				lista.push({
					nombre: admin.nombre+" "+admin.apellido,
					id: admin.id,
					foto: admin.foto,
					correo: admin.correo,
					nuevo: respuesta
				});
			});
			socket.emit("lista-usuarios", {res:true, lista});
		}
	}
	if(valor=="admin"){
		const rol = "usuario";
		const listaUsuario = await Usuario.find({rol});
		let lista = [];
		if(listaUsuario==undefined||listaUsuario.length==0||listaUsuario==null){
			socket.emit("lista-usuarios", {res:false});
		}else{
			listaUsuario.forEach(usuario=>{
				let respuesta = chatMensajes.verNuevo(usuario.id);
				lista.push({
					nombre: usuario.nombre+" "+usuario.apellido,
					id: usuario.id,
					foto: usuario.foto,
					correo: usuario.correo,
					nuevo: respuesta
				});
			});
			socket.emit("lista-usuarios", {res:true, lista});
		}
		socket.on("mensaje-publico", ({mensaje})=>{
			let nombre = usuario.nombre+" "+usuario.apellido;
			listaUsuario.forEach(async(user)=>{
				chatMensajes.nuevoMensaje(nombre, mensaje, usuario.id, user.id, false);
				if(listaConectados[user.id]==undefined){
					try{
						let id = user.id;
						let receptor = await Usuario.findById(id);
						let chatMsj = new ChatMensajes();
						chatMsj.actualizarMensajes(JSON.parse(receptor.mensajes));
						chatMsj.nuevoMensaje(nombre, mensaje, usuario.id, usuario.id, true);
						receptor.mensajes = JSON.stringify(chatMsj.guardarMensajes());
						await receptor.save();
						socket.emit("lista-usuarios", {res: true, lista});
					}catch(e){
						console.log(e);
					}
				}else{
					socket.to(user.id).emit("recibir-mensaje", {nombre, mensaje, id:usuario.id});
				}
			});
		});
	}
}

module.exports = {
	Controlador
}