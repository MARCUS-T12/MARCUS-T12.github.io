let noCounter = 0;
let animationInterval;

function mostrarPregunta() {
    document.getElementById('carta').style.display = 'none'; // Ocultar la carta
    const contenido = document.getElementById('contenido');
    contenido.style.display = 'block'; // Mostrar el contenido
    setTimeout(() => {
        contenido.classList.add('show'); // Agregar la clase para el efecto de desvanecimiento
        animarTexto(); // Llamar a la función para animar el texto
    }, 10);  // Un pequeño retraso para permitir que el display se actualice
}

function animarTexto() {
    const texto = document.getElementById('pregunta'); // Obtener el h1 por su ID
    const palabras = texto.textContent.split(' '); // Dividir el texto en palabras
    texto.innerHTML = ''; // Limpiar el contenido del h1

    palabras.forEach((palabra, index) => {
        const span = document.createElement('span'); // Crear un elemento span para cada palabra
        span.textContent = palabra; // Asignar la palabra al span
        span.classList.add('word'); // Agregar la clase para la animación
        texto.appendChild(span); // Agregar el span al h1
    });

    // Reiniciar la animación
    reiniciarAnimacion();
}

function reiniciarAnimacion() {
    const palabras = document.querySelectorAll('#pregunta .word');
    let index = 0;

    // Limpiar la opacidad de todas las palabras
    palabras.forEach(palabra => {
        palabra.style.opacity = 0; // Comienza invisible
    });

    // Animar cada palabra con un retraso
    animationInterval = setInterval(() => {
        if (index < palabras.length) {
            palabras[index].style.opacity = 1; // Hacer visible la palabra
            palabras[index].style.animation = 'slideIn 0.5s forwards'; // Aplicar la animación de deslizamiento
            index++;
        } else {
            clearInterval(animationInterval); // Detener el intervalo cuando todas las palabras han sido animadas
            setTimeout(reiniciarAnimacion, 1000); // Esperar 1 segundo antes de reiniciar la animación
        }
 }, 500); // Retraso de 500ms por palabra
}

function respuesta(opcion) {
    const respuestaDiv = document.getElementById('respuesta');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const videoContainer = document.getElementById('videoContainer');
    const miVideo = document.getElementById('miVideo');
    const loadingMessage = document.getElementById('loadingMessage');
    const mensajeFinal = document.getElementById('mensajeFinal');
    const contenido = document.getElementById('contenido');

    if (opcion === 'sí') {
        contenido.style.display = 'none'; // Ocultar el contenedor de la pregunta
        loadingMessage.style.display = 'block'; // Mostrar el mensaje de "Cargando..."
        videoContainer.style.display = 'block'; // Mostrar el contenedor del video

        // Esperar un momento antes de reproducir el video
        setTimeout(() => {
            loadingMessage.style.display = 'none'; // Ocultar el mensaje de "Cargando..."
            miVideo.play(); // Reproducir el video
        }, 1000); // Esperar 1 segundo

        miVideo.onended = function() {
            videoContainer.style.display = 'none'; // Ocultar el video
            mensajeFinal.style.display = 'flex'; // Mostrar el mensaje "TE AMO"
            mensajeFinal.classList.add('fade-in'); // Agregar la clase para la animación
        
            setTimeout(() => {
                mensajeFinal.style.opacity = 0; // Hacer que el mensaje se vuelva invisible
        
                setTimeout(() => {
                    mensajeFinal.style.display = 'none'; // Ocultar el mensaje completamente
                    mensajeFinal.classList.remove('fade-in'); // Quitar la clase para resetear
                }, 500); // Esperar a que la transición de opacidad termine
        
            }, 3000); // Esperar 3 segundos antes de comenzar a ocultar el mensaje
        };
    } else {
        noCounter++;
        if (noCounter === 1) {
            noButton.innerHTML = "¿Segura que no quieres?";
        } else if (noCounter === 2) {
            noButton.innerHTML = "¿Ya lo pensaste bien?";
        } else if (noCounter === 3) {
            noButton.innerHTML = "🥺";
        } else if (noCounter === 4) {
            noButton.innerHTML = "PORFAVOR";
        } else if (noCounter === 5) {
            noButton.innerHTML = "Dime que si";
        } else if (noCounter === 6) {
            noButton.innerHTML = "Siiii?";
        } else if (noCounter === 7) {
            noButton.innerHTML = "Siiii 🥺?";
        } else {
            respuestaDiv.innerHTML = ""; // Limpiar el mensaje
            noCounter = 0; // Reiniciar contador
            noButton.style.display = 'none'; // Ocultar el botón "No"
            return; // Salir de la función
        }

        // Mover el botón a una posición aleatoria cada vez que se hace clic en "No"
        moverBoton(noButton);

        // Hacer más grande el botón "Sí" cada vez que se hace clic en "No"
        aumentarTamanoBoton(yesButton, noCounter);

        respuestaDiv.style.display = 'block'; // Mostrar el mensaje
    }
}

function moverBoton(boton) {
    // Obtener el tamaño de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular una posición aleatoria dentro de los límites de la ventana
    const randomX = Math.random() * (windowWidth - boton.offsetWidth);
    const randomY = Math.random() * (windowHeight - boton.offsetHeight);

    // Aplicar la nueva posición al botón
    boton.style.position = 'absolute'; // Asegurarse de que el botón se pueda mover
    boton.style.left = `${randomX}px`;
    boton.style.top = `${randomY}px`;
}

function aumentarTamanoBoton(boton, contador) {
    // Aumentar el tamaño del botón "Sí" en función del contador
    const nuevoTamano = 100 + (contador * 20); // Aumentar el tamaño en 20px por cada clic
    boton.style.width = `${nuevoTamano}px`;
    boton.style.height = `${nuevoTamano}px`;
}