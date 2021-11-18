import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    BarFetchAllFromServer: async ({ commit }) => {
      const { data } = await axios.get(`${config.api_uri}/bar`)
      commit('BAR_SET_LIST', data)
    },
    BarFetchOneFromServerById: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/bar/${id}`)
      commit('BAR_SET_ONE_TO_EDIT', data)
    },
    BarCreateOnServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/bar`, payload)
    },
    BarRemoveFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/bar/${id}`)
    },
    BarUpdateOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/bar/${id}`, update)
    }
  },
  mutations: {
    BAR_SET_LIST: (state, barList) => {
      state.barList = barList
    },
    BAR_SET_ONE_TO_EDIT: (state, barToEdit) => {
      state.barToEdit = barToEdit
    }
  },
  getters: {
    barList: state => state.barList,
    barToEdit: state => state.barToEdit,
  },
  state: {
    barList: [],
    barToEdit: null
  }
}