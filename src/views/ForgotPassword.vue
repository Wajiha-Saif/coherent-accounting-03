<template>
    <div class="auth-wrapper auth-v2">
      <b-row class="auth-inner m-0">

        <!-- Brand logo-->
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            {{$t('app_logo_title')}}
          </h2>
        </b-link>
        <!-- /Brand logo-->

        <!-- Left Text-->
        <b-col
          lg="8"
          class="d-none d-lg-flex align-items-center p-5"
        >
          <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <b-img
              fluid
              :src="imgUrl"
              alt="Forgot password V2"
            />
          </div>
        </b-col>
        <!-- /Left Text-->

        <!-- Forgot password-->
        <b-col
          lg="4"
          class="d-flex align-items-center auth-bg px-2 p-lg-5"
        >
          <b-col
            sm="8"
            md="6"
            lg="12"
            class="px-xl-2 mx-auto"
          >
            <b-card-title class="mb-1">
              {{ $t('forget.title') }} 🔒
            </b-card-title>
            <b-card-text class="mb-2">
              {{$t('forget.subtitle')}}
            </b-card-text>

            <!-- form -->
            <validation-observer ref="simpleRules">
              <b-form
                class="auth-forgot-password-form mt-2"
                @submit.prevent="validationForm"
              >
                <b-form-group
                  v-bind:label="$t('forget.lbl_email')"
                  label-for="forgot-password-email"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('forget.lbl_email')"
                    rules="required|email"
                  >
                    <b-form-input
                      id="forgot-password-email"
                      v-model="userEmail"
                      :state="errors.length > 0 ? false:null"
                      name="forgot-password-email"
                      v-bind:placeholder="$t('forget.email_placeholder')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="loading"
                >
                  <b-spinner
                    v-if="loading"
                    small
                    variant="light"
                  />
                  {{$t("forget.lbl_btn_submit")}}
                </b-button>
              </b-form>
            </validation-observer>

            <p class="text-center mt-2">
              <b-link :to="{name:'login'}">
                <feather-icon icon="ChevronLeftIcon" /> {{$t('forget.login_link')}}
              </b-link>
            </p>
          </b-col>
        </b-col>
        <!-- /Forgot password-->
      </b-row>
    </div>
  </template>

  <script>
  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import {
    BRow, BCol, BLink, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton, BSpinner
  } from 'bootstrap-vue'
  import { required, email } from '@validations'
  import store from '@/store/index'
  import useJwt from '@/auth/jwt/useJwt'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

  export default {
    components: {
      VuexyLogo,
      BRow,
      BCol,
      BLink,
      BImg,
      BForm,
      BButton,
      BFormGroup,
      BFormInput,
      BCardTitle,
      BCardText,
      ValidationProvider,
      ValidationObserver,
      BSpinner
    },
    data() {
      return {
        userEmail: '',
        sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
        // validation
        required,
        email,
        loading: false
      }
    },
    computed: {
      imgUrl() {
        if (store.state.appConfig.layout.skin === 'dark') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
          return this.sideImg
        }
        return this.sideImg
      },
    },
    methods: {
      validationForm() {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            this.loading = true
            useJwt.clientToken()
              .then(res => {
                  let token = res.data.access_token
                  useJwt.resetPasswordRequest(token,{
                    email: this.userEmail,
                  })
                    .then(response => {
                      this.loading = false
                      // this.$toast({
                      //     component: ToastificationContent,
                      //     props: {
                      //     title: `Client Token and reset password email sent APIs hit successfully`,
                      //     icon: 'EditIcon',
                      //     variant: 'success',
                      //     },
                      // })
                      return this.$router.push({ name: 'reset-password-email-v1' })
                    })
                    .catch(error => {
                         //   this.$refs.registerForm.setErrors(error)
                        this.loading = false
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: `${error.response.data.errorMessage}`,
                            icon: 'EditIcon',
                            variant: 'error',
                            },
                        })
                    })

              })
              .catch(error => {
                // this.$refs.registerForm.setErrors(error)
                this.loading = false
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: `${error.errorMessage}`,
                    icon: 'EditIcon',
                    variant: 'error',
                    },
                })
              })
          }
        })
      },
    },
  }
  </script>

  <style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  </style>
