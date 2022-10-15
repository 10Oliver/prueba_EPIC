<template>
    <div id="app">
        <h1>Juego de ahorcado</h1>
        <SeleccionPalabra v-if="estado" v-on:retornar="getData" />
        <Juego v-if="!estado" />
    </div>
</template>

<script>
import SeleccionPalabra from "./components/seleccion.vue";
import Juego from "./components/juego.vue";


export default {
    name: "App",
    data() {
        return {
            estado: true,
        };
    },
    components: {
        SeleccionPalabra,
        Juego,
    },
    methods: {
        getData(dato) {
            this.estado = dato;
        },
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
