<template>
  <v-app>
    <NavigationBar/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import settingsService from '@/services/settingsService'
export default Vue.extend({
  name: 'App',
  components: {
    Footer,
    NavigationBar
  },
  data: () => ({
    //
  }),
  created () {
    /** Custom theme gets updated after vue is Created (Vuetify initiated) before mounted to ensure minimal TimeDelay */
    this.setTheme()
  },
  methods: {
    setTheme () {
      /** SetsTheme According to Color from DB via settingsService  */
      settingsService.getSettings().then(value => {
        if (value.data.colors[0] === null) {
          value.data.colors[0] = '#80ba24' // primary
        }
        this.$vuetify.theme.themes.light.primary = value.data.colors[0]
        if (value.data.colors[1] === null) {
          value.data.colors[1] = '#4a5c66' // secondary
        }
        this.$vuetify.theme.themes.light.secondary = value.data.colors[1]
        if (value.data.colors[2] === null) {
          value.data.colors[2] = '#8c9eff' // accent
        }
        this.$vuetify.theme.themes.light.accent = value.data.colors[2]
        if (value.data.colors[3] === null) {
          value.data.colors[3] = '#b71c1c' // error
        }
        this.$vuetify.theme.themes.light.error = value.data.colors[3]
      })
    }
  }
})
</script>
