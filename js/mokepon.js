/*
PROGRAMANDO EL BOTON SELECCIONAR
- obtengo la lista de los inputs y botones de ataque
- recorro la lista y corroboro que haya un input seleccionado
- de haber uno, imprimo su value, de lo contrario, se muestra 'Selecciona una mascota'
- además, elige una mascota enemiga aleatoriamente
*/
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');

//declarando variable global para la seccion de ataque
const seccionAtaque = document.getElementById('seleccionar-ataque');
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
const reinicio = document.getElementById('boton-reiniciar');
// reinicio.disabled = true;
reinicio.style.display = 'none';
//funcion para reiniciar
reinicio.addEventListener('click', () => {
  location.reload();
})

const botonMascotaJugador = document.getElementById('boton-mascota');
const listaMascotas = document.getElementsByName('mascota');
const spanMascota = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
botonMascotaJugador.addEventListener('click',()=>{
  let nombreMascota = "";
  for (let i = 0; i < listaMascotas.length; i++) {
    if (listaMascotas[i].checked == true) {
      nombreMascota = listaMascotas[i].value;
    }
  }

  if (nombreMascota != "") {
    spanMascota.innerHTML = nombreMascota;
    //MASCOTA DEL ENEMIGO
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
let mokepones = new Array();
let resultado;
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;

class Mokepon {
  constructor (nombre, foto, vidas) {
    this.nombre = nombre;
    this.foto = foto;
    this.vidas = vidas;
    this.ataques = [];
  }
};

let hipodoge = new Mokepon('Hipodoge', 'assets/hipodoge.png', 5);
let capipepo = new Mokepon('Capipepo', 'assets/capipepo.png', 5);
let ratigüeya = new Mokepon('Ratigüeya', 'assets/ratigueya.png', 5);

hipodoge.ataques.push(
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'}
)
capipepo.ataques.push(
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
)
ratigüeya.ataques.push(
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '💧', id: 'boton-agua'},
)

mokepones.push(hipodoge, capipepo, ratigüeya);

const contenedorTarjetas = document.getElementById('contenedorTarjetas');
mokepones.forEach((mokepon) => {
  opcionDeMokepones = `
  <input type="radio" name="mascota" value=${mokepon.nombre} id=${mokepon.nombre.toLowerCase()}>
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre.toLowerCase()}>
      ${mokepon.nombre}
      <img src=${mokepon.foto} alt=${mokepon.nombre.toLowerCase()}>
    </label>
  `
  contenedorTarjetas.innerHTML += opcionDeMokepones;
})

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
function combate() {
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
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
function crearMensaje() {
  combate();

  let nuevoAtaqueJugador = document.createElement('p');
  let nuevoAtaqueEnemigo = document.createElement('p');

  nuevoAtaqueJugador.textContent = ataqueJugador;
  nuevoAtaqueEnemigo.textContent = ataqueEnemigo;

  sectionMensajes.innerHTML = resultado;
  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
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