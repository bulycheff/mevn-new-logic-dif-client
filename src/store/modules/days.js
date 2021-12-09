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
    },
    DayAgrInfoAboutById: async ({ commit, getters }) => {
      const id = getters.openedDayId
      const { data } = await axios.get(`${config.api_uri}/day/info/${id}`)
      commit('DAY_SET_AGR_INFO', data)
    }
  },
  mutations: {
    DAY_SET_LIST: (state, dayList) => {
      state.dayList = dayList
    },
    DAY_SET_ONE_TO_EDIT: (state, dayToEdit) => {
      state.dayToEdit = dayToEdit
    },
    DAY_SET_AGR_INFO: (state, dayInfo) => {
      state.dayAgrInfo = dayInfo
    }
  },
  getters: {
    dayList: state => state.dayList,
    dayToEdit: state => state.dayToEdit,
    openedDay: state => state.dayList.length > 0 ? state.dayList[0] : null,
    openedDayId: state => state.dayList.length > 0 ? state.dayList[0]._id : null,
    isDayOpen: state => state.dayList.length > 0,
    dayAgrInfo: state => state.dayAgrInfo
  },
  state: {
    dayList: [],
    dayToEdit: null,
    clientsList: [],
    dayAgrInfo: {
      'opened_at': '2021-12-07T22:25:11.934Z',
      'last': '2021-12-09T11:06:46.562Z',
      'clients': 0,
      'programs': { 'value': 0, 'sum': 0 },
      'bars': { 'value': 0, 'sum': 0 },
      'total': { 'value': 0, 'sum': 0 }
    }
  }
}