<template>
    <div>
      <b-tabs class="invoice-tabs-view position-relative overflow-hidden" v-model="invoiceTab">
        <b-tab>
          <template #title>
            <feather-icon icon="BookOpenIcon" />
            <span>List Invoices</span>
          </template>
          <ListInvoices :invoiceTab="invoiceTab" @state="update($event)"  />

        </b-tab>
        <b-tab :style="`display: block !important; position: ${invoiceTab !=1 ? 'absolute' : 'relative' }; visibility: ${invoiceTab !=1 ? 'hidden' : 'visible' }; `">
          <template #title>
            <feather-icon icon="PenToolIcon" />
            <span>Create Invoice</span>
          </template>
          <AddInvoice />
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="UsersIcon" />
            <span>Private Persons</span>
          </template>
          <privatePerson />
        </b-tab>
      </b-tabs>
    </div>
  </template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import { BTabs, BTab, BCardText } from 'bootstrap-vue'
  import { codeIcon } from './code'
  import ListInvoices from './invoice-list/InvoiceList.vue'
  import AddInvoice from './invoice-add/InvoiceAdd.vue'
  import privatePerson from '../user/users-list/UsersList.vue'
  export default {
    components: {
      BCardCode,
      BCardText,
      BTabs,
      BTab,
      ListInvoices,
      AddInvoice,
      privatePerson
    },
    data() {
      return {
        codeIcon,
        invoiceTab: this.$route.params.id ? this.$route.params.id : 0,
      }
    },
    methods: {
        update(value) {
            this.invoiceTab = value;
        }
    }
  }
  </script>
  <style>
  .invoice-tabs-view ul.nav-tabs{
    justify-content: center;
  }
  </style>
  