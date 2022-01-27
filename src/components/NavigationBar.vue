<template>
  <v-app-bar
    app
    color="secondary"
    dark
  >
    <!--Adding a logo-->
    <NavigationBarLogo/>
    <!--Spacer seperates left and right side-->
    <v-spacer></v-spacer>
    <v-img :src="imageSrc" @click="changeLocale" alt="change" max-width="20px"></v-img>
    <!-- change Locale button on big screen -->
    <v-btn class="hidden-sm-and-down" icon @click="changeLocale">
      <v-icon>mdi-web</v-icon>
    </v-btn>
    <!-- dark mode button on big screen -->
    <v-btn class="hidden-sm-and-down" icon @click="toggle_dark_mode">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <!-- settings button on big screen -->
    <v-btn icon class="hidden-sm-and-down" to="Settings">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn @click="logout()">
      Logout
    </v-btn>
    <!-- dropdown hamburger on small screen -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
      <v-app-bar-nav-icon class="hidden-md-and-up" v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item>
          <!-- change Locale button on small screen -->
          <v-btn icon @click="changeLocale">
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <!-- dark mode button on small screen -->
          <v-btn icon @click="toggle_dark_mode">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        </v-list-item>
        <v-list-item>
          <!-- settings button on small screen -->
          <v-btn icon to="Settings">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <!-- settings button on smallscreen -->
          <v-btn @click="logout()">
            Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import NavigationBarLogo from '@/components/NavigationBarLogo'

import authDataService from '@/services/authDataService'

export default {
  name: 'NavigationBar',
  components: { NavigationBarLogo },
  computed: {
    // Returns the path to the actual language flag
    imageSrc () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return require('../assets/' + this.$root.$i18n.locale + '.png')
    }
  },
  methods: {
    logout () {
      authDataService.logout().then(result => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }).catch(result => {
        console.error(result)
        this.$store.dispatch('logout')
        this.$router.push('/login')
        localStorage.removeItem('user')
      })
    },
    // Toggles the vuetify dark_mode Variable to the opposite and stores the value in a local storage
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme',
        this.$vuetify.theme.dark.toString())
    },
    // Reads the global locale setting and switches it to another option
    changeLocale () {
      if (this.$root.$i18n.locale === 'en') {
        this.$root.$i18n.locale = 'de'
        this.other_lang_source = this.lang_source[1]
      } else {
        this.$root.$i18n.locale = 'en'
        this.other_lang_source = this.lang_source[0]
      }
    }
  },
  mounted () {
    // Checks if there is a dark mode preference in browser or system
    const theme = localStorage.getItem('dark_theme')
    if (theme) {
      // if there is a theme variable in the local storage, change the
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    } else if (
      // check if user has a system preference and use it
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.$vuetify.theme.dark = true
      localStorage.setItem(
        'dark_theme',
        this.$vuetify.theme.dark.toString()
      )
    }
  }
}
</script>

<i18n>
{}
</i18n>
