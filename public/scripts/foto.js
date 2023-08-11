const archivo = document.querySelector(".archivo");
const plant =   document.querySelectorAll(".plant");
const fotos =   document.querySelectorAll(".fotos");

const cont_emergente = document.querySelector(".cont_emergente");
const cont_aviso =     document.querySelector(".cont_aviso");

const avisar =    document.querySelector(".avisar");
const regresar =  document.querySelector(".regresar");
const continuar = document.querySelector(".continuar");
const listo =     document.querySelector(".listo");
const buscar =    document.querySelector(".buscar");
const atrasuno =  document.querySelector(".atrasuno");

let paths = (window.location.pathname).split("/");
let id = paths[paths.length-2];
let cambiador = 0;
let electo = null;

for(let i = 0; i < plant.length; i++){
	plant[i].addEventListener("click", ()=>{
		Colorear(i);
	});
}

const Colorear = (valor)=>{
	for(let j = 0; j < plant.length; j++){
		if(j == valor){
			if(cambiador == 0){
				plant[j].style.backgroundColor = "#D5D8DC";
				plant[j].style.boxShadow = "5px 10px 15px";
				continuar.style.backgroundColor = "#D5D8DC";
				continuar.style.color = "#D35400";
				continuar.style.cursor = "pointer";
				electo = j+1;
				cambiador = 1;
			}else{
				plant[j].style.backgroundColor = "#D35400";
				plant[j].style.boxShadow = "none";
				continuar.style.backgroundColor = "#D35400";
				continuar.style.color = "#D5D8DC";
				continuar.style.cursor = "initial";
				electo = null;
				cambiador = 0;
			}
		}else{
			plant[j].style.backgroundColor = "#D35400";
			plant[j].style.boxShadow = "none";
		}
	}
}

avisar.addEventListener("click", (e)=>{
	e.preventDefault();
	cont_aviso.style.display = "flex";
});

atrasuno.addEventListener("click", ()=>{
	cont_aviso.style.display = "none";
});

buscar.addEventListener("click", ()=>{
	archivo.click();
});

regresar.addEventListener("click", (e)=>{
	e.preventDefault();
	location.href = "../../cuenta/"+id;
});

continuar.addEventListener("click", (e)=>{
	e.preventDefault();
	if(electo != null){
		const nombre = "img"+electo+".png";
		personalizaFoto(nombre);
	}
});

listo.addEventListener("click", ()=>{
	location.href = "../../cuenta/"+id;
});

archivo.addEventListener("change", ()=>{
	if(archivo.files[0]){
		const nombreFoto = crearNombre(archivo.files[0].name);

		const formData = new FormData();
		formData.append("IMG", archivo.files[0], nombreFoto);
		fotoPersonalizada(formData);
	}
});

const personalizaFoto = async(nombre)=>{
	try{
		const url = "/registro/"+id;
		const body = {
			nombre
		};
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				location.href = "../../error";
				return;
			}

			cont_emergente.style.display = "flex";
		});
	}catch(e){
		location.href = "../../error";
	}
}

const fotoPersonalizada = async(imagen)=>{
	try{
		const url = "/cuenta/"+id+"/foto";
		await fetch(url,{
			method: "POST",
			body: imagen
		}).then(respuesta=>{
			respuesta.json().then(valor=>{
				if(valor.res){
					cont_aviso.style.display = "none";
					cont_emergente.style.display = "flex";
				}else{
					location.href = "../../error";
				}
			});
		});
	}catch(e){
		location.href = "../../error";
	}
}

const crearNombre = (nom)=>{
	let nombre = "";
	let extencion = (nom.split(".").pop()).toLowerCase();
	for(let i = 0; i < 15; i++){
		const random = Math.floor(Math.random()*9);
		nombre = nombre+random;
	}
	return nombre+"."+extencion;
}