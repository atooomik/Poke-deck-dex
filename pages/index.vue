<template>
  <div class="max-w-xl w-full h-full mx-auto p-4">
    <div
      id="welcome"
      class="welcome my-20 p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
      :class="{'mb-10' : userReady, 'mt-10' : userReady}"
    >
      <p class="text-center text-ui-white">Bienvenido a la pokedex de Kanto</p>
    </div>
    <transition name="fade">
      <div v-if="areReading" class="relative">
        <div class="h-32 overflow-hidden">
          <div class="steps-one p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto">
            <p
              class="text-center text-ui-white"
            >Aqui puedes consultar los stats de tus pokemon favoritos</p>
          </div>
          <div class="steps-two p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto">
            <p
              class="text-center text-ui-white"
            >Ingresa el nombre del pokemon y haz click en su sprite para consultar sus detalles.</p>
          </div>
        </div>
        <button
          class="delay-enter absolute right-0 top-0 left-0 mx-auto -mt-16 text-ui-white z-10 bg-ui-noir rounded-lg px-4 py-2"
          @click="closeInstructions"
        >Comenzar</button>
      </div>
    </transition>

    <transition name="entrance">
      <div v-if="userReady">
        <div
          class="flex flex-col items-center my-10 p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
        >
          <p class="text-center text-ui-white">¿Qué Pokémon quieres consultar el dia de hoy?</p>
          <input class="my-4 mx-auto rounded-lg" type="text" />
        </div>
        <board-poke-list />
      </div>
    </transition>
  </div>
</template>

<script>
import BoardPokeList from '../components/BoardPokeList.vue'
export default {
  data() {
    return {
      areReading: true,
      userReady: false,
    }
  },
  components: {
    BoardPokeList,
  },
  methods: {
    closeInstructions() {
      this.areReading = false
      this.userReady = true
      console.log(this.areReading)
    },
  },
}
</script>

<style lang="scss" scoped>
#welcome {
  transition: all 1s ease-in-out;
}
</style>

