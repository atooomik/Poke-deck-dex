<template>
  <div class="w-full">
    <div :class="`detail-card bg-types-${pokemonSelected.types[0].type.name}`">
      <div class="detail-card__main-info">
        <div class="detail-card__sprite">
          <img
            :src="pokemonSelected.sprites['front_default']"
            width="96"
            height="96"
          />
        </div>

        <div class="detail-card__data">
          <div class="flex">
            <p class="mr-2">Entrada en la pokedex nacional:</p>
            <p class="col-span-1">{{ pokemonSelected.id }}</p>
          </div>
          <p class="col-span-1">{{ pokemonSelected.name }}</p>
          <div class="grid grid-cols-2 col-span-2">
            <img
              v-for="(value, index) in pokemonSelected.types"
              :key="'value' + index"
              :src="`/images/types/${value.type.name}.png`"
              class="w-20 mx-auto"
              alt="pokemon type icon"
            />
          </div>
        </div>
      </div>
      <div class="stats flex w-full">
        <div class="w-1/2 text-left">
          <p v-for="(value, index) in pokemonSelected.stats" :key="index">
            {{ value.stat.name }}
          </p>
        </div>
        <div class="w-1/2">
          <p
            v-for="(value, index) in pokemonSelected.stats"
            :key="'value' + index"
          >
            {{ value.base_stat }}
          </p>
        </div>
      </div>
      <button @click="closeDetail">
        <fa-icon class="text-ui-white" :icon="['fas', 'times-circle']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCard',
  props: {
    pokemonSelected: {
      type: Object,
      default: {},
    },
  },
  methods: {
    closeDetail() {
      this.$emit('closeDetail')
    },
  },
}
</script>
