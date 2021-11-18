import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    CARD_FetchAll: async ({ commit }, { apiPath }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`CARD_ITEM_LIST_SET_TO_STATE`, data)
    },
    CARD_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('CARD_ITEM_SET_TO_STATE', data)
    },
    CARD_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('CARD_FetchAll', { apiPath })
    },
    CARD_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('CARD_FetchAll', { apiPath })
    },
    CARD_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('CARD_FetchAll', { apiPath })
    }
  },

  mutations: {
    CARD_ITEM_LIST_SET_TO_STATE: (state, CARD_itemList) => state.CARD_itemList = CARD_itemList,
    CARD_ITEM_SET_TO_STATE: (state, CARD_item) => state.CARD_item = CARD_item,
  },

  getters: {
    CARD_itemList: state => state.CARD_itemList,
    CARD_item: state => state.CARD_item
  },

  state: {
    CARD_itemList: [],
    CARD_item: null
  }
}