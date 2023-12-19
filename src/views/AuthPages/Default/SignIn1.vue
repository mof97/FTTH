<template>
  <div>
    <h1 class="mb-0">Sign in</h1>
    <p>Enter your email address and password to access admin panel.</p>
    <tab-content id="pills-tabContent-1" class="mt-0">
      <tab-content-item :active="true" id="pills-jwt-fill" aria-labelled-by="pills-jwt-tab-fill">
          <sign-in1-form formType="jwt" email="admin@demo.com" password="admin123"></sign-in1-form>
      </tab-content-item>
    </tab-content>
  </div>
</template>

<script>
import auth0 from 'auth0-js'
import SignIn1Form from './Forms/SignIn1Form'
import constant from '../../../config/constant'

export default {
  name: 'SignIn1',
  components: { SignIn1Form },
  data: () => ({}),
  mounted () {
    const loggedIn = localStorage.getItem('access_token')
    if (loggedIn !== undefined && loggedIn !== null) {
      this.$router.push({ name: 'mini.dashboard.home-2' })
    }
  },
  methods: {
    loginOAuth0: function () {
      new auth0.WebAuth(constant.auth0Config).authorize()
    }
  }
}
</script>
