const correo =     document.querySelector(".correo");
const contraseña = document.querySelector(".contraseña");
const parrafo =    document.querySelector(".parrafo");
const check =      document.querySelector(".check");
const texto =      document.querySelector(".texto");
const regresar =   document.querySelector(".regresar");
const continuar =  document.querySelector(".continuar");

const body = {};
const url = "/admin-aplication/login";
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

regresar.addEventListener("click", ()=>{
	location.href = "../../";
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
	inicioAdmin();
});

const inicioAdmin = async()=>{
	try{
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				parrafo.textContent = "*Correo o contraseña incorrectos*";
			}else{
				localStorage.setItem("token", respuesta.data.token);
				location.href = "admin-2003-rn-panel";
			}
		});
	}catch(e){
		console.log(e);
	}
}

document.addEventListener('keydown', (e) => {
  let presionada = e.key;
  if(presionada == "Enter"){
  	continuar.click();
  }
});