///Se obtiene el componente
const contenedor = document.getElementById("contenedor");

//Se crea el método que cargará los datos iniciales del juego
document.addEventListener("DOMContentLoaded", () => {
    //Se le brinda la opción al usuario para cargar las opciones
    eleccion();
});

//Función para crear el modo de elección de palabra
function eleccion() {
    //Se inserta el HTML
    contenedor.innerHTML = `
        <div class="titulo">
                <h6 class="center">Elige la palabra que deseas adivinar</h6>
                <input type="text" id="palabraAd" onkeypress="return soloLetras(event)">
                <a onclick="elegirPalabra()">Guardar</a>
        </div>
    `;
}

//Se crea la función para guardar la palabra
function elegirPalabra() {
    //Se obtiene el componente
    const input = document.getElementById("palabraAd");
    //Se pasa el texto a un arreglo
    const palabra = input.value.split("");
    //Se guarda la palabra de manera local
    localStorage.setItem("palabra", palabra);
    //Se inicia el juego
    cambioModo();
}

//Función para generar las opciones disponibles
function generarTeclado() {
    //contenedor de opciones
    let contenido = "";
    const letras = "abcdefghijklmnñopqrstuvwxyz";
    //Se pasa a arreglo
    const total = letras.split("");
    //Se recorre para generar las opciones disponibles
    total.forEach((letra) => {
        contenido += `
        <a class="btn" id="${letra}" onclick="verificar('${letra}')">${letra}</a>
        `;
    });
    //Se devuelve el teclaod
    return contenido;
}

//Función para pasar de modo elección a adivinador
function cambioModo() {
    //Se obtiene la palabra elegida
    const palabra = localStorage.getItem("palabra");
    //Se carga el nuevo contenido
    contenedor.innerHTML = `
    <div class="col l12 m12 s12">
        <div class="col l12 m12 s12">
        <h4 class="center">¡Adivina la palabra!</h4>
        </div>
                
                <div class="col l6 m6 s12 push-l3 push-m3 imagen">
                    <img src="../resources/image/fase1.png" class="responsive-img" alt="" id="imagen_oportunidad">
                </div>
                <div class="contendor_palabra" id="palabradividida">
                    ${generador(palabra)}
                </div>
                <div class="teclado">
                    ${generarTeclado()}
               </div>
                
            </div>
    `;
    //Se crean las oportunidades
    localStorage.setItem("intentos", 0);
}

//Función para generar letras a base de palabras
function generador(palabra) {
    //Se recrea el arreglo
    let secreto = palabra.trim().split(",");
    //Se crea el HTMl que se insertará
    let contenido = "";
    //Contador
    let contador = 0;
    secreto.forEach((letra) => {
        contenido += `
        <div class="input-field col l1 m1 s1">
            <input value="${letra}" id="${contador}" type="password" class="validate">
        </div>`;
        contador++;
    });
    //Se devuelve el contenido
    return contenido;
}

//Función para verifica la validez de la letra
function verificar(letra) {
    //Se define variable donde se guardará la posición de la letra encontrada
    let posicion = [];
    //Se revisa dentro de la palabra la letra seleccionada
    const secreto = localStorage.getItem("palabra").trim().split(",");

    let lugar = secreto.indexOf(letra);
    console.log(lugar);
    while (lugar != -1) {
        posicion.push(lugar);
        lugar = secreto.indexOf(letra, lugar + 1);
    }
    console.log(posicion);
    //Se verifica la longitud
    if (posicion.length == 0) {
        //Se resta un intento
        let intentoActual = Number(localStorage.getItem("intentos") + 1);
        localStorage.setItem("intentos", intentoActual);
        //Se verifica si se llegaron a 0 intentos
        if (intentoActual == 0) {
            alert("Has perdido, la palabra correcta era: " + localStorage.getItem("palabra"));
        }
        //Se cambia la imagen
        document.getElementById("imagen_oportunidad").src = "../resources/image/fase" + intentoActual + ".png";
    } else {
        //Se quita el tipo de input en los valores encontrados si es que he encuentra alguno
        posicion.forEach((numero) => {
            //Se obtiene el componente que se le cambiará el tipo
            document.getElementById(numero).type = "text";
        });
    }
}
