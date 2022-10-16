<template>
    <div class="ContenedorPersonaje">
        <div class="personaje">
            <span>{{errores}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JuegoAhorcado',
    data() { 
        return {
            errores: 0,
        }
    },
    methods: {
        fallido() {
            this.errores++;
            this.$forceUpdate();
        }
    }
}
</script>

<style scoped>
.ContenedorPersonaje {
    display: flex;
    justify-content: center;
}
    .personaje {
        width: 500px;
        height: 200px;
        background-color: red;
    }
</style>