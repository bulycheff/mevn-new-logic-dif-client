import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    FetchAllUsersFromApi: async ({ commit }) => {
      const { data: users } = await axios.get(`${config.api_uri}/auth/user`)
      commit('SET_ALL_USERS_TO_STATE', users)
    },

    UpdateUserFields: async ({ commit }, payload) => {
      const { data } = await axios.put(`${config.api_uri}/auth/user/${payload.id}`, payload.update)
      commit('SET_USER_TO_EDIT', data)
    },

    DeleteUserFromApiById: async (_, id) => {
      await axios.delete(`${config.api_uri}/auth/user/${id}`)
    },

    CreateNewUserByApi: async (_, payload) => {
      await axios.post(`${config.api_uri}/auth/register/`, payload)
    }

  },
  mutations: {
    SET_ALL_USERS_TO_STATE: (state, users) => state.users = users,
    SET_USER_TO_EDIT: (state, user) => {
      state.userToEdit = user
    }

  },
  getters: {
    users: state => state.users,
    userToEdit: state => state.userToEdit
  },
  state: {
    users: [],
    userToEdit: {
      username: 'username',
      name: 'name',
      role: ['user']
    }
  }
}