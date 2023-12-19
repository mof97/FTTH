import $axios from '@/plugins/axios'
const model = 'permission'
export default {
  state: {
    permissions: [
      {
        name: 'Husseinsb',
        guard_name: 'admin'
      }
    ]
  },
  getters: {
    permissions: state => state.permissions
  },
  actions: {
    async getPermissions ({ commit }, filterData = { take: 10, skip: 0, name: '' }) {
      const response = await $axios.get(`/${model}?take=${filterData.take}&skip=${filterData.skip}&filter[name]=${filterData.name}`)
      commit('SET_PERMISSIONS', response.data)
    },
    async addPermissions ({ commit }, payload) {
      const response = await $axios.post(`/${model}`, payload)
      commit('SORT_PERMISSIONS', response.data.data)
    },
    async updatePermissions ({ commit }, payload) {
      const response = await $axios.put(`/${model}/${payload.id}`, payload)
      commit('UPDATE_PERMISSIONS', response.data.data)
    },
    async removePermissions ({ commit }, id) {
      const response = await $axios.delete(`/${model}/${id}`)
      commit('REMOVE_PERMISSIONS', response.data.data.id)
    },
    async assignPermissionToUser ({ commit }, id) {
      const response = await $axios.delete(`/give-permissions-to/user/${id}`)
      commit('REMOVE_DATA', response.data.data.id)
    }
  },
  mutations: {
    SET_PERMISSIONS (state, data) {
      state.permissions = data
    },
    SORT_PERMISSIONS (state, data) {
      state.permissions.data.push(data)
    },
    UPDATE_PERMISSIONS (state, data) {
      state.permissions.data = state.permissions.data.map(item => item.id === data.id ? data : item)
    },
    REMOVE_PERMISSIONS (state, id) {
      state.permissions.data = state.permissions.data.filter(x => x.id !== id)
    }

  }
}
