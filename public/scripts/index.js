const iniciar = document.querySelector(".iniciar");
const registrar = document.querySelector(".registrar");

const token = localStorage.getItem("token");

iniciar.addEventListener("click", ()=>{
	location.href = "iniciar";
});

registrar.addEventListener("click", ()=>{
	location.href = "registro";
});

const peticionVerificar = async(body)=>{
	const url = "/";
	try{
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				localStorage.removeItem("token");
			}else{
				location.href = url+"peliculas/"+respuesta.data.id;
			}
		});
	}catch(e){
		console.log("Ah ocurrido un error en la peticion");
	}
}

const verificarToken = ()=>{
	if(token==null||token==""||token.length<10){
		localStorage.removeItem("token"); 
	}else{
		const body = {
			token
		};
		peticionVerificar(body);
	}
}

verificarToken(token);