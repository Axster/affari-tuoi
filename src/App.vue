<script setup lang="ts">
</script>

<template>
  <div id="app" class="bg">
    <BoxBench />
  </div>
</template>

<style scoped>


.bg::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('./assets/back.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -5; /* Assicurati che lo z-index sia inferiore rispetto al contenuto */
}

.bg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.537); /* Colore con opacità */
    z-index: -3; /* Assicurati che lo z-index sia inferiore rispetto all'immagine di sfondo */
}


</style>
