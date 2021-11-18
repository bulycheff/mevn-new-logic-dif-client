import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    SERVICE_FetchAll: async ({ commit }, { apiPath }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`SERVICE_ITEM_LIST_SET_TO_STATE`, data)
    },
    SERVICE_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('SERVICE_ITEM_SET_TO_STATE', data)
    },
    SERVICE_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('SERVICE_FetchAll', { apiPath })
    },
    SERVICE_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('SERVICE_FetchAll', { apiPath })
    },
    SERVICE_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('SERVICE_FetchAll', { apiPath })
    }
  },

  mutations: {
    SERVICE_ITEM_LIST_SET_TO_STATE: (state, SERVICE_itemList) => state.SERVICE_itemList = SERVICE_itemList,
    SERVICE_ITEM_SET_TO_STATE: (state, SERVICE_item) => state.SERVICE_item = SERVICE_item,
  },

  getters: {
    SERVICE_itemList: state => state.SERVICE_itemList,
    SERVICE_item: state => state.SERVICE_item
  },

  state: {
    SERVICE_itemList: [],
    SERVICE_item: null
  }
}