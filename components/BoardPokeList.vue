<template>
<div>
<div>
            <div
              class="flex flex-col items-center mb-10 p-4 rounded-lg text-ui-white bg-ui-noir lg:max-w-sm lg:mx-auto"
            >
              <p class="text-center">
                ¿Qué Pokémon quieres consultar el dia de hoy?
              </p>
              <input class="my-4 mx-auto rounded-lg" type="text" />
              <p class="mb-4">También puedes consultar por Regiones:</p>
            <div class="flex">
              <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(2)">Kanto</button>
              <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(3)">Johto</button>
              <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(4)">Hoenn</button>
              <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(5)">Sinooh</button>
              <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(8)">Unova</button>
              <!-- <button class="bg-ui-noir rounded-lg px-4 py-2" @click="defineRegion(12)">Kalos</button> -->
            </div>
            </div>
          </div>
  <div
    class="h-80 overflow-y-scroll card grid grid-cols-3 lg:grid-cols-4 gap-4 text-center"
  >
    <div
      class="w-full bg-ui-noir rounded-lg"
      v-for="(poke, index) in pokemons"
      :key="index"
      @click="setPokemonUrl(poke.entry_number)"
    >
      <img
        class="mx-auto"
        :src="imageUrl + poke.entry_number + '.png'"
        width="48"
        height="48"
        :alt="poke.name + ' sprite'"
      />
      <p v-text="poke.pokemon_species.name" class="pokemon-name"></p>
    </div>

    
  </div>
</div>
</template>

<script>
export default {
  name: 'BoardPokeList',
  data: () => {
    return {
      apiUrl: `https://pokeapi.co/api/v2/pokedex/`,
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      pokemons: [],
      region: '2',
      pokemonUrl: '',
    }
  },
  methods: {
    fetchData() {
      const regionToFetch = this.apiUrl + this.region
      fetch(regionToFetch)
        .then((resp) => {
          if (resp.status === 200) return resp.json()
        })
        .then((data) => {     
          console.log(data.pokemon_entries)     
          this.pokemons = data.pokemon_entries
          this.pokemons.forEach((index) => {
            index.entry_number = index.pokemon_species.url.split('/').splice(6, 1).toString()
          })
          return this.pokemons
        })
        .catch((error) => {
          console.log(error)
        })
    },    
    setPokemonUrl(url) {
      this.pokemonUrl = url
      this.$emit('reciveData', this.pokemonUrl)
    },
    defineRegion(region) {
      this.region = region
      this.fetchData()
    }
  },
  created() {    
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
.card {
  justify-items: center;
}

.pokemon-name {
  color: theme('colors.ui.semiGray');
  text-transform: capitalize;
}
</style>
