import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cancelButton: true,
    files: {},
    okButton: true
  },
  getters: {
    cancelButton: state => state.cancelButton,
    files: state => state.files,
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
    }
  }
})