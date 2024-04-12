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
  {nombre: '💧', completo: 'AGUA'},
  {nombre: '💧', completo: 'AGUA'},
  {nombre: '💧', completo: 'AGUA'},
  {nombre: '🔥', completo: 'FUEGO'},
  {nombre: '🌱', completo: 'TIERRA'}
)
capipepo.ataques.push(
  {nombre: '🌱', completo: 'TIERRA'},
  {nombre: '🌱', completo: 'TIERRA'},
  {nombre: '🌱', completo: 'TIERRA'},
  {nombre: '💧', completo: 'AGUA'},
  {nombre: '🔥', completo: 'FUEGO'}
)
ratigüeya.ataques.push(
  {nombre: '🔥', completo: 'FUEGO'},
  {nombre: '🔥', completo: 'FUEGO'},
  {nombre: '🔥', completo: 'FUEGO'},
  {nombre: '🌱', completo: 'TIERRA'},
  {nombre: '💧', completo: 'AGUA'}
)

mokepones.push(hipodoge, capipepo, ratigüeya);

const botonMascotaJugador = document.getElementById('boton-mascota');
const listaMascotas = document.getElementsByName('mascota');
const spanMascota = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const botonesAtaques = document.getElementById('contenedorAtaques');
let ataqueJugador;
let listaAtaquesEnemigo = [];
botonMascotaJugador.addEventListener('click',()=>{
  let nombreMascota = "";
  for (let i = 0; i < listaMascotas.length; i++) {
    if (listaMascotas[i].checked == true) {
      nombreMascota = listaMascotas[i].value;
    }
  }

  if (nombreMascota != "") {
    spanMascota.innerHTML = nombreMascota;
    //MASCOTA DEL ENEMIGO Y ATAQUES
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    listaAtaquesEnemigo = mokepones[mascotaAleatoria].ataques;
    
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
      <button class="boton-ataque" value=${ataque.completo}>${ataque.nombre}</button>
    `;
  });
}

//funcion para agregar los eventos de click a los botones
function programarAtaques() {
  let botones = document.querySelectorAll('.boton-ataque');
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      boton.style.background = '#112f58';
      boton.disabled = true;
      let nameAtaque = e.target.value;
      ataqueJugador = nameAtaque;
      ataqueEnemigoAleatorio();
      combate();
    })
  })
}

//funcion para obtener numeros aleatorios
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let ataqueEnemigo ;
//funcion para obtener ataque enemigo
function ataqueEnemigoAleatorio() {
  let arregloAuxiliar = listaAtaquesEnemigo;
  number = aleatorio(0, arregloAuxiliar.length - 1);
  ataqueEnemigo = arregloAuxiliar[number].completo;
  arregloAuxiliar.splice(number, 1);
}

let resultado;
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
let victoriasJugador = 0;
let victoriasEnemigo = 0;
function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    resultado = "EMPATE";
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    resultado = "GANASTE";
    victoriasJugador++;
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    resultado = "GANASTE";
    victoriasJugador++;
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    resultado = "GANASTE";
    victoriasJugador++;
  } else {
    resultado = "PERDISTE";
    victoriasEnemigo++;
  }
  
  spanVidasJugador.innerHTML = victoriasJugador;
  spanVidasEnemigo.innerHTML = victoriasEnemigo;
  
  crearMensaje();
}

//funcion para imprimir los ataques de los jugadores
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
function crearMensaje() {
  let nuevoAtaqueJugador = document.createElement('p');
  let nuevoAtaqueEnemigo = document.createElement('p');

  nuevoAtaqueJugador.textContent = ataqueJugador;
  nuevoAtaqueEnemigo.textContent = ataqueEnemigo;

  revisarVidas(); //de acuerdo con eso, el resultado tendra cierto valor
  sectionMensajes.innerHTML = resultado;
  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

//funcion para revisar vidas
function revisarVidas() {
  let botones = document.querySelectorAll('.boton-ataque');
  let arregloBotones = Array.from(botones);
  let botonesDeshabilitados = arregloBotones.every((b) => b.disabled == true);
  if (botonesDeshabilitados == true) {
    reinicio.style.display = 'block';
    if (victoriasJugador == victoriasEnemigo) {
      resultado = "EMPATE 🤜🏽🤛🏽. JUEGO TERMINADO";
    } else if (victoriasJugador > victoriasEnemigo) {
      resultado = "GANASTE 🥳. JUEGO TERMINADO";
    } else if (victoriasJugador < victoriasEnemigo) {
      resultado = "PERDISTE 😢. JUEGO TERMINADO";
    }
  }
}