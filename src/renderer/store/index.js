import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cancelButton: true,
    files: {},
    items: [],
    okButton: true
  },
  getters: {
    cancelButton: state => state.cancelButton,
    files: state => state.files,
    items: state => state.items,
    okButton: state => state.okButton
  },
  mutations: {
    SET_CANCEL_BUTTON (state, value) {
      state.cancelButton = value
    },
    SET_OK_BUTTON (state, value) {
      state.okButton = value
    },
    SET_FILES (state, files) {
      state.files = files
    },
    SET_ITEMS (state, items) {
      state.items = items
    }
  }
})