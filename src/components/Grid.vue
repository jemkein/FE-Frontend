<!-- Gridsystem für die Ergebnissanzeige der Suche für das Projekt Pick by light -->

<template>
 <div>
   <!--Die Überschriften der Tabelle mit 5 items pro Seite -->
   <v-data-table
     v-if="!isMobile"
     :headers="headers"
     :items="items"
     :items-per-page="10"
     class="elevation-1"
     :footer-props="footerprops"
   > <!-- Diese Spalte gibt an ob ein Item verfügbar ist oder nicht -->
     <template v-slot:item.verfuegbar="{ item }">
       <v-icon
         :color ="whichColor(item.verfuegbar)"
       >{{isAvailable(item.verfuegbar)}}</v-icon>
     </template>
     <!-- Diese Spalte der Tabelle gibt an welche labels das Item besitzt -->
     <template v-slot:item.labels="{ item }">
       <v-chip
         :color ="label.colour"
         dark
         v-for="label in item.labels"
         :key="label._id"
         @click="addlabelToSearch(label)"
       >
         {{ getLabelName(label) }}
       </v-chip>
     </template>
     <!-- Hier kann man ein Item auswählen oder editieren -->
     <template v-slot:item.actions="{ item }">
       <v-icon
         small
         class="mr-2"
         @click="openItem(item)"
       >
         mdi-pencil
       </v-icon>
     </template>
   </v-data-table>
<!--   Used for Mobile -> less Columns -->
   <v-data-table
     v-if="isMobile"
     :headers="headersMobile"
     :items="items"
     :items-per-page="10"
     class="elevation-1"
     :footer-props="footerprops"
   >
     <!-- Diese Spalte der Tabelle gibt an welche labels das Item besitzt -->
     <template v-slot:item.labels="{ item }">
       <v-chip
         :color ="label.colour"
         dark
         v-for="label in item.labels"
         :key="label._id"
         @click="addlabelToSearch(label)"
       >
         {{ getLabelName(label) }}
       </v-chip>
     </template>
     <!-- Hier kann man ein Item auswählen oder editieren -->
     <template v-slot:item.actions="{ item }">
       <v-icon
         small
         class="mr-2"
         @click="openItem(item)"
       >
         mdi-pencil
       </v-icon>
     </template>
   </v-data-table>
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
// To Use our own predefined Axios Methods
import ItemDataService from '@/services/itemDataService.ts'
import LabelDataService from '@/services/labelDataService.ts'
// Own Types
import { Item, Label } from '@/types/index.ts'
import lightDataService from '@/services/lightDataService'
export default Vue.extend({
  name: 'grid',
  data () {
    return {
      /**
       * Die Dummy Einträge für die Tabelle
       */
      items: [] as Item[],
      itemsall: [] as Item[]
    }
  },
  /**
   * Wird aufgerufen sobald die Seite aufgerufen wird
   */
  mounted () {
    const test : any = localStorage.getItem('user')
    const user = JSON.parse(test)
    this.getAllItems()
  },
  // NOTFALL TEST
  computed: {
    isMobile () {
      console.log(window.innerWidth)
      if (window.innerWidth <= 760) {
        return true
      } else {
        return false
      }
    },
    getlabels () { // Automatically gets new Item after pushed in Vuex
      // ToDo VuexTypeScriptFiles #14
      return this.$store.state.currentSelectedLabels
    },
    /**
     * Die Überschriften für die Tabelle(Grid)
     * @value bild, beschreibung, anzahl, fach, verfuegbar, labels, aktionen
     */
    headers () { // Used to compute value from i18n into Header
      return [
        // {
        //   text: 'ID',
        //   align: 'start',
        //   sortable: false,
        //   value: 'id'
        // },
        { text: this.$t('name'), value: 'name.' + this.$i18n.locale },
        { text: this.$t('description'), value: 'description.' + this.$i18n.locale },
        { text: 'Quantity', value: 'quantity' },
        { text: this.$t('position'), value: 'position' },
        { text: this.$t('available'), value: 'available' },
        { text: this.$t('labels'), value: 'labels' },
        { text: this.$t('actions'), value: 'actions' }
      ]
    },
    /**
     * Die Überschriften für die Tabelle(Grid) for mobile
     * @value bild, beschreibung, anzahl, fach, verfuegbar, labels, aktionen
     */
    headersMobile () { // Used to compute value from i18n into Header
      return [
        { text: this.$t('name'), value: 'name.' + this.$i18n.locale },
        { text: this.$t('description'), value: 'description.' + this.$i18n.locale },
        { text: this.$t('labels'), value: 'labels' },
        { text: this.$t('actions'), value: 'actions' }
      ]
    },
    /**
     * Used to compute value from i18n into Footer
     */
    footerprops () {
      return {
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        'items-per-page-text': this.$t('productsPerPage')
      }
    }
  },
  watch: {
    /**
     * Checks if getItem was triggered (Select Option was triggered in Grid)
     */
    getlabels: function (labels: Label[]) {
      if (labels.length === 0) {
        this.getAllItems()
        console.log('nothing here')
      } else {
        this.items = []
        const labelIDs = []
        for (var x = 0; x < labels.length; x++) {
          labelIDs.push(labels[x]._id)
        }
        const search = { labelIds: labelIDs }
        ItemDataService.findByLabel(search) // getAllItems via Axios
          .then(response => {
            // iteriert durch alle Items und pusht sie nach und nach in das Array
            for (var i = 0; i < response.data.length; i++) {
              const result: Item = {
                countable: response.data[i].countable,
                id: response.data[i].id,
                name: response.data[i].name,
                description: response.data[i].description,
                quantity: response.data[i].quantity
              }
              LabelDataService.findLabelsByItemId(response.data[i]._id)
              // LabelDataService.getAll()
                .then(response2 => {
                  result.labels = response2.data
                  this.items.push(result)
                  this.itemsall.push(result)
                })
                .catch(e => {
                  console.log(e)
                })
            }
          })
          .catch(e => {
          // Falls Error, schreibe ihn in die Konsole
            console.log(e.data)
            console.log(e.status)
            console.log(e.headers)
          })
      }
    }
  },
  methods: {
    /**
     * returns Name of label according to selected language
     */
    getLabelName (label) {
      return label.name[this.$i18n.locale]
    },
    /**
     * getAllItems via Axios
     */
    getAllItems () {
      ItemDataService.getAll()
        .then(response => {
          console.log(response.data)
          // iterates through response and pushs it into new Array // Todo replace as soon as everyType is same
          for (var i = 0; i < response.data.length; i++) {
            const result: Item = {
              countable: false,
              id: response.data[i]._id,
              name: response.data[i].name,
              description: response.data[i].description,
              quantity: response.data[i].quantity
            }
            console.log('TEST')
            console.log(response.data[i]._id)
            /**
             * gets all Items according to selected Labels (SearchFunction)
             */
            LabelDataService.findLabelsByItemId(response.data[i]._id)
              .then(response2 => {
                console.log(response2)
                console.log('response')
                result.labels = response2.data
                this.items.push(result)
                this.itemsall.push(result)
                console.log(this.items)
                console.log(this.itemsall)
              })
              .catch(e => {
                console.log('TEST123')
                console.log(e)
              })
          }
        })
        .catch(e => {
          // Falls Error, schreibe ihn in die Konsole
          console.log(e.data)
          console.log(e.status)
          console.log(e.headers)
        })
    },
    /**
     * gibt eine Farbe für einen label, wenn der Vergleich übereinstimmt
     * @param labels sind die labels der Items (hier wurden noch Dummy Werte eingefügt
     */
    getColor (labels: string) {
      if (labels === 'Schraube') return 'red'
      else if (labels === 'Display') return 'orange'
      else if (labels === 'Mutter') return 'blue'
      else if (labels === 'Batterie') return 'purple'
      else if (labels === 'LED') return 'grey'
      else if (labels === 'M8') return 'teal'
      else if (labels === 'Elektronik') return 'green'
      else return 'white'
    },
    /**
     * gibt ein Icon aus je nachdem ob ein Item verfügbar ist oder nicht
     * @param verfuegbar sagt aus ob ein Item in dem Schrank vorrätig ist oder nicht
     */
    isAvailable (verfuegbar: string) {
      if (verfuegbar === 'Ja') return 'mdi-check-bold'
      else if (verfuegbar === 'Nein') return 'mdi-cancel'
    },
    /**
     * gibt einen Farbenwert zurück je nachdem ob ein Item verfügbar ist oder nicht
     * @param verfuegbar sagt aus ob ein Item in dem Schrank vorrätig ist oder nicht
     */
    whichColor (verfuegbar: string) {
      if (verfuegbar === 'Ja') return 'green'
      else if (verfuegbar === 'Nein') return 'red'
    },
    /**
     * label gets added into current labelsearch Array in VUEX
     */
    addlabelToSearch (label: Label) {
      /**
       * Checks if Label is already in selectedLabels -> if yes do nothing
       */
      const index = this.$store.state.currentSelectedLabels.findIndex(key => key._id === label._id)
      if (index === -1) this.$store.state.currentSelectedLabels.push(label)
    },
    /**
     * Item gets added into VUEX State and triggers ItemMenu
     */
    openItem (item: Item) {
      this.$store.state.selectedItem = null
      this.$store.state.selectedItem = item
      console.log('ITEM')
      console.log(item)
      const LightObject = {
        itemId: item.id,
        color: '#BD5DCA',
        duration: 60
      }
      console.log(LightObject)
      lightDataService.turnOnObject(LightObject).then(response => {
        console.log('SUCCESS LIGHT UP')
      })
    }
  }
})
</script>

<style scoped>

</style>

},
{ text: this.$t('name'), value: 'name' },
{ text: this.$t('description'), value: 'description' },
{ text: this.$t('count'), value: 'count' },
{ text: this.$t('position'), value: 'position' },
{ text: this.$t('available'), value: 'available' },
{ text: this.$t('labels'), value: 'labels' },
{ text: this.$t('actions'), value: 'actions' }
]
<i18n>
{
  "en": {
    "lightsActivated": "Lights activated!!",
    "finished": "FINISHED",
    "count": "Count:",
    "name": "Name",
    "description": "Description",
    "position": "Position",
    "available": "Available",
    "labels": "Labels",
    "actions": "Actions",
    "productsPerPage": "Products per page"
  },
  "de": {
    "lightsActivated": "Lichter aktiviert! ",
    "finished": "Fertig",
    "count": "Anzahl",
    "name": "Name",
    "description": "Beschreibung",
    "position": "Position",
    "available": "Verfügbar",
    "labels": "Labels",
    "actions": "Aktionen",
    "productsPerPage": "Produkte pro Seite"
  }
}
</i18n>
<style>
/*Used to stripe the Grid*/
.theme--light.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, .03);
}
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, .5);
}
</style>
