<template>
  <div>
<ItemToShelf></ItemToShelf>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloI18n from '@/components/HelloI18n.vue'
import Grid from '../components/Grid.vue'
import ItemToShelf from '@/components/ItemToShelf.vue'
export default Vue.extend({
  name: 'Home',

  components: {
    // HelloI18n,
    // Grid,
    ItemToShelf
  }
})
</script>
