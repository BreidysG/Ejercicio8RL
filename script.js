let currentWord = ''; // Palabra actual que se debe buscar
let foundWords = []; // Palabras encontradas
let errorWords = []; // Palabras seleccionadas incorrectamente
let timer; // Control del temporizador
let gameActive = false; // Control del estado del juego

// Función para iniciar el juego
function startGame() {
    foundWords = []; // Reiniciar las palabras encontradas en cada nueva partida
    errorWords = []; // Reiniciar los errores en cada nueva partida
    gameActive = true; // Activar el juego
    updateFoundWordsDisplay();
    updateErrorsDisplay();
    loadNewWords();
    startTimer();

    // Mostrar el contenedor de palabras y resultados
    document.getElementById('wordList').classList.remove('hidden');
    document.getElementById('foundWords').classList.remove('hidden');
    document.getElementById('errors').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('p1').classList.add('hidden');
    document.getElementById('p2').classList.add('hidden');
    document.getElementById('p3').classList.add('hidden');
    document.getElementById('startButton').classList.add('hidden');
}

// Función para obtener 40 palabras únicas del array dado
function getUniqueWords(words, count) {
    const shuffledWords = words.sort(() => Math.random() - 0.5); // Mezclar las palabras
    return shuffledWords.slice(0, count); // Seleccionar las primeras 'count' palabras
}

// Lista de palabras disponibles
const availableWords = [
    "Luz", "Golpe", "Destello", "Gema", "Susurro",
    "Destino", "Pasado", "Presente", "Futuro", "Guía", "Brillo",
    "Eco", "Sombras", "Tierra", "Lejanía", "Encuentro", "Voz",
    "Llamada", "Escalera", "Amanecer", "Horizonte", "Épica", "Roca",
    "Conquista", "Colores", "Esfera", "Orilla", "Cristal", "Tejido",
    "Brisa", "Niebla", "Cascada", "Palacio", "Bailarina",
    "Fábula", "Fortaleza", "Nostalgia", "Fortuna", "Rayo", "Poeta",
    "Alba", "Neblina", "Labio", "Piel", "Luz", "Olvido",
    "Sombras", "Llama", "Tierra", "Pasión", "Eco", "Viaje",
    "Silencio", "Tiempo", "Destino", "Guía", "Cuento", "Amistad",
    "Sol", "Lluvia", "Viento", "Trueno", "Frío", "Despertar",
    "Vuelo", "Recuerdo", "Leyenda", "Destello", "Aventura", "Oscuridad",
    "Fuego", "Infinito", "Relámpago", "Espejo", "Río", "Susurro"
];

// Función para verificar la palabra seleccionada
function checkWord(event) {
    if (!gameActive) return; // No hacer nada si el juego no está activo

    const word = event.target.innerText;

    // Comprobar si la palabra seleccionada es la correcta
    if (word === currentWord) {
        // Añadir la palabra a la lista de palabras encontradas si no está ya presente
        if (!foundWords.includes(currentWord)) {
            foundWords.push(currentWord);
            updateFoundWordsDisplay();
        }

        // Marcar la palabra correcta encontrada en el tablero
        event.target.classList.add('found'); // Cambiar el fondo a verde

        // Cargar nuevas palabras después de un segundo si se ha encontrado la palabra correcta
        setTimeout(() => {
            loadNewWords();
        }, 1000);
    } else {
        // Si la palabra seleccionada es incorrecta
        if (!errorWords.includes(word)) {
            errorWords.push(word);
            event.target.classList.add('error');
            updateErrorsDisplay();
        }
    }
}


// Función para cargar nuevas palabras en el tablero
function loadNewWords() {
    // Obtener 40 palabras únicas para el tablero
    const gridWords = getUniqueWords(availableWords, 40);
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Limpiar palabras anteriores

    // Mostrar las palabras en el tablero
    gridWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = word;
        wordDiv.addEventListener('click', checkWord); // Habilitar los eventos de clic
        gridContainer.appendChild(wordDiv);
    });

    // Seleccionar 1 palabra al azar de las 40 palabras del tablero para buscarla
    currentWord = gridWords[Math.floor(Math.random() * gridWords.length)]; // Seleccionar palabra correcta de gridWords
    document.getElementById('currentWord').textContent = currentWord; // Actualizar la palabra a buscar
}

// Función para iniciar el temporizador
function startTimer() {
    const duration = 180; // Duración del juego en segundos (3 minutos)
    let timeLeft = duration;

    // Actualizar el temporizador en pantalla cada segundo
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerHTML = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            endGame(); // Llamar al final del juego cuando el tiempo se acabe
        }
    }, 1000);
}

// Función para mostrar la cantidad de palabras encontradas
function updateFoundWordsDisplay() {
    const foundWordsList = document.getElementById('foundWords');
    foundWordsList.innerHTML = `Palabras encontradas: ${foundWords.length}`;
}

// Función para mostrar la cantidad de errores
function updateErrorsDisplay() {
    const errorWordsList = document.getElementById('errors');
    errorWordsList.innerHTML = `Errores: ${errorWords.length}`;
}

// Función para finalizar el juego cuando el tiempo se agota
function endGame() {
    clearInterval(timer); // Detener el temporizador
    gameActive = false; // Desactivar el juego
    alert("¡Se acabó el tiempo! El juego ha terminado.");
    document.getElementById('p4').classList.remove('hidden');
    document.getElementById('wordList').classList.add('hidden');
    document.getElementById('gridContainer').classList.add('hidden');
}

// Evento para iniciar el juego cuando se carga la página
window.onload = () => {
    document.getElementById('startButton').addEventListener('click', startGame);
};
