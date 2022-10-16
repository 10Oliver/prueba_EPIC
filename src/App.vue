<template>
    <div id="app">
        <h1>Juego de ahorcado</h1>
        <SeleccionPalabra ref="seleccion" v-if="estado" v-on:retornar="getData" />
        <Juego v-if="!estado" />
         <PalabraEscondida ref="escondida"  v-bind:palabra="palabra" v-if="!estado"/>
        <teclado v-if="!estado" v-on:evaluar="getIntento"/>
       
    </div>
</template>

<script>
import SeleccionPalabra from "./components/Seleccion.vue";
import Juego from "./components/Juego.vue";
import teclado from "./components/Teclado.vue";
import PalabraEscondida from "./components/PalabraEscondida.vue"

export default {
    name: "App",
    data() {
        return {
            estado: true,
            palabra: [],
            intentos: 6,
            eleccion: null,
            longitudArreglo: null,
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
            this.palabra.push(palabraSecreta);
            this.palabra.push(arreglo);
            this.estado = false;
        },
        getIntento(opcion) { 
            this.eleccion = opcion;
            this.$refs.escondida.revisar(this.eleccion);
            //this.$refs.PalabraEscondida.revisar(this.eleccion);

        },
        verificar: function () { 
            this.$emit('verificar', this.eleccion);
        }
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
