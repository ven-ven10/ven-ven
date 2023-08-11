const btFoto = document.querySelector(".cambiarF");
const btNombre = document.querySelector(".cambiarN");
const btApellido = document.querySelector(".cambiarA");
const btCorreo = document.querySelector(".cambiarCrr");
const btContraseña = document.querySelector(".cambiarCnt");
const atras = document.querySelector(".atras");
const eliminar = document.querySelector(".eliminar");
const cerrar = document.querySelector(".cerrar");
const actualizar = document.querySelector(".actualizar");
const regreso = document.querySelector(".regreso");
const confirmar = document.querySelector(".confirmar");

const contenedor_dos = document.querySelector(".contenedor_dos");
const contenedor_tres = document.querySelector(".contenedor_tres");
const cambio = document.querySelector(".cambio");
const subtitulo = document.querySelector(".subtitulo");
const parrafo = document.querySelector(".parrafo");

const imagen = document.querySelector(".imagen");
const foto = document.querySelector(".foto");
const nombre = document.querySelector(".nombre");
const apellido = document.querySelector(".apellido");
const correo = document.querySelector(".correo");
const contraseña = document.querySelector(".contraseña");

const token = localStorage.getItem("token");
let cambiador = null;

const obtenerDatos = async()=>{
	try{
		const url = "/admin-aplication/cuenta-admin";
		const body = {
			token
		};
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				localStorage.removeItem("token");
				location.href = "login-admin-rn-2003";
			}else{
				foto.src = "../imagenes/usuarios/"+respuesta.data.datos.foto;
				nombre.textContent = respuesta.data.datos.nombre;
				apellido.textContent = respuesta.data.datos.apellido;
				correo.textContent = respuesta.data.datos.correo;
			}
		});
	}catch(e){
		localStorage.removeItem("token");
		location.href = "login-admin-rn-2003";
	}
}

const agregarFoto = async(formData)=>{
	const url = "/admin-aplication/agregar-foto"
	fetch(url,{
		method: "POST",
		body: formData
	}).then(respuesta=>{
		respuesta.json().then(valor=>{
			if(valor.res){
				obtenerDatos();
			}
		});
	});
}

const crearNombre = (nomb)=>{
	const division = nomb.split(".");
	const extencion = division[division.length-1];
	let nom = "";

	for(let i=0; i<15; i++){
		nom += Math.floor(Math.random()*9);
	}
	return nom+"."+extencion;
}

const actualizarInfo = async(valor)=>{
	try{
		let body = {};
		const url = "/admin-aplication/cuenta-admin";
		body.token = token;
		if(cambiador==1){
			body.nombre = valor;
		}else if(cambiador==2){
			body.apellido = valor;
		}else if(cambiador==3){
			body.correo = valor;
		}else if(cambiador==4){
			body.contraseña = valor;
		}else{
			console.log("Error");
		}
		await axios.put(url, body).then(respuesta=>{
			if(respuesta.data.res){
				cambio.value = "";
				parrafo.textContent = "*Cambio exitoso*";
				obtenerDatos();
				setTimeout(()=>{
					parrafo.textContent = "";
				}, 2000);
			}else{
				parrafo.textContent = "*No se pudo actualizar*";
			}
		});
	}catch(e){
		localStorage.removeItem("token");
		location.href = "login-admin-rn-2003";
	}
}

const eliminarCuenta = async()=>{
	try{
		const url = "/admin-aplication/cuenta-admin";
		const headers = {
			token
		};
		await axios.delete(url, {headers}).then(respuesta=>{
			if(respuesta.data.res){
				localStorage.removeItem("token");
				location.href = "login-admin-rn-2003";
			}
		});
	}catch(e){
		localStorage.removeItem("token");
		location.href = "login-admin-rn-2003";
	}
}

if(token==null||token==undefined||token.length<10){
	localStorage.removeItem("token");
	location.href = "login-admin-rn-2003";
}else{
	obtenerDatos();
}

atras.addEventListener("click", ()=>{
	location.href = "admin-2003-rn-panel";
});

btFoto.addEventListener("click", ()=>{
	imagen.click();
});

cerrar.addEventListener("click", ()=>{
	contenedor_dos.style.display = "none";
});

imagen.addEventListener("change", ()=>{
	if(imagen.files[0]){
		const nombreFoto = crearNombre(imagen.files[0].name);
		const formData = new FormData();
		formData.append("FOTO", imagen.files[0], nombreFoto);
		formData.set("token", token);
		agregarFoto(formData);
	}
});

btNombre.addEventListener("click", ()=>{
	cambio.placeholder = "Actualizar nombre";
	subtitulo.textContent = "Actualizar nombre";
	contenedor_dos.style.display = "flex";
	cambiador = 1;
});

btApellido.addEventListener("click", ()=>{
	cambio.placeholder = "Actualizar apellido";
	subtitulo.textContent = "Actualizar apellido";
	contenedor_dos.style.display = "flex";
	cambiador = 2;
});

btCorreo.addEventListener("click", ()=>{
	cambio.placeholder = "Actualizar correo";
	subtitulo.textContent = "Actualizar correo";
	contenedor_dos.style.display = "flex";
	cambiador = 3;
});

btContraseña.addEventListener("click", ()=>{
	cambio.placeholder = "Actualizar contraseña";
	subtitulo.textContent = "Actualizar contraseña";
	contenedor_dos.style.display = "flex";
	cambiador = 4;
});

actualizar.addEventListener("click", ()=>{
	const valor = cambio.value;
	if(valor==""){
		return parrafo.textContent = "Completa el campo";
	}

	actualizarInfo(valor);
});

eliminar.addEventListener("click", ()=>{
	contenedor_tres.style.display = "flex";
});

regreso.addEventListener("click", ()=>{
	contenedor_tres.style.display = "none";
});

confirmar.addEventListener("click", ()=>{
	eliminarCuenta();
});