<template>
  <b-col>
    <b-tabs v-model="companyTab">
      <b-tab>
        <template #title>
          <feather-icon icon="BriefcaseIcon"/>
          <span style="font-size: 13px">Company Info</span>
        </template>
        <CompanyInfo
            :company-tab="companyTab"
            @state="update($event)"
        />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon"/>
          <span style="font-size: 13px">Invoices</span>
        </template>
        <Invoice :invoiceTab="invoiceTab" @state="updateInvoiceTab($event)" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon"/>
          <span style="font-size: 13px">Yearly Reports</span>
        </template>
        <YearlyReport/>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon"/>
          <span style="font-size: 13px">Vat Reports</span>
        </template>
        <VatReports :vatReportsTab="vatReportsTab" @state="updateVatReportsTab($event)"/>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FileIcon"/>
          <span style="font-size: 13px">Not Verified Invoices</span>
        </template>
        <NotVerifiedInvoice/>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon"/>
          <span style="font-size: 13px">Documents</span>
        </template>
        <Document/>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon"/>
          <span style="font-size: 13px">Private Persons</span>
        </template>
        <PrivatePersons />
      </b-tab>
    </b-tabs>

    <template #code>
      {{ codeIcon }}
    </template>
  </b-col>
</template>

<script>
import {
  BTabs,
  BTab,
  BCardText,
  BCol,
  BCard,
} from 'bootstrap-vue'
import CompanyInfo from './CompanyInfo/CompanyInfo.vue'
import Invoice from './Invoice/invoice-list/InvoiceList.vue'
import VatReports from './VatReports/vat-reports-list/VatReportsList.vue'
import VATMonthReport from './VATMonthReports/VATMonthReport.vue'
import YearlyReport from './YearlyReports/YearlyReport.vue'
import NotVerifiedInvoice from './Invoice/invoice-list-notVerified/InvoiceList.vue'
import Document from './Documents/Document.vue'
import PrivatePersons from './user/users-list/UsersList.vue'
import { codeIcon } from './code'

export default {
  components: {
    BCol,
    CompanyInfo,
    Invoice,
    VatReports,
    VATMonthReport,
    YearlyReport,
    NotVerifiedInvoice,
    Document,
    BTabs,
    BTab,
    PrivatePersons,
    BCardText,
    BCard,
  },
  data() {
    return {
      codeIcon,
      companyTab: this.$route.params.InvoiceId ? this.$route.params.InvoiceId : 0,
      invoiceTab: 0,
      vatReportsTab: 0,
    }
  },
  methods: {
    update(value) {
      this.companyTab = value
    },
    updateInvoiceTab(value) {
      this.invoiceTab = value
    },
    updateVatReportsTab(value) {
      this.vatReportsTab = value
    }
  },
}
</script>

<style lang="scss">
//
.nav-tabs .nav-link {
  padding: 0.36rem 0.78rem 0.47rem;
}

// .card-body {
//   padding-bottom: 0rem;
// }
#main-card-body .card-body{
  padding: 0px;
}
</style>
