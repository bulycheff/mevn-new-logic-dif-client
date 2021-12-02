import { createStore } from 'vuex'
import auth from './modules/auth'
import days from './modules/days'
import clients from './modules/clients'
import admin from './modules/admin'
import employee from './modules/employee'
import bar from './modules/bar'
import program from './modules/program'
import history from './modules/history'

import card from '@/store/modules/cat/card'
import cash from '@/store/modules/cat/cash'
import cat from '@/store/modules/cat/cat'
import method from '@/store/modules/cat/method'
import room from '@/store/modules/cat/room'
import service from '@/store/modules/cat/service'

import purchase from '@/store/modules/purchase'
import expense from '@/store/modules/expense'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    days,
    clients,
    admin,
    employee,
    bar,
    program,

    cat,
    cash,
    method,
    card,
    room,
    service,

    purchase,
    expense,
    history
  }
})
