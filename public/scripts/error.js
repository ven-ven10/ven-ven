const boton = document.querySelector(".boton");

boton.addEventListener("click", ()=>{
	localStorage.removeItem("token");
	location.href = "../";
});