import config from '@/config'
import axios from 'axios'

export default {
  actions: {
    Login: async ({ commit, dispatch }, payload) => {
      try {
        const response = await axios.post(`${config.api_uri}/auth/login`, payload)
        axios.defaults.headers['Authorization'] = response.data.token
        commit('SET_USER_TO_STATE', response.data.user)
        commit('SET_TOKEN_TO_STATE', response.data.token)
        localStorage.token = response.data.token
        await dispatch('DayFetchAllFromServer', 'open')
      } catch (e) {
        console.log(e.message)
      }

    },
    Logout: ({ commit }) => {
      commit('SET_USER_TO_STATE', null)
      commit('SET_TOKEN_TO_STATE', null)
      commit('SET_USER_TO_EDIT', null)
      commit('SET_ALL_USERS_TO_STATE', [])
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    CheckTokenAndUserBeforeMountApp: async ({ commit, dispatch }) => {
      commit('SET_TOKEN_FROM_LOCAL_STORAGE')
      let user
      if (localStorage.token) {
        try {
          let { data: { user } } = await axios.get(`${config.api_uri}/auth/status`)
          if (user) {
            commit('SET_USER_TO_STATE', user)
          } else {
            console.log('NO USER')
          }
        } catch (e) {
          console.log(e.message)
        }
      }

      if(user) {
        await dispatch('DayFetchAllFromServer', 'opened')
      }
    }
  },
  mutations: {
    SET_USER_TO_STATE: (state, user) => {
      state.user = user

    },
    SET_TOKEN_TO_STATE: (state, token) => {
      state.token = token
    },
    SET_TOKEN_FROM_LOCAL_STORAGE: (state) => {
      if (localStorage.token) {
        state.token = localStorage.token
        axios.defaults.headers.common = { 'Authorization': localStorage.token }
      } else {
        state.token = null
        delete axios.defaults.headers.common['Authorization']
      }
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isAuth: state => !!state.user,
    isAdmin: state => {
      return state.user ? state.user.role.filter(item => item === 'admin').length > 0 : false
    },
    userRole: state => state.user ? state.user.role[0] : null
  },
  state: {
    user: null,
    token: null
  }
}