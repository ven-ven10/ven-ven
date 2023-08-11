const correo =     document.querySelector(".correo");
const contraseña = document.querySelector(".contraseña");
const parrafo =    document.querySelector(".parrafo");
const check =      document.querySelector(".check");
const texto =      document.querySelector(".texto");
const olvidado =   document.querySelector(".olvidado");
const regresar =   document.querySelector(".regresar");
const continuar =  document.querySelector(".continuar");

const body = {};
let cambio = 0;

texto.addEventListener("click", ()=>{
	check.click();
});

check.addEventListener("click", ()=>{
	if(cambio == 0){
		contraseña.type = "text";
		cambio = 1;
	}else{
		contraseña.type = "password";
		cambio = 0;
	}
});

olvidado.addEventListener("click", ()=>{
	location.href = "recuperar-cuenta";
});

regresar.addEventListener("click", ()=>{
	location.href = "../";
});

continuar.addEventListener("click", ()=>{
	const corr = correo.value;
	const contr = contraseña.value;

	if(corr==""||contr==""){
		parrafo.textContent = "*Completa todos los campos*";
		return;
	}
	body.correo = corr;
	body.contraseña = contr;
	peticionIniciar();
});

const peticionIniciar = async()=>{
	try{
		const url = "/iniciar";
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				parrafo.textContent = "*Correo o contraseña incorrectos*";
			}else{
				localStorage.setItem("token", respuesta.data.token);
				location.href = "peliculas/"+respuesta.data.id;
			}
		});
	}catch(e){
		parrafo.textContent = e;
	}
}

document.addEventListener('keydown', (e) => {
  let presionada = e.key;
  if(presionada == "Enter"){
  	continuar.click();
  }
});