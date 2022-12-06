<template>
    <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">
        <!-- Reset Password v1 -->
        <b-card class="mb-0">

          <!-- logo -->
          <b-link class="brand-logo">
            <vuexy-logo />

            <h2 class="brand-text text-primary ml-1">
              {{$t('app_logo_title')}}
            </h2>
          </b-link>

          <b-card-title class="mb-1">
            {{$t('reset_password_email.email_sent_successfully')}}
          </b-card-title>
          <b-card-text class="mb-2">
            {{$t('reset_password_email.description')}}
          </b-card-text>

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
    BCard, BCardTitle, BCardText, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BLink, BFormInput, BButton,
  } from 'bootstrap-vue'
  import { required } from '@validations'
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
    }
  }
  </script>

  <style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  </style>
