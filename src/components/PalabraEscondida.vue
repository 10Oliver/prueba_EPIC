<template>
    <div class="ContenedorPalabraEscondida">
        <span v-for="Caracter in Arreglo" :key="Caracter.id" forceUpdate>
            <p>{{ Caracter }}</p></span>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    props: ["Palabra"],
    name: "PalabraEscondida",
    data() {
        return {
            Secreto: this.Palabra[0],
            ActualEleccion: null,
            visibilidad: false,
            Arreglo: this.Palabra[1],
            Posicion: [],
            Intentos: 5,
        };
    },
    methods: {
        revisar(Letra) {
            //Se verifica si la letra seleccionada se encuentra dentro del arreglo
            let Temporal = this.Secreto.indexOf(Letra);
            //variable para verificar que si se encontró una coinicidencia
            let Estado = false;
            //Se van guardando
            while (Temporal != -1) {
                Estado = true;
                this.Posicion.push(Temporal);
                Temporal = this.Secreto.indexOf(Letra, Temporal + 1);
            }
            //Se cambian los asteriscos por la letra real si hubieron coincidencias
            if (Estado) {
                this.Posicion.forEach((Element) => {
                    this.Arreglo[Element] = this.Secreto[Element];
                });
                //Se revisa si ya se ha completado la palabra
                if (this.Arreglo.join("") == this.Secreto.join("")) {
                    Swal.fire({
                        title: "¡Felicidades!",
                        text: "¡Has completado la palabra!",
                        allowOutsideClick: false,
                    });
                    //Se envia el método para apagar todo el teclado
                    this.$emit("cancelar");
                }
            } else {
                this.Intentos--;
                if (this.Intentos <= 0) {
                    Swal.fire({
                        title: "Lo siento",
                        text: "¡Has perdido!",
                        allowOutsideClick: false,
                    });
                    //Se muestra la palabra
                    for (let index = 0; index < this.Secreto.length; index++) {
                        this.Arreglo[index] = this.Secreto[index];
                    }
                    //Se envia el método para apagar todo el teclado
                    this.$emit("cancelar");
                } else {
                    Swal.fire({
                        title: "Estás equivocado",
                        text: "Intentos restantes: " + this.Intentos,
                        toast: true,
                        position: "top-end",
                        timer: 2000,
                        closeOnClickOutside: false,
                        showConfirmButton: false,
                        closeOnEsc: false,
                    });
                }
                //Se manda que se ha equivocado al padre
                this.$emit("fallar");
            }
            //Se fuerza a actualizar los datos para que se muestren los campos
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped>
.ContenedorPalabraEscondida {
    width: 100%;
    margin-top: 340px;
    height: auto;
    display: flex;
    justify-content: center;
}
span {
    padding: 0px 10px;
    margin: 20px 5px;
    width: 20px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid black;
}

p {
    font-size: 20pt;
    margin: 0px;
}
</style>
