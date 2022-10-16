<template>
    <div class="ContenedorPersonaje">
        <div class="personaje"></div>
    </div>
</template>

<script>
export default {
    name: 'JuegoAhorcado',
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