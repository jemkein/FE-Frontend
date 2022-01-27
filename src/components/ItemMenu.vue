<template>
<div>
  <v-app id="item-menu">
    <v-row justify="center">
<!--      Used to blur the Background and open a new "Modal"-->
      <v-dialog
        v-model="dialog"
        width="500"
      >
<!--        Used as wrapper-->
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ $t('lightsActivated') }} <v-icon color="primary">mdi-lightbulb</v-icon>
          </v-card-title>

          <v-card-text>
            <v-row class="mt-3">
<!--              Currently just a dummy picture, later from web/none/self taken-->
              <v-img
                :src="require('@/assets/dummyPics/m5.jpg')"
                class="my-3"
                contain
                height="200"
              />
              <h2>
                {{getItem.name[getLang]}}
              </h2>
            </v-row>
            <v-row>
              <h3>
                {{getItem.description[getLang]}}
              </h3>
            </v-row>
            <div class="mt-5" v-if="getItem.countable">
            <v-row>
              Anzahl : {{getItem.quantity}}
            </v-row>
            <v-row class="mt-5">
<!--              Currently Slider, could change depending on feedback from Stakeholder  -->
              <v-slider
                v-model="numberValue"
                track-color="grey"
                always-dirty
                min="1"
                max="100"
              >
              <!--         Decrease count      -->
                <template v-slot:prepend>
                  <v-icon
                    @click="decrement"
                  >
                    mdi-minus
                  </v-icon>
                </template>
          <!--     Increase count         -->
                <template v-slot:append>
                  <v-icon
                    @click="increment"
                  >
                    mdi-plus
                  </v-icon>
                </template>
              </v-slider>
            </v-row>
            <v-row justify="end">
              <v-col
                cols="2"
                offset-md="0"
                class="justify-end"
              >
                <!--     Put Items in          -->
                <v-btn fab
                       @click="updateItem(false)">
                  <v-icon>mdi-arrow-up-bold</v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="4"
              >
<!--                Displays own "basket"-count   -->
                <v-text-field
                  :label=" $t('count')"
                  outlined
                  v-model="numberValue"
                  type="number"
                  placeholder="1"
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
              >
                <!--         Take Items out      -->
                <v-btn
                fab
                @click="updateItem(true)">
                  <v-icon>mdi-arrow-down-bold</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
<!--            close Dialog and end search-->
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              {{ $t('finished') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</div>
</template>

<script lang="ts">

import { Item, Label } from '@/types/index.ts'
import itemDataService from '@/services/itemDataService.ts'
import Vue from 'vue'
import lightDataService from '@/services/lightDataService'
export default Vue.extend({
  name: 'ItemMenu',
  data: () => ({
    numberValue: 1,
    overlay: false,
    zIndex: 0,
    dialog: false
  }),
  methods: {
    // Used for debugging
    openItem (item: Item) {
      console.log('HERE')
      console.log(item)
    },
    // Increments basket-Count
    increment () {
      this.numberValue = this.numberValue + 1
    },
    // decrement basket-Count
    decrement () {
      this.numberValue = this.numberValue - 1
    },
    // updateItem + TODO update DB
    updateItem (take:boolean) {
      // ToDo Throw Error if Number is greater than
      if (take) {
        const newCount = this.$store.state.selectedItem.quantity - this.numberValue
        if (newCount < 0) {
          console.log('Error')
        }
        this.$store.state.selectedItem.quantity = newCount
      } else {
        this.$store.state.selectedItem.quantity = this.$store.state.selectedItem.quantity + this.numberValue
      }
      itemDataService.findById(this.getItem.id)
    }
  },
  computed: { // Automatically gets new Item after pushed in Vuex
    getLang () {
      return this.$i18n.locale
    },
    getItem () : Item {
      // ToDo VuexTypeScriptFiles #14
      return this.$store.state.selectedItem
    }
  },
  watch: {
    dialog () {
      console.log(this.dialog)
      if (this.dialog === false) {
        lightDataService.turnOff(this.getItem.id).then(response => {
          console.log(response)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    // Checks if getItem was triggered (Select Option was triggered in Grid)
    getItem (newItem: Item) {
      console.log(newItem)
      // Opens Overlay
      this.dialog = true
      // StartRequestNow
      // lightDataService.turnOnAttributes(newItem.id, '#FFFFFF', 25).then(value => {
      //   console.log(value.data)
      // })
    }
  },
  beforeDestroy () {
    console.log('BEFORE')
  },
  destroyed () {
    lightDataService.turnOff(this.getItem._id)
  }
})
</script>

<style scoped>

</style>

<i18n>
{
  "en": {
    "lightsActivated": "Lights activated!!",
    "finished": "FINISHED",
    "count": "Count:"
  },
  "de": {
    "lightsActivated": "Lichter aktiviert! ",
    "finished": "Fertig",
    "count": "Anzahl:"
  }
}
</i18n>
