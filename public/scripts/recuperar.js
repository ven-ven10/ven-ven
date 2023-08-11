const nombre =     document.querySelector(".nombre");
const apellido =   document.querySelector(".apellido");
const correo =     document.querySelector(".correo");
const contraseña = document.querySelector(".contraseña");
const confirmar =  document.querySelector(".confirmar");

const parrafo1 =  document.querySelector(".parrafo1");
const parrafo2 =  document.querySelector(".parrafo2");

const atras =     document.querySelector(".atras");
const continuar = document.querySelector(".continuar");
const siguiente = document.querySelector(".siguiente");
const intentar =  document.querySelector(".intentar");

const cont_datos =      document.querySelector(".cont_datos");
const cont_contraseña = document.querySelector(".cont_contraseña");
const cont_emergente = document.querySelector(".cont_emergente");

let url1 = "/recuperar-cuenta";
let url2 = "/cuenta/";
let id = "";

atras.addEventListener("click", (e)=>{
	e.preventDefault();
	location.href = "iniciar";
});

continuar.addEventListener("click", (e)=>{
	e.preventDefault();
	const nom = nombre.value;
	const apell = apellido.value;
	const corr = correo.value;
	if(nom==""||apell==""||corr==""){
		parrafo1.textContent = "*Completa todos los campos*";
		return;
	}

	const body = {};
	body.nombre = nom;
	body.apellido = apell;
	body.correo = corr;
	peticionRecuperar(body);
});

siguiente.addEventListener("click", (e)=>{
	e.preventDefault();
	const contr =  contraseña.value;
	const confir = confirmar.value;

	if(contr==""||confir==""){
		parrafo2.textContent = "*Completa todos los campos*";
		return;
	}

	if(contr!=confir){
		parrafo2.textContent = "Las contraseñas no coinciden";
		return;
	}

	const body = {};
	body.contraseña = contr;
	peticionActualizar(body);
});

intentar.addEventListener("click", ()=>{
	cont_emergente.style.display = "none";
});

const peticionRecuperar = async(body)=>{
	try{
		await axios.post(url1, body).then(respuesta=>{
			if(respuesta.data.res){
				url2 = url2+respuesta.data.id;
				cont_datos.style.display = "none";
				cont_contraseña.style.display = "flex";
			}else{
				cont_emergente.style.display = "flex";
			}
		});
	}catch(e){
		location.href = "error";
	}
}

const peticionActualizar = async(body)=>{
	try{
		await axios.put(url2, body).then(respuesta=>{
			if(respuesta.data.res){
				localStorage.setItem("token", respuesta.data.token);
				location.href = "peliculas/"+respuesta.data.id;
			}
		});
	}catch(e){
		location.href = "error";
	}
}