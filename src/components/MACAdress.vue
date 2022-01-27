<template>
<v-card>
  <!-- @template scooped Object with the properties on and attrs -->
<template v-slot:activator="{ on, attrs }">
  <v-btn
    color="secondary"
    label
    small
    v-bind="attrs"
    v-on="on"
  >
    <v-icon>
      mdi-plus
    </v-icon>
  </v-btn>
</template>
<v-card>
  <v-card-title class="justify-center">
    {{ $t('new') }} {{ $t('MAC-Adress') }}
  </v-card-title>
  <v-row><v-col>
    <v-spacer></v-spacer>
  </v-col>
    <v-col>
      <!-- passes the input to data MACS -->
      <v-text-field style="margin-right: 12px;margin-left: 12px;align-self: center" :label="$t('enter')" v-model="MACS"></v-text-field>
    </v-col>
    <v-col><v-spacer></v-spacer></v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-spacer>
      </v-spacer>
    </v-col>
    <v-col>
      <v-card-actions>
        <!-- triggers the function createMac and passes the value to the DataService to create a Mac-Address-->
        <v-btn
          color="primary"
          text
          outlined
          @click="createMac"
        >
          {{$t('addnew' )}}
        </v-btn>
      </v-card-actions>
    </v-col>
    <v-col><v-spacer></v-spacer></v-col>
  </v-row>
</v-card>
</v-card>
</template>

<script lang="ts">
import { Mac } from '../types'
import ShelfDirectDataService from '../services/shelfDirectDataService'

export default {
  name: 'MACAdress',
  data: () => ({
    MACS: ''
  }),
  methods: {
    /**
     * creates a macAddress from the input field
     */
    createMac () {
      const mac: Mac = {
        mac: this.MACS
      }
      ShelfDirectDataService.getMacAdresses()
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
      console.log(mac)
      this.MACS = ''
    }
  }
}
</script>
<i18n>
{
  "en": {
    "MAC-Adress": "MAC-Adress",
    "add": "add",
    "new": "new",
    "addnew": "add new MAC-Adress",
    "enter": "Enter MAC-Adress"
  },
  "de": {
    "MAC-Adress": "MAC-Adresse",
    "add": "hinzufügen",
    "new": "neue",
    "addnew": "neue MAC-Adresse hinzufügen",
    "enter": "MAC-Adresseingabe"
  }
}
</i18n>

<style scoped>

</style>
