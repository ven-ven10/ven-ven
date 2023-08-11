const busqueda = document.querySelector(".busqueda");
const buscar =   document.querySelector(".buscar");

const menu =   document.querySelector(".menu");
const cerrar = document.querySelector(".cerrar");

const contactame = document.querySelector(".contactame");
const mensajes =   document.querySelector(".mensajes");
const cuenta =     document.querySelector(".cuenta");
const foto = document.querySelector(".foto");
const salir = document.querySelector(".salir");

const cont_opciones = document.querySelector(".cont_opciones");
const cont_accion = document.querySelector(".cont_accion");
const cont_animado = document.querySelector(".cont_animado");
const cont_aventura = document.querySelector(".cont_aventura");
const cont_ciencia = document.querySelector(".cont_ciencia");
const cont_comedia = document.querySelector(".cont_comedia");
const cont_fantasia = document.querySelector(".cont_fantasia");
const cont_finanzas = document.querySelector(".cont_finanzas");
const cont_narco = document.querySelector(".cont_narco");
const cont_romance = document.querySelector(".cont_romance");
const cont_tecnologia = document.querySelector(".cont_tecnologia");
const cont_terror = document.querySelector(".cont_terror");
const cont_otros = document.querySelector(".cont_otros");


let path = (window.location.pathname).split("/");
let id = path[path.length-1];
let cambiador = "";

buscar.addEventListener("click", ()=>{
	let valor = busqueda.value;
	if(valor==""){
		return;
	}
	valor = valor.replace(/ /g, "-");
	location.href = "../peliculas/"+id+"/"+valor;
});

menu.addEventListener("click", ()=>{
	cont_opciones.style.left = "0%";
});

cerrar.addEventListener("click", ()=>{
	cont_opciones.style.left = "-100%";
});

contactame.addEventListener("click", ()=>{
	location = "../contactame/"+id;
});

mensajes.addEventListener("click", ()=>{
	location = "../mensajes/"+id;
});

cuenta.addEventListener("click", ()=>{
	location.href = "../cuenta/"+id;
});

salir.addEventListener("click", ()=>{
	localStorage.removeItem("token");
	location.href = "../";
});

const validarId = async()=>{
	const url = "../verificar-id";
	const body = {
		id
	};
	try{
		axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				location.href = "../error";
			}else{
				foto.src = "../../imagenes/usuarios/"+respuesta.data.foto;
			}
		});
	}catch(e){
		location.href = "../../error";
	}
}

const verPelicula = (lista)=>{
	for(let i=0; i<lista.length; i++){
		lista[i].addEventListener("click", ()=>{
			location.href = "../ver/"+lista[i].id+"/"+id;
		});
	}
}

const obtenerPortadas = async()=>{
	try{
		const url = "/peliculas/lista-portadas";
		await axios.get(url).then(respuesta=>{
			if(respuesta.data.res){
				let accion = [];
				let animado = [];
				let aventura = [];
				let ciencia = [];
				let comedia = [];
				let fantasia = [];
				let finanzas = [];
				let narco = [];
				let romance = [];
				let tecnologia =  [];
				let terror = [];
				let otros = [];

				respuesta.data.lista.forEach(peli=>{
					if(peli.categoria=="ACCIÓN"){
						accion.push(peli);
					}else if(peli.categoria=="ANIMADO"){
						animado.push(peli);
					}else if(peli.categoria=="AVENTURA"){
						aventura.push(peli);
					}else if(peli.categoria=="CIENCIA"){
						ciencia.push(peli);
					}else if(peli.categoria=="COMEDIA"){
						comedia.push(peli);
					}else if(peli.categoria=="FANTASÍA"){
						fantasia.push(peli);
					}else if(peli.categoria=="FINANZAS"){
						finanzas.push(peli);
					}else if(peli.categoria=="NARCO"){
						narco.push(peli);
					}else if(peli.categoria=="ROMANCE"){
						romance.push(peli);
					}else if(peli.categoria=="TECNOLOGÍA"){
						tecnologia.push(peli);
					}else if(peli.categoria=="TERROR"){
						terror.push(peli);
					}else if(peli.categoria=="OTROS"){
						otros.push(peli);
					}
				});

				accion.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_accion.innerHTML = cambiador;

				cambiador = "";
				animado.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_animado.innerHTML = cambiador;

				cambiador = "";
				aventura.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_aventura.innerHTML = cambiador;

				cambiador = "";
				ciencia.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_ciencia.innerHTML = cambiador;

				cambiador = "";
				comedia.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_comedia.innerHTML = cambiador;

				cambiador = "";
				fantasia.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_fantasia.innerHTML = cambiador;

				cambiador = "";
				finanzas.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_finanzas.innerHTML = cambiador;

				cambiador = "";
				narco.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_narco.innerHTML = cambiador;

				cambiador = "";
				romance.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_romance.innerHTML = cambiador;

				cambiador = "";
				tecnologia.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_tecnologia.innerHTML = cambiador;

				cambiador = "";
				terror.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_terror.innerHTML = cambiador;


				cambiador = "";
				otros.forEach(valor=>{
					cambiador += `
						<div class="pelicula" id="${valor.id}">
							<img src="../peliculas/portadas/${valor.portada}" class="imagen">
							<h5 class="titulos">${valor.nombre}</h5>
						</div>
					`;
				});
				cont_otros.innerHTML = cambiador;
				verPelicula(document.querySelectorAll(".pelicula"));
			}else{
				console.log("Aún no se ha registrado películas");
			}
		});
	}catch(e){
		console.log(e);
	}
}

validarId();
obtenerPortadas();