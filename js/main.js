/**
 * Variables
 */
const listadoPosiblesSoluciones = ['lampara', 'pizarra', 'monitor', 'capitalismo', 'bondad'];
const solucion = listadoPosiblesSoluciones[Math.floor(Math.random() * listadoPosiblesSoluciones.length)];
const visualJugador = document.querySelector('#visual-jugador');
const nuevaLetra = document.querySelector('#nueva-letra');
const letrasJugador = document.querySelector('#letras-jugador');
const mensajeGanado = document.querySelector('#mensaje-ganado');
const mensajePerdido = document.querySelector('#mensaje-perdido');
const visualUsuario = Array(solucion.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];

/**
 * Funciones
 */


/**
 * Renderiza el estado de la palabra a adivinar.
 * @param {string} solucionLocal - Palabra a adivinar.
 * @param {Array} letrasUsuario - Letras introducidas por el usuario.
 * @param {HTMLElement} targetAdivinadas - Lugar donde se mostrara el estado de la adinivinacion.
 * @param {string} vacio - Caracter de letra aun no adivinadaa. Por defecto "_".
 * @param {string} separador - Separacion entre los caracteres mostrados. Por defecto " ".
 */
function render(solucionLocal, letrasUsuario, targetAdivinadas, vacio="_", separador=" ") {
    // Letra y guiones
    const finalHTML = solucionLocal.split('').map(function (letra) {
        return letrasUsuario.includes(letra) ? letra : vacio;
    });
    // Imprimimos
    targetAdivinadas.textContent = finalHTML.join(separador);
}

/**
 * Anyade la letra del usuario
 */
function anyadirLetra() {
    // Recogemos letra
    const miNuevaLetra = nuevaLetra.value.toLowerCase();
    // La guardamos
    letrasIntroducidas.push(miNuevaLetra);
    // Limpiamos la letra introducida
    nuevaLetra.value = '';
    // Renderizamos los cambios
    render(solucion, letrasIntroducidas, visualJugador);
}

/**
 * Comprobar si una palabra contiene un caracter.
 *
 * @param {string} Palabra a comprobar.
 * @param {string} Caracter que buscamos.
 * @return {boolean} Resultado si la palabra contiene o no el caracter.
 */
function incluyeCaracter(palabra, caracter) {
    return palabra.toUpperCase().includes(caracter.toUpperCase());
}

/**
 * Restar intentos
 *
 * @param {number} intentos - Los intentos que tiene el usuario.
 * @param {number} puntosARestar - Puntos que vamos a restar, valor por defecto = 1.
 * @return {number} El resultado de la resta.
 */
function restarPuntos(intentos, puntosARestar = 1) {
    return intentos > 0 ? intentos - puntosARestar : 0;
}

/**
 * Eventos
 */
nuevaLetra.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        anyadirLetra();
        render(solucion, letrasIntroducidas, visualJugador);
    }
})

/**
 * Inicio
 */

render(solucion, letrasIntroducidas, visualJugador);
