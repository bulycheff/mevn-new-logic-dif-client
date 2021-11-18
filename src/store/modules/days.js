import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    DayFetchAllFromServer: async ({ commit }, dayStatus) => {
      let query = ''
      if (dayStatus) {
        query = `?status=${dayStatus}`
      }
      const { data } = await axios.get(`${config.api_uri}/day${query}`)
      commit('DAY_SET_LIST', data)
    },

    DayFetchOneFromServerById: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/day/${id}`)
      commit('DAY_SET_ONE_TO_EDIT', data)
    },
    DayCreateOnServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/day`, payload)
    },
    DayRemoveFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/day/${id}`)
    },
    DayUpdateOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/day/${id}`, update)
    }
  },
  mutations: {
    DAY_SET_LIST: (state, dayList) => {
      state.dayList = dayList
    },
    DAY_SET_ONE_TO_EDIT: (state, dayToEdit) => {
      state.dayToEdit = dayToEdit
    }
  },
  getters: {
    dayList: state => state.dayList,
    dayToEdit: state => state.dayToEdit,
    openedDay: state => state.dayList.length > 0 ? state.dayList[0] : null,
    openedDayId: state => state.dayList.length > 0 ? state.dayList[0]._id : null,
    isDayOpen: state => state.dayList.length > 0
  },
  state: {
    dayList: [],
    dayToEdit: null,
    clientsList: []
  }
}