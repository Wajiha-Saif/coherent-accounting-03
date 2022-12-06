<template>
    <div>
    
    <b-row class="auth-inner m-0">
        <navbarAds />
    </b-row>
              <!-- search input -->
    <section id="videos">
        <div class="text-center">
          <h1 class="text-primary text-center mt-5 mb-5">
            {{ $t('videos')}}
          </h1>
        </div>
    </section>
    <!--/ search input -->
   
    <b-row class="m-0">
      <b-col md="6" sm="12">
        <embed-types />
      </b-col>
      <b-col md="6" sm="12">
        <embed-types />
      </b-col>
    </b-row>
    </div>
  </template>
  
  <script>
  import { BRow, BCol, BCard, BCardBody } from 'bootstrap-vue'
  import EmbedTypes from './EmbedTypes.vue'
  import navbarAds from "./navbarAds.vue"
  export default {
    components: {
      EmbedTypes,
      BRow,
      BCol,
      BCard,
      BCardBody,
      navbarAds
    },
  }
  </script>
<style lang="scss">
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
  