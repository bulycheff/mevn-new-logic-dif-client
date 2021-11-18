import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    EXPENSE_FETCH_ALL: async ({ commit }) => {
      const { data } = await axios.get(`${config.api_uri}/expense`)
      commit('Expense_Set_Expense_List', data)
    },
    EXPENSE_CREATE_ONE: async ({ dispatch }, payload) => {
      await axios.post(`${config.api_uri}/expense`, payload)
      await dispatch('EXPENSE_FETCH_ALL')
    },
    EXPENSE_DELETE_BY_ID: async ({ dispatch }, id) => {
      await axios.delete(`${config.api_uri}/expense/${id}`)
      await dispatch('EXPENSE_FETCH_ALL')
    },
  },

  mutations: {
    Expense_Set_Expense_List: (state, list) => {
      state.expenseList = list
    }
  },

  getters: {
    expenseList: state => state.expenseList
  },
  state: {
    expenseList: []
  },
}