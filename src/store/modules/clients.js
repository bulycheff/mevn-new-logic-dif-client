import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    ClientFetchAllFromServer: async ({ commit }, { dayId }) => {
      const { data } = await axios.get(`${config.api_uri}/client?dayId=${dayId}`)
      commit('CLIENT_SET_LIST', data)
    },
    ClientFetchOneFromServerById: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/client/${id}`)
      commit('CLIENT_SET_ONE_TO_EDIT', data)
    },
    ClientCreateOnServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/client`, payload)
    },
    ClientRemoveFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/client/${id}`)
    },
    ClientUpdateOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/client/${id}`, update)
    }
  },
  mutations: {
    CLIENT_SET_LIST: (state, clientList) => {
      state.clientList = clientList
    },
    CLIENT_SET_ONE_TO_EDIT: (state, clientToEdit) => {
      state.clientToEdit = clientToEdit
    }
  },
  getters: {
    clientList: state => state.clientList,
    clientToEdit: state => state.clientToEdit,
  },
  state: {
    clientList: [],
    clientToEdit: { name: '' }
  }
}