import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    DAYS_HISTORY_FETCH: async ({ commit }) => {
      const response = await axios.get(`${config.api_uri}/purchase/aggregate`)
      const data = response.data
      commit('DaysHistory_SET', data)
    },
    DAYS_HISTORY_NEW_FETCH: async ({ commit }, [date1, date2]) => {
      const response = await axios.get(`${config.api_uri}/history/days?from=${date1}&to=${date2}`)
      const data = response.data
      commit('DaysHistoryNew_SET', data)
    }
  },
  mutations: {
    DaysHistory_SET: (state, arr) => state.daysHistory = arr,
    DaysHistoryNew_SET: (state, arr) => state.daysHistoryNew = arr
  },
  getters: {
    daysHistory: state => {
      let fullArr = state.daysHistoryNew
      return fullArr
        .map(item => {
          let purchases = item.purchases.map(p => p.item_cost_discounted)
          let purchasesTotal = purchases.reduce((acc, a) => acc + a, 0)
          return {
            opened_by: item.opened_by,
            opened_at: item.opened_at,
            closed_at: item.closed_at,
            avgSum: purchasesTotal,
            purchases
          }
        })
        .sort((a, b) => b.opened_at - a.opened_at)
    },
    daysAmount: state => state.daysHistoryNew.length,
    daysHistoryNew: state => {
      let fullArr = state.daysHistoryNew
      return fullArr
        .map(item => {
          let purchases = item.purchases.map(p => p.item_cost_discounted)
          let purchasesTotal = purchases.reduce((acc, a) => acc + a, 0)
          return {
            opened_by: item.opened_by,
            opened_at: item.opened_at,
            closed_at: item.closed_at,
            avgSum: purchasesTotal,
            purchases
          }
        })
        .sort((a, b) => b.opened_at - a.opened_at)
    },
  },
  state: {
    daysHistory: [],
    daysHistoryNew: []
  }
}