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
  } else {
    alert("Selecciona una mascota");
  }

  //MASCOTA DEL ENEMIGO
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge"
  } else if (ataqueAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo"
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigüeya"
  }
})

//funcion para obtener numeros aleatorios
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}