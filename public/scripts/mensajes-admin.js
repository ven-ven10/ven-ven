const atras = document.querySelector(".atras");
const cont_usuarios = document.querySelector(".cont_lista");

const msj_privado = document.querySelector(".msj_privado");
const msj_publico = document.querySelector(".msj_publico");
const btprivado = document.querySelector(".btprivado");
const btpublico = document.querySelector(".btpublico");

const contenedor_dos = document.querySelector(".contenedor_dos");
const cont_nombre = document.querySelector(".cont_nombre");
const cerrar = document.querySelector(".cerrar");
const cont_mensajes = document.querySelector(".cont_mensajes");

const token = localStorage.getItem("token");
let id = null;
let info = {};
let yo;

const socket = io({
	"extraHeaders": {
		token
	}
});

socket.on("usuario-conectado", ({res, nombre, id})=>{
	if(!res){
		localStorage.removeItem("token");
		location.href = "login-admin-rn-2003";
	}else{
		document.title = nombre;
		yo = id;
	}
});

socket.on("lista-usuarios", ({res, lista})=>{
	if(!res){
		let nuevo = `
			<div>
				<h1>Sin usuarios</h1>
			</div>
		`;
		cont_usuarios.innerHTML = nuevo;
	}else{
		let usuarios = "";
		lista.forEach(usuario=>{
			info[usuario.id] = {
				nombre: usuario.nombre,
				foto: usuario.foto
			};
			usuarios += `
				<div class="usuario" id="${usuario.id}">
					<div class="cont_notificacion" nuevo="${usuario.nuevo}">
						<div class="notificacion"></div>
					</div>
					<div class="cont_info">
						<img src="../imagenes/usuarios/${usuario.foto}" class="imagen">
						<div class="datos">
							<div class="info">
								<p class="nombre">${usuario.nombre}</p>
							</div>
							<div class="info">
								<p class="correo">${usuario.correo}</p>
							</div>
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

const abrirChat = async(usuarios)=>{
	for(let i=0; i<usuarios.length; i++){
		usuarios[i].addEventListener("click", ()=>{
			id = usuarios[i].id;
			contenedor_dos.style.display = "flex";
			let datos = `
				<div class="cont_datos">
					<img src="../imagenes/usuarios/${info[usuarios[i].id].foto}" class="icono">
					<div>
						<h4>${info[usuarios[i].id].nombre}</h4>
						<p>Usuario</p>
					</div>
				</div>
			`;
			cont_nombre.innerHTML = datos;

			socket.emit("lista-mensajes", {id:usuarios[i].id});
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
			<h1>Sin mensajes</h1>
		`;
		cont_mensajes.innerHTML = nuevo;
	}else{
		let nuevo = "";
		lista.forEach(mensaje=>{
			if(mensaje.id==yo){
				nuevo += `
					<div class="yo">
						<h5 class="">(Yo)</h5>
						<p class="mensaje">${mensaje.mensaje}</p>
					</div>
				`;
			}else{
				nuevo += `
					<div class="mensajes">
						<h5 class="">${mensaje.nombre}</h5>
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

btprivado.addEventListener("click", ()=>{
	const mensaje = msj_privado.value;
	if(mensaje==""||mensaje.length==0||id==null){
		return;
	}

	socket.emit("nuevo-mensaje", {mensaje, id});
	msj_privado.value = "";
});

btpublico.addEventListener("click", ()=>{
	const mensaje = msj_publico.value;
	if(mensaje==""||mensaje.length==0){
		return;
	}

	msj_publico.value = "";
	socket.emit("mensaje-publico", {mensaje});
});

cerrar.addEventListener("click", ()=>{
	contenedor_dos.style.display = "none";
});

atras.addEventListener("click", ()=>{
	location.href = "admin-2003-rn-panel";
});