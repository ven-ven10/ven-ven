class ChatMensajes {
	constructor(){
		this.mensajes = {};
	}

	actualizarMensajes(formatoObjeto){
		this.mensajes = formatoObjeto;
	}

	nuevoMensaje(nombre, mensaje, id, destino, nuevo){
		let objeto = {};
		let lista = [];
		if(this.mensajes[destino]!=undefined){
			lista = this.mensajes[destino].mensajes;
		}

		lista.unshift({
			nombre,
			mensaje,
			id
		});

		objeto.mensajes = lista.splice(0,12);
		objeto.nuevo = nuevo;

		this.mensajes[destino] = objeto;
	}

	ultimos12(id){
		if(!this.mensajes[id]){
			return false;
		}else{
			return this.mensajes[id].mensajes;
		}
	}

	guardarMensajes(){
		return this.mensajes;
	}

	verNuevo(id){
		if(this.mensajes[id]!=undefined){
			if(this.mensajes[id].nuevo){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	modificarNuevo(id){
		if(this.mensajes[id]!=undefined){
			this.mensajes[id].nuevo = false;
		}
	}
}

module.exports = ChatMensajes;