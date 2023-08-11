const omitir = document.querySelector(".omitir");
const continuar = document.querySelector(".continuar");
const valor = document.querySelectorAll(".valor");
const imagenes = document.querySelectorAll(".imagenes");
const img1 = document.querySelector(".img1");

const color_crema = "#D5D8DC";
const color_cafe = "#D35400";

const paths = (window.location.pathname).split("/");
const id = paths[paths.length-1];

let escoger = null;
let nombre = null;
let cambio = 0;

for(let i = 0; i < imagenes.length; i++){
	imagenes[i].addEventListener("click", ()=>{
		Colorear(i);
	});
}

const Colorear = (val)=>{
	for(let j = 0; j < valor.length; j++){
		if(j == val){
			if(cambio == 0){
				valor[j].style.backgroundColor = color_crema;
				valor[j].style.boxShadow = "5px 10px 10px";
				escoger = j;
				Seleccionado();
				cambio = 1;
				let nom = imagenes[j].src.split("/");
				nombre = nom[nom.length-1];
			}else{
				valor[j].style.backgroundColor = color_cafe;
				valor[j].style.boxShadow = "";
				escoger = null;
				Seleccionado();
				cambio = 0;
				continuar.style.cursor = "";
				nombre = null;
			}
		}else{
			valor[j].style.backgroundColor = color_cafe;
			valor[j].style.boxShadow = "";
		}
	}
}

omitir.addEventListener("click", ()=>{
	if(escoger == null){
		peticionPersonaliza(nombre);
	}
});

continuar.addEventListener("click", ()=>{
	if(escoger != null){
		peticionPersonaliza(nombre);
	}
});

const Seleccionado = ()=>{
	if(escoger != null){
		continuar.style.cursor = "pointer";
	}
}

const peticionPersonaliza = async(nombre)=>{
	const url = "/registro/"+id;
	const body = {};

	body.nombre = nombre;

	try{
		await axios.post(url, body).then(respuesta=>{
			if(respuesta.data.res){
				location.href = "/peliculas/"+id;
			}else{
				location.href = "../error";
			}
		});
	}catch(e){
			location.href = "../error";
	}
}