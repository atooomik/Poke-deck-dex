<template>
  <div>
    <div v-if="show" class="overlay">
      <button @click="closeDetail">
        <fa-icon :icon="['fas', 'times-circle',]" />
      </button>
      <div :class="`detail-card bg-types-${mainType}`">
        <div v-if="pokemon">
          <div class="detail-card__main-info">
            <div class="detail-card__sprite">
              <img :src="sprite" width="96" height="96" :alt="(pokemon.name + ' sprite')" />
            </div>
            <p class="detail-card__id">{{pokemon.id}}</p>
            <p class="detail-card__name">{{pokemon.name}}</p>
            <p
              v-for="(value, index) in pokemon.types"
              :key="'value'+index"
              class="detail-card__types"
            >{{value.type.name}}</p>
            <p
              v-for="(value, index) in pokemon.abilities"
              :key="'value'+index"
              class="detail-card__ability"
            >{{value.ability.name}}</p>
          </div>

          <div>
            <p>{{'alola'}}</p>
          </div>
        </div>
      </div>
    </div>
    <span v-else>
      <fa-icon class="fa-spin" :icon="['fad', 'spinner',]" />
    </span>
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
      show: false,
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
