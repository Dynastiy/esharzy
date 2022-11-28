// import store from '../../../store'

const Buyer = () =>
  import('../pages/indexPage.vue')

export default [{
  path: '/buyer',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirectFrom: to.fullPath }
      })
    } else {
      next()
    }
  },
  component: Buyer,
  name: 'buyer',
  meta: {
    layout: 'userLayout'
  }
}
]
