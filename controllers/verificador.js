/**
 * Función que admite solo letras
 *
 *  Esto incluye:
 *  - Mayúsculas
 *  - Minúsculas
 *  - Eliminar
 *  - Espacio en blanco
 *
 */
 function soloLetras(texto) {
    //Se obtiene el codigo ASCII de la tecla
    key = texto.keyCode;
    //Se almacena
    teclado = String.fromCharCode(key);
    // Valores permitidos
    valores = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ,.¡!¿? ";
    // Teclas de control en codigo ASCII
    especiales = "8-32";
    // Si se permiten o no las teclas de control
    permitido = false;
    //Se revisa si la tecla es parte de las especiales
    for (var i in especiales) {
        if (key == especiales[i]) {
            permitido = true;
        }
    }
    //Se revisa si las tecla escrita se puede escribir
    if (valores.indexOf(teclado) == -1 && !permitido) {
        return false;
    }
}