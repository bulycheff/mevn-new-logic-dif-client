import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    ProgramFetchAllFromServer: async ({ commit }) => {
      const { data } = await axios.get(`${config.api_uri}/program`)
      commit('PROGRAM_SET_LIST', data)
    },
    ProgramFetchOneFromServerById: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/program/${id}`)
      commit('PROGRAM_SET_ONE_TO_EDIT', data)
    },
    ProgramCreateOnServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/program`, payload)
    },
    ProgramRemoveFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/program/${id}`)
    },
    ProgramUpdateOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/program/${id}`, update)
    }
  },
  mutations: {
    PROGRAM_SET_LIST: (state, programList) => {
      state.programList = programList
    },
    PROGRAM_SET_ONE_TO_EDIT: (state, programToEdit) => {
      state.programToEdit = programToEdit
    }
  },
  getters: {
    programList: state => state.programList,
    programToEdit: state => state.programToEdit,
  },
  state: {
    programList: [],
    programToEdit: null
  }
}