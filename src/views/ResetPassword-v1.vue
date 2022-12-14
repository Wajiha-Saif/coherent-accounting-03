<template>
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <!-- Reset Password v1 -->
        <b-card class="mb-0">

          <!-- logo -->
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">{{ $t("app_logo_title") }}</h2>
          </b-link>

          <b-card-title class="mb-1">
            {{$t('reset_password.title')}}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t("reset_password.description") }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              method="POST"
              class="auth-reset-password-form mt-2"
              @submit.prevent="validationForm"
            >

              <!-- password -->
              <b-form-group
                label="New Password"
                label-for="reset-password-new"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="password"
                      :type="password1FieldType"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password1ToggleIcon"
                        @click="togglePassword1Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm password -->
              <b-form-group
                label-for="reset-password-confirm"
                label="Confirm Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-confirm"
                      v-model="cPassword"
                      :type="password2FieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false:null"
                      name="reset-password-confirm"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password2ToggleIcon"
                        @click="togglePassword2Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <b-button
                block
                type="submit"
                variant="primary"
                :disabled="loading"
              >
               <b-spinner
                  v-if="loading"
                  small
                  variant="light"
                />
              {{ $t("reset_password.set_new_password") }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'login'}">
              <feather-icon icon="ChevronLeftIcon" /> {{ $t("back_to_login") }}
            </b-link>
          </p>

        </b-card>
      <!-- /Reset Password v1 -->
      </div>
    </div>

  </template>

  <script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import {
    BCard, BCardTitle, BCardText, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BLink, BFormInput, BButton, BSpinner
  } from 'bootstrap-vue'
  import { required } from '@validations'
  import useJwt from '@/auth/jwt/useJwt'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

  export default {
    components: {
      VuexyLogo,
      BCard,
      BButton,
      BCardTitle,
      BCardText,
      BForm,
      BFormGroup,
      BInputGroup,
      BLink,
      BFormInput,
      BInputGroupAppend,
      ValidationProvider,
      ValidationObserver,
      BSpinner
    },
    data() {
      return {
        userEmail: '',
        cPassword: '',
        password: '',
        // validation
        required,

        // Toggle Password
        password1FieldType: 'password',
        password2FieldType: 'password',
        loading: false
      }
    },
    computed: {
      password1ToggleIcon() {
        return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
      password2ToggleIcon() {
        return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
    },
    methods: {
      togglePassword1Visibility() {
        this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
      },
      togglePassword2Visibility() {
        this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
      },
      validationForm() {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            this.loading = true
            useJwt.clientToken()
              .then(res => {
                  let token = res.data.access_token
                  useJwt.resetPassword(token,{
                    confirmPassword: this.cPassword,
                    password: this.password,
                    token: window?.location?.search?.split('=')[1] ? window.location.search.split('=')[1] : ''
                  })
                    .then(response => {
                      this.loading = false
                      // this.$toast({
                      //     component: ToastificationContent,
                      //     props: {
                      //     title: `resetPasswordApi hit successfully`,
                      //     icon: 'EditIcon',
                      //     variant: 'success',
                      //     },
                      // })
                      return this.$router.push({ name: 'login' })
                    })
                    .catch(error => {
                        this.loading = false
                         //   this.$refs.registerForm.setErrors(error)
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
