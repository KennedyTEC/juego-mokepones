//VARIABLES GLOBALES
//Efectos de sonido
const sonidoIntro = new Audio('../sound/inicio.mp3');
const sonidoSeleccion = new Audio('../sound/seleccion.mp3');
const sonidoCombate = new Audio('../sound/combate.mp3');
const sonidoGanaste = new Audio('../sound/ganaste.mp3');
const sonidoPerdiste = new Audio('../sound/perdiste.mp3');
//Seccion de Elegir mascota
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const listaMascotas = document.getElementsByName('mascota');
const botonMascotaJugador = document.getElementById('boton-mascota');
//Seccion de Ataque
const seccionAtaque = document.getElementById('seleccionar-ataque');
const botonesAtaques = document.getElementById('contenedorAtaques');
const spanVictoriasJugador = document.getElementById('victorias-jugador');
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo');
const spanMascota = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
let listaAtaquesEnemigo = [];
let ataqueJugador;
let ataqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let resultado;
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const sectionMensajes = document.getElementById('resultado');
const reinicio = document.getElementById('boton-reiniciar');

//ESTILOS INICIALES
sonidoIntro.play();
sonidoIntro.loop = true;
sonidoIntro.volume = 0.25;
seccionAtaque.style.display = 'none';
reinicio.style.display = 'none';

//FUNCIONES
//Obtener todos los mokepones
function getAllMokepones(lista) {
  fetch('./js/data.json')
    .then(response => response.json())
    .then(data => lista(data));
}
//Obtener número aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Listar mokepones al inicio para elegir
getAllMokepones(listaMokepones => {
  listaMokepones.forEach(mokepon => {
    let opcionDeMokepones;
    opcionDeMokepones = `
      <input type="radio" name="mascota" value=${mokepon.nombre} id=${mokepon.id}>
      <label class="tarjeta-de-mokepon" for=${mokepon.id}>
        ${mokepon.nombre}
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
      </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    //agregar efecto de sonido
    let mokepones = document.querySelectorAll('.tarjeta-de-mokepon');
    mokepones.forEach(m => {
      m.addEventListener("click", () => {
        sonidoSeleccion.load();
        sonidoSeleccion.play();
      });
    });
  }); 
});
//Programando el boton Seleccionar
botonMascotaJugador.addEventListener('click', () => {
  let nombreMascota = "";
  for (let i = 0; i < listaMascotas.length; i++) {
    if (listaMascotas[i].checked == true) {
      nombreMascota = listaMascotas[i].value;
    }
  }

  if (nombreMascota != "") {
    spanMascota.innerHTML = nombreMascota;
    let mascotaEnemigo;
    getAllMokepones(listaMokepones => {
      mascotaEnemigo = listaMokepones[aleatorio(0, listaMokepones.length - 1)];
      spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
      listaAtaquesEnemigo = mascotaEnemigo.ataques;
    })
    seccionSeleccionarMascota.style.display = 'none';
    seccionAtaque.style.display = 'flex';
    extraerAtaques(nombreMascota);
    sonidoIntro.pause();
    sonidoCombate.play();
    sonidoCombate.loop = true;
    sonidoCombate.volume = 0.25;
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
//Crear botonos de ataques
function extraerAtaques(nombreMascotaJugador) {
  let mascotaJugador;
  let listaBotonesAtaque;
  getAllMokepones(mokepones => {
    mascotaJugador = mokepones.find((mokepon) => mokepon.nombre == nombreMascotaJugador);
    mascotaJugador.ataques.forEach(ataque => {
      botonesAtaques.innerHTML += `
        <button class="boton-ataque" value=${ataque.completo}>${ataque.nombre}</button>
      `;
    });
    //añadiendo evento de click
    listaBotonesAtaque = document.querySelectorAll('.boton-ataque');
    listaBotonesAtaque.forEach(boton => {
      boton.addEventListener('click', (e) => {
        boton.style.background = "#112f58";
        boton.style.borderColor = "transparent";
        boton.style.cursor="auto"
        boton.disabled = true;
        ataqueJugador = e.target.value;
        //activar ataque enemigo aleatorio
        combate();
      })
    })
  })
}

function combate() {
  ataqueEnemigoAleatorio();
  compararAtaques();
  crearMensajes();
  revisarVidas();
}

function ataqueEnemigoAleatorio() {
  let arregloAuxiliar = listaAtaquesEnemigo;
  let indexAtaque = aleatorio(0, arregloAuxiliar.length - 1);
  ataqueEnemigo = arregloAuxiliar[indexAtaque].completo;
  arregloAuxiliar.splice(indexAtaque, 1);
}

function compararAtaques() {
  if (ataqueJugador == ataqueEnemigo) {
    resultado = "EMPATE";
  } else if (
    (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
    (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") ||
    (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO")
  ) {
    resultado = "GANASTE";
    victoriasJugador++;
  } else {
    resultado = "PERDISTE";
    victoriasEnemigo++;
  }

  spanVictoriasJugador.innerHTML = victoriasJugador;
  spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
}

function crearMensajes() {
  let nuevoAtaqueJugador = document.createElement('p');
  let nuevoAtaqueEnemigo = document.createElement('p');
  nuevoAtaqueJugador.textContent = ataqueJugador;
  nuevoAtaqueEnemigo.textContent = ataqueEnemigo;
  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
  revisarVidas();//de acuerdo con esto, resultado tendrá cierto valor
  sectionMensajes.innerHTML = resultado;
}

function revisarVidas() {
  let botones = document.querySelectorAll('.boton-ataque');
  let arregloBotones = Array.from(botones);
  let botonesDeshabilitados = arregloBotones.every((b) => b.disabled == true);
  if (botonesDeshabilitados == true) {
    sonidoCombate.pause();
    reinicio.style.display = 'block';
    if (victoriasJugador == victoriasEnemigo) {
      resultado = "EMPATE 🤜🏽🤛🏽. JUEGO TERMINADO";
    } else if (victoriasJugador > victoriasEnemigo) {
      resultado = "GANASTE 🥳. JUEGO TERMINADO";
      sonidoGanaste.play();
      sonidoGanaste.onended = () => {
        sonidoIntro.load();
        sonidoIntro.play();
      }
    } else if (victoriasJugador < victoriasEnemigo) {
      resultado = "PERDISTE 😢. JUEGO TERMINADO";
      sonidoPerdiste.play();
      sonidoPerdiste.onended = () => {
        sonidoIntro.load();
        sonidoIntro.play();
      }
    }
  }
}

//para el boton Reiniciar, al final del juego
reinicio.addEventListener('click', () => location.reload());