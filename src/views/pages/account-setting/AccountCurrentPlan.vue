<template>
  <b-card>
    <b-card-title>Current Plan</b-card-title>
    <b-row>
      <b-col cols="6">
        <h4>Your Current Plan is Basic</h4>
        <p>A simple start for everyone</p>
      </b-col>
      <b-col cols="6" class="p-0">
        <b-alert show variant="danger" class="p-75">
          <h4>Your Current Plan is Basic</h4>
          <p>A simple start for everyone</p>
        </b-alert>
      </b-col>
      <b-col cols="6">
        <h4>Your Current Plan is Basic</h4>
        <p>A simple start for everyone</p>
      </b-col>
      <b-col cols="6">
        <div class="progress-wrapper">
            <div class="d-flex align-items-center justify-content-between">
              <b-card-title>Days</b-card-title>
              <h5>24 of 30 Days</h5>
            </div>
<!--          <h4 class="mb-0">-->
<!--            {{ value1+'%' }}-->
<!--          </h4>-->
          <b-progress
              v-model="value1"
              max="100"
          />
          <p>6 days remaining until your plan requires update</p>
        </div>
      </b-col>
      <b-col cols="6">
        <h4>$199 Per Month popular</h4>
        <p>Standard Plan for small to medium business</p>
      </b-col>
      <!-- buttons -->
      <b-col cols="12">
        <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            type="submit"
        >
          Update Plan
        </b-button>
        <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
        >
          Cancel Subscription
        </b-button>
      </b-col>
      <!--/ buttons -->

    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardTitle,
  BRow,
  BCol,
  BProgress,
  BAlert,
  BButton,
}
from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  name: 'AccountCurrentPlan',
  components: {
    BCard,
    BCardTitle,
    BRow,
    BCol,
    BProgress,
    BAlert,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      value1: 50,
    }
  },
}
</script>

<style scoped>

</style>