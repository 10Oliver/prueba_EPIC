<template>
    <div class="ContenedorPersonaje">
        <div class="personaje">
            <div class="linea base1"></div>
            <div class="linea base2"></div>
            <div class="linea base3"></div>
            <div class="linea base4"></div>
            <span>{{ errores }}</span>
        </div>
    </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
    name: "JuegoAhorcado",
    data() {
        return {
            errores: 0,
        };
    },
    methods: {
        fallido() {
            this.errores++;
        },
    },
    mounted() {
        anime({
            targets: ".base1",
            width: 250,
            easing: "easeInOutQuad",
            translateX: 0
        });
        anime({
            targets: ".base2",
            translateX: 120,
            height: 330,
            easing: "easeInOutQuad",
            delay: 200,
        });
        anime({
            targets: '.base3',
            translateY: -280,
            translateX: 320,
            height: 50,
            width: 10
        })
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
.ContenedorPersonaje {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: red;
    width: 60%;
    margin-left: 20%;
}
.personaje {
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
}

.base2,
.base3,
.base4 {
    background-color: red;
}
</style>
