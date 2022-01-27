import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ColorService from '@/services/colorService'

Vue.use(Vuetify)

const primaryColor = ColorService.getColorHexPrimary()
// Configuring custom colors for own Theme
export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: ColorService.getColorHexPrimary(),
        secondary: ColorService.getColorHexSecondary(),
        accent: ColorService.getColorHexAccent(),
        error: ColorService.getColorHexError()
      }
    }
  }
})
