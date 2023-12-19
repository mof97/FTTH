import $axios from '@/plugins/axios'
const model = 'role'
export default {
  state: {
    roles: []
  },
  getters: {
    roles: state => state.roles
  },
  actions: {
    async getRoles ({ commit }, filterData = { take: 10, skip: 0, name: '' }) {
      const response = await $axios.get(`/${model}?include=permissions&take=${filterData.take}&skip=${filterData.skip}&filter[name]=${filterData.name}`)
      commit('SET_ROLES', response.data)
    },
    async addRoles ({ commit }, payload) {
      const response = await $axios.post(`/${model}`, payload)
      commit('SORT_ROLES', response.data.data)
    },

    async updateRoles ({ commit }, payload) {
      const response = await $axios.put(`/${model}/${payload.id}`, payload)
      commit('UPDATE_ROLES', response.data.data)
    },
    async removeRoles ({ commit }, id) {
      const response = await $axios.delete(`/${model}/${id}`)
      commit('REMOVE_ROLES', response.data.data.id)
    },
    async assignRolesToRole ({ commit }, id) {
      const response = await $axios.delete(`/give-permissions-to/role/${id}`)
      commit('REMOVE_ROLES', response.data.data.id)
    },
    async assignRolesToUser ({ commit }, id) {
      const response = await $axios.delete(`/give-permissions-to/user/${id}`)
      commit('REMOVE_ROLES', response.data.data.id)
    },
    async unassignRolesToRole ({ commit }, id) {
      const response = await $axios.delete(`/remove-premissions-from/role/${id}`)
      commit('REMOVE_ROLES', response.data.data.id)
    }
  },
  mutations: {
    SET_ROLES (state, data) {
      state.roles = data
    },
    SORT_ROLES (state, data) {
      state.roles.data.push(data)
    },
    UPDATE_ROLES (state, data) {
      state.roles.data = state.roles.data.map(item => item.id === data.id ? data : item)
    },
    REMOVE_ROLES (state, id) {
      state.roles.data = state.roles.data.filter(x => x.id !== id)
    }

  }
}
