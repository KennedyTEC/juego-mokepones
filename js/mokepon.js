//declarando variable global para la seccion de ataque
const seccionAtaque = document.getElementById('seleccionar-ataque');
//ocultando inicialmente la seccion de ataque
seccionAtaque.style.display = 'none';

//ocultando el boton de reiniciar
const reinicio = document.getElementById('boton-reiniciar');
// reinicio.disabled = true;
reinicio.style.display = 'none';
//funcion para reiniciar
reinicio.addEventListener('click', () => location.reload());

let mokepones = new Array();

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

const botonMascotaJugador = document.getElementById('boton-mascota');
const listaMascotas = document.getElementsByName('mascota');
const spanMascota = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const botonesAtaques = document.getElementById('contenedorAtaques');
let ataqueJugador;
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
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    
    //creando los botones de ataque y asignandoles eventos de click
    extraerAtaques(nombreMascota);
    programarAtaques();
    
    //mostrando la seccion de seleccionar-ataque
    //usando la variable global seccionAtaque
    seccionAtaque.style.display = 'flex';
    //ocultando la seccion de seleccionar mascota
    seccionSeleccionarMascota.style.display = 'none';
  } else {
    Swal.fire ({
      title: 'MASCOTA NO SELECCIONADA',
      text: 'Selecciona una mascota',
      icon: 'warning',
      iconColor : 'red',
      animation: 'false'
    })
  }

})

//funcion para obtener los ataques de la mascota del jugador
function extraerAtaques(nombreMascota) {
  let mokeponJugador = mokepones.find((mokepon) => mokepon.nombre == nombreMascota);
  mokeponJugador.ataques.forEach((ataque) => {
    botonesAtaques.innerHTML += `
      <button class="boton-ataque" id=${ataque.id}>${ataque.nombre}</button>
    `;
  });
}

//funcion para agregar los eventos de click a los botones
function programarAtaques() {
  let botones = document.getElementsByClassName('boton-ataque');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      let nombreClase = botones[i].id;
      let nombreAtaque = nombreClase.slice(nombreClase.indexOf('-') + 1);
      ataqueJugador = nombreAtaque.toUpperCase();
      ataqueEnemigoAleatorio();
    })    
  }
}

//funcion para obtener numeros aleatorios
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let ataqueEnemigo;

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
let opcionDeMokepones;


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
    reinicio.style.display = 'block'
  } else if (vidasJugador == 0) {
    resultado = "JUEGO TERMINADO. PERDISTE 😢";
    reinicio.style.display = 'block';
  }
}