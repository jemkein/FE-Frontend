<template>
  <v-container>
    <div class="item_form">
      <v-form>
        <div>
          <v-row>
            <v-col class="col-3 offset-1">{{$t('Name')}}</v-col>
            <v-col class="col-3 offset-2">{{$t('Description')}}</v-col>
          </v-row>
          <v-row  justify="center" v-for="(chosen,index) in languagesNew" :key="index" >
            <v-col md="8" cols="12" offset-md="2">
              <v-card min-width="100%">
                <v-row class="mt-1" align="center" justify="center">
                  <v-col cols="3" md="2">    <v-text-field
                    label="Language"
                    outlined
                    disabled
                    :value="chosen.lang"
                  ></v-text-field></v-col>
                </v-row>
                <v-col cols="12" md="12" >
                  <v-text-field
                    v-model="itemNames[index]"
                    :label="$t('Name')"
                    filled
                    dense
                    :rules= "[itemNames[index] !== '' || 'Keine leere Zeile' ] "
                  >
                  </v-text-field>

                </v-col>

                <v-col cols="12" md="12" >
                  <v-text-field
                    filled
                    dense
                    v-model="aboutItem[index]"
                    :label="$t('Description')"
                    :rules= "[aboutItem[index] !== '' || 'Keine leere Zeile' ] "
                  >
                  </v-text-field>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row class="col-12 col-lg-8 offset-lg-2">

            <v-row align="center">
              <v-col class="col-2">
                <v-checkbox
                  v-model="countable"
                  :label="$t('Countable')">
                </v-checkbox>
              </v-col>

              <v-col class="mt-5 col-8">
                <v-autocomplete
                  v-model="labels"
                  :items="labelsList"
                  chips
                  :item-text="getCurrentNameString"
                  prepend-icon="mdi-database-search"
                  deletable-chips
                  multiple
                  filled
                  return-object
                  dense
                  :label="$t('search')"
                >
                  <!-- @template Use this slot for the selected Labels inside V-Autocomplete -->
                  <template v-slot:selection="data">
                    <v-chip close @click:close="remove(data.item)" dark :color="data.item.colour"> {{ getName(data.item) }} </v-chip>
                  </template>
                  <!-- @template Use this slot for the expanded List when V-Autocomplete is selected -->
                  <template v-slot:item="{ item, on, attrs }">
                    <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                      <!--          Enables CheckBox usage to select multiple labels-->
                      <v-list-item-action>
                        <v-checkbox :color="item.colour" :input-value="active"> </v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-chip dark :color="item.colour"> {{ getName(item) }} </v-chip>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-autocomplete>

              </v-col>
              <v-col class="col-2">
                <create-label class="plus">
                </create-label>
              </v-col>
            </v-row>
          </v-row>
          <v-row class="col-8 offset-2">
            <v-btn block
                   @click="sendItem">
              {{$t('Save')}}
            </v-btn>
          </v-row>
          <v-row>
          </v-row>
        </div>
        <div>
          <v-snackbar
            v-model="success"
          >
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="green"
                text
                v-bind="attrs"
                @click="success = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
        <div>
          <v-snackbar
            v-model="error"
          >
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="green"
                text
                v-bind="attrs"
                @click="error = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>

        <div>
          <!--          <p >{{itemNames}}</p>-->
        </div>

      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import createLabel from '@/components/createLabel.vue'
import ItemDataService from '@/services/itemDataService'
import { Item, Label } from '@/types'
import labelDataService from '@/services/labelDataService'
import languageDataService from '@/services/languageDataService'
import Vue from 'vue'
import roomsDataService from '@/services/roomsDataService'
export default Vue.extend({
  name: 'Add Item',
  components: { createLabel },
  data () {
    return {
      min: 0,
      max: 500,
      labelsList: [] as Label [],
      shelvesList: [],
      itemNames: [],
      labels: [],
      aboutItem: [],
      success: false,
      error: false,
      snackbar:'',
      text: '',
      countable: false,
      languagesNew: [] as any,
      languages: [{
        lang: 'de',
        id: '1525211cas'
      },
        {
          lang: 'en',
          id: '15252fas11cas'
        }]
    }
  },
  mounted () {
    // const x = {
    //   name: { de: 'A20.86.8', en: 'A20.86,3' },
    //   ipAddress: '192.168.0.1'
    // }
    // roomsDataService.create(x).then(result => {
    //   console.log('RESUUULTLTLTLTL')
    //   console.log(result)
    // })
    languageDataService.getAll()
      .then((result) => {
        this.languagesNew = result.data
        console.log(this.result.data)
      })
    labelDataService.getAll().then((response) => {
      this.labelsList = response.data
    })
  },
  methods: {
    /**
     * Used to remove Item from selected Labels
     * @param item label which should be removed
     */
    remove(item) {
      const index = this.labels.findIndex(key => key._id === item._id);
      this.labels.splice(index,1);
    },
    /**
     * Used to get Name based on current language
     * @param item item which has property name
     */
    getName (item: any) {
      return item.name[this.$i18n.locale]
    },
    /*getLabels () : Label [] {
      labelDataService.getAll().then(result => {
        for (let i = 0; i < result.data.length; i++) {
          this.labelsList.push(result.data[i])
          console.log(this.labelsList)
        }
        return this.labelsList
      })
    },*/
    sendItem () {
      var commonKeys = []
      this.languagesNew.forEach((value) => {
        commonKeys.push(value.lang)
      })
      /**
       * Converts All Names to a Map with name: {lang: nameInLang}
       */
      const zipArrays = (keysArray, valuesArray) => Object.fromEntries(keysArray.map((value, index) => [value, valuesArray[index]]))

      const name = zipArrays(commonKeys, this.itemNames)
      /**
       * Converts All Descriptions to a Map with description: {lang: descriptionInLang}
       */
      const description = zipArrays(commonKeys, this.aboutItem)
      console.log(this.labels)
      /**
       * Convert Labels to Ids
       */
      const selectedLabelIds = []
      this.labels.forEach(value => {
        selectedLabelIds.push(value._id)
      })
      const item: Item = {
        name,
        description,
        countable: this.countable,
        labelIds: selectedLabelIds
      }
      ItemDataService.create(item)
        .then(response => {
          console.log("SUCCESS")
          this.text = 'Success! The data was sent'
          this.success = true
          console.log(response)
        })
        .catch(e => {
          console.log(e)
          this.text = 'Error! Something goes wrong. Try again'
          this.error = true
        })
      console.log(item)
      console.log(item.name)
    }

  },
  computed: {
    getCurrentNameString () {
      return 'name.' + this.$i18n.locale
    }
  }
})
</script>

<style scoped>

/*div.container{*/
/*  margin-top: 40px*/
/*}*/
/*.sbtn{*/
/*  margin-top: 10px;*/
/*}*/
/*.plus{*/
/*  margin: 0 auto;*/
/*}*/

</style>

<i18n>
{
  "en": {
    "Name": "Name",
    "GE": "GE",
    "EN": "EN",
    "Description": "Description",
    "Box": "Box",
    "Countable": "Countable",
    "Labels": "Labels",
    "Save": "Save"
  },
  "de": {
    "Name": "Name",
    "GE": "DE",
    "EN": "EN",
    "Description": "Beschreibung",
    "Box": "Fach",
    "Countable": "Countable",
    "Labels": "Labels",
    "Save": "Speichern"
  }
}
</i18n>
