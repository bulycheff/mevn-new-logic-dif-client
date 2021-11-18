import axios from 'axios'
import config from '@/config'

export default {
  actions: {
    FetchEmployeeListFromServer: async ({ commit }) => {
      const { data } = await axios.get(`${config.api_uri}/employee`)
      commit('SET_EMPLOYEE_LIST', data)
    },
    FetchOneEmployeeFromServer: async ({ commit }, id) => {
      const { data } = await axios.get(`${config.api_uri}/employee/${id}`)
      commit('SET_EMPLOYEE_TO_EDIT', data)
    },
    SaveEmployeeToServer: async (_, payload) => {
      await axios.post(`${config.api_uri}/employee`, payload)
    },
    RemoveEmployeeFromServerById: async (_, id) => {
      await axios.delete(`${config.api_uri}/employee/${id}`)
    },
    EditEmployeeOnServerById: async (_, { id, ...update }) => {
      await axios.put(`${config.api_uri}/employee/${id}`, update)
    }
  },
  mutations: {
    SET_EMPLOYEE_LIST: (state, list) => {
      state.employeeList = list
    },
    SET_EMPLOYEE_TO_EDIT: (state, employee) => {
      state.employeeToEdit = employee
    }
  },
  getters: {
    employeeList: state => state.employeeList,
    employeeToEdit: state => state.employeeToEdit,
  },
  state: {
    employeeList: [],
    employeeToEdit: null
  }
}