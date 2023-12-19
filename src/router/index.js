import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
const Layout1 = () => import('../layouts/Layout1.vue')
const Layout2 = () => import('../layouts/Layout2.vue')
const Default = () => import('../layouts/BlankLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1.vue')

/* Authentic View */
const SignIn1 = () => import('../views/AuthPages/Default/SignIn1')
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')
const ComingSoon = () => import('../views/Pages/ComingSoon')
const Maintenance = () => import('../views/Pages/Maintenance')
const BlankPage = () => import('../views/Pages/BlankPage')
const FAQ = () => import('../views/Pages/FAQ')
const Invoice = () => import('../views/Pages/Invoice')
/* Apps Views */
const Calendar = () => import('../views/Apps/Calendar/Calendar')
const ChatIndex = () => import('../views/Apps/Chat/Index')
const ProjectBoard = () => import('../views/Apps/ProjectManagement/ProjectBoard')

const Users = () => import('../views/User/users.vue')
const Governorates = () => import('../views/Governorates/governorates.vue')
const Permissions = () => import('../views/Permissions/permissions.vue')
const Roles = () => import('../views/Roles/roles.vue')

Vue.use(VueRouter)

const mainRoute = (prop) => [
  {
    path: '',
    name: 'dashboard.home-1',
    meta: { auth: true, name: 'Home 1' },
    component: Dashboard1
  },
  {
    path: '/users',
    name: prop + '.users',
    meta: { auth: true, name: 'Usres' },
    component: Users
  },
  {
    path: '/governorates',
    name: prop + '.governorates',
    meta: { auth: true, name: 'Governorates' },
    component: Governorates
  },
  {
    path: '/permissions',
    name: prop + '.permissions',
    meta: { auth: true, name: 'Permissions' },
    component: Permissions
  },
  {
    path: '/roles',
    name: prop + '.roles',
    meta: { auth: true, name: 'Roles' },
    component: Roles
  }
]

const appChildRoute = (prop) => [
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { auth: true, name: 'Calendar' },
    component: Calendar
  },
  {
    path: 'chat',
    name: prop + '.chat',
    meta: { auth: true, name: 'Chat' },
    component: ChatIndex
  },
  {
    path: 'project-management',
    name: prop + '.project.management',
    meta: { auth: true, name: 'Project Management' },
    component: ProjectBoard
  }
]

const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn1
  }
]

const defaultlayout = (prop) => [
  {
    path: 'invoice',
    name: prop + '.invoice',
    meta: { auth: true, name: 'Invoice' },
    component: Invoice
  },
  {
    path: 'blank-page',
    name: prop + '.blank-page',
    meta: { auth: true, name: 'Blank Page' },
    component: BlankPage
  },
  {
    path: 'faq',
    name: prop + '.faq',
    meta: { auth: true, name: 'Faq' },
    component: FAQ
  }
]

const pagesChildRoutes = (prop) => [
  {
    path: 'error/:code',
    name: prop + '.error',
    meta: { auth: true },
    component: ErrorPage
  },
  {
    path: 'coming-soon',
    name: prop + '.coming-soon',
    meta: { auth: true },
    component: ComingSoon
  },
  {
    path: 'maintenance',
    name: prop + '.maintenance',
    meta: { auth: true },
    component: Maintenance
  }
]
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout1,
    meta: { auth: true },
    children: appChildRoute('app')
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '/pages',
    name: 'pages',
    component: Default,
    meta: { auth: true },
    children: pagesChildRoutes('default')
  },
  {
    path: '/extra-pages',
    name: 'extra-pages',
    component: Layout2,
    meta: { auth: true },
    children: defaultlayout('extra-pages')
  },
  {
    path: '/app',
    name: 'app',
    component: Layout2,
    meta: { auth: true },
    children: mainRoute('app')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1', '/dark/auth/sign-in1', '/dark/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (to.meta.auth) {
    if (authRequired && loggedIn === null) {
      return next('/auth/sign-in1')
    } else if (to.name === 'dashboard' || to.name === 'dashboard.home-1') {
      return next()
    }
  }
  next()
})

export default router
