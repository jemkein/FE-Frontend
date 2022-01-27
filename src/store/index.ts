import Vue from 'vue'
import Vuex from 'vuex'
import authDataService from '@/services/authDataService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      role: null,
      loggedIn: false
    },
    // ausgewähltest Item (Pop-Up)
    selectedItem: null,
    // Items from the actual site
    searchedItems: null,
    // The actually chosen items
    currentSelectedLabels: []
  },
  mutations: {
    logout (state) {
      state.auth.loggedIn = false
      state.auth.role = null
    }
  },
  actions: {
    logout ({ commit }) {
      commit('logout')
    }
  },
  modules: {
  }
})
