<template>
  <div>
    <template>
      <!--  You can set text with "{{ t('XXX') }}" The Text+Key are set in <i18n> down on the bottom of this Component-->
      <p>{{ $t('hello') }}</p>
      <!--  To Access the current language(Just important for the Language Switcher later on)-->
      <p>{{ $i18n.locale }}</p>
      <!--  Also Works on Buttons and other Elements!-->
      <v-btn
        elevation="2"
        @click="changeLocale"
      >
        {{ $t('change') }}
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloI18n',
  methods: {
    // ExampleMethod to show how Methods work in Vue
    changeLocale () {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'de'
      } else {
        this.$i18n.locale = 'en'
      }
    }
  }
})
</script>

<!--Here all Texts for i18n are set-->
<!--Each Text has a Key + followed by the Text itself-->

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!",
    "change": "Click here to switch back to German"
  },
  "de": {
    "hello": "Das hier ist ein i18n Beispiel! ",
    "change": "Klicke hier um auf Englisch zu wechseln"

  }
}
</i18n>
