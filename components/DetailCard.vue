<template>
  <div class="detail">
    <div v-if="show" class="detail-view">
      <div v-if="pokemon">
        <img
          :src="imageUrl + pokemon.id + '.png'"
          width="96"
          height="96"
          :alt="(pokemon.name + ' sprite')"
        />
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
          this.show = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.fetchData()
  },
}
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  padding: 90px 10px 10px;
  flex-direction: column;
  background-color: rgba($color: #000000, $alpha: 0.7);
}

.detail-view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 510px;
  padding: 50px 0 0;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
}
</style>
