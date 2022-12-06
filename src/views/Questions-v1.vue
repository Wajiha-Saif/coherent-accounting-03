<template>
    <div>
        <b-row class="auth-inner m-0">
            <navbarAds />
        </b-row>
      <div class="d-flex align-items-center mt-2 px-2">
        <b-avatar
          rounded
          size="42"
          variant="light-primary"
          class="mr-1"
        >
          <feather-icon
            icon=""
            size="20"
          />
  
        </b-avatar>
        <div>
          <h4 class="mb-0">
            {{ $t("test") }}
          </h4>
          <span>{{ $t("test") }}</span>
        </div>
      </div>
  
      <!-- collapse -->
      <app-collapse
        id="faq-payment-qna"
        accordion
        type="margin"
        class="mt-2 px-2"
      >
  
        <app-collapse-item
          title="test"
        >
        {{ $t("test") }}
        </app-collapse-item>
  
      </app-collapse>
  
      <!--/ collapse -->
    </div>
  </template>
  
  <script>
  import { BAvatar } from 'bootstrap-vue'
  import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
  import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
  import VuexyLogo from "@core/layouts/components/Logo.vue";
  import navbarAds from "./navbarAds.vue"
  import {
    BRow
  } from 'bootstrap-vue'
  export default {
    components: {
      BAvatar,
      AppCollapseItem,
      AppCollapse,
      navbarAds,
      BRow
    },
    props: {
      options: {
        type: Object,
        default: () => {},
      },
    },
  }
  </script>
  <style lang="scss">
  @import "@core/scss/vue/pages/page-auth.scss";
  .navbar-desktop a{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
    color: #6e6b7b !important;
    padding-bottom: 0 !important;
  }

 </style>
  