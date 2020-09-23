<template>
  <div>
    <div class="overlay">
      <div
        v-if="(this.fetchHasFinish === 'idle')"
        class="relative w-full flex justify-center items-center"
      >
        <img class="await-data" src="../assets/images/pokeball.svg" alt="pokebola de espera" />
      </div>

      <transition name="slowly-opacity">
        <div
          v-if="(this.fetchHasFinish === 'has finished')"
          :class="`detail-card bg-types-${mainType}`"
        >
          <div class="detail-card__main-info">
            <div class="detail-card__sprite">
              <img :src="sprite" width="96" height="96" :alt="(pokemon.name + ' sprite')" />
            </div>
            <div class="detail-card__data">
              <p class="col-span-1">{{pokemon.id}}</p>
              <p class="col-span-1">{{pokemon.name}}</p>
              <div class="grid grid-cols-2 col-span-2">
                <img
                  v-for="(value, index) in pokemon.types"
                  :key="'value'+index"
                  :src="`/images/types/${value.type.name}.png`"
                  class="w-20 mx-auto"
                  alt="pokemon type icon"
                />
              </div>
            </div>
          </div>
          <div class="stats flex w-full">
            <div class="w-1/2 text-left">
              <p v-for="(value, index) in pokemon.stats" :key="'value'+index">{{value.stat.name}}</p>
            </div>
            <div class="w-1/2">
              <p v-for="(value, index) in pokemon.stats" :key="'value'+index">{{value.base_stat}}</p>
            </div>
          </div>
          <button @click="closeDetail">
            <fa-icon class="text-ui-white" :icon="['fas', 'times-circle',]" />
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCard',
  props: {
    pokemonUrl: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      pokemon: {},
      mainType: '',
      sprite: '',
      fetchHasFinish: 'idle',
    }
  },
  methods: {
    fetchData() {
      fetch(this.pokemonUrl)
        .then((resp) => {
          if (resp.status === 200) return resp.json()
          console.log(this.fetchHasFinish)
        })
        .then((data) => {
          this.pokemon = data
          this.mainType = data.types[0].type.name
          this.sprite = data.sprites['front_default']
          console.log(this.fetchHasFinish)
        })
        .then(() => {
          this.fetchHasFinish = 'has finished'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeDetail() {
      this.fetchHasFinish = 'idle'
      this.$emit('closeDetail')
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
