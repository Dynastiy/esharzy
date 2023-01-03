const Login = () =>
  import('../pages/loginPage.vue')
const Register = () =>
  import('../pages/registerPage.vue')
const ForgotPassword = () =>
  import('../pages/forgotPassword.vue')
const ResetPassword = () =>
  import('../pages/resetPassword.vue')
const ForgotPasswordResetLink = () => import('../pages/sentLink.vue')

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
},
{
  path: '/forgot-password',
  name: 'ForgotPassword',
  component: ForgotPassword,
  meta: {
    layout: 'defaultLayout'
  }
},
{
  path: '/forgot-password/reset-link-sent',
  name: 'ForgotPasswordResetLink',
  component: ForgotPasswordResetLink,
  meta: {
    layout: 'defaultLayout'
  }
},
{
  path: '/reset-password',
  name: 'ResetPassword',
  component: ResetPassword,
  meta: {
    layout: 'defaultLayout'
  }
}

]
