import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import { i18n } from '../main'
import useJwt from '@/auth/jwt/useJwt'

Vue.use(VueRouter)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login/advertisements',
      name: 'login-advertisements',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login-ads.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register/advertisements',
      name: 'register-advertisement',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register-ads.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/forgot-password',
      name: 'auth-forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/account/forgot-password',
      name: 'auth-reset-password-v1',
      component: () => import('@/views/ResetPassword-v1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/reset-password-email',
      name: 'reset-password-email-v1',
      component: () => import('@/views/ResetPasswordEmail-v1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/VerifyEmail.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/Pricing.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('@/views/Questions.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/videos/advertisement',
      name: 'videos-advertisement',
      component: () => import('@/views/Videos.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/free-digital-invoices',
      name: 'free-digital-invoices',
      component: () => import('@/views/FreeDigitalInvoices.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
    // Companies routes starting from here
    {
      path: '/companies',
      name: 'companies',
      component: () => import('@/views/company/Index.vue'),
      meta: {
        pageTitle: 'Companies',
        breadcrumb: [
          {
            text: 'Companies',
            active: true,
          },
        ],
      },
    },
    {
      path: '/company/create',
      name: 'CreateCompany',
      component: () => import('@/views/company/Create.vue'),
      meta: {
        pageTitle: 'Companies',
        breadcrumb: [
          {
            text: 'Companies',
            to: '/companies',
          },
          {
            text: 'Create Company',
            active: true,
          },
        ],
      },
    },
    {
      path: '/company/:id',
      name: 'CompanyView',
      component: () => import('@/views/company/Show.vue'),
      meta: {
        pageTitle: 'Companies',
        breadcrumb: [
          {
            text: 'Companies',
            to: '/companies',
          },
          {
            text: 'View Company',
            active: true,
          },
        ],
      },
    },
    {
      path: '/company/edit/:id',
      name: 'EditCompany',
      component: () => import('@/views/company/EditCompany.vue'),
      meta: {
        pageTitle: 'Companies',
        breadcrumb: [
          {
            text: 'Companies',
            to: '/companies'
          },
          {
            text: 'Edit Company',
            active: true,
          },
        ],
      }
    },
    // Company Invoices 
    // {
    //   path: '/companyInvoice/preview/:id',
    //   name: 'company-invoice-preview',
    //   component: () => import('@/views/company/CompanyInvoice/CompanyInvoice.vue'),
    // },
    
    //Company invoices add/edit/preview
    {
      path: '/company/:companyId/invoice/preview/:id',
      name: 'company-invoice-preview',
      component: () => import('@/views/company/Invoice/invoice-preview/InvoicePreview.vue'),
    },
    {
      path: '/company/:companyId/invoice/add',
      name: 'company-invoice-add',
      component: () => import('@/views/company/Invoice/invoice-add/InvoiceAdd.vue'),
    },
    {
      path: '/company/:companyId/invoice/edit/:id',
      name: 'company-invoice-edit',
      component: () => import('@/views/company/Invoice/invoice-edit/InvoiceEdit.vue'),
    },

    // Company Vat Reports
    {
      path: '/company/:companyId/vat-report/preview/:id',
      name: 'company-vat-report-preview',
      component: () => import('@/views/company/VatReports/vat-report-preview/VatReportPreview.vue'),
    },
    {
      path: '/company/:companyId/vat-report/add',
      name: 'company-vat-report-add',
      component: () => import('@/views/company/VatReports/vat-reports-add/VatReportAdd.vue'),
    },

    {
      path: '/company/:companyId/vat-report/edit/:id',
      name: 'company-vat-report-edit',
      component: () => import('@/views/company/VatReports/vat-report-edit/vatReportEdit.vue'),
    },


    // company private person edit/preview
    {
      path: '/company/:companyId/users/view/:id',
      name: 'comopany-users-view',
      component: () => import('@/views/company/user/users-view/UsersView.vue'),
    },
    {
      path: '/company/:companyId/users/edit/:id',
      name: 'company-users-edit',
      component: () => import('@/views/company/user/users-edit/UsersEdit.vue'),
    },
    // Invoice routes starting from here
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('@/views/invoice/Index.vue'),
    },
    {
      path: '/invoice/preview/:id',
      name: 'apps-invoice-preview',
      component: () => import('@/views/invoice/invoice-preview/InvoicePreview.vue'),
    },
    {
      path: '/invoice/edit/:id',
      name: 'apps-invoice-edit',
      component: () => import('@/views/invoice/invoice-edit/InvoiceEdit.vue'),
    },
    {
      path: '/users/view/:id',
      name: 'apps-users-view',
      component: () => import('@/views/user/users-view/UsersView.vue'),
    },
    {
      path: '/users/edit/:id',
      name: 'apps-users-edit',
      component: () => import('@/views/user/users-edit/UsersEdit.vue'),
    },
    // Videos routes starting from here
    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/views/videos/Index.vue'),
      meta: {
        pageTitle: 'Videos',
        breadcrumb: [
          {
            text: 'Videos',
            active: true,
          },
        ],
      },
    },
    // Tickets routes starting from here
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('@/views/tickets/Index.vue'),
      meta: {
        pageTitle: 'Tickets',
        breadcrumb: [
          {
            text: 'Tickets',
            active: true,
          },
        ],
      },
    },
    // My Plans routes starting from here
    {
      path: '/my-plans',
      name: 'my-plans',
      component: () => import('@/views/Plans/Index.vue'),
      meta: {
        pageTitle: 'Plans',
        breadcrumb: [
          {
            text: 'Plans',
            active: true,
            resource: 'Auth',
          },
        ],
      },
    },
    // Settings routes starting from here
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/pages/account-setting/AccountSetting.vue'),
      meta: {
        pageTitle: 'Settings',
        breadcrumb: [
          {
            text: 'Settings',
            active: true,
          },
        ],
      },
    },
    // Contacts routes starting from here
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/Contacts/Index.vue'),
      meta: {
        pageTitle: 'Contacts',
        breadcrumb: [
          {
            text: 'Contacts',
            active: true,
          },
        ],
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en'
  return next()
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (
    to.name === '/'
    || to.name === 'home'
    || to.name === 'invoices'
    || to.name === 'apps-invoice-preview'
    || to.name === 'apps-invoice-edit'
    || to.name === 'apps-users-view'
    || to.name === 'apps-users-edit'
    || to.name === 'my-plans'
    || to.name === 'company-invoice-previews'
    || to.name === 'company-invoice-add'
    || to.name === 'company-invoice-edit'
  ) {
    if (!isLoggedIn) return next({ name: 'login' })

    return next()

  }
    // else if( to.name == "auth-reset-password-v1"){
// router.beforeEach((to, _, next) => {
//     let isLoggedIn = isUserLoggedIn()
//     if (to.name == "/" || to.name == "home" || to.name == "invoices") {
//       if (!isLoggedIn) {
//         return next({ name: 'login' })
//       }

//       return next();

//     }
//     else if( to.name == "auth-reset-password-v1"){

    //   let tokenUrl = window?.location?.search?.split('=')[1] ? window.location.search.split('=')[1] : ""

    //   if(tokenUrl){
    //     useJwt.clientToken()
    //       .then(res => {
    //           let token = res.data.access_token
    //           useJwt.verifyToken(token,tokenUrl)
    //             .then(response => {
    //               console.log("response",response)

    //               return this.$router.push('/')
    //             })
    //             .catch(error => {

    //             })
    //       })
    //       .catch(error => {

    //       })
    //   } else {
    //     return next()
    //   }

  // }

  else {
    return next()
  }
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
