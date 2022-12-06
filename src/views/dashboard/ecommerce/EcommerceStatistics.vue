<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Statistics</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body dashboard-stats">
      <b-row>
        <b-col
          v-for="(item, name, index) in data"
          :key="index"
          xl="4"
          sm="6"
          style="margin-bottom: 2rem;"
        >
          <b-media no-body>
            <b-media-aside
              class="mr-2"
            >
              <b-avatar
                size="42"
                :class="`${index == 0 ? 'text-primary' : 
                           index == 1 ? 'text-success' :
                           index == 2 ? 'text-danger' :
                           index == 3 ? 'text-warning' :
                           index == 4 ? 'text-info' : 
                           'text-primary' } 
                        bg-transparent position-relative`"
              >
                <svg-icon type="mdi" 
                    :path="`${index == 0 ? path : 
                           index == 1 ? path1 :
                           index == 2 ? path2 :
                           index == 3 ? path3 :
                           index == 4 ? path4 : 
                           path5 } `">
                </svg-icon>
                <span class="v-avatar__underlay"></span>
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item }}
              </h4>
              <b-card-text class="font-small-3 mb-0 text-capitalize">
                {{ name.replace(/([A-Z])/g, ' $1').trim() }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiReceiptTextOutline } from '@mdi/js'
import { mdiChartPie } from '@mdi/js';
import { mdiChartScatterPlot } from '@mdi/js';
import { mdiDomain } from '@mdi/js';
import { mdiPrinterPos } from '@mdi/js';
import { mdiBallot } from '@mdi/js';
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    SvgIcon
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data(){
    return {
        path:  mdiReceiptTextOutline,
        path1: mdiChartPie,
        path2: mdiChartScatterPlot,
        path3: mdiDomain,
        path4: mdiPrinterPos ,
        path5: mdiBallot,
    }
  }
}
</script>
<style>
.v-avatar__underlay {
    background: currentColor;
    opacity: 0.12;
    border-radius: inherit;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
}
</style>
