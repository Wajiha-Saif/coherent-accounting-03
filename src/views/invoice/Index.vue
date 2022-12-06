<template>
  <div>
    <b-row class="match-height">
      <b-col lg="12" md="12" sm="12">
        <InvoicesTab />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import InvoicesTab from './InvoicesTab.vue'

export default {
  components: {
    BRow,
    BCol,
    InvoicesTab,
  },
}
</script>
