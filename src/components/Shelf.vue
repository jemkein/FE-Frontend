<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-top justify-center>
          <v-flex xs16 sm12 md8>
            <v-card class="elevation-12" style="border-radius:20px">
              <v-row>
                <v-col class="col-lg-4">
                  <v-container>
                    <!-- AutoComplete SearchBar with Chips and slotted templates -->
                    <v-autocomplete
                      v-model="selectedRoom"
                      :items="this.completeRooms"
                      chips
                      :item-text="getCurrentNameString"
                      filled
                      return-object
                      dense
                      :label="$t('room')"
                    >
                      <!-- @template Use this slot for the selected Labels inside V-Autocomplete -->
                      <template v-slot:selection="data">
                        <v-chip  dark :color="data.item.colour"> {{ getName(data.item) }} </v-chip>
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
                      <!-- @template -->
                      <template v-slot:append-item>
                        <v-list-item>
                          <span class="subheading">{{ $t('newroom') }}</span>
                          <v-spacer></v-spacer>
                          <!-- dialog for entering a new roomname-->
                          <v-dialog v-model="dialogRoom" max-width="90%">
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
                              <room></room>
<!--                              <v-card-title class="justify-center">-->
<!--                                {{ $t('newroom') }}-->
<!--                              </v-card-title>-->
<!--                              <v-row><v-col>-->
<!--                                <v-spacer></v-spacer>-->
<!--                              </v-col>-->
<!--                                <v-col>-->
<!--                                  &lt;!&ndash; text-field for entering the roomname &ndash;&gt;-->
<!--                                  <v-text-field style="margin-right: 12px;margin-left: 12px;-->
<!--                                  align-self: center" :label="$t('enterroomname')" clearable></v-text-field>-->
<!--                                </v-col>-->
<!--                                <v-col><v-spacer></v-spacer></v-col>-->
<!--                              </v-row>-->
<!--                              <v-divider></v-divider>-->
<!--                              <v-card-actions>-->
<!--                                <v-spacer></v-spacer>-->
<!--                                &lt;!&ndash; @v-btn disables the dialog window &ndash;&gt;-->
<!--                                <v-btn-->
<!--                                  color="primary"-->
<!--                                  text-->
<!--                                  @click="dialogRoom = false"-->
<!--                                >-->
<!--                                  {{ $t('createroom') }}-->
<!--                                </v-btn>-->
<!--                              </v-card-actions>-->
                            </v-card>
                          </v-dialog>
                        </v-list-item>
                      </template>
                    </v-autocomplete>
                  </v-container>
                </v-col>
                <v-col class="col-lg-4">
                  <v-container>
                    <v-text-field :label="$t('IP')" filled disabled value="Test"></v-text-field>
                    <!-- AutoComplete SearchBar with Chips and slotted templates -->
<!--                    <v-autocomplete-->
<!--                      v-model="selectedIP"-->
<!--                      :items="this.allIPAdresses"-->
<!--                      chips-->
<!--                      :item-text="getCurrentNameString"-->
<!--                      filled-->
<!--                      return-object-->
<!--                      dense-->
<!--                      :label="$t('IP')"-->
<!--                    >-->
<!--                      &lt;!&ndash; @template Use this slot for the selected Labels inside V-Autocomplete &ndash;&gt;-->
<!--                      <template v-slot:selection="data">-->
<!--                        <v-chip  dark :color="data.item.colour"> {{ getName(data.item) }} </v-chip>-->
<!--                      </template>-->
<!--                      &lt;!&ndash; @template Use this slot for the expanded List when V-Autocomplete is selected &ndash;&gt;-->
<!--                      <template v-slot:item="{ item, on, attrs }">-->
<!--                        <v-list-item v-on="on" v-bind="attrs" #default="{ active }">-->
<!--                          &lt;!&ndash;          Enables CheckBox usage to select multiple labels&ndash;&gt;-->
<!--                          <v-list-item-action>-->
<!--                            <v-checkbox :color="item.colour" :input-value="active"> </v-checkbox>-->
<!--                          </v-list-item-action>-->
<!--                          <v-list-item-content>-->
<!--                            <v-list-item-title>-->
<!--                              <v-chip dark :color="item.colour"> {{ getName(item) }} </v-chip>-->
<!--                            </v-list-item-title>-->
<!--                          </v-list-item-content>-->
<!--                        </v-list-item>-->
<!--                      </template>-->
<!--                      <template v-slot:append-item>-->
<!--                        <v-list-item>-->
<!--                          <span class="subheading">{{ $t('newip') }}</span>-->
<!--                          <v-spacer></v-spacer>-->
<!--                          <v-dialog v-model="dialogIP" max-width="40%">-->
<!--                            <template v-slot:activator="{ on, attrs }">-->
<!--                              <v-btn-->
<!--                                color="secondary"-->
<!--                                label-->
<!--                                small-->
<!--                                v-bind="attrs"-->
<!--                                v-on="on"-->
<!--                              >-->
<!--                                <v-icon>-->
<!--                                  mdi-plus-->
<!--                                </v-icon>-->
<!--                              </v-btn>-->
<!--                            </template>-->
<!--                            <v-card>-->
<!--                              <v-card-title class="justify-center">-->
<!--                                {{ $t('newip') }}-->
<!--                              </v-card-title>-->
<!--                              <v-row><v-col>-->
<!--                                <v-spacer></v-spacer>-->
<!--                              </v-col>-->
<!--                                <v-col>-->
<!--                                  <v-text-field style="margin-right: 12px;margin-left: 12px;-->
<!--                                  align-self: center" :label="$t('enterip')" clearable></v-text-field>-->
<!--                                </v-col>-->
<!--                                <v-col><v-spacer></v-spacer></v-col>-->
<!--                              </v-row>-->
<!--                              <v-divider></v-divider>-->
<!--                              <v-card-actions>-->
<!--                                <v-spacer></v-spacer>-->
<!--                                <v-btn-->
<!--                                  color="primary"-->
<!--                                  text-->
<!--                                  @click="dialogIP = false"-->
<!--                                >-->
<!--                                  {{ $t('createip') }}-->
<!--                                </v-btn>-->
<!--                              </v-card-actions>-->
<!--                            </v-card>-->
<!--                          </v-dialog>-->
<!--                        </v-list-item>-->
<!--                      </template>-->
<!--                    </v-autocomplete>-->
                  </v-container>
                </v-col>
                <v-col class="col-lg-4">
                  <v-container>
                    <!-- AutoComplete SearchBar with Chips and slotted templates -->
                    <v-autocomplete
                      v-model="selectedMacAdress"
                      :items="this.allMacAdresses"
                      chips
                      filled
                      dense
                      :label="$t('MACaddress')"
                    >
<!--                      &lt;!&ndash; @template Use this slot for the selected Labels inside V-Autocomplete &ndash;&gt;-->
<!--                      <template v-slot:selection="data">-->
<!--                        <v-chip  dark> {{ data }} </v-chip>-->
<!--                      </template>-->
<!--                      &lt;!&ndash; @template Use this slot for the expanded List when V-Autocomplete is selected &ndash;&gt;-->
<!--                      <template v-slot:item="{ item, on, attrs }">-->
<!--                        <v-list-item v-on="on" v-bind="attrs" #default="{ active }">-->
<!--                          &lt;!&ndash;          Enables CheckBox usage to select multiple labels&ndash;&gt;-->
<!--                          <v-list-item-action>-->
<!--                            <v-checkbox :input-value="active"> </v-checkbox>-->
<!--                          </v-list-item-action>-->
<!--                          <v-list-item-content>-->
<!--                            <v-list-item-title>-->
<!--                              <v-chip> {{ data }} </v-chip>-->
<!--                            </v-list-item-title>-->
<!--                          </v-list-item-content>-->
<!--                        </v-list-item>-->
<!--                      </template>-->
                    </v-autocomplete>
                  </v-container>
                </v-col>
              </v-row>
              <v-row class="ml-5">
                <v-col>
                  <!-- input field for shelfname-->
                  <!-- validates if input is required-->
                  <v-text-field
                    :label="$t('Shelfname')"
                    clearable
                    v-model="Shelf.Shelfname"
                    :rules="rulesName"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                <v-spacer></v-spacer>
                </v-col>
                <v-col>
                  <!-- input field for the amount of rows of the shelf -->
                  <!-- validates if input is required or include strings -->
                  <v-text-field
                    :label="$t('rows')"
                    clearable
                    v-model="rowcounter"
                    @change="currentRowCounter"
                    :rules="rules">
                  </v-text-field>
                </v-col>
                <v-col>
                <!-- input field for the amount of columns of the shelf -->
                  <!-- validates if input is required or include strings -->
                  <v-text-field
                    :label="$t('columns')"
                    clearable
                    v-model="slider"
                    @input="Shelf.Columns"
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-spacer></v-spacer>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <!-- @v-slider for the amounts of rows in the self-->
            <v-slider
              v-model="slider"
              thumb-label="always"
              :label="$t('columns')"
              max="10"
            min="1">
              <!-- @template prepends a slot to the component when clicked on the icon -->
              <template v-slot:prepend>
                <v-icon
                  @click="decrementColumns">
                  mdi-minus
                </v-icon>
              </template>
              <!-- @template appends a slot to the component when clicked on the icon -->
              <template v-slot:append>
                <v-icon
                  @click="incrementColumns">
                  mdi-plus
                </v-icon>
              </template>
            </v-slider>
                </v-col>
              </v-row>
              <v-row v-if="isMobile">
                <v-col>
                <v-slider
                  :label="$t('rows')"
                  thumb-label="always"
                  v-model="rowcounter"
                  max="20"
                  min="1">
                  <!-- @template prepends a slot to the component when clicked on the icon -->
                  <template v-slot:prepend>
                    <v-icon
                      @click="incrementRows">
                      mdi-plus
                    </v-icon>
                  </template>
                  <!-- @template appends a slot to the component when clicked on the icon -->
                  <template v-slot:append>
                    <v-icon
                      @click="decrementRows">
                      mdi-minus
                    </v-icon>
                  </template>
                </v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="11">
                  <!-- v-sheets are created, @slider are the amount of columns, @rowcounter amount of rows-->
              <v-row v-for="x in rowcounter"
              :key="x" class="ml-5 ">
                <v-col
                v-for="n in slider"
                :key="n"
                sm="1"
                style="margin-left: 0px; padding-left: 0px">
              <v-sheet
                color="grey"
                elevation="24"
                height="20"
               :width="sizeOfBox"
                style="padding: 0px"
              ></v-sheet>
              </v-col>
              </v-row>
                </v-col>
                <v-col cols="1" v-if="!isMobile">
                  <!-- @v-slider for the amounts of rows in the self-->
                  <v-slider

                  :label="$t('rows')"
                  thumb-label="always"
                  v-model="rowcounter"
                  max="20"
                  min="1"
                vertical>
                    <!-- @template prepends a slot to the component when clicked on the icon -->
                  <template v-slot:prepend>
                    <v-icon
                      @click="incrementRows">
                      mdi-plus
                    </v-icon>
                  </template>
                    <!-- @template appends a slot to the component when clicked on the icon -->
                  <template v-slot:append>
                    <v-icon
                      @click="decrementRows">
                      mdi-minus
                    </v-icon>
                  </template>
                </v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <!-- this button triggers the add Row function -->
                <v-btn :disabled="disableAddRowButton"
                  @click ="addRow"
                elevation="2"
                style="margin-left:35px"
                >{{$t('addrow')}}</v-btn>
                </v-col>
                <v-col>
                  <!-- this button triggers the delete Row function -->
                  <v-btn :disabled="disableDeleteButton" @click ="deleteRow"
                         elevation="2"
                         style="margin-left:35px"
                  >{{ $t('deleterow') }}</v-btn>
                </v-col>
                <v-col>
                  <v-btn @click ="submit"
                         elevation="2"
                         style="margin-left:35px"
                  >{{ $t('submit') }}</v-btn>
                </v-col>
              </v-row>
              <v-snackbar
                v-model="snackbar"
                :multi-line="multiLine"
              >
                {{ text }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="green"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    {{ $t('close') }}
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import RoomsDataService from '../services/roomsDataService'
import ShelfDirectDataService from '../services/shelfDirectDataService'
import ShelfDataService from '../services/shelvesDataService'
import { Item } from '../types/index'
import Vue from 'vue'
import Room from '../components/Room'

export default Vue.extend({
  components: { Room },
  data: () => ({
    selectedMacAdress: '',
    selectedIP: '',
    dialogRoom: false,
    dialogMAC: false,
    dialogIP: false,
    selectedRoom: '',
    rooms: {
      namede: [String],
      nameen: [String]
    },
    rulesName: [v => !!v || 'This field is required'],
    rules: [v => !!v || 'This field is required',
      v => /^\d{1,2}$/.test(v) || 'This field only accept numbers'],
    roomsize: Number,
    macsize: Number,
    MACS: [],
    IPS: [],
    windowSize: {
      x: 0,
      y: 0
    },
    ipAddress: String,
    slider: 1,
    rowcounter: 1,
    allMacAdresses: [],
    completeRooms: [],
    allIPAdresses: [],
    macaddress: '',
    addRowButton: true,
    submitButton: true,
    deleteButton: true,
    multiline: true,
    snackbar: false,
    text: 'Shelf has been created',
    Shelf: {
      Rows: '',
      Columns: Number,
      Shelfname: '',
      Roomname: ''
    }
  }),
  watch: {
    /**
     * gets the current selected Room
     * @param newRoom is the new slected room
     */
    selectedRoom (newRoom: any) {
      this.getMacAdresses(newRoom)
    },
    selectedMacAdress () {
      const allLeds = Array.from(Array(100).keys())
      console.log(this.selectedMacAdress)
      const payload = {
        Mac_Address: '3C:71:BF:AA:AC:08',
        LEDs: allLeds,
        Color: '#FF00FF'
      }
      console.log(payload)
      ShelfDirectDataService.setLEDsWObject(payload)
    },
    slider () {
      this.resetShelfLeds()
      const allLeds = Array.from(Array(this.slider * this.rowcounter).keys())
      const payload = {
        Mac_Address: '3C:71:BF:AA:AC:08',
        LEDs: allLeds,
        Color: '#FF00FF'
      }
      console.log(payload)
      ShelfDirectDataService.setLEDsWObject(payload)
    },
    rowcounter () {
      this.resetShelfLeds().then(result => {
        const allLeds = Array.from(Array(this.slider * this.rowcounter).keys())
        const payload = {
          Mac_Address: '3C:71:BF:AA:AC:08',
          LEDs: allLeds,
          Color: '#FF00FF'
        }
        console.log(payload)
        ShelfDirectDataService.setLEDsWObject(payload)
      })
    }
  },
  methods: {
    async resetShelfLeds  () {
      console.log('TEST')
      const allLeds = Array.from(Array(80).keys())
      const payload = {
        Mac_Address: '3C:71:BF:AA:AC:08',
        LEDs: allLeds
      }
      console.log(payload)
      return ShelfDirectDataService.unstLEDsWObject(payload)
    },
    getMacAdresses (room) {
      /**
       * getMacAdresses needs to connect to IP from room.ipAddress
      */
      ShelfDirectDataService.getMacAdresses() // getAllRooms
        .then(response => {
          this.allMacAdresses = response.data
          console.log('ALLMACADRESSES')
          console.log(this.allMacAdresses)
        })
        .catch(e => {
          // If Exception, write it on Console
          console.log(e)
        })
    },
    getName (item) {
      return item.name[this.$i18n.locale]
    },
    /**
     * creates a Room with a name and ipAddress
     */
    createRoom () {
      const name: Room = {
        name: { en: this.Shelf.Roomname, de: this.Shelf.Roomname },
        ipAddress: this.ipAddress
      }
      RoomsDataService.create(name)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
      console.log(name)
      this.dialogRoom = false
    },
    createShelf () {
      var highestNum = 0
      /**
       * Gets highest Number for new unique Number
       */
      ShelfDataService.getAll().then(response => {
        response.forEach(value => {
          if (value.number > highestNum) {
            highestNum = value.number
          }
          const newShelf = {
            Shelfnumber: highestNum,
            Mac_Address: this.selectedMacAdress,
            Position: []
          }
          ShelfDirectDataService.createShelf(newShelf).then(response => {
            /**
             * Create Shelf in Backend
             */
            const shelf = {
              number: highestNum,
              roomId: this.selectedRoom._id
            }
            ShelfDataService.create()
            /**
             * Create first Position with Row-Length in LEDs   Used for displaying Exact Grid later on in Assign_items.
             */
            const shelfPosition = {
              ShelfNumber: highestNum,
              PositionId: 0,
              LEDs: [this.slider]
            }
            ShelfDirectDataService.createPosition(shelfPosition)
          }).then(response => {
            const totalPositions = this.slider * this.rowcounter
            for (let i = 0; i < totalPositions; i++) {
              console.log('createPosition' + i.toString())
              const shelfPosition = {
                ShelfNumber: highestNum,
                PositionId: i + 1,
                LEDs: [i]
              }
              ShelfDirectDataService.createPosition(shelfPosition)
            }
            console.log('ShelfSetupComplete!')
            // todo success Message
          })
            .catch(err => {
              console.error(err)
            // todo DisplayErrorMessage for example via Alert
            })
        })
      })
      /**
       * Creates an Room from the inputfield
       * @Room interface from types/index.ts
       */
      const name: Room = {
        name: { en: this.Shelf.Roomname, de: this.Shelf.Roomname },
        ipAddress: this.ipAddress
      }
      RoomsDataService.create(name)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
      console.log(name)
      this.dialogRoom = false
    },
    myEventHandler (e) {
      this.onResize()
    },
    /**
     * sets the windowsize depending the innerhight/width
     */
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      console.log(this.windowSize)
      console.log(window.innerWidth)
      console.log(window.innerHeight)
    },
    /**
     * decreases the size of the columns of the shelf
     * is used in the horizontal Column Slider
     */
    decrementColumns () {
      this.slider--
    },
    /**
     * increases the size of the columns of the shelf
     * is used in the horizontal Column Slider
     */
    incrementColumns () {
      this.slider++
    },
    /**
     * decreases the size of the rows of the shelf
     * is used in the vertical Row Slider
     */
    decrementRows () {
      this.rowcounter--
    },
    /**
     * increases the size of the columns of the shelf
     * is used in the vertical Row Slider
     */
    incrementRows () {
      this.rowcounter++
    },
    /**
     * increases the size of the row
     * this function is executed with the 'add row button'
     */
    addRow () {
      this.rowcounter++
    },
    /**
     * decreases the size of the row
     * this function is executed with the 'delete row button'
     */
    deleteRow () {
      this.rowcounter--
    },
    /**
     * currentRowCounter ()     */
    currentRowCounter () {
      return this.rowcounter
    },
    /**
     * resets the form to default
     */
    submit () {
      this.resetSilder()
      this.resetRowcounter()
      this.Shelf.Shelfname = ''
      this.selectedRoom = ''
      this.selectedIP = ''
      this.selectedMacAdress = ''
      this.openSnackbar()
    },
    /**
     * opens a popup for shelf created
     */
    openSnackbar () {
      this.snackbar = true
    },
    /**
     * resets the amount of columns
     */
    resetSilder () {
      this.slider = 1
    },
    /**
     * resets the amount of rows
     */
    resetRowcounter () {
      this.rowcounter = 1
    }
  },
  /**
   * creates an Event Listener to handle windowsize(resize)
   */
  created () {
    window.addEventListener('resize', this.myEventHandler)
  },
  /**
   * destroys an Event Listener to handle windowsize(resize)
   */
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted () {
    /**
     * connects with the RoomsDataService and returns all Rooms
     */
    RoomsDataService.getAll().then(response => {
      console.log('Finished')
      this.completeRooms = response.data
      console.log(this.completeRooms)
    })
    this.onResize()
    // RoomsDataService.getAll() // getAllRooms
    //   .then(response => {
    //     console.log(response.data)
    //     var counter = 0
    //     for (var i = 0; i < response.data.length; i++) {
    //       if ((response.data[i].name.de.length !== 0) &&
    //         (response.data[i].name.en.length !== 0) &&
    //         !(this.rooms.namede.includes(response.data[i].name.de)) &&
    //         !(this.rooms.nameen.includes(response.data[i].name.en))) {
    //         this.rooms.namede[i] = response.data[i].name.de
    //         this.rooms.nameen[i] = response.data[i].name.en
    //         this.roomsize = counter
    //         counter++
    //       }
    //     }
    //   })
    //   .catch(e => {
    //     // If Exception, write it on Console
    //     console.log(e)
    //   })
  },
  /**
   * gets the current name as string connected with i18n tag
   */
  computed: {
    /**
     * Checks if Screensize is mobile
     */
    isMobile () {
      console.log(window.innerWidth)
      if (window.innerWidth <= 760) {
        return true
      } else {
        return false
      }
    },
    getCurrentNameString () {
      return 'name.' + this.$i18n.locale
    },
    /**
     * gets the size of the box of the shelf depending of the windowsize
     */
    sizeOfBox () {
      console.log(this.windowSize.x)
      const ausgangswert = 50
      return (ausgangswert / 1920) * this.windowSize.x // <!--  width = Ursprungsgröße (50) / 1920 (Standardgröße) -->
    },
    /**
     * disables add Row Button when the amount of rows is higher then 9
     */
    disableAddRowButton () {
      if (this.rowcounter > 9) {
        return this.addRowButton
      }
      return !this.addRowButton
    },
    /**
     * disables delete Button when the amount of rows is 1
     */
    disableDeleteButton () {
      if (this.rowcounter < 2) {
        return this.deleteButton
      }
      return !this.deleteButton
    }
  }
})
</script>
<i18n>
{
  "en": {
    "room": "Room",
    "IP": "IP-Address",
    "MACaddress": "MAC-Address",
    "Shelfname": "Shelfname",
    "rows": "Rows",
    "columns": "Columns",
    "addrow": "add Row",
    "deleterow": "delete Row",
    "createShelf": "create Shelf",
    "newroom": "new Room",
    "newip": "new IP-Address",
    "enterroomname": "Enter Roomname",
    "createroom": "create Room",
    "enterip": "enter IP-Address",
    "createip": "create IP-Address",
    "submit": "submit",
    "close": "close"
  },
  "de": {
    "room": "Raum",
    "IP": "IP-Addresse",
    "MACaddress": "MAC-Adresse",
    "Shelfname": "Schrankname",
    "rows": "Reihen",
    "columns": "Spalten",
    "addrow": "Reihe hinzufügen",
    "deleterow": "Reihe löschen",
    "createshelf": "Schrank erstellen",
    "newroom": "Neuer Raum",
    "newip": "Neue IP-Adresse",
    "enterroomname": "Eingabe Raumname",
    "createroom": "Raum hinzufügen",
    "enterip": "IP-Adress eingeben",
    "createip": "IP-Adresse hinzufügen",
    "submit": "hinzufügen",
    "close": "schließen"
  }
}
</i18n>

<style scoped>

</style>
