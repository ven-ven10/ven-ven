const atras = document.querySelector(".atras");
const cerrar = document.querySelector(".cerrar");
const enviar = document.querySelector(".enviar");
const nuevo = document.querySelector(".nuevo");
const token = localStorage.getItem("token");

const cont_dos = document.querySelector(".contenedor_dos");
const cont_usuarios = document.querySelector(".cont_usuarios");
const contenedor_nombre = document.querySelector(".contenedor_nombre");
const cont_mensajes = document.querySelector(".cont_mensajes");

const paths = (window.location.pathname).split("/");
const identificador = paths[paths.length-1];

const socket = io({
	"extraHeaders": {
		token
	}
});

let info = {};
let receptor = null;
let yo;
let todos = null;

socket.on("usuario-conectado", ({res, nombre, id})=>{
	if(res){
		document.title = nombre;
		yo = id;
	}else{
		localStorage.removeItem("token");
		location.href = "../../";
	}
});

socket.on("lista-usuarios", ({res, lista})=>{
	let usuarios = "";
	if(!res){
		let nuevo = `
			<div>
				<h1>Sin usuarios</h1>
			</div>
		`;
		cont_usuarios.innerHTML = nuevo;
	}else{
		lista.forEach(usuario=>{
			info[usuario.id] = {
				nombre: usuario.nombre,
				foto: usuario.foto
			}
			usuarios += `
				<div class="usuario" id="${usuario.id}">
					<div class="cont_notificacion" nuevo="${usuario.nuevo}">
						<div class="notificacion"></div>
					</div>
					<div class="datos">
						<img src="../imagenes/usuarios/${usuario.foto}" class="imagen">
						<div class="cont_nombre">
							<h4>${usuario.nombre}</h4>
							<p>Creador</p>
						</div>
					</div>
				</div>
			`;
		});
		cont_usuarios.innerHTML = usuarios;
		const usuario = document.querySelectorAll(".usuario");
		const cont_notificacion = document.querySelectorAll(".cont_notificacion");
		activarNotificacion(cont_notificacion);
		abrirChat(usuario);
	}
});

const abrirChat = (usuarios)=>{
	for(let i=0; i<usuarios.length; i++){
		usuarios[i].addEventListener("click", ()=>{
			receptor = usuarios[i].id;
			cont_dos.style.display = "flex";
			socket.emit("lista-mensajes", {id:usuarios[i].id});
			let nombre = `
				<img src="../imagenes/usuarios/${info[usuarios[i].id].foto}" class="imagen">
				<div class="cont_nombre">
					<h4>${info[usuarios[i].id].nombre}</h4>
					<p class="nom">Creador</p>
				</div>
			`;
			contenedor_nombre.innerHTML = nombre;
		});
	}
}

const activarNotificacion = (cont_notificacion)=>{
	for(let i=0; i<cont_notificacion.length; i++){
		if(cont_notificacion[i].attributes.nuevo.nodeValue=="true"){
			cont_notificacion[i].style.display = "flex";
		}
	}
}

socket.on("lista-mensajes", ({res, lista})=>{
	if(!res){
		let nuevo = `
			<h1 class="titulo">Sin mensajes</h1>
		`;
		cont_mensajes.innerHTML = nuevo;
	}else{
		let nuevo = "";
		lista.forEach(mensaje=>{
			if(mensaje.id==yo){
				nuevo += `
					<div class="yo">
						<h5 class="nombre">(Yo)</h5>
						<p class="mensaje">${mensaje.mensaje}</p>
					</div>
				`;
			}else{
				nuevo += `
					<div class="mensajes">
						<h5 class="nombre">${mensaje.nombre}</h5>
						<p class="mensaje">${mensaje.mensaje}</p>
					</div>
				`;
			}
		});
		cont_mensajes.innerHTML = nuevo;
	}
});

socket.on("recibir-mensaje", ({nombre, mensaje, id})=>{
	socket.emit("recibir-mensaje", {nombre, mensaje, id});
});

atras.addEventListener("click", ()=>{
	location.href = "../peliculas/"+identificador;
});

cerrar.addEventListener("click", ()=>{
	cont_dos.style.display = "none";
});

enviar.addEventListener("click", ()=>{
	const mensaje = nuevo.value;
	if(mensaje==""||mensaje.length==0||receptor==null){
		return;
	}

	socket.emit("nuevo-mensaje", {
		mensaje,
		id: receptor
	});

	nuevo.value = "";
});