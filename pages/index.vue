<template>
  <div class="w-full h-full p-4">
    <div class="mb-4 bg-ui-semiGray lg:max-w-sm lg:mx-auto">
      <p>Bienvenido a la pokedex de Kanto</p>
      <p>Aqui puedes consultar la información más relevante de tus Pokemon favoritos</p>
    </div>
    <div class="bg-ui-semiGray lg:max-w-sm lg:mx-auto">
      <p>buscas algun pokemon en particular?</p>
      <input type="text" />
    </div>
    <board-poke-list />
  </div>
</template>

<script>
import BoardPokeList from '../components/BoardPokeList.vue'
export default {
  components: {
    BoardPokeList,
  },
}
</script>

