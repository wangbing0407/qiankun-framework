import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carInfo: {
      name: '比亚迪',
      price: '19W',
    },
  },
  mutations: {
    setCarInfo(state, val) {
      state.carInfo = val
    },
  },
  actions: {},
  modules: {},
})
