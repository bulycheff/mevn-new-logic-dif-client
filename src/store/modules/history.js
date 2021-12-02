import axios from 'axios'

export default {
  actions: {
    DAYS_HISTORY_FETCH: async ({ commit }) => {
      const response = await axios.get('http://localhost:5959/api/v1/purchase/aggregate')
      const data = response.data
      commit('DaysHistory_SET', data)
    }
  },
  mutations: {
    DaysHistory_SET: (state, arr) => state.daysHistory = arr
  },
  getters: {
    daysHistory: state => state.daysHistory,
    daysAmount: state => state.daysHistory.length
  },
  state: {
    daysHistory: []
  }
}