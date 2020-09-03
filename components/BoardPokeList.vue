<template>
  <div class="card grid grid-cols-2 lg:grid-cols-8 gap-4 text-center">
    <div
      class="bg-ui-noir rounded-lg"
      v-for="(poke,index) in pokemons"
      :key="index"
      @click="setPokemonUrl(poke.url)"
    >
      <img :src="imageUrl + poke.id + '.png'" width="96" height="96" :alt="(poke.name + ' sprite')" />
      {{poke.name}}
    </div>

    <detail-card
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
    />

    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <fa-icon class="fa-spin" :icon="['fad', 'spinner',]" />
    </div>
  </div>
</template>

<script>
import DetailCard from './DetailCard.vue'

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
      showDetail: false,
    }
  },
  components: {
    DetailCard,
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
      this.pokemonUrl = url
      this.showDetail = true
      console.log(this.showDetail, this.pokemonUrl)
    },
    closeDetail() {
      this.pokemonUrl = ''
      this.showDetail = false
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