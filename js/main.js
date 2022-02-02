/**
 *  Variables
 */
const listadoPosiblesSoluciones = ['lampara', 'pizarra', 'monitor', 'capitalismo', 'bondad'];
const solucion = listadoPosiblesSoluciones[Math.floor(Math.random() * listadoPosiblesSoluciones.length)];
const nuevalLetra = document.querySelector('#nueva-letra');
const visualJugador = document.querySelector('#visual-jugador');
const letrasJugador = document.querySelector('#letras-jugador');
let visualUsuario = Array(solucion.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];
