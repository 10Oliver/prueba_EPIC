<template>
    <div id="seleccion">
        <h3>Elige la opción para adivinar la palabra</h3>
        <span
            >Para empezar a jugar, debes de definir la palabra que tratarás de encontrar, para ello decide la opción que
            más prefieras</span
        >
        <div class="opciones">
            <button v-on:click="visible = !visible">Escribir la palabra</button>
            <button>¡Qué el destino decida!</button>
        </div>
        <div class="contenedorTeclado" v-if="visible">
            <input type="text" v-model="palabra" />
            <button v-on:click="setData">¡Empezar!</button>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: "SeleccionPalabra",
    data() {
        return {
            visible: false,
            cambio: false,
            palabra: null
        };
    },
    methods: {
        async setData() { 
            if (this.palabra == null) {
                Swal.fire({
                    title: 'Error en palabra',
                    icon: 'warning',
                    text: 'No se permiten campos vacíos'
                })
            } else { 
                //La palabra se pasa a minusculas
                this.palabra = this.palabra.toLowerCase();
                this.$emit("retornar", this.palabra);
            }
            
        },
    },
};
</script>

<style scoped>
.opciones {
    width: 80%;
    margin-left: 10%;
    height: auto;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

button {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    border-radius: 10px;
}

.contenedorTeclado {
    height: auto;
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100px;
}

input {
    background-color: white;
    border: 0.5px solid black;
    border-radius: 5px;
    width: 30%;
    height: 25px;
}
</style>
