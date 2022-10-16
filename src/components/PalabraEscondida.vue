<template >
    <div class="ContenedorPalabraEscondida">
        <span v-for="caracter in arreglo" :key="caracter.id" forceUpdate> <p>{{caracter}}</p></span>
    </div>
</template>


<script>
import Swal from 'sweetalert2'

export default {
    props: ['palabra'],
    name: 'PalabraEscondida',
    data() { 
        return {
            secreto: this.palabra[0],
            ActualEleccion: null,
            visibilidad: false,
            arreglo: this.palabra[1],
            posicion: [],
            intentos: 6
        }
    },
    methods: {
        revisar(letra) { 
            //Se verifica si la letra seleccionada se encuentra dentro del arreglo
            let temporal = this.secreto.indexOf(letra);
            //variable para verificar que si se encontró una coinicidencia
            let estado = false;
            //Se van guardando
            while (temporal != -1) { 
                estado = true;
                this.posicion.push(temporal);
                temporal = this.secreto.indexOf(letra, temporal + 1);
            }
            //Se cambian los asteriscos por la letra real si hubieron coincidencias
            if (estado) {
                console.log("Bien"+this.posicion);
                this.posicion.forEach(element => {
                    this.arreglo[element] = this.secreto[element];
                });
            } else { 
                this.intentos--;
                if (this.intentos <= 0) {
                    Swal.fire({
                        title: 'Lo siento',
                        text: '¡Has perdido!',
                        allowOutsideClick: false
                    })
                } else {
                    Swal.fire({
                    title: 'Estás equivocado',
                    text: 'Intentos restantes' + this.intentos,
                    position: 'top-start'
                });
                }
                
            }
            //Se revisa si ya se ha completado la palabra
            if (this.arreglo.join('') == this.secreto.join('')) {
                Swal.fire({
                    title: '¡Felicidades!',
                    text: '¡Has completado la palabra!',
                    allowOutsideClick: false
                });
            }
            this.$forceUpdate();

            //Se verifica las letras que si son parte de ella
            /*
            //Se busca si se encuentra en el arreglo de la palabra escondida
            this.arreglo = this.secreto.indexOf(letra);
            //Se guarda las coincidencias si existen
            while (this.arreglo != -1) { 
                this.posicion.push(this.arreglo);
                this.arreglo = this.posicion.indexOf(letra, this.posicion +1)
            }
            console.log(this.posicion);
            */
        }
    },

}
</script>

<style scoped>
    .ContenedorPalabraEscondida {
        width: 100%;

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