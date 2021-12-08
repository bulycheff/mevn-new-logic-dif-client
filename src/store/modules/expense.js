import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    EXPENSE_FETCH_ALL: async ({ commit, getters }) => {
      const day_id = getters.openedDayId
      const { data } = await axios.get(`${config.api_uri}/expense?day_id=${day_id}`)
      commit('Expense_Set_Expense_List', data)
    },
    EXPENSE_CREATE_ONE: async ({ dispatch, getters }, payload) => {
      await axios.post(`${config.api_uri}/expense`, payload)
      const day_id = getters.openedDayId
      await dispatch('EXPENSE_FETCH_ALL', day_id)
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