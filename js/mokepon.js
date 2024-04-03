/*
PROGRAMANDO EL BOTON SELECCIONAR
- obtengo la lista de los inputs y botones de ataque
- recorro la lista y corroboro que haya un input seleccionado
- de haber uno, imprimo su value, de lo contrario, se muestra 'Selecciona una mascota'
- además, elige una mascota enemiga aleatoriamente
*/
let botonFuego = document.getElementById('boton-fuego');
let botonAgua = document.getElementById('boton-agua');
let botonTierra = document.getElementById('boton-tierra');

//declarando variable global para la seccion de ataque
let seccionAtaque = document.getElementById('seleccionar-ataque');
//ocultando inicialmente la seccion de ataque
seccionAtaque.style.display = 'none';

//funciones para habilitar y deshabilitar los botones de ataque
function habilitarAtaques() {
  botonFuego.disabled = false;
  botonAgua.disabled = false;
  botonTierra.disabled = false;
}
function deshabilitarAtaques() {
  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
}

//empezar con los botones deshabilitados
deshabilitarAtaques();

//ocultando el boton de reiniciar
let reinicio = document.getElementById('boton-reiniciar');
// reinicio.disabled = true;
reinicio.style.display = 'none';
//funcion para reiniciar
reinicio.addEventListener('click', () => {
  location.reload();
})

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
    //habilitando los botones de ataque
    habilitarAtaques();
    //mostrando la seccion de seleccionar-ataque
    //usando la variable global seccionAtaque
    seccionAtaque.style.display = 'flex';
    //ocultando la seccion de seleccionar mascota
    let seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    seccionSeleccionarMascota.style.display = 'none';
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
- definiendo variable global ataqueEnemigo
- accediendo a los botones y programandolos
*/
let ataqueJugador;
let ataqueEnemigo;

botonFuego.addEventListener('click', () => {
  ataqueJugador = "FUEGO";
  ataqueEnemigoAleatorio();
})

botonAgua.addEventListener('click', () => {
  ataqueJugador = "AGUA";
  ataqueEnemigoAleatorio();
})

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

//funcion para mostrar resultado de los ataques
let resultado;
let vidasJugador = 3;
let vidasEnemigo = 3;
function combate() {
  let spanVidasJugador = document.getElementById('vidas-jugador');
  let spanVidasEnemigo = document.getElementById('vidas-enemigo');
  if (ataqueJugador == ataqueEnemigo) {
    resultado = "EMPATE";
  } else if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    resultado = "GANASTE";
    vidasEnemigo--;
  } else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    resultado = "GANASTE";
    vidasEnemigo--;
  } else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    resultado = "GANASTE";
    vidasEnemigo--;
  } else {
    resultado = "PERDISTE";
    vidasJugador--;
  }
  spanVidasJugador.innerHTML = vidasJugador;
  spanVidasEnemigo.innerHTML = vidasEnemigo;

  //revisar vidas
  revisarVidas();
}

//funcion para imprimir los ataques de los jugadores
function crearMensaje() {
  let sectionMensajes = document.getElementById('resultado');
  let ataquesDelJugador = document.getElementById('ataques-del-jugador');
  let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

  combate();

  sectionMensajes.innerHTML = resultado;
  ataquesDelJugador.innerHTML = ataqueJugador;
  ataquesDelEnemigo.innerHTML = ataqueEnemigo;
}

//funcion para revisar vidas
function revisarVidas() {
  if (vidasEnemigo == 0) {
    resultado = "JUEGO TERMINADO. GANASTE 🥳";
    deshabilitarAtaques();
    reinicio.style.display = 'block'
  } else if (vidasJugador == 0) {
    resultado = "JUEGO TERMINADO. PERDISTE 😢";
    deshabilitarAtaques();
    reinicio.style.display = 'block';
  }
}