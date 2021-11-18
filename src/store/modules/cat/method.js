import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    METHOD_FetchAll: async ({ commit }, { apiPath }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`METHOD_ITEM_LIST_SET_TO_STATE`, data)
    },
    METHOD_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('METHOD_ITEM_SET_TO_STATE', data)
    },
    METHOD_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('METHOD_FetchAll', { apiPath })
    },
    METHOD_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('METHOD_FetchAll', { apiPath })
    },
    METHOD_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('METHOD_FetchAll', { apiPath })
    }
  },

  mutations: {
    METHOD_ITEM_LIST_SET_TO_STATE: (state, METHOD_itemList) => state.METHOD_itemList = METHOD_itemList,
    METHOD_ITEM_SET_TO_STATE: (state, METHOD_item) => state.METHOD_item = METHOD_item,
  },

  getters: {
    METHOD_itemList: state => state.METHOD_itemList,
    METHOD_item: state => state.METHOD_item
  },

  state: {
    METHOD_itemList: [],
    METHOD_item: null
  }
}