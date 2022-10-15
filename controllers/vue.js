//Se importan los componentes
import Vue from "vue";
import eleccion from '../components/eleccion.vue'

    //Se instancia Vue
    const vm = new Vue({
        el: "#contenedor",
        data: {
            mensaje: 'Hola mundo'
        },
        components: {
            eleccion,
        }
    });