<template>
    <div class="contenedorPersonaje">
        <div class="cPersonaje">
            <div class="linea base1"></div>
            <div class="linea base2"></div>
            <div class="linea base3"></div>
            <div class="linea base4"></div>
            <div class="personaje pieza0"></div>
            <div class="personaje pieza1"></div>
            <div class="personaje pieza2"></div>
            <div class="personaje pieza3"></div>
            <div class="personaje pieza4"></div>
            <div class="personaje pieza5"></div>
        </div>
    </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
    name: "JuegoAhorcado",
    data() {
        return {
            Errores: 0,
            Propiedades: {
                'pieza1': [120, -80,315, 0],
                'pieza2': [80, -110, 285, 45],
                'pieza3': [80, -110, 345, -45],
                'pieza4': [80, -18, 285, 45],
                'pieza5': [80,-18,345,-45],
            }
        };
    },
    methods: {
        fallido() {
            this.Errores++;
            let Objeto = this.Propiedades['pieza' + this.Errores];
            anime({
                targets: ".pieza" + this.Errores,
                height: Objeto[0],
                translateY: Objeto[1],
                translateX: Objeto[2],
                rotate: Objeto[3],
                opacity: 1
            });
        },
    },
    mounted() {
        anime({
            targets: ".personaje",
            translateX: 315,
            translateY: -280,
            delay: 1000
        });

        anime({
            targets: ".pieza" + this.Errores,
            borderRadius: ["0%", "50%"],
            width: 80,
            height: 80,
            translateX: 270,
            translateY: -190,
            backgroundColor: "rgba(255,0,0,0)",
            border: 1,
            opacity: 1,
            delay: 1000
        });
        anime({
            targets: ".base1",
            width: 250,
            easing: "easeInOutQuad",
            translateX: 0,
        });
        anime({
            targets: ".base2",
            translateX: 120,
            height: 330,
            easing: "easeInOutQuad",
            delay: 200,
        });
        anime({
            targets: ".base3",
            translateY: -280,
            translateX: 315,
            height: 50,
            width: 10,
            delay: 600
        });
        anime({
            targets: ".base4",
            translateX: 120,
            translateY: -320,
            width: 200,
            delay: 400,
            easing: "easeInOutQuad",
        });
    },
};
</script>

<style scoped>
.contenedorPersonaje {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: black;
    width: 60%;
    margin-left: 20%;
}

.cPersonaje {
    margin-top: 350px;
    width: 500px;
    height: 320px;
    display: flex;
    position: absolute;
    justify-content: flex-start;
    align-items: flex-end;
}

.linea {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 5px;
}
.pieza0 {
    border: 10px solid black;
    width: 1px;
    height: 1px;

}

.personaje {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 5px;
    opacity: 0;
}
</style>
