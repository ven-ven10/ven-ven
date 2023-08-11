const menu = document.querySelector(".menu");
const cerrar = document.querySelector(".cerrar");
const navegador = document.querySelector(".navegador");

const visitas = document.querySelector(".visitas");
const usuarios = document.querySelector(".usuarios");
const catalogo = document.querySelector(".catalogo");
const mensajes = document.querySelector(".mensajes");
const cuenta = document.querySelector(".cuenta");
const salir = document.querySelector(".salir");

const nombre = document.querySelector(".nombre");
const descripcion = document.querySelector(".descripcion");
const parrafo = document.querySelector(".parrafo");

const nombreeli = document.querySelector(".nombreeli");
const parrafo2 = document.querySelector(".parrafo2");
const bt_eliminar = document.querySelector(".bt_eliminar");
const categories = document.querySelectorAll(".categories");

const archivo_peli = document.querySelector(".archivo_peli");
const archivo_port = document.querySelector(".archivo_port");
const bt_portada = document.querySelector(".bt_portada");
const bt_pelicula = document.querySelector(".bt_pelicula");
const bt_subir = document.querySelector(".bt_subir");
const portada = document.querySelector(".portada");
const pelicula = document.querySelector(".pelicula");
const cont_cargas_uno = document.querySelector(".cont_cargas_uno");
const cont_cargas_dos = document.querySelector(".cont_cargas_dos");

let img_pelicula;
let img_portada;

const formData = new FormData();
let categoria = "";
const token = localStorage.getItem("token");

menu.addEventListener("click", ()=>{
	navegador.style.display = "flex";
});

cerrar.addEventListener("click", ()=>{
	navegador.style.display = "none";
});

usuarios.addEventListener("click", ()=>{
	location.href = "usuarios-admin-rn-2003";
});

catalogo.addEventListener("click", ()=>{
	location.href = "catalogo-admin-rn-2003";
});

mensajes.addEventListener("click", ()=>{
	location.href = "mensajes-admin-rn-2003";
});

cuenta.addEventListener("click", ()=>{
	location.href = "cuenta-admin-rn-2003";
});

salir.addEventListener("click", ()=>{
	localStorage.removeItem("token");
	location.href = "login-admin-rn-2003";
});

bt_pelicula.addEventListener("click", ()=>{
	archivo_peli.click();
});

bt_portada.addEventListener("click", ()=>{
	archivo_port.click();
});

archivo_port.addEventListener("change", ()=>{
	const reader = new FileReader();
	reader.readAsDataURL(archivo_port.files[0]);

	reader.addEventListener("progress", (e)=>{
		let progreso = Math.round(e.loaded/archivo_port.files[0].size*100);
		portada.style.width = progreso+"%";
	});

	reader.addEventListener("load", ()=>{
		let url = URL.createObjectURL(archivo_port.files[0]);
		let img = document.createElement("IMG");
		img.setAttribute("src", url);
		img.setAttribute("class", "img_portada");
		cont_cargas_uno.appendChild(img);
		img_portada = document.querySelector(".img_portada");

		const extencion = archivo_port.files[0].name.split(".");
		formData.set("PORTADA", archivo_port.files[0], generarNombre(extencion[extencion.length-1]));
	});
});

archivo_peli.addEventListener("change", ()=>{
	const reader = new FileReader();
	reader.readAsArrayBuffer(archivo_peli.files[0]);

	reader.addEventListener("progress", (e)=>{
		let progreso = Math.round(e.loaded/archivo_peli.files[0].size*100);
		pelicula.style.width = progreso+"%";
	});

	reader.addEventListener("load", (e)=>{
		let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: "video/mp4"});
		let url = URL.createObjectURL(video);
		let cargado = document.createElement("VIDEO");
		cargado.setAttribute("src", url);
		cargado.setAttribute("class", "img_pelicula");
		cont_cargas_dos.appendChild(cargado);
		img_pelicula = document.querySelector(".img_pelicula");

		const extencion = archivo_peli.files[0].name.split(".");
		formData.set("PELICULA", archivo_peli.files[0], generarNombre(extencion[extencion.length-1]));
	});
});

bt_subir.addEventListener("click", ()=>{
	const nom = nombre.value;
	const desc = descripcion.value;

	if(nom==""||desc==""){
		parrafo.textContent = "*Completa todos los campos*";
		return;
	}
	formData.set("nombre", nom);
	formData.set("descripcion", desc);
	crearPelicula();
});

bt_eliminar.addEventListener("click", ()=>{
	const nombre = nombreeli.value;
	if(nombre==""){
		parrafo2.textContent = "*Completa el campo*";
		return;
	}

	eliminarPelicula(nombre);
});

for(let i=0; i<categories.length; i++){
	categories[i].addEventListener("click", ()=>{
		categoria = categories[i].id;
		Colorear(i);
	});
}

const generarNombre = (extencion)=>{
	let random = "";
	for(let i=0; i<15; i++){
		random += Math.floor(Math.random()*9);
	}
	return random+"."+extencion.toLowerCase();
}

const crearPelicula = async()=>{
	try{
		if(formData.get("PELICULA")==null||formData.get("PORTADA")==null){
			parrafo.textContent = "*Elije archivos*";
		}else if(categoria==""){
			parrafo.textContent = "*Elije una categoria*";
		}else{
			formData.set("categoria", categoria);
			const url = "/admin-aplication/admin-2003";
			await fetch(url, {
				method: "POST",
				body: formData
			}).then(respuesta=>{
				respuesta.json().then(valor=>{
					const {res} = valor;
					if(res==null){
						parrafo.textContent = "La película ya existe"
					}else if(res==false){
						parrafo.textContent = "No se pudo registrar en el servidor";
					}else if(res==true){
						parrafo.textContent = "Registro exitoso!";
						setTimeout(()=>{
							parrafo.textContent = "";
							nombre.value = "";
							descripcion.value = "";
							pelicula.style.width = "0%";
							portada.style.width = "0%";
							cont_cargas_uno.removeChild(img_portada);
							cont_cargas_dos.removeChild(img_pelicula);
						}, 3000);
						categoria = "";
						for(let x=0; x<categories.length; x++){
							categories[x].style.backgroundColor = "#666666";
						}
					}
				});
			});
		}
	}catch(e){
		console.log("Error crear pelicula");
	}
}

const eliminarPelicula = async(nombre)=>{
	try{
		const url = "/admin-aplication/admin-2003/eliminar-peli/"+nombre;
		await axios.delete(url).then(respuesta=>{
			const {res} = respuesta.data;
			if(res==null){
				parrafo2.textContent = "La pelicula no existe";
			}else if(res==false){
				parrafo2.textContent = "No se pudo eliminar del servidor";
			}else if(res==true){
				parrafo2.textContent = "Pelicula eliminada exitosamente!";
			}

			setTimeout(()=>{
				parrafo2.textContent = "";
				nombreeli.value = "";
			}, 3000);
		});
	}catch(e){
		console.log(e);
	}
}

const Colorear = (posicion)=>{
	for(let j=0; j<categories.length; j++){
		if(j==posicion){
			categories[j].style.backgroundColor = "#AAAAAA";
		}else{
			categories[j].style.backgroundColor = "#666666";
		}
	}
}

const validarToken = async()=>{
	try{
		if(token==null||token==""||token.length<10){
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
					obtenerVisitas();
				}
			});
		}
	}catch(e){
		console.log(e);
	}
}

const obtenerVisitas = async()=>{
	try{
		const url = "/admin-aplication/visitas";
		await axios.post(url).then(respuesta=>{
			if(!respuesta.data.res){
				console.log("No se pudo obtener las visitas");
			}else{
				visitas.textContent = respuesta.data.visitas;
			}
		});
	}catch(e){
		console.log(e);
	}
}

validarToken();