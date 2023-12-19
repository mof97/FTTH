import $axios from '@/plugins/axios'
const model = 'user'
export default {
  state: {
    users: []
  },
  getters: {
    users: state => state.users
  },
  actions: {
    async getUsers ({ commit }, filterData = { take: 10, skip: 0, name: '' }) {
      const response = await $axios.get(`/${model}?include=roles,hotel,createdBy,updatedBy&take=${filterData.take}&skip=${filterData.skip}&filter[ar_name]=${filterData.name}`)
      commit('SET_USERS', response.data)
    },
    async addUsers ({ commit }, payload) {
      const response = await $axios.post(`/${model}`, payload)
      commit('SORT_USERS', response.data.data)
    },
    async updateUsers ({ commit }, payload) {
      const response = await $axios.put(`/${model}/${payload.id}`, payload)
      commit('UPDATE_USERS', response.data.data)
    },
    async removeUsers ({ commit }, id) {
      const response = await $axios.delete(`/${model}/${id}`)
      commit('REMOVE_USERS', response.data.data.id)
    },
    async assignPermissionToUser ({ commit }, id) {
      const response = await $axios.delete(`/give-permissions-to/user/${id}`)
      commit('REMOVE_USERS', response.data.data.id)
    }
  },
  mutations: {
    SET_USERS (state, data) {
      state.users = data
    },
    SORT_USERS (state, data) {
      state.users.data.push(data)
    },
    UPDATE_USERS (state, data) {
      state.users.data = state.users.data.map(item => item.id === data.id ? data : item)
    },
    REMOVE_USERS (state, id) {
      state.users.data = state.users.data.filter(x => x.id !== id)
    }

  }
}
