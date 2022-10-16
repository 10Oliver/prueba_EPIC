<template>
    <div class="contenedor" on-load>
        <button class="boton_teclado" v-for="letra in letras" :key="letra.id" :id="letra" v-on:click="revisar(letra)">{{letra}}</button>
        <div class="contenedor_reiniciar" v-if="visible">
            <button class="reiniciar" v-on:click="recargar">Reiniciar partida</button>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'TecladoLetras',
    data() { 
        return {
            letras: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z"],
            visible: false,
        }
    }, methods: {
        async revisar(eleccion) { 
            this.$emit("evaluar", eleccion);
            document.getElementById(eleccion).disabled = true;
            document.getElementById(eleccion).style = 'background-color: #B40B4A;';
        },
        apagar() { 
            const componentes = document.querySelectorAll('.boton_teclado');
            componentes.forEach(element => {
                element.style = 'background-color: #B40B4A;';
                element.disabled = true;
            });
            this.visible = true;
        },
        recargar: function () { 
            location.reload();
        }
    }
}
</script>

<style scoped>
.contenedor {
    margin-top: 25px;
    width: 84%;
    margin-left: 8%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.boton_teclado {
    width: 9%;
    height: 50px;
    margin: 9px;
    border-radius: 5px;
    border: 0.5px solid black;
    font-size: 14pt;
    background-color: #560D28;
    color: white;
}

.contenedor_reiniciar {
    width: 100%;
}
.reiniciar{
    padding: 5px 15px;
    margin: 10px;
    border-radius: 10px;
    font-size: 18pt;
}
</style>