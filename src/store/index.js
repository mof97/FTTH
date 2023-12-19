import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
import Ecommerce from './Ecommerce/index'
import governorate from './modules/governorate'
import Permissions from './modules/permissions'
import Roles from './modules/roles'
import Users from './modules/users'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    Ecommerce,
    governorate,
    Permissions,
    Roles,
    Users
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
})
