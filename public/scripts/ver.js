const atras = document.querySelector(".atras");
const portada = document.querySelector(".portada");
const peli_video = document.querySelector(".peli_video");
const nombre = document.querySelector(".nombre");
const descripcion = document.querySelector(".descripcion");
const categoria = document.querySelector(".categoria");

const paths = (window.location.pathname).split("/");
const id = paths[paths.length-1];

atras.addEventListener("click", ()=>{
	location.href = "../../peliculas/"+id;
});

const verificarId = async()=>{
	try{
		const url = "/verificar-id";
		const body = {id}
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				localStorage.removeItem("token");
				location.href = "../../";
			}
		});
	}catch(e){
		console.log("Error al verificarId");
	}
}

const obtenerPelicula = async()=>{
	try{
		const url = window.location.href;
		await axios.post(url).then(respuesta=>{
			if(respuesta.data.res){
				nombre.textContent = respuesta.data.datos.nombre;
				descripcion.textContent = respuesta.data.datos.descripcion;
				categoria.textContent = respuesta.data.datos.categoria;
				portada.src = "../../peliculas/portadas/"+respuesta.data.datos.portada;
				peli_video.src = "../../peliculas/peliculas/"+respuesta.data.datos.pelicula;
				const prueba = videojs("video1", {
					fluid: true
				});
			}
		});
	}catch(e){
		console.log(e);
	}
}

verificarId();
obtenerPelicula();