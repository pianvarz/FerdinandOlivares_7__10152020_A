import { apiClient } from '../services/apiClient'

export default {
  state: {
    errorMessage: '',
    page: 1,
    isOnLastPage: false,
    listPosts: []
  },
  mutations: {
    INCREMENT_PAGE (state) {
      state.page++
    },
  
    ERROR_MSG (state, posts) {
      state.listPosts = posts
    },
  
    ADDED_TO_POSTSLIST (state, newPost) {
      state.listPosts.unshift(newPost)
      state.listPosts = [...state.listPosts]
    },
  
    UPDATE_POSTSLIST (state, posts) {
      state.listPosts = posts
    },

    RESET_POST_STORAGE (state) {
        state.listPosts = []
        state.page = 1
        state.isOnLastPage = false
    }
  },
  actions: {
    initializePostStore({ dispatch, commit }, params = {}) {
        commit('RESET_POST_STORAGE')
        dispatch('getPosts', params)
    },
  
    getPosts({ state, commit}, params = {}) {
      let userIdParams = ''
      if(params.userId) {
        userIdParams = `&userId=${params.userId}`
      }
  
     return apiClient
      .get(`api/posts?page=${state.page}${userIdParams}`)
      .then(res => {
        if (res.posts) {
          commit('UPDATE_POSTSLIST', state.listPosts.concat(res.posts))
        }
      })
      .catch(() => {
          commit('ERROR_MSG', 'Issues with connection, please try again later! ') 
      })
    },
    
    async seeMore({ state, commit, dispatch}, params) {
      if (state.isOnLastPage) return 
  
      commit('INCREMENT_PAGE')
      const initialLength = state.listPosts.length
  
      await dispatch('getPosts', params)
  
      if (state.listPosts.length === initialLength) {
        commit('REACHED_LAST_PAGE')
      }
    },
  
    generatePost ({ commit }, { selectedFile, content }) {
    let body = {
      content: content
    }
    
    const needsForm = !!selectedFile
      if (needsForm) {
        const fd = new FormData()
        fd.append('image', selectedFile)
        fd.append('post', JSON.stringify(body))
        body = fd
      }
      return apiClient
        .post('api/posts/', body, { needsForm })
        .then(res => { commit('ADDED_TO_POSTSLIST', res.post)
        })  
    }
  }
}