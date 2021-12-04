import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    ClientFetchAllFromServer: async ({ commit }, { dayId }) => {
      const { data } = await axios.get(`${config.api_uri}/client?dayId=${dayId}`)
      commit('CLIENT_SET_LIST', data)
    },
    ClientFetchAgrByDayId: async ({ commit }, dayId) => {
      const { data: clients } = await axios.get(`${config.api_uri}/client/agr?dayId=${dayId}`)

      // let ids = [...new Set(clients.map(item => item._id))].map(id => ({ _id: id }))
      let arr = clients.reduce((acc, obj, idx) => {
        let key = obj[idx]
        console.log(key)
      }, [])

      console.log(arr)

      // let ids = [...new Set(clients.map(item => item._id))].map(id => ({ _id: id }))
      // console.log(ids)

      commit('CLIENT_SET_AGR_LIST_BY_DAY_ID', clients)
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
    },
    CLIENT_SET_AGR_LIST_BY_DAY_ID: (state, arr) => {
      state.agrClientList = arr
    }
  },
  getters: {
    clientList: state => state.clientList,
    clientToEdit: state => state.clientToEdit,
  },
  state: {
    clientList: [],
    clientToEdit: { name: '' },
    agrClientList: []
  }
}