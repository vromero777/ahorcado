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
const numeroIntentos = document.querySelector('#numero-intentos');
const visualUsuario = Array(solucion.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];

/**
 * Funciones
 */

/**
 * Genera, a partir de la solucion, el string que vera el usuario:
 * Ejemplo: _r__a
 * @param {string} solucionLocal - Solucion a adivinar.
 * @param {Array} letrasUsuarioLocal - Listado de letras introducidas por el usuario.
 * @param {string} vacio - Simbolo que oculta la letra en caso de no ser adivinada a partir de 'letrasUsuarioLocal'.
 * @return {Array}
 */
function generarEnigmaConGuiones(solucionLocal, letrasUsuarioLocal, vacio) {
    return solucionLocal.split("").map(function (letra) {
        return letrasUsuarioLocal.includes(letra) ? letra : vacio;
    })
}

/**
 * Renderiza el estado de la palabra a adivinar.
 * @param {string} solucionLocal - Palabra a adivinar.
 * @param {Array} letrasUsuario - Letras introducidas por el usuario.
 * @param {HTMLElement} targetAdivinadas - Lugar donde se mostrara el estado de la adinivinacion.
 * @param {number} numeroIntentosLocal - Numero de intentos restantes
 * @param {HTMLElement} targetNumeroIntentos - Lugar donde se mostrara los numeros de intentos.
 * @param {HTMLElement} targetLetrasJugador - Lugar donde se mostrara las letras del jugador que ha introducido.
 * @param {string} vacio - Caracter de letra aun no adivinadaa. Por defecto "_".
 * @param {string} separador - Separacion entre los caracteres mostrados. Por defecto " ".
 */
function render(solucionLocal,
                letrasUsuario,
                targetAdivinadas,
                numeroIntentosLocal,
                targetNumeroIntentos,
                targetLetrasJugador,
                vacio="_",
                separador=" " ) {
    // Letra y guiones
    const finalHTML = generarEnigmaConGuiones(solucionLocal, letrasUsuario, vacio);
    // Numero de intentos
    targetNumeroIntentos.textContent = numeroIntentosLocal;
    // Letras introducidas por el usuario
    targetLetrasJugador.textContent = letrasIntroducidas.join(separador);
    // Imprimimos
    targetAdivinadas.textContent = finalHTML.join(separador);
}

/**
 * Anyade la letra del usuario
 * @return {string} Letra del usuario
 */
function anyadirLetra() {
    // Recogemos letra
    const miNuevaLetra = nuevaLetra.value.toLowerCase();
    // La guardamos
    letrasIntroducidas.push(miNuevaLetra);
    // Limpiamos la letra introducida
    nuevaLetra.value = '';
    return miNuevaLetra;
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
 * Comprueba si ha fallado el usuario y resta un intento
 * @param {string} solucion - Palabra a adivinar.
 * @param {string} letraLocal - Nueva letra introducida por el usuario.
 * @return {number} Numero intentos
 */
function comprobarLetraAcertada(solucion, letraLocal) {
    // Ha fallado
    if(!incluyeCaracter(solucion, letraLocal)) {
        intentos = restarPuntos(intentos);
    }
    return intentos;
}

/**
 * Informa al usuario si ha ganado o ha perdido. Bloquea el input en cualquier caso.
 * @param {string} solucion
 * @param {Array} letrasIntroducidas
 * @param {number} intentos
 * @param {HTMLElement} mensajeGanado
 * @param {HTMLElement} mensajePerdido
 * @param {HTMLElement} nuevaLetra - Input donde el usuario indica la nueva letra.
 * @param {string} claseMostrar - Clase que añadiremos a 'mensajeGanado' o 'mensajePerdido'.
 */
function informarGameOver(solucion, letrasIntroducidas, intentos, mensajeGanado, mensajePerdido, nuevaLetra, claseMostrar="mensaje--show") {
    // Ha perdido
    if (intentos === 0) {
        mensajePerdido.classList.add(claseMostrar);
        // Bloquea la posibilidad de añadir nuevos elementos
        nuevaLetra.setAttribute('disabled', true);
    }
    // Ha ganado
    const visualUsuario = generarEnigmaConGuiones(solucion, letrasIntroducidas, '').join('');
    if (solucion === visualUsuario) {
        mensajeGanado.classList.add(claseMostrar);
        // Bloquea la posibilidad de añadir nuevos elementos
        nuevaLetra.setAttribute('disabled', true);
    }
}

/**
 * Eventos
 */
nuevaLetra.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
        const nuevaLetraIntroducida = anyadirLetra();
        comprobarLetraAcertada(solucion, nuevaLetraIntroducida);
        informarGameOver(solucion, letrasIntroducidas, intentos, mensajeGanado, mensajePerdido, nuevaLetra);
        render(solucion, letrasIntroducidas, visualJugador, intentos, numeroIntentos, letrasJugador);
    }
})

/**
 * Inicio
 */

render(solucion, letrasIntroducidas, visualJugador, intentos, numeroIntentos, letrasJugador);