<template>
    <div class="contenedor" on-load>
        <button class="botonTeclado" v-for="Letra in Letras" :key="Letra.id" :id="Letra" v-on:click="revisar(Letra)">{{Letra}}</button>
        <div class="contenedorReiniciar" v-if="Visible">
            <button class="reiniciar" v-on:click="recargar">Reiniciar partida</button>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'TecladoLetras',
    data() { 
        return {
            Letras: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z"],
            Visible: false,
        }
    }, methods: {
        //Se desactiva el botón
        async revisar(Eleccion) { 
            this.$emit("evaluar", Eleccion);
            document.getElementById(Eleccion).disabled = true;
            document.getElementById(Eleccion).style = 'background-color: #d0d0d0; color: #000;';
        },
        //Se apagan todos los botones
        apagar() { 
            const componentes = document.querySelectorAll('.botonTeclado');
            componentes.forEach(Element => {
                Element.style = 'background-color: #d0d0d0; color: #000;';
                Element.disabled = true;
            });
            this.Visible = true; //Se muestra el botón de reiniciar
        },
        //Recarga la página
        recargar: function () { 
            location.reload();
        }
    }
}
</script>

<style scoped>
.contenedor {
    width: 84%;
    margin-left: 8%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.botonTeclado {
    width: 9%;
    height: 50px;
    margin: 5px 9px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 14pt;
    background-color: white;
    color: black;
}

.contenedorReiniciar {
    width: 100%;
}
.reiniciar{
    padding: 5px 15px;
    margin: 10px;
    border-radius: 10px;
    font-size: 16pt;
}
</style>