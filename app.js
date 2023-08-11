const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const {Conexion} = require("./conectar/conectar.js");
const {Controlador} = require("./socket/socket.js");

const puerto = process.env.PORT;

app.use(cors());
app.use(express.json());
Conexion();
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: "/tmp/",
	createParentPath: true
}));
app.use(express.static("public"));
app.use("/", require("./rutas/rutas.js"));

io.on("connect", (socket)=>Controlador(socket, io));

server.listen(puerto, ()=>{
	console.log("Servidor corriendo en el puerto "+puerto);
});