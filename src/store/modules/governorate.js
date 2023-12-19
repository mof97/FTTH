import $axios from '@/plugins/axios'
const model = 'governorate'
export default {
  state: {
    governorates: []
  },
  getters: {
    governorates: state => state.governorates
  },
  actions: {
    async getGovernorates ({ commit }, filterData = { take: 10, skip: 0, name: '' }) {
      const response = await $axios.get(`/${model}?include=createdBy,updatedBy&take=${filterData.take}&skip=${filterData.skip}&filter[ar_name]=${filterData.name}`)
      commit('SET_GOVERNORATES', response.data)
    },
    async addGovernorates ({ commit }, payload) {
      const response = await $axios.post(`/${model}`, payload)
      commit('SORT_GOVERNORATES', response.data.data)
    },
    async updateGovernorates ({ commit }, payload) {
      const response = await $axios.put(`/${model}/${payload.id}`, payload)
      commit('UPDATE_GOVERNORATES', response.data.data)
    },
    async removeGovernorates ({ commit }, id) {
      const response = await $axios.delete(`/${model}/${id}`)
      commit('REMOVE_GOVERNORATES', response.data.data.id)
    },
    async assignPermissionsToUsers ({ commit }, payload) {
      const response = await $axios.post(`/${model}/${payload.userId}`, payload.permissions)
      console.log(response)
      // commit('REMOVE_GOVERNORATES', response.data.data.id)
    }
  },
  mutations: {
    SET_GOVERNORATES (state, data) {
      state.governorates = data
    },
    SORT_GOVERNORATES (state, data) {
      state.governorates.data.push(data)
    },
    UPDATE_GOVERNORATES (state, data) {
      state.governorates.data = state.governorates.data.map(item => item.id === data.id ? data : item)
    },
    REMOVE_GOVERNORATES (state, id) {
      state.governorates.data = state.governorates.data.filter(x => x.id !== id)
    }
  }
}
