<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          block
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card >
        <v-card-title>
          <span class="text-h5">Create New Label</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-for="(chosen,index) in testLang" :key="index">
              <v-col cols="12" md="6">
                <v-text-field
                label="Language"
                outlined
                disabled
                :value="chosen.lang"
              ></v-text-field></v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  refs="form"
                  v-model="labelList[index]"
                  label="Label"
                  :rules="[labelList[index]!== '' || 'Required']"
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-color-picker
                  v-model="pickedColor"
                  dot-size="25"
                  mode="hexa"
                  show-swatches
                  swatches-max-height="100">
                </v-color-picker>
              </v-col >
              <v-col cols="12" md="6">
                <p>Color:</p>
                <p>{{pickedColor}}</p>
                <p>Example:</p>
                <v-chip
                  v-for="chip in chipItem" :key="chip"
                  v-model="chips"
                  text-color="white"
                  close
                  :color=pickedColor
                >{{chip}} </v-chip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="gray"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="green"
            text
            @click="sendLabel"
          >
            Save
          </v-btn>
          {{this.pickedColor}}
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">

import LabelDataService from '@/services/labelDataService'
import languageDataService from '@/services/languageDataService'
import { Item } from '@/types'
import Vue from 'vue'
export default Vue.extend({
  name: 'createLabel',
  data () {
    return {
      dialog: false,
      pickedColor: '#FF00FF',
      value: '',
      chips: '',
      langInput: [],
      labelList: [],
      languages: [],
      testLang: [
        {
          lang: 'de',
          id: '1525211cas'
        },
        {
          lang: 'en',
          id: '15252fas11cas'
        }
      ],
      list: [] as any
    }
  },
  computed: {
    chipItem: {
      get () {
        return this.labelList
      }
    }
  },
  mounted () {
    languageDataService.getAll()
      .then((result) => {
        this.languages = result.data
      })
    /* //if server is off
    this.testLang.forEach(value => {
      this.list.push(value.lang)
    })
      }) */
  },
  methods: {
    sendLabel () {
      // var langList = []
      // var label = []
      // this.testLang.forEach((value) => {
      //   langList.push(value.lang)
      // })
      // for (let i = 0; i < this.labelList.length; i++) {
      //   label.push({ language: langList[i], value: this.labelList[i] })
      // }
      // console.log(label)

      var commonKeys = []
      this.languages.forEach((value) => {
        commonKeys.push(value.lang)
      })
      /**
       * Converts All Names to a Map with name: {lang: nameInLang}
       */
      const zipArrays = (keysArray, valuesArray) => Object.fromEntries(keysArray.map((value, index) => [value, valuesArray[index]]))

      const name = zipArrays(commonKeys, this.labelList)
      console.log(name)
      console.log('ALLNAMES')
      /**
       * Converts All Descriptions to a Map with description: {lang: descriptionInLang}
       */
      /**
       * Convert Labels to Ids
       */

      const label: any = {
        name,
        colour: '#FF00FF'
      }
      console.log(label)
      LabelDataService.create(label).then(response => {
        console.log(response)
      }).catch(e => {
        // Falls Error, schreibe ihn in die Konsole
        console.log(e)
      })
      /* LabelDataService.create(this.labelsName).then(response => {
        console.log(response)
      }).catch(e => {
        // Falls Error, schreibe ihn in die Konsole
        console.log(e)
      }) */
      console.log('geschafft')
      this.labelList = []
    }
  }
})
</script>

<style scoped>

</style>
