import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    CAT_FetchAll: async ({ commit }, { apiPath }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`CAT_ITEM_LIST_SET_TO_STATE`, await data)
    },
    CAT_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('CAT_ITEM_SET_TO_STATE', data)
    },
    CAT_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('CAT_FetchAll', { apiPath })
    },
    CAT_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('CAT_FetchAll', { apiPath })
    },
    CAT_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('CAT_FetchAll', { apiPath })
    }
  },

  mutations: {
    CAT_ITEM_LIST_SET_TO_STATE: (state, CAT_itemList) => state.CAT_itemList = CAT_itemList,
    CAT_ITEM_SET_TO_STATE: (state, CAT_item) => state.CAT_item = CAT_item,
  },

  getters: {
    CAT_itemList: state => state.CAT_itemList,
    CAT_item: state => state.CAT_item
  },

  state: {
    CAT_itemList: [],
    CAT_item: null
  }
}