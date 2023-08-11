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

const url = "/admin-aplication/creation";

const formData = new FormData();
let cambio = 0;

check.addEventListener("click", (e)=>{
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

regresar.addEventListener("click", (e)=>{
	e.preventDefault();
	location.href = "../../";
});

registrarme.addEventListener("click", (e)=>{
	e.preventDefault();
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
	const body = {
		nombre: nom,
		apellido: apell,
		correo: corr,
		contraseña: contr
	};
	postRegistroAdmin(body);
});

const postRegistroAdmin = async(body)=>{
	try{
		await axios.post(url, body).then(respuesta=>{
			if(!respuesta.data.res){
				parrafo.textContent = "*No se registró el admin*";
			}else{
				localStorage.setItem("token", respuesta.data.token);
				location.href = "admin-2003-rn-panel";
			}
		});
	}catch(e){
		console.log(e);
	}
}

document.addEventListener("keydown", (e)=>{
	const presionada = e.key;
	if(presionada == "Enter"){
		registrarme.click();
	}
});