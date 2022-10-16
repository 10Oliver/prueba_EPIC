<template>
    <div id="app">
        <div class="LineaCruzada"></div>
        <div v-for="Numero in ArregloLineas" :key="Numero.id" :class="'Linea' + Numero + ' Linea'"></div>
        <div class="contenedorJuego">
            <h1 class="Titulo">Juego de ahorcado</h1>
            <SeleccionPalabra ref="Seleccion" v-if="Estado" v-on:retornar="getData" />
            <Juego v-if="!Estado" ref="Juego" />
            <PalabraEscondida
                ref="Escondida"
                :palabra="Palabra"
                v-if="!Estado"
                v-on:cancelar="apagar"
                v-on:fallar="dibujo"
            />
            <Teclado ref="Teclado" v-if="!Estado" v-on:evaluar="getIntento" />
        </div>
    </div>
</template>

<script>
import SeleccionPalabra from "./components/Seleccion.vue";
import Juego from "./components/Juego.vue";
import Teclado from "./components/Teclado.vue";
import PalabraEscondida from "./components/PalabraEscondida.vue";
import anime from "animejs/lib/anime.es.js";

export default {
    name: "App",
    data() {
        return {
            Estado: true,
            Palabra: [],
            Intentos: 6,
            Eleccion: null,
            LongitudArreglo: null,
            ArregloLineas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        };
    },
    components: {
        SeleccionPalabra,
        Juego,
        Teclado,
        PalabraEscondida,
    },
    methods: {
        //Se obtiene la palabra
        getData(PalabraR) {
            //Se divide para crear un arrelo
            let PalabraSecreta = PalabraR.split(""), Arreglo = [];
            //Se crea un arreglo con la longitud de la palabra
            for (let index = 0; index < PalabraR.split("").length; index++) {
                Arreglo.push("*");
            }
            /**
             * this.palabra es un arreglo generar para guardar ambos valores
             * la palabra en arreglo
             * y la cantidad de valores a adivinar
             */
            this.Palabra.push(PalabraSecreta); //Se agrega la palabra en arreglo
            this.Palabra.push(Arreglo); // Arreglo de cantid
            this.Estado = false; //Se cierra la eleción y se muestra el resto de componentes
        },
        getIntento(Opcion) {
            //Revisar si la letra elegida es correcta o no
            this.Eleccion = Opcion; //Se carga la opción
            this.$refs.Escondida.revisar(Opcion);
        },
        apagar: function () {
            //Función para apagar las opciones de respuesta
            this.$refs.Teclado.apagar();
        },
        dibujo: function () {
            //Si la letra es incorrecta se procede a repintar el dibujo
            this.$refs.Juego.fallido();
        },
    },
    mounted() {
        //Se cargan las líneas del fondo
        this.ArregloLineas.forEach((Element) => {
            anime({
                targets: ".Linea" + Element,
                translateY: 48 * Element,
                width: "100%",
            });
        });
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Patrick+Hand&display=swap");
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

.Titulo {
    font-size: 32pt;
    margin: 5px;
}
* {
    font-family: "Homemade Apple", cursive;
    font-family: "Patrick Hand", cursive;
}
body {
    margin: 0px !important;
}

.ContenedorJuego {
    position: absolute;
    width: 100%;
    padding-top: 0px;
    margin-top: 0px;
}

.Linea {
    background-color: transparent;
    border-bottom: 1px dotted #33b8ff;
}

.LineaCruzada {
    height: 100%;
    width: 0.5px;
    border-left: 2px solid #eb3b39;
    position: absolute;
    margin-left: 75px;
}
</style>
