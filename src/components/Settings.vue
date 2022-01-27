<template>
    <v-container>
      <v-row justify="center">
        <h1 style="margin-bottom: 10px">{{ $t('headline') }}</h1>
        <v-expansion-panels popout>
          <v-expansion-panel>
<!--            Panel for the search color by a user-->
            <v-expansion-panel-header>{{ $t('color') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col offset-lg="2" class="col-lg-3">
<!--                  Official v-color-picker, color used with v-model binding-->
                  <v-color-picker
                    elevation="9"
                    dot-size="8"
                    hide-mode-switch
                    v-model="colorSearchModel"
                    mode="hex"
                    show-swatches
                    swatches-max-height="250"
                  ></v-color-picker>
                </v-col>
                <v-col class="col-lg-3">
                  <v-container>
<!--                    Button to save color, changes color dynamically with v-model picker variable-->
                    <v-btn class="mt-5" :color=colorSearchModel block elevation="9">{{ $t('searchcolor') }}</v-btn>
<!--                    Button to restore default search color-->
                    <v-btn class="mt-5" block elevation="9">{{ $t('standard') }}</v-btn>
                  </v-container>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('language') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
<!--                Radio buttons to select standard language and a button to save this configuration-->
                <v-col offset-lg="2" class="col-lg-3">
                  <v-radio-group v-model="selectedLanguage" id="radios">
                    <v-radio v-for="(lang,index) in this.allLanguages" :key="index" :label="lang.lang"></v-radio>
                  </v-radio-group>
                  <v-btn elevation="9" style="margin-top: 20px">{{ $t('save') }}</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!--          Admin Panels disabled for basic users-->
        </v-expansion-panels>
      </v-row>
      <v-row class="mt-5" v-if="isAdmin" justify="center">
          <h1 style="margin-bottom: 10px">{{ $t('adminHeadline') }}</h1>
          <v-expansion-panels  popout>
            <v-expansion-panel>
              <v-expansion-panel-header>Theme {{ $t('themecolor') }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col offset-lg="2" class="col-lg-3">
                    <!--                  Official v-color-picker, color used with v-model binding-->
                    <v-color-picker
                      id="adminColorPicker"
                      elevation="9"
                      dot-size="8"
                      hide-mode-switch
                      mode="rgba"
                      v-model="color"
                      show-swatches
                      swatches-max-height="250"
                    ></v-color-picker>
                  </v-col>
                  <v-col class="col-lg-3">
                    <v-container>
                      <!--                    Different buttons to save the picked color to a specific setting-->
                      <v-btn class="mt-5" color ="primary" @click="set_primary_color; save_settings" block elevation="9">{{ $t('primary') }}</v-btn>
                      <v-btn class="mt-5" color ="secondary" @click="set_secondary_color; save_settings" block elevation="9">{{ $t('secondary') }}</v-btn>
                      <v-btn class="mt-5" color ="accent" @click="set_accent_color; save_settings" block elevation="9">{{ $t('accent') }}</v-btn>
                      <v-btn class="mt-5" color ="error" @click="set_error_color; save_settings" block elevation="9">{{ $t('error') }}</v-btn>
                      <v-btn class="mt-5" @click="set_default_color" block elevation="9">{{ $t('standard') }}</v-btn>
                      <v-btn class="mt-5" @click="set_manufacturer_color" block elevation="9">{{ $t('manufacturer') }}</v-btn>
                    </v-container>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Logo</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col offset-lg="2" class="col-lg-3">
                    <v-container>
                      <!--                Image Uploader-->
                      <v-file-input
                        :label="$t('imageUpload')"
                        accept="image/*"
                      ></v-file-input>
                      <!--                Upload Button-->
                      <v-btn color="primary">Upload</v-btn>
                    </v-container>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-row>
<!--      Temporary Admin-mode toggle Button for presentation-->
    </v-container>
</template>

<script lang="ts">
// Color-service Connection for future data-bank connection
import ColorService from '@/services/colorService'
import languageDataService from '@/services/languageDataService'
import SettingsService from '@/services/settingsService'
import Vue from 'vue'
export default Vue.extend({
  name: 'UserSettings',
  data () {
    return {
      // Variable for the admin-view
      adminEnabled: false,
      // Smart variable for the standard locale definition
      selectedLanguage: this.$root.$i18n.locale,
      // Starting colors for the color picker
      color: '#FF00FFFF',
      colorSearchModel: '#FF00FFFF',
      id: '',
      primColor: '',
      secColor: '',
      accColor: '',
      errColor: '',
      defPrimColor: '',
      defSecColor: '',
      defAccColor: '',
      defErrColor: '',
      allLanguages: [],
      currentSettings: null
    }
  },
  computed: {
    isAdmin () {
      if (this.$store.state.auth.role === 'admin') return true
      else return false
    }
  },
  methods: {
    fetchInfos () {
      console.log('fetchInfos')
      SettingsService.getSettings().then((result) => {
        this.currentSettings = result
        console.log(this.currentSettings)
      }).then((result) => {
        languageDataService.getAll()
          .then((result) => {
            this.allLanguages = result.data
            const index = this.allLanguages.findIndex(key => key._id === this.currentSettings.lanugage)
            if (index === -1) this.selectedLanguage = this.allLanguages[index]
          }).catch(err => {
            console.error(err)
            throw err
          })
      }).catch(err => {
        console.error(err)
        throw err
      })
    },
    // AdminToggle for presentation
    toggle_admin_mode: function () {
      this.adminEnabled = !this.adminEnabled
    },
    /**
     * Saves Settings in Database
     */
    saveSettings () {
      const Settings = {
        language: this.selectedLanguage._id,
        colors: [
          this.$vuetify.theme.themes.light.primary,
          this.$vuetify.theme.themes.light.secondary,
          this.$vuetify.theme.themes.light.accent,
          this.$vuetify.theme.themes.light.error
        ]
      }
      SettingsService.setSettings(Settings)
    },
    // Color setters for vuex store and page variables
    set_primary_color: function () {
      this.saveSettings()
      this.$vuetify.theme.themes.light.primary = this.color
      this.primColor = this.color
    },
    set_secondary_color: function () {
      this.saveSettings()
      this.$vuetify.theme.themes.light.secondary = this.color
      this.secColor = this.color
    },
    set_accent_color: function () {
      this.saveSettings()
      this.$vuetify.theme.themes.light.accent = this.color
      this.accColor = this.color
    },
    set_error_color: function () {
      this.saveSettings()
      this.$vuetify.theme.themes.light.error = this.color
      this.errColor = this.color
    },
    // Sets all colors in vuex store and on page, back to the colors at sideload
    set_default_color: function () {
      this.$vuetify.theme.themes.light.primary = this.primColor = this.defPrimColor
      this.$vuetify.theme.themes.light.secondary = this.secColor = this.defSecColor
      this.$vuetify.theme.themes.light.accent = this.accColor = this.defAccColor
      this.$vuetify.theme.themes.light.error = this.errColor = this.defErrColor
      this.saveSettings()
    },
    // Sets the color scheme back to THM color scheme Change this for Customization.
    set_manufacturer_color: function () {
      this.$vuetify.theme.themes.light.primary = '#80ba24'
      this.$vuetify.theme.themes.light.secondary = '#4a5c66'
      this.$vuetify.theme.themes.light.accent = '#8c9eff'
      this.$vuetify.theme.themes.light.error = '#b71c1c'
      this.saveSettings()
    }
  },
  // On settings-page load, page variables are set to the vuex theme colors
  mounted () {
    this.primColor = this.defPrimColor = this.$vuetify.theme.themes.light.primary
    this.secColor = this.defSecColor = this.$vuetify.theme.themes.light.secondary
    this.accColor = this.defAccColor = this.$vuetify.theme.themes.light.accent
    this.errColor = this.defErrColor = this.$vuetify.theme.themes.light.error
    this.fetchInfos()
    this.saveSettings()
  }
})
</script>

<style scoped>

</style>
<i18n>
{
  "en": {
    "headline": "Settings",
    "adminHeadline": "Admin-Settings",
    "color": "Search Color",
    "language": "Select Standard Language",
    "themecolor": "Color",
    "radio1": "English",
    "radio2": "German",
    "save": "Save",
    "standard": "Restore Default",
    "primary": "Save as primary color",
    "secondary": "Save as secondary color",
    "accent": "Save as accent color",
    "error": "Save as error color",
    "searchcolor": "Save new Searchcolor",
    "imageUpload": "Select new Image...",
    "manufacturer": "Manufacturer Colors"
  },
  "de": {
    "adminHeadline": "Admin-Einstellungen",
    "headline": "Einstellungen",
    "color": "Suchfarbe",
    "language": "Standard Sprachauswahl",
    "themecolor": "Farbe",
    "radio1": "Englisch",
    "radio2": "Deutsch",
    "save": "Sichern",
    "standard": "Standard Wiederherstellen",
    "primary": "Als Primärfarbe speichern",
    "secondary": "Als Sekundärfarbe speichern",
    "accent": "Als Akzentfarbe speichern",
    "error": "Als Fehlerfarbe speichern",
    "searchcolor": "Neue Suchfarbe speichern",
    "imageUpload": "Neues Logo auswählen...",
    "manufacturer": "Werksfarben"
  }
}
</i18n>
