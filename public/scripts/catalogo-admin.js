const atras = document.querySelector(".atras");
const cont_lista = document.querySelector(".cont_lista");
const titulo = document.querySelector(".titulo");

const token = localStorage.getItem("token");

atras.addEventListener("click", ()=>{
	location.href = "admin-2003-rn-panel";
});

const obtenerPeliculas = async()=>{
	try{
		const url = "/admin-aplication/catalogo-admin";
		await axios.post(url).then(respuesta=>{
			if(respuesta.data.res == false){
				console.log("No se pudo obtener las peliculas");
			}else if(respuesta.data.res == null){
				const nuevo = document.createElement("H2");
				nuevo.textContent = "No hay peliculas registradas";
				cont_lista.appendChild(nuevo);
			}else{
				const cantidad = respuesta.data.lista.length;
				titulo.textContent = `Lista de películas (${cantidad})`;
				let peliculas = "";
				respuesta.data.lista.forEach(datos=>{
					peliculas += `
						<div class="pelicula">
							<img src="../peliculas/portadas/${datos.foto}" class="imagen">
							<div class="datos">
								<div class="info">
									<h4>Nombre:</h4>
									<p class="nombre">${datos.nombre}</p>
								</div>
								<div class="info">
									<h4>Categoria:</h4>
									<p class="categoria">${datos.categoria}</p>
								</div>
							</div>
						</div>
					`;
				});
				cont_lista.innerHTML = peliculas;
			}
		});
	}catch(e){
		console.log(e);
	}
}

const verificarToken = async()=>{
	try{
		if(token==null||token==""||token.length<10){
			localStorage.removeItem("token");
			location.href = "login-admin-rn-2003";
		}else{
			const url = "/";
			const body = {
				token
			};
			await axios.post(url, body).then(respuesta=>{
				if(!respuesta.data.res){
					localStorage.removeItem("token");
					location.href = "login-admin-rn-2003";
				}else{
					obtenerPeliculas();
				}
			});
		}
	}catch(e){
		console.log(e);
	}
}

verificarToken();