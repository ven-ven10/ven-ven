const atras = document.querySelector(".atras");
const busqueda = document.querySelector(".busqueda");
const buscar = document.querySelector(".buscar");
const resultados = document.querySelector(".resultados");

let path = (window.location.pathname).split("/");
let pelicula = path[path.length-1];
let id = path[path.length-2];

pelicula = pelicula.replace(/-/g, " ");

atras.addEventListener("click", ()=>{
	location.href = "../"+id;
});

buscar.addEventListener("click", ()=>{
	let valor = busqueda.value;
	if(valor==""||valor.length==0){
		return;
	}
	valor = valor.replace(/ /g, "-");

	location.href = "/peliculas/"+id+"/"+valor;
});

const verPelicula = (resultado)=>{
	for(let i=0; i<resultado.length; i++){
		resultado[i].addEventListener("click", ()=>{
			location.href = "../../ver/"+resultado[i].id+"/"+id;
		});
	}
}

const buscarPelicula = async(body)=>{
	try{
		const url = "/buscar-pelicula";
		await axios.post(url, body).then(respuesta=>{
			if(respuesta.data.res){
				let lista = "";
				respuesta.data.peliculas.forEach(peli=>{
					lista += `
						<div class="resultado" id="${peli.id}">
							<div class="info">
								<img src="../../peliculas/portadas/${peli.portada}" class="portada">
								<h3 class="nombre">${peli.nombre}</h3>
							</div>
						</div>
					`;
				});
				resultados.innerHTML = lista;
				const resultado = document.querySelectorAll(".resultado");
				verPelicula(resultado);
			}else{
				let nuevo = `
					<h1 class="vacio">Sin resultados</h1>
				`;
				resultados.innerHTML = nuevo;
			}
		});
	}catch(e){
		console.log("Error al buscar pelicula");
	}
}

if(pelicula.length!=0){
	const body = {
		pelicula
	}
	buscarPelicula(body);
}