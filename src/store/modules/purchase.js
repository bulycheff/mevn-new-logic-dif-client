import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    PURCHASE_CREATE: async ({ dispatch }, payload) => {
      await axios.post(`${config.api_uri}/purchase`, payload)
      const client_id = payload.client_id
      await dispatch('PURCHASE_FETCH_ALL_BY_CLIENT_ID', client_id)
    },

    PURCHASE_FETCH_ALL: async () => {

    },
    PURCHASE_FETCH_ALL_BY_CLIENT_ID: async ({ commit }, client_id) => {
      const { data } = await axios.get(`${config.api_uri}/purchase?client=${client_id}`)
      commit('Purchase_Set_To_Purchase_List', data)
    },

    PURCHASE_FETCH_ALL_BY_CLIENT_ID_ARRAY: async ({ commit }, client_id_array) => {
      for (let i = 0; i < client_id_array.length; i++) {
        const { data } = await axios.get(`${config.api_uri}/purchase?client=${client_id_array[i]}`)
        commit('Purchase_Set_To_Purchase_List_Array', data)
      }

    },

    PURCHASE_DELETE_BY_PURCHASE_ID: async ({ dispatch }, { purchase_id, client_id }) => {
      await axios.delete(`${config.api_uri}/purchase/${purchase_id}`)
      await dispatch('PURCHASE_FETCH_ALL_BY_CLIENT_ID', client_id)
    },

  },
  mutations: {
    Purchase_Set_To_Purchase_List: (state, newList) => {
      state.purchaseList = newList
    },
    Purchase_Set_To_Purchase_List_Array: (state, purchase) => {
      state.purchaseListFromArray.push(purchase)
    }
  },

  getters: {
    purchaseList: state => state.purchaseList,
    purchaseListTotal: state => {
      let sum = {
        bar: 0,
        program: 0
      }
      state.purchaseList.forEach(item => {
        if (item.payment_category === 'bar') {
          sum.bar += item.item_cost_discounted
        } else if (item.payment_category === 'program') {
          sum.program += item.item_cost_discounted
        }
      })
      return sum
    },
    purchaseListFromArray: state => state.purchaseListFromArray
  },

  state: {
    purchaseList: [],
    purchaseListFromArray: []
  },
}