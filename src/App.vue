<template>
    <div id="app">
        <div class="lineacruzada"></div>
        <div v-for="numero in arregloLineas" :key="numero.id" :class="'linea'+numero +' linea'"></div>
        <div class="contenedor_juego">
            <h1 class="titulo">Juego de ahorcado</h1>
            <SeleccionPalabra ref="seleccion" v-if="estado" v-on:retornar="getData" />
            <Juego v-if="!estado" ref="juego" />
            <PalabraEscondida ref="escondida"  v-bind:palabra="palabra" v-if="!estado" v-on:cancelar="apagar" v-on:fallar="dibujo"/>
            <teclado ref="teclado" v-if="!estado" v-on:evaluar="getIntento"/>
        </div>
       
       
    </div>
</template>

<script>
import SeleccionPalabra from "./components/Seleccion.vue";
import Juego from "./components/Juego.vue";
import teclado from "./components/Teclado.vue";
import PalabraEscondida from "./components/PalabraEscondida.vue"
import anime from "animejs/lib/anime.es.js";

export default {
    name: "App",
    data() {
        return {
            estado: true,
            palabra: [],
            intentos: 6,
            eleccion: null,
            longitudArreglo: null,
            arregloLineas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        };
    },
    components: {
        SeleccionPalabra,
        Juego,
        teclado,
        PalabraEscondida
    },
    methods: {
        getData(palabraR) {
            let palabraSecreta = palabraR.split(''), arreglo = [];
            //Se crea un arreglo con la longitud de la palabra
            for (let index = 0; index < palabraR.split('').length; index++) {
                arreglo.push('*');
            }
            /**
             * this.palabra es un arreglo generar para guardar ambos valores
             * la palabra en arreglo
             * y la cantidad de valores a adivinar
             */
            this.palabra.push(palabraSecreta);  //Se agrega la palabra en arreglo
            this.palabra.push(arreglo); // Arreglo de cantid
            this.estado = false; //Se cierra la eleción y se muestra el resto de componentes
        },
        getIntento(opcion) { //Revisar si la letra elegida es correcta o no
            this.eleccion = opcion; //Se carga la opción
            this.$refs.escondida.revisar(opcion);
        },
        apagar: function () { //Función para apagar las opciones de respuesta
            this.$refs.teclado.apagar();
        },
        dibujo: function () { //Si la letra es incorrecta se procede a repintar el dibujo
            this.$refs.juego.fallido();
        }
    },
    mounted() { 
       this.arregloLineas.forEach(element => {
           anime({
               targets: '.linea' + element,
               translateY: 48 * element, 
               width: '100%'
        })
       });
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Patrick+Hand&display=swap');
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 15px;
    margin: 0px;
    height: 100% !important;
    width: 100%;
    position: absolute;
    overflow-y: hidden;
}

.titulo {
    font-size: 32pt;
    margin: 5px;
}
* {
    font-family: 'Homemade Apple', cursive;
    font-family: 'Patrick Hand', cursive;
}
body {
    margin: 0px !important;
}

.contenedor_juego {
    position: absolute;
    width: 100%;
    padding-top: 0px;
    margin-top: 0px;
}

.linea {
    background-color: transparent;
    border-bottom: 1px dotted #33b8ff;
}

.lineacruzada {
   height: 100%;
   width: 0.5px;
   border-left: 2px solid #EB3B39;
   position: absolute;
   margin-left: 75px;
}
</style>
