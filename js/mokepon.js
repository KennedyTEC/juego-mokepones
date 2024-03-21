/*
PROGRAMANDO EL BOTON SELECCIONAR
- obtengo la lista de los inputs
- recorro la lista y corroboro que haya un input seleccionado
- de haber uno, imprimo su value, de lo contrario, se muestra 'Selecciona una mascota'
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
})