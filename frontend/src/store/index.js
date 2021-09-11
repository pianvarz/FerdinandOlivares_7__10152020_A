import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message:  '',
    listPosts: []
  },
  mutations: {
    // Notifications section

    POST_CREATED_NOTIFICATION (state, message) {
      state.message = message
    },

    REMOVED_NOTIFICATION (state) {
      state.message = ''
    }
  },
  actions: {
    // --------------  Notifications actions section
    postNotification ({ commit }, message) {
      commit('POST_CREATED_NOTIFICATION', message)
      setTimeout(() => commit('REMOVED_NOTIFICATION'), 3000)
    },
  },
  modules: {
    posts,
  }
})

