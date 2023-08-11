const atras =     document.querySelector(".atras");
const atrasdos =  document.querySelector(".atrasdos");
const atrastres = document.querySelector(".atrastres");
const cambio =    document.querySelector(".cambio");
const listouno =  document.querySelector(".listouno");
const listodos =  document.querySelector(".listodos");
const eliminar =  document.querySelector(".eliminar");
const foto =      document.querySelector(".foto");
const continuar = document.querySelector(".continuar");

const nom =    document.querySelectorAll(".nom");
const apell =  document.querySelectorAll(".apell");
const corr =   document.querySelectorAll(".corr");
const contr =  document.querySelectorAll(".contr");

const nombre =     document.querySelectorAll(".nombre");
const apellido =   document.querySelectorAll(".apellido");
const correo =     document.querySelectorAll(".correo");
const contraseña = document.querySelectorAll(".contraseña");

const cont_cambio =    document.querySelector(".cont_cambio");
const cont_exitoso =   document.querySelector(".cont_exitoso");
const cont_eliminar =  document.querySelector(".cont_eliminar");
const cont_eliminada = document.querySelector(".cont_eliminada");

const diferentes =   document.querySelector(".diferentes");
const parrafo =      document.querySelector(".parrafo");
const entradas =     document.querySelector(".entradas");

let paths = (window.location.pathname).split("/");
let id = paths[paths.length-1];
let identificador = 0;

cambio.addEventListener("click", ()=>{
	location.href = "../cuenta/"+id+"/"+"foto";
});

nom.forEach(valor=>{
	valor.addEventListener("click", ()=>{
		cont_cambio.style.display = "flex";
		entradas.value = "";
		parrafo.textContent = "";
		diferentes.textContent = "Cambiar nombre";
		entradas.placeholder = "Escribe tu nombre";
		identificador = 1;
	});
});

apell.forEach(valor=>{
	valor.addEventListener("click", ()=>{
		cont_cambio.style.display = "flex";
		entradas.value = "";
		parrafo.textContent = "";
		diferentes.textContent = "Cambiar apellido";
		entradas.placeholder = "Escribe tu apellido";
		identificador = 2;
	});
});

corr.forEach(valor=>{
	valor.addEventListener("click", ()=>{
		cont_cambio.style.display = "flex";
		entradas.value = "";
		parrafo.textContent = "";
		diferentes.textContent = "Cambiar correo";
		entradas.placeholder = "Escribe tu correo";
		identificador = 3;
	});
});

contr.forEach(valor=>{
	valor.addEventListener("click", ()=>{
		cont_cambio.style.display = "flex";
		entradas.value = "";
		parrafo.textContent = "";
		diferentes.textContent = "Cambiar contraseña";
		entradas.placeholder = "Nueva contraseña";
		identificador = 4;
	});
});

atras.addEventListener("click", ()=>{
	location.href = "../peliculas/"+id;
});

atrasdos.addEventListener("click", ()=>{
	cont_cambio.style.display = "none";
});

atrastres.addEventListener("click", ()=>{
	cont_eliminar.style.display = "none";
});

listouno.addEventListener("click", ()=>{
	const valor = entradas.value;
	if(valor == ""){
		parrafo.textContent = "*Completa el campo*";
		return;
	}
	if(identificador == 1){
		const body = {
			nombre: valor,
			apellido: undefined,
			correo: undefined,
			contraseña: undefined
		};
		peticionActualizar(body);
	}else if(identificador == 2){
		const body = {
			nombre: undefined,
			apellido: valor,
			correo: undefined,
			contraseña: undefined
		};
		peticionActualizar(body);
	}else if(identificador == 3){
		const body = {
			nombre: undefined,
			apellido: undefined,
			correo: valor,
			contraseña: undefined
		};
		peticionActualizar(body);
	}else if(identificador == 4){
		const body = {
			nombre: undefined,
			apellido: undefined,
			correo: undefined,
			contraseña: valor
		};
		peticionActualizar(body);
	}
});

listodos.addEventListener("click", ()=>{
	peticionDatos();
	cont_cambio.style.display = "none";
	cont_exitoso.style.display = "none";
});

eliminar.addEventListener("click", ()=>{
	cont_eliminar.style.display = "flex";
});

continuar.addEventListener("click", ()=>{
	peticionEliminar();
});

const peticionActualizar = async(body)=>{
	try{
		const url = "/cuenta/"+id;
		await axios.put(url, body).then(respuesta=>{
			if(respuesta.data.res){
				cont_exitoso.style.display = "flex";
			}
		});
	}catch(e){
		console.log("Ah ocurrido un error en la peticion");
	}
}

const peticionDatos = async()=>{
	try{
		const url = "/cuenta/"+id;
		await axios.post(url).then(respuesta=>{
			if(!respuesta.data.res){
				location.href = "../error";
				return;
			}

			foto.src = "../../../imagenes/usuarios/"+respuesta.data.datos.foto;
			nombre.forEach(valor=>{
				valor.textContent = respuesta.data.datos.nombre;
			});
			apellido.forEach(valor=>{
				valor.textContent = respuesta.data.datos.apellido;
			});
			correo.forEach(valor=>{
				valor.textContent = respuesta.data.datos.correo;
			});
			contraseña.forEach(valor=>{
				valor.textContent = "**********";
			});
		});
	}catch(e){
		location.href = "../error";
	}
}

const peticionEliminar = async()=>{
	try{
		const url = "/cuenta/"+id;
		await axios.delete(url).then(respuesta=>{
			if(respuesta.data.res){
				localStorage.removeItem("token");
				cont_eliminada.style.display = "flex";
				setTimeout(()=>{
					location.href = "../../";
				}, 3000);
			}
		});
	}catch(e){
		location.href = "../error";
	}
}

peticionDatos();