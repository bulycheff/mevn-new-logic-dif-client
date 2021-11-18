import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    ROOM_FetchAll: async ({ commit }, { apiPath }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}`)
      commit(`ROOM_ITEM_LIST_SET_TO_STATE`, data)
    },
    ROOM_FetchOne: async ({ commit }, { apiPath, id }) => {
      const { data } = await axios.get(`${config.api_uri}/${apiPath}/${id}`)
      commit('ROOM_ITEM_SET_TO_STATE', data)
    },
    ROOM_Create: async ({ dispatch }, { apiPath, ...data }) => {
      await axios.post(`${config.api_uri}/${apiPath}`, data)
      await dispatch('ROOM_FetchAll', { apiPath })
    },
    ROOM_Remove: async ({ dispatch }, { apiPath, id }) => {
      await axios.delete(`${config.api_uri}/${apiPath}/${id}`)
      await dispatch('ROOM_FetchAll', { apiPath })
    },
    ROOM_Update: async ({ dispatch }, { apiPath, id, ...data }) => {
      await axios.put(`${config.api_uri}/${apiPath}/${id}`, data)
      await dispatch('ROOM_FetchAll', { apiPath })
    }
  },

  mutations: {
    ROOM_ITEM_LIST_SET_TO_STATE: (state, ROOM_itemList) => state.ROOM_itemList = ROOM_itemList,
    ROOM_ITEM_SET_TO_STATE: (state, ROOM_item) => state.ROOM_item = ROOM_item,
  },

  getters: {
    ROOM_itemList: state => state.ROOM_itemList,
    ROOM_item: state => state.ROOM_item
  },

  state: {
    ROOM_itemList: [],
    ROOM_item: null
  }
}