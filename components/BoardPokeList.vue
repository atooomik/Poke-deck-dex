<template>
  <div
    class="h-80 overflow-y-scroll card grid grid-cols-3 lg:grid-cols-4 gap-4 text-center"
  >
    <div
      class="w-full bg-ui-noir rounded-lg"
      v-for="(poke, index) in pokemons"
      :key="index"
      @click="setPokemonUrl(poke.url)"
    >
      <img
        class="mx-auto"
        :src="imageUrl + poke.id + '.png'"
        width="48"
        height="48"
        :alt="poke.name + ' sprite'"
      />
      <p v-text="poke.name" class="text-ui-semiGray"></p>
    </div>

    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <img
        class="await-data"
        src="../assets/images/pokeball.svg"
        alt="pokebola de espera"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardPokeList',
  data: () => {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      pokemons: [],
      nextUrl: '',
      currentUrl: '',
      pokemonUrl: '',
    }
  },
  methods: {
    fetchData() {
      fetch(this.currentUrl)
        .then((resp) => {
          if (resp.status === 200) return resp.json()
        })
        .then((data) => {
          this.nextUrl = data.next
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url
              .split('/')
              .filter(function (part) {
                return !!part
              })
              .pop()
            this.pokemons.push(pokemon)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next()
          }
        })
      })
      observer.observe(this.$refs.infinitescrolltrigger)
    },
    next() {
      this.currentUrl = this.nextUrl
      this.fetchData()
    },
    setPokemonUrl(url) {
      this.modalStatus = 'not defined'
      console.log(this.modalStatus, this.pokemonUrl)
      this.pokemonUrl = url
      this.modalStatus = 'is defined'
      this.$emit('reciveData', this.pokemonUrl)
      this.$emit('reciveModal', this.modalStatus)
      console.log(this.modalStatus, this.pokemonUrl)
    },
  },
  created() {
    this.currentUrl = this.apiUrl
    this.fetchData()
  },
  mounted() {
    this.scrollTrigger()
  },
}
</script>

<style lang="scss" scoped>
.card {
  justify-items: center;
}
</style>
