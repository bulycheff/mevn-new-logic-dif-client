import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    FetchAllFromServer: async ({ commit }) => {
      const { data } = await axios.get(`${config.api_uri}/employee`)
      commit('SET_LIST', data)
    },
    FetchOneFromServerById: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/employee/${id}`)
      commit('SET_ONE_TO_EDIT', data)
    },
    CreateOnServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/employee`, payload)
    },
    RemoveFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/employee/${id}`)
    },
    UpdateOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/employee/${id}`, update)
    }
  },
  mutations: {
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_ONE_TO_EDIT: (state, employee) => {
      state.oneToEdit = employee
    }
  },
  getters: {
    list: state => state.list,
    oneToEdit: state => state.oneToEdit,
  },
  state: {
    list: [],
    oneToEdit: null
  }
}