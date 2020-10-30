<template>
  <div class="max-w-xl w-full h-full mx-auto p-4 lg:max-w-5xl">
    <div class="lg:flex">
      <div class="w-full lg:w-1/2">
        <div
          id="welcome"
          class="welcome my-20 p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
          :class="{
            'mb-10': userReady === 'is ready',
            'mt-10': userReady === 'is ready',
          }"
        >
          <p class="text-center text-ui-white">
            Bienvenido a la pokedex de Kanto
          </p>
        </div>
        <!--Instrucciones-->
        <transition name="fade">
          <div v-if="instructionsState === 'idle'" class="relative">
            <div class="h-32 overflow-hidden">
              <div
                class="steps-one p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
              >
                <p class="text-center text-ui-white">
                  Aqui puedes consultar los stats de tus pokemon favoritos
                </p>
              </div>
              <div
                class="steps-two p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
              >
                <p class="text-center text-ui-white">
                  Ingresa el nombre del pokemon y haz click en su sprite para
                  consultar sus detalles.
                </p>
              </div>
            </div>
            <button
              class="delay-enter absolute right-0 top-0 left-0 mx-auto -mt-16 text-ui-white z-10 bg-ui-noir rounded-lg px-4 py-2"
              @click="closeInstructions"
            >
              Comenzar
            </button>
          </div>
        </transition>
        <!--Instrucciones-->
        <transition name="entrance">
          <div v-if="userReady === 'is ready'">
            <div
              class="flex flex-col items-center my-10 p-4 rounded-lg bg-ui-noir lg:max-w-sm lg:mx-auto"
            >
              <p class="text-center text-ui-white">
                ¿Qué Pokémon quieres consultar el dia de hoy?
              </p>
              <input class="my-4 mx-auto rounded-lg" type="text" />
            </div>
          </div>
        </transition>
      </div>
      <!--Busqueda-->
      <div
        v-if="deviceScreen === 'is mobile' && modalStatus === 'is defined'"
        class="overlay"
      >
        <div v-if="fetchStatus === 'has finish'" class="w-full">
          <detail-card
            :pokemonSelected="pokemonFetched"
            @closeDetail="closeDetail"
          />
        </div>
        <div v-else class="relative w-full flex justify-center items-center">
          <img
            class="await-data"
            src="../assets/images/pokeball.svg"
            alt="pokebola de espera"
          />
        </div>
      </div>
      <div
        v-else-if="deviceScreen === 'is desktop' && userReady === 'is ready'"
        class="w-1/2 p-4"
      >
        <div v-if="fetchStatus === 'has finish'" class="w-full">
          <detail-card
            v-if="modalStatus === 'is defined'"
            :pokemonSelected="pokemonFetched"
            @closeDetail="closeDetail"
          />
        </div>
        <div v-else class="relative w-full flex justify-center items-center">
          <img
            class="await-data"
            src="../assets/images/pokeball.svg"
            alt="pokebola de espera"
          />
        </div>
      </div>
    </div>

    <transition name="entrance">
      <div v-if="userReady === 'is ready'">
        <board-poke-list @reciveData="pokeFetch" />
      </div>
    </transition>
  </div>
</template>

<script>
import BoardPokeList from '../components/BoardPokeList.vue'
import DetailCard from '../components/DetailCard.vue'
export default {
  data() {
    return {
      deviceScreen: 'idle',
      userReady: 'idle',
      instructionsState: 'idle',
      modalStatus: '',
      fetchStatus: 'idle',
      pokemonFetched: {},
    }
  },
  components: {
    BoardPokeList,
    DetailCard,
  },
  methods: {
    //Start request para el detalle de la modal
    pokeFetch(pokemonUrl) {
      this.modalStatus = 'is defined'
      this.fetchStatus = 'is searching'
      fetch(pokemonUrl)
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((data) => {
          this.pokemonFetched = data
        })
        .then(() => {
          this.fetchStatus = 'has finish'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //End request para el detalle de la modal
    mobileScreen() {
      if (window.innerWidth < 1024) {
        this.deviceScreen = 'is mobile'
      } else {
        this.deviceScreen = 'is desktop'
      }
      console.log(this.deviceScreen)
    },
    closeInstructions() {
      this.instructionsState = false
      this.userReady = 'is ready'
      console.log(this.instructionsState)
    },

    closeDetail() {
      this.modalStatus = 'not defined'
    },
  },
  mounted() {
    this.mobileScreen()
    window.addEventListener('resize', this.mobileScreen)
  },
}
</script>

<style lang="scss" scoped>
#welcome {
  transition: all 1s ease-in-out;
}
</style>
