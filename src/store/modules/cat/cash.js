import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    CASH_FetchAll: async ({ commit }, { apiPath }) => {
      console.log(apiPath)
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`CASH_ITEM_LIST_SET_TO_STATE`, data)
    },
    CASH_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('CASH_ITEM_SET_TO_STATE', data)
    },
    CASH_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('CASH_FetchAll', { apiPath })
    },
    CASH_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('CASH_FetchAll', { apiPath })
    },
    CASH_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('CASH_FetchAll', { apiPath })
    }
  },

  mutations: {
    CASH_ITEM_LIST_SET_TO_STATE: (state, CASH_itemList) => state.CASH_itemList = CASH_itemList,
    CASH_ITEM_SET_TO_STATE: (state, CASH_item) => state.CASH_item = CASH_item,
  },

  getters: {
    CASH_itemList: state => state.CASH_itemList,
    CASH_item: state => state.CASH_item
  },

  state: {
    CASH_itemList: [],
    CASH_item: null
  }
}