const {Router} = require("express");
const router = Router();
const path = require("path");

const {crearUsuario,
personalizaFoto,
ingresoUsuario,
recuperarCuenta,
obtenerDatos,
actualizarDatos,
fotoPersonalizada,
eliminarUsuario,
cantidadVisitas} = require("./../controles/usuarios.js");

const {crearPelicula,
eliminarPelicula,
obtenerPortadas,
obtenerPelicula,
buscarPelicula} = require("./../controles/peliculas.js");

const {loginAdmin,
createAdmin,
obtenerUsuarios,
obtenerPeliculas,
obtenerInfo,
agregarFoto,
actualizarInfo,
eliminarCuenta} = require("./../controles/admin.js");

const {validarToken} = require("./../controles/token.js");

const {verificarId,
obtenerVistas} = require("./../controles/controles.js");

router.get("/", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/index.html"));
});
router.get("/registro", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/registro.html"));
});
router.get("/registro/:id", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/personaliza.html"));
});
router.get("/iniciar", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/iniciar.html"));
});
router.get("/recuperar-cuenta", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/recuperar-cuenta.html"));
});
router.get("/peliculas/lista-portadas", obtenerPortadas);
router.get("/peliculas/:id", cantidadVisitas,(req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/peliculas.html"));
});
router.get("/peliculas/:id/:busqueda", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/busqueda.html"));
});
router.get("/ver/:pelicula/:id", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/ver.html"));
});
router.get("/contactame/:id", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/contactame.html"));
});
router.get("/mensajes/:id", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/mensajes.html"));
});
router.get("/cuenta/:id", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/cuenta.html"));
});
router.get("/cuenta/:id/:ruta", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/foto.html"));
});
router.get("/admin-aplication/creation-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/creacion.html"));
});
router.get("/admin-aplication/login-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/inicio-admin.html"));
});
router.get("/admin-aplication/admin-2003-rn-panel", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/administrador.html"));
});
router.get("/admin-aplication/usuarios-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/usuarios-admin.html"));
});
router.get("/admin-aplication/catalogo-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/catalogo-admin.html"));
});
router.get("/admin-aplication/mensajes-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/mensajes-admin.html"));
});
router.get("/admin-aplication/cuenta-admin-rn-2003", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/cuenta-admin.html"));
});
router.get("/error", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../public/formatos/error.html"));
});
router.get("/sitemap.xml", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../sitemap.xml"));
});
router.get("/robots.txt", (req, res)=>{
	res.sendFile(path.join(__dirname+"./../robots.txt"));
});
router.get("*", (req, res)=>{
	res.send("Ruta no existente");
});

router.post("/", validarToken);
router.post("/registro", crearUsuario);
router.post("/registro/:id", personalizaFoto);
router.post("/iniciar", ingresoUsuario);
router.post("/recuperar-cuenta", recuperarCuenta);
router.post("/verificar-id", verificarId);
router.post("/ver/:pelicula/:id", obtenerPelicula);
router.post("/buscar-pelicula", buscarPelicula);
router.post("/cuenta/:id", obtenerDatos);
router.post("/cuenta/:id/:parametro", fotoPersonalizada);
router.post("/admin-aplication/login", loginAdmin);
router.post("/admin-aplication/creation", createAdmin);
router.post("/admin-aplication/admin-2003", crearPelicula);
router.post("/admin-aplication/visitas", obtenerVistas);
router.post("/admin-aplication/usuarios-admin", obtenerUsuarios);
router.post("/admin-aplication/catalogo-admin", obtenerPeliculas);
router.post("/admin-aplication/mensajes-admin", obtenerUsuarios);
router.post("/admin-aplication/cuenta-admin", obtenerInfo);
router.post("/admin-aplication/agregar-foto", agregarFoto);

router.put("/cuenta/:id", actualizarDatos);
router.put("/admin-aplication/cuenta-admin", actualizarInfo);

router.delete("/cuenta/:id", eliminarUsuario);
router.delete("/admin-aplication/admin-2003/eliminar-peli/:nombre", eliminarPelicula);
router.delete("/admin-aplication/cuenta-admin", eliminarCuenta);

module.exports = router;