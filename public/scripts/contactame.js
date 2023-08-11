const atras =     document.querySelector(".atras");
const ven_ven =   document.querySelector(".ven_ven");
const facebook =  document.querySelector(".facebook");
const tiktok =    document.querySelector(".tiktok");
const instagram = document.querySelector(".instagram");
const twitter =   document.querySelector(".twitter");

let paths = (window.location.pathname).split("/");
let id = paths[paths.length-1];

atras.addEventListener("click", ()=>{
	location.href = "../peliculas/"+id;
});

ven_ven.addEventListener("click", ()=>{
	location.href = "/mensajes/"+id;
});

facebook.addEventListener("click", ()=>{
	location.href = "https://www.facebook.com/profile.php?id=100095595992680&mibextid=ZbWKwL";
});

tiktok.addEventListener("click", ()=>{
	location.href = "https://www.tiktok.com/@venven3278?_t=8eXBtjBk1Xa&_r=1";
});

instagram.addEventListener("click", ()=>{
	location.href = "https://instagram.com/venven255?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D";
});

twitter.addEventListener("click", ()=>{
	location.href = "https://twitter.com/venven080926427?t=LWUutZPRUWHoIwIbjXWtWA&s=09";
});