<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="4"
        md="6"
      >
        <ecommerce-medal />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col
        xl="4"
        md="6"
      >
        <crm-active-project/>
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
      <crm-report />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col
        xl="12"
        md="12"
      >
        <Companies />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BCard, BCardText, BLink, BRow, BCol } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import EcommerceMedal from './dashboard/ecommerce/EcommerceMedal.vue'
import EcommerceStatistics from './dashboard/ecommerce/EcommerceStatistics.vue'
import CrmActiveProject from './dashboard/crm/CrmActiveProject.vue'
import CrmReport from './dashboard/crm/Reports.vue'
import Companies from '@/views/company/Index.vue'
export default {
  components: {
    BCard,
    BCardText,
    BRow, 
    BCol,
    BLink,
    EcommerceMedal,
    EcommerceStatistics,
    CrmActiveProject,
    CrmReport,
    Companies
  },
  data() {
    return {
      data: {
        statisticsItems: {},
      },
    }
  },
  created() {
    // data
   
    this.$http.get('/account/api/dashboard/total-entities-count')
      .then(response => {
        this.data.statisticsItems = response.data
      })

  }
}
</script>

<style>

</style>
