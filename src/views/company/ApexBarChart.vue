<template>
  <div>
  <!-- Daily -->
  <b-card no-body  :id="'card'+chartType"  v-if="(chartType=== 'daily') && (dailyChartData.length) > 0" style="padding: 0px">
    <b-card-header style="padding: 1.0rem">
        <b-card-title>
          {{title}}
        </b-card-title>

      <div class="d-flex align-items-center" style="padding-right: 0px; padding-left: 0px">
        <feather-icon
            class="mr-2"
            @click="getData()"
            icon="RefreshCcwIcon"
            size="17"
            style="cursor: pointer"
        />
        <feather-icon
            icon="CalendarIcon"
            size="17"
        />
        <flat-pickr
            v-model="rangePicker"
            :config="{ mode: 'range'}"
            class="form-control flat-picker bg-transparent border-0 shadow-none"
            placeholder="YYYY-MM-DD"
            style="width: 200px;
    padding-left: 1.5rem;
    padding-right: 0.5rem;"
        />
        <feather-icon
                icon="ChevronDownIcon"
                size="24"
               
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-toggle="'collapse-'+chartType"
                variant="outline-primary"
                style=""
              />
      </div>
    </b-card-header>
    <b-collapse :id="'collapse-'+chartType" class="" visible>
    <b-card-body  v-if="barChart.chartOptions.xaxis.categories.length > 0" style="padding-top: 0.5rem">
      <vue-apex-charts
        v-if="barChart.chartOptions.xaxis.categories.length > 0"
        type="bar"
        height="350"
        :options="barChart.chartOptions"
        :series="barChart.series"
      />
    </b-card-body>
    </b-collapse>
  </b-card>

   <!-- Monthly -->
  <b-card no-body  :id="'card'+chartType"  v-if="(chartType=== 'monthly') && (monthlyChartData.length > 0)" style="padding: 0px">
    <b-card-header style="padding: 1.0rem">
        <b-card-title>
          {{title}}
        </b-card-title>

      <div class="d-flex align-items-center " style="padding-right: 0px; padding-left: 0px">
        <feather-icon
            class="mr-2"
            @click="getData()"
            icon="RefreshCcwIcon"
            size="17"
            style="cursor: pointer"
        />
        <feather-icon
            icon="CalendarIcon"
            size="17"
        />
        <flat-pickr
            v-model="rangePicker"
            :config="{ mode: 'range'}"
            class="form-control flat-picker bg-transparent border-0 shadow-none"
            placeholder="YYYY-MM-DD"
            style="width: 200px;
    padding-left: 1.5rem;
    padding-right: 0.5rem;"
        />
        <feather-icon
                icon="ChevronDownIcon"
                size="24"
               
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-toggle="'collapse-'+chartType"
                variant="outline-primary"
                style=""
              />
      </div>
    </b-card-header>
    <b-collapse :id="'collapse-'+chartType" class="" visible>
    <b-card-body  v-if="barChart.chartOptions.xaxis.categories.length > 0"  style="padding-top: 0.5rem">
      <vue-apex-charts
        v-if="barChart.chartOptions.xaxis.categories.length > 0"
        type="bar"
        height="350"
        :options="barChart.chartOptions"
        :series="barChart.series"
      />
    </b-card-body>
    </b-collapse>
  </b-card>
  </div>

  
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardSubTitle,
  BCardTitle,
  BCollapse,
  VBToggle,
  VBTooltip,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component'
import "flatpickr/dist/flatpickr.css";
import { $themeColors } from '@themeConfig'
import axios from '@/libs/axios'
import Ripple from "vue-ripple-directive";

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCollapse,
    VBToggle,
    VBTooltip,
    flatPickr,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['chartType', 'title'],
  data() {
    return {
      dailyChartData: [],
      monthlyChartData : [],
      barChart: {
        series: [
          {
            data: [700, 350, 480, 600, 210, 550, 150],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: $themeColors.info,
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '30%',
              endingShape: 'rounded',
            },
          },
          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            // opposite: isRtl,
          },
        },
      },
      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.barChart.series[0].data = [];
      this.barChart.chartOptions.xaxis.categories = [];
      if (this.chartType === 'monthly') {
        this.getInvoicesMonth()
      }
      if (this.chartType === 'daily') {
        this.getInvoicesDay()
      }
    },
    getInvoicesMonth() {
      axios.get(`/account/api/company/invoices-month-graph/${this.$route.params.id}`)
        .then(response => {
          this.monthlyChartData = response.data;
          this.barChart.series[0].data = response.data.map(invoice => invoice.count)
          this.barChart.chartOptions.xaxis.categories = response.data.map(invoice => invoice.date)
          this.rangePicker = [this.barChart.chartOptions.xaxis.categories[this.barChart.chartOptions.xaxis.categories.length - 1], this.barChart.chartOptions.xaxis.categories[0]]
        })
    },
    getInvoicesDay() {
      axios.get(`/account/api/company/invoices-day-graph/${this.$route.params.id}`)
        .then(response => {
          this.dailyChartData = response.data;
          this.barChart.series[0].data = response.data.map(invoice => invoice.count)
          this.barChart.chartOptions.xaxis.categories = response.data.map(invoice => invoice.date)
          this.rangePicker = [this.barChart.chartOptions.xaxis.categories[this.barChart.chartOptions.xaxis.categories.length - 1], this.barChart.chartOptions.xaxis.categories[0]]
        })
    },
  },
}
</script>
