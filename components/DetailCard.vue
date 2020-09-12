<template>
  <div>
    <div class="overlay">
      <button @click="closeDetail">
        <fa-icon :icon="['fas', 'times-circle',]" />
      </button>
      <div :class="`detail-card bg-types-${mainType}`">
        <div v-if="pokemon" class="w-full">
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
        </div>
      </div>
    </div>
    <!--<span v-else>
        <fa-icon class="fa-spin" :icon="['fad', 'spinner',]" />
    </span>-->
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
    }
  },
  methods: {
    fetchData() {
      fetch(this.pokemonUrl)
        .then((resp) => {
          if (resp.status === 200) return resp.json()
        })
        .then((data) => {
          this.pokemon = data
          this.mainType = data.types[0].type.name
          this.sprite = data.sprites['front_default']
          this.show = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeDetail() {
      this.$emit('closeDetail')
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
