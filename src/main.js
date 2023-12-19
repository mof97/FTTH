import '@babel/polyfill'
import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
import './config/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import AlgoliaComponents from 'vue-instantsearch'
import i18n from './i18n'
import './directives'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
global.Raphael = Raphael

const mixin = {
  computed: {
    ...mapGetters(['governorates', 'cities', 'services', 'features', 'landmarks', 'floors', 'permissions', 'roles', 'users', 'hotels'])
  },
  methods: {
    ...mapActions([
      'getHotels',
      'addHotels',
      'updateHotels',
      'removeHotels',

      'getGovernorates',
      'addGovernorates',
      'updateGovernorates',
      'removeGovernorates',

      'getCities',
      'addCities',
      'updateCities',
      'removeCities',

      'getServices',
      'addServices',
      'updateServices',
      'removeServices',

      'getFeatures',
      'addFeatures',
      'updateFeatures',
      'removeFeatures',

      'getLandmarks',
      'addLandmarks',
      'updateLandmarks',
      'removeLandmarks',
      'getFloors',

      'getPermissions',
      'addPermissions',
      'updatePermissions',
      'removePermissions',
      'assignPermissionsToUsers',

      'getRoles',
      'addRoles',
      'updateRoles',
      'removeRoles',

      'getUsers',
      'addUsers',
      'updateUsers',
      'removeUsers'
    ]),
    confermMsg (action) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          action()
        }
      })
    },
    resetObject (target) {
      for (var key in target) {
        if (typeof target[key] === 'number') {
          target[key] = 0
        } else if (typeof target[key] === 'string') {
          target[key] = ''
        } else if (typeof target[key] === 'boolean') {
          target[key] = false
        } else if (Array.isArray(target[key])) {
          target[key] = []
        } else {
          target[key] = null
        }
      }

      return target
    }
  }
}
Vue.mixin(mixin)

Vue.use(AlgoliaComponents)

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
