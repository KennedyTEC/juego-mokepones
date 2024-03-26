/*
PROGRAMANDO EL BOTON SELECCIONAR
- obtengo la lista de los inputs
- recorro la lista y corroboro que haya un input seleccionado
- de haber uno, imprimo su value, de lo contrario, se muestra 'Selecciona una mascota'
- además, elige una mascota enemiga aleatoriamente
*/
let botonMascotaJugador = document.getElementById('boton-mascota');
botonMascotaJugador.addEventListener('click',()=>{
  let listaMascotas = document.getElementsByName('mascota');
  let nombreMascota = "";
  for (let i = 0; i < listaMascotas.length; i++) {
    if (listaMascotas[i].checked == true) {
      nombreMascota = listaMascotas[i].value;
    }
  }

  let spanMascota = document.getElementById('mascota-jugador');
  if (nombreMascota != "") {
    spanMascota.innerHTML = nombreMascota;
    //MASCOTA DEL ENEMIGO
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    let mascotaAleatoria = aleatorio(1, 3);
    if (mascotaAleatoria == 1) {
      spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if (mascotaAleatoria == 2) {
      spanMascotaEnemigo.innerHTML = "Capipepo"
    } else {
      spanMascotaEnemigo.innerHTML = "Ratigüeya"
    }
  } else {
    alert("Selecciona una mascota");
  }

})

//funcion para obtener numeros aleatorios
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

/* 
PROGRAMANDO BOTONES DE ATAQUE
- definiendo variable global ataqueJugador
- accediendo a los botones y programandolos
*/
let ataqueJugador;
let ataqueEnemigo;
let botonFuego = document.getElementById('boton-fuego');
botonFuego.addEventListener('click', () => {
  ataqueJugador = "FUEGO";
  ataqueEnemigoAleatorio();
})
let botonAgua = document.getElementById('boton-agua');
botonAgua.addEventListener('click', () => {
  ataqueJugador = "AGUA";
  ataqueEnemigoAleatorio();
})
let botonTierra = document.getElementById('boton-tierra');
botonTierra.addEventListener('click', () => {
  ataqueJugador = "TIERRA";
  ataqueEnemigoAleatorio();
})

//funcion para obtener ataque enemigo
function ataqueEnemigoAleatorio() {
  number = aleatorio(1, 3);
  if (number == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (number == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }
  crearMensaje();
}

//funcion para imprimir los ataques de los jugadores
function crearMensaje() {
  let mensaje = document.getElementById('mensajes');
  mensaje.innerHTML = "";
  let paragraph = document.createElement('p');
  paragraph.innerHTML = `Tu mascota atacó con ${ataqueJugador}.<br>
  La mascota del enemigo atacó con ${ataqueEnemigo}<br>
  ${combate()}`
  mensaje.appendChild(paragraph);
}

//funcion para mostrar resultado de los ataques
function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    return "EMPATE";
  } else if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    return "GANASTE";
  } else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    return "GANASTE";
  } else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    return "GANASTE";
  } else {
    return "PERDISTE";
  }
}