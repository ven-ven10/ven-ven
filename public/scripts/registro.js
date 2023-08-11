const nombre =   document.querySelector(".nombre");
const apellido = document.querySelector(".apellido");
const correo =   document.querySelector(".correo");
const contraseña = document.querySelector(".contraseña");
const confirmar =  document.querySelector(".confirmar");
const parrafo =    document.querySelector(".parrafo");
const check      = document.querySelector(".check");
const ver =        document.querySelector(".ver");
const regresar =   document.querySelector(".regresar");
const registrarme = document.querySelector(".registrarme");
const imagen =      document.querySelector(".imagen");
const cont_emergente = document.querySelector(".cont_emergente");

const body = {};
let cambio = 0;

check.addEventListener("click", ()=>{
	if(cambio == 0){
		contraseña.type = "text";
		confirmar.type = "text";
		cambio = 1;
	}else{
		contraseña.type = "password";
		confirmar.type = "password";
		cambio = 0;
	}
});

ver.addEventListener("click", ()=>{
	check.click();
});

regresar.addEventListener("click", ()=>{
	location.href = "../";
});

registrarme.addEventListener("click", ()=>{
	const nom = nombre.value;
	const apell = apellido.value;
	const corr = correo.value;
	const contr = contraseña.value;
	const confir = confirmar.value;
	if(nom==""||apell==""||corr==""||contr==""||confir==""){
		parrafo.textContent = "*Completa todos los campos"
		return;
	}

	if(contr!=confir){
		parrafo.textContent = "*Las contraseñas no coinciden"
		return;
	}

	body.nombre = nom;
	body.apellido = apell;
	body.correo = corr;
	body.contraseña = contr;
	postRegistro();
});

imagen.addEventListener("click", ()=>{
	cont_emergente.style.display = "none";
});

const postRegistro = async()=>{
	try{
		const url = "/registro";
		await axios.post(url, body).then(respuesta=>{
			if(respuesta.data.res == true){
				localStorage.setItem("token", respuesta.data.token);
				location.href = url+"/"+respuesta.data.id;
			}else{
				cont_emergente.style.display = "flex"
			}
		});
	}catch(e){
		location.href = "error";
	}
}

document.addEventListener("keydown", (e)=>{
	const presionada = e.key;
	if(presionada == "Enter"){
		registrarme.click();
	}
});