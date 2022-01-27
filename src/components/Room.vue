<template>
    <v-card>
      <v-card-title class="justify-center">
        {{$t('new')}} {{$t('room')}}
      </v-card-title>
      <v-row><v-col>
        <v-spacer></v-spacer>
      </v-col>
        <v-col>
          <!-- the input value is the name of the room-->
          <v-text-field style="margin-right: 12px;margin-left:
          12px;align-self: center" v-model="roomName"
                        :label="$t('enter')">
          </v-text-field>
        </v-col>
        <v-col>
          <!-- the input value is the IP-Address of the room-->
          <v-text-field style="margin-right: 12px;margin-left:
          12px;align-self: center" v-model="ipAddress"
                        :label="$t('enter1')">
          </v-text-field>
        </v-col>
        <v-col>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-spacer>
          </v-spacer>
        </v-col>
        <v-col>
      <v-card-actions>
        <!-- triggers the function create Room and passes the input value to DataService -->
        <v-btn
          color="primary"
          text
          @click="createRoom"
        >
          {{ $t('addnew') }}
        </v-btn>
      </v-card-actions>
        </v-col>
        <v-col><v-spacer></v-spacer></v-col>
      </v-row>
    </v-card>
</template>

<script lang="ts">
import RoomsDataService from '../services/roomsDataService'
import { Room } from '../types/index'
import Vue from 'vue'
export default Vue.extend({
  name: 'Room',
  data () {
    return {
      roomName: '',
      ipAddress: ''
    }
  },
  mounted () {
    const Room = {
      name: { de: 'A20.86.8', en: 'A20.86,3' },
      ipAddress: '192.168.0.1'
    }
  },
  methods: {
    /**
     * creates a Room and passes the response to DataService
     */
    createRoom () {
      const name: Room = {
        name: { en: this.roomName, de: this.roomName },
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
      this.roomName = ''
      this.ipAddress = ''
    }
  }
})
</script>
<i18n>
{
  "en": {
    "room": "Room",
    "add": "add",
    "new": "new",
    "addnew": "add new Room",
    "enter": "Enter Room Name",
    "enter1": "Enter IP-Address"
  },
  "de": {
    "room": "Raum",
    "add": "hinzufügen",
    "new": "Neuer",
    "addnew": "neuen Raum hinzufügen",
    "enter": "Raumname",
    "enter1": "IP-Adresse eingeben"
  }
}
</i18n>

<style scoped>

</style>
