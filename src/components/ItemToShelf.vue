<template>
  <div>
    <v-dialog         v-model="dialog"
                      width="500">
      <v-card>
        {{ NameOfPosition }}
      </v-card>
    </v-dialog>
    <v-container>
    <v-card>
    <v-row>
      <v-col cols="8" offset="2">
      <v-autocomplete
        chips
        filled
        v-model="selectedShelf"
        :items="shelves"
        item-text="number"
      >
        <div slot="append-item">
          <v-btn text block>{{"Create Shelf"}}</v-btn>
        </div>
      </v-autocomplete>
      </v-col>
<!--      <v-combobox label="Select Shelf" clearable v-model="selectedShelf">-->
<!--        <template v-slot:no-data>-->
<!--          <v-list-item-group>-->
<!--            <v-list-item v-for="(shelf) in shelves" :key="shelf">-->
<!--              {{shelf.number}}-->
<!--            </v-list-item>-->
<!--            <v-list-item>-->
<!--              <span class="subheading">New Room</span>-->
<!--              <v-spacer></v-spacer>-->
<!--              <v-dialog v-model="dialogRoom" max-width="40%">-->
<!--                <template v-slot:activator="{ on, attrs }">-->
<!--                  <v-btn-->
<!--                    color="secondary"-->
<!--                    label-->
<!--                    small-->
<!--                    v-bind="attrs"-->
<!--                    v-on="on"-->
<!--                  >-->
<!--                    <v-icon>-->
<!--                      mdi-plus-->
<!--                    </v-icon>-->
<!--                  </v-btn>-->
<!--                </template>-->
<!--                <v-card>-->
<!--                  <v-card-title class="justify-center">-->
<!--                    New Room-->
<!--                  </v-card-title>-->
<!--                  <v-row><v-col>-->
<!--                    <v-spacer></v-spacer>-->
<!--                  </v-col>-->
<!--                    <v-col>-->
<!--                      <v-text-field style="margin-right: 12px;margin-left: 12px;align-self: center" label="Enter Room Number"></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col><v-spacer></v-spacer></v-col>-->
<!--                  </v-row>-->
<!--                  <v-divider></v-divider>-->
<!--                  <v-card-actions>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-btn-->
<!--                      color="primary"-->
<!--                      text-->
<!--                      @click="dialogRoom = false"-->
<!--                    >-->
<!--                      add new Room-->
<!--                    </v-btn>-->
<!--                  </v-card-actions>-->
<!--                </v-card>-->
<!--              </v-dialog>-->
<!--            </v-list-item>-->
<!--          </v-list-item-group>-->
<!--        </template>-->
<!--      </v-combobox>-->
    </v-row>
<div class="row">
<div class="col-3">
  <h3>Draggable 1</h3>
  <draggable class="list-group" :list="list1" group="people" @change="log">
    <div
      class="list-group-item"
      v-for="(element, index) in list1"
      :key="element.name"
    >
      {{ element.name }} {{ index }}
    </div>
  </draggable>
</div>

<div class="col-3">
  <h3>Draggable 2</h3>
  <draggable class="list-group" :list="list2" group="people" @change="log">
    <div
      class="list-group-item"
      v-for="(element, index) in list2"
      :key="element.name"
    >
      {{ element.name }} {{ index }}
    </div>
  </draggable>
</div>
  <div>
  </div>
</div>
    <v-container>
      <v-row align="stretch" v-for="x in 5"
             :key="x" class="ml-1">

          <v-col
            class="ma-0 pa-0"
            v-for="n in 10"
            :key="n"
            cols="auto"
            sm="1">
<!--            <v-sheet-->
<!--              color="grey"-->
<!--              elevation="24"-->
<!--              height="20"-->
<!--              :width="sizeOfBox"-->
<!--            ></v-sheet>-->
            <v-card class="mt-0 mb-0 test" v-if="(n<5 && n>3 && x!=3)" height="60" @click="assignNameToPosition('tes123t')">
              {{ n }} Test1
            </v-card>
            <v-card class="mt-0 mb-0" flat v-if="(n<5 && n>3 && x==3)" height="80" @click="assignNameToPosition('tes123t')">
              {{ n }} Test2
            </v-card>
            <v-card class="mt-5" v-if="((n>=5 || n<=3) && n != 10)" height="40" @click="assignNameToPosition('tes123t')">
              {{ n }}
            </v-card>
            <v-card class="mt-0 test" v-if="(n ===10)" height="80" @click="assignNameToPosition('tes123t')">
              {{ n }}
            </v-card>
          </v-col>
      </v-row>
    </v-container>
    <v-container>
    <v-row>
      <draggable class="v-col"></draggable>
      <v-col v-for="(item, index) in this.row1" :key="index" >
        <v-card :width="item.width" :height="item.height">
          <draggable :v-model="test" @change="log" :move="move()" v-bind="dragOptionsChips" :empty-insert-threshold="100">
            <v-card :empty-insert-threshold="100" :width="x[index][0].width" :height="x[index][0].height"> {{x[index][0].name}}    <v-btn x-small @click="login()">x</v-btn></v-card>
<!--            <v-chip draggable :empty-insert-threshold="100">-->
<!--              {{x[index][0].name}}-->
<!--            </v-chip>-->
          </draggable>
<!--          <v-chip-group><v-chip draggable>Test</v-chip></v-chip-group>-->
        </v-card>
      </v-col>
    </v-row>
    </v-container>
    </v-card>
    </v-container>
  </div>
</template>
<script lang="ts">
/* eslint-disable brace-style */
import draggable from 'vuedraggable'
import shelvesDataService from '@/services/shelvesDataService'
import shelfDirectDataService from '@/services/shelfDirectDataService'
import Vue from 'vue'
import { Position } from '@/types'

export default Vue.extend({
  name: 'ItemToShelf',
  components: {
    draggable
  },
  data () {
    return {
      rowLength: 0,
      selectedShelf: 0,
      shelves: [],
      shelfPositions: [] as Position[],
      NameOfPosition: '',
      dialog: false,
      row1: [{ width: 100, height: 100 }, { width: 150, height: 100 }, { width: 300, height: 50 }],
      test: [],
      list: [] as any,
      x: [[{ name: 'test412', width: 80, height: 50 }],
        [{ name: 'test33', width: 50, height: 30 }],
        [{ name: 'test44', width: 140, height: 50 }]],
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 }
      ]
    }
  },
  watch: {
    selectedShelf () {
      shelfDirectDataService.getPositionsFromShelf(this.selectedShelf).then((response) => {
        this.shelfPositions = response.data.Positions
        /** RowLength from first Posiiton (Index0) */
        this.rowLength = this.shelfPositions[0].LEDs[0]
        this.shelfPositions.splice(0, 1)
        this.shelfPositions.forEach(value => {
          console.log(value)
          if (value.LEDs[0] - value.LEDs[value.LEDs.length - 1] === this.rowLength) {
            //
          }
        })
      })
    }
  },
  computed: {
    dragOptionsChips () {
      return {
        animation: 200,
        group: 'group',
        disabled: false,
        ghostClass: 'ghost',
        sort: true
      }
    }
  },
  mounted () {
    /**
     * Gets all Shelves as Array via shelvesDataService
     */
    shelvesDataService.getAll().then(response => {
      this.shelves = response.data
      console.log(response.data)
    })
  },
  methods: {
    // Maybe https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    move: function (value:any) {
      console.log(value)
    },
    assignNameToPosition (Name:string) {
      console.log(Name)
      this.dialog = true
      this.NameOfPosition = Name
    },
    // toggle: function (todo) {
    //   todo.done = !todo.done
    // },
    // move: function (value) {
    //   this.dragged = {
    //     from: parseInt(value.from.id),
    //     to: parseInt(value.to.id),
    //     newIndex: value.draggedContext.futureIndex
    //   }
    // },
    // change: function (value) {
    //   if (value.removed) {
    //     // insert
    //     this.selectedSync.splice(this.dragged.to + this.dragged.newIndex, 0, this.selectedSync[this.dragged.from])
    //     // delete
    //     if (this.dragged.from < this.dragged.to) // LTR
    //     { this.selectedSync.splice(this.dragged.from, 1) } else // RTL
    //     { this.selectedSync.splice(this.dragged.from + 1, 1) }
    //   }
    // },
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el : any) {
      return {
        name: el.name + 'cloned'
      }
    },
    log: function (evt : any) {
      window.console.log(evt)
    }
  }
})
</script>

<style >
 @import "../assets/myscss.css";
</style>
