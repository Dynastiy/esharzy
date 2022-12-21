const Login = () =>
  import('../pages/loginPage.vue')
const Register = () =>
  import('../pages/registerPage.vue')

export default [{
  path: '/login',
  component: Login,
  name: 'login',
  meta: {
    layout: 'authLayout'
  }
},
{
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    layout: 'authLayout'
  }
}

]
