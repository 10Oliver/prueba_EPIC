<template>
    <div id="seleccion">
        <h3>Elige la opción para adivinar la palabra</h3>
        <span
            >Para empezar a jugar, debes de definir la palabra que tratarás de encontrar, para ello decide la opción que
            más prefieras</span
        >
        <div class="opciones">
            <button v-on:click="Visible = !Visible">Escribir la palabra</button>
            <button v-on:click="setData">¡Qué el destino decida!</button>
        </div>
        <div class="contenedorTeclado" v-if="Visible">
            <input type="text" v-model="Palabra" />
            <button v-on:click="setData">¡Empezar!</button>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "SeleccionPalabra",
    data() {
        return {
            Visible: false,
            Cambio: false,
            Palabra: null,
        };
    },
    methods: {
        async setData() {
            let valores = /^[0-9]/;
            //Se revisa que si se tomará del input que no esté vacío
            if (this.Palabra == "") {
                Swal.fire({
                    title: "Error en palabra",
                    icon: "warning",
                    text: "No se permiten campos vacíos",
                });
            } else {
                //Si se escogió el aletorio se verifica que sea así
                if (this.Palabra == null) {
                    //Opciones para la petición
                    const options = {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": "34e918967bmshd7edbd958454188p1ca3e0jsn6e169ad264eb",
                            "X-RapidAPI-Host": "random-words-with-pronunciation.p.rapidapi.com",
                        },
                    };
                    //Se realiza la petición para obtener la palabra en inglés
                    let Busqueda = "";
                    fetch("https://random-words-with-pronunciation.p.rapidapi.com/word/dutch", options)
                        .then((request) => request.json())
                        .then((response) => {
                            //Se obtiene la palabra
                            Busqueda = response[0].word.toUpperCase();
                            //Se envía para evaluarla
                            this.$emit("retornar", Busqueda);
                        })
                        .catch((err) => console.error(err));
                } else {
                    if (this.Palabra.length < 2) {
                        Swal.fire({
                            title: "Error en palabra",
                            icon: "warning",
                            text: "La palabra debe de tener al menos dos letras",
                        });
                    } else if (this.Palabra.match(valores)) {
                         Swal.fire({
                            title: "Error en palabra",
                            icon: "warning",
                            text: "La palabra no debe de contener números",
                        });
                    } else { 
                        //Si no está vacío, no es nulo y tiene más de una letra se guarda y se envía
                        this.Palabra = this.Palabra.toUpperCase();
                        this.$emit("retornar", this.Palabra);
                    }
                }
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
    margin-top: 30px;
}

button {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    border-radius: 10px;
}

h3 {
    font-size: 22pt;
    margin: 10px;
}

span {
    font-size: 18pt;
    margin: 5px 0px;
}

button {
    font-size: 16pt;
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
    border: 2px solid black !important;
    border-radius: 5px;
    width: 30%;
    height: 35px;
    font-size: 16pt;
}
</style>
