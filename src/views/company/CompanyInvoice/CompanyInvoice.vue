<template>
  <section class="invoice-preview-wrapper">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="invoiceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching invoice data
      </h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-invoice-list'}"
        >
          Invoice List
        </b-link>
        for other invoices.
      </div>
    </b-alert>

    <b-row
      v-if="invoiceData"
      class="invoice-preview-list"
    >

      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        xl="10"
        md="10"
      >
   
        <b-card
          no-body
          class="invoice-preview"
        >
          <b-card-header class="justify-content-center"> 
            <div class="d-flex align-items-center" style="gap: 15px">
              <h4 class="m-0">
                Invoice Number:
              </h4>
              <p class="m-0 position-relative invoiceNumber">
                {{ invoiceData.invoiceNumber }}
              </p>
            </div>
          </b-card-header>
        </b-card>
        
        <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2">
          <!-- Header: Left Content -->
          <div class="mt-md-0 mt-2 flex-1">
            <b-card
              no-body
              class="invoice-preview invoice-card"
            > 
              <b-card-header class="justify-content-center invoice-header">
                  <h5 
                    class="m-0" 
                  >
                    Supplier
                  </h5>
              </b-card-header>
              <b-card-body class="invoice-body">
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Company Name:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companName }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Company Address:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyAddress }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Company ID Number:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyEic }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Company Owner:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyOwnerName }}
                  </p>
                </div>
                <div v-if="invoiceData.supplierCompany.companyVatEic" class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    Company Vat No (if exists):
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyVatEic }}
                  </p>
                </div>
              </b-card-body>
            </b-card>
          </div>

          <div class="mt-md-0 mt-2 invoice-data-wrapper-right flex-1">
            <b-card
              no-body
              class="invoice-preview invoice-card"
            > 
              <b-card-header class="justify-content-center invoice-header">
                  <h5 class="m-0">Recipient</h5>
              </b-card-header>
              <b-card-body class="invoice-body">
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">
                  Company Name:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companName }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">
                  Company Address:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyAddress }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">
                  Company ID Number:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyEic }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">
                  Company Owner:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyOwnerName }}
                </p>
              </div>
              <div v-if="invoiceData.recipientCompany.companyVatEic" class="invoice-date-wrapper">
                <p class="invoice-date-title">
                  Company Vat No (if exists):
                </p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyVatEic }}
                </p>
              </div>
              </b-card-body>
              </b-card>
          </div>
        </div>

        <b-card
          no-body
          class="invoice-preview date-issued"
        >
          <b-card-header class="justify-content-end"> 
            <div class="invoice-date-wrapper invoice-middle-content">
              <p class="invoice-date-title">
                Date Issued:
              </p>
              <p class="invoice-date">
                {{ invoiceData.dateIssued }}
              </p>
            </div>
          </b-card-header>
        </b-card>
         
        <b-card
            no-body
            class="invoice-preview-card"
        >
          <!-- Invoice Description: Table -->
          <b-table-lite
            responsive
            :items="invoiceData.transactions"
            :fields="['serviceOrItemDescription', 'quantity', 'measurement', 'singleAmountTransaction', 'transactionTotalAmountNonVat']"            
          >
            <template #cell(singleAmountTransaction)="data">
              <b-card-text class="font-weight-bold mb-25">
                лв{{ data.item.singleAmountTransaction }}
              </b-card-text>
            </template>
            <template #cell(transactionTotalAmountNonVat)="data">
              <b-card-text class="font-weight-bold mb-25">
                лв{{ data.item.transactionTotalAmountNonVat }}
              </b-card-text>
            </template>
          </b-table-lite>

          <!-- Invoice Description: Total -->
          <b-card-body class="invoice-padding pb-0">
            <b-row class="invoiceStat">

              <!-- Col: Sales Persion -->
              <b-col
                cols="12"
                md="6"
                class="mt-md-0 mt-3"
                order="2"
                order-md="1"
              >
              </b-col>

              <!-- Col: Total -->
              <b-col
                cols="12"
                md="6"
                class="mt-md-6 d-flex justify-content-end"
                order="1"
                order-md="2"
              >
                <div class="invoice-total-wrapper">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Total price NonVat:
                    </p>
                    <p class="invoice-total-amount">
                      лв{{invoiceData.amountNonVat}}
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      VAT:
                    </p>
                    <p class="invoice-total-amount">
                      {{invoiceData.vatPercent}}%
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      VAT Amount:
                    </p>
                    <p class="invoice-total-amount">
                      лв{{invoiceData.vatAmount}}
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Discount Percent:
                    </p>
                    <p class="invoice-total-amount">
                      {{invoiceData.tradeDiscountPercent}}%
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Discount Sum:
                    </p>
                    <p class="invoice-total-amount">
                      лв{{invoiceData.tradeDiscountAmount}}
                    </p>
                  </div>
                  <hr class="my-50">
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      Total Price:
                    </p>
                    <p class="invoice-total-amount">
                      лв{{invoiceData.totalAmount}}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>

        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="2"
        xl="2"
        class="invoice-actions"
      >
        <b-card>
          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="generatePDF()"
          >
            Download
          </b-button>

          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1100"
            filename="invoice"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            :pdf-margin="10"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            ref="html2Pdf"
          >
            <section class="invoice-pdf" slot="pdf-content">
              <div v-if="invoiceData">
                <invoice-download :invoice-data="invoiceData"  />
              </div>
              <b-alert
                variant="danger"
                :show="invoiceData === undefined"
              >
                <h4 class="alert-heading">
                  Error fetching invoice data
                </h4>
                <div class="alert-body">
                  No invoice found with this invoice id. Check
                  <b-link
                    class="alert-link"
                    :to="{ name: 'apps-invoice-list'}"
                  >
                    Invoice List
                  </b-link>
                  for other invoices.
                </div>
              </b-alert>
            </section>
          </vue-html2pdf>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printInvoice"
          >
            Print
          </b-button>

          <!-- Button: Edit -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            :to="{ name: 'apps-invoice-edit', params: { id: $route.params.id } }"
          >
            Edit
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <company-invoice-sidebar-send-invoice />
    <company-invoice-sidebar-add-payment />
  </section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BTableLite, BCardText, BButton, BAlert, BLink, VBToggle,BCardHeader
} from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'
import CompanyInvoiceStoreModule from './CompanyInvoiceStoreModule.js'
import CompanyInvoiceSidebarSendInvoice from './CompanyInvoiceSidebarSendInvoice'
import CompanyInvoiceSidebarAddPayment from './CompanyInvoiceSidebarAddPayment'
import CompanyInvoiceDownload from './CompanyInvoiceDownload'
import VueHtml2pdf from "vue-html2pdf";
import InvoiceDownload from '../../invoice/invoice-download/InvoiceDownload'


export default {
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    VueHtml2pdf,
    Logo,
    CompanyInvoiceSidebarAddPayment,
    CompanyInvoiceSidebarSendInvoice,
    BCardHeader,
    CompanyInvoiceDownload,
    InvoiceDownload

  },
  setup() {
    const invoiceData = ref(null)
    

    // Invoice Description
    // ? Your real data will contain this information
  

    const INVOICE_APP_STORE_MODULE_NAME = 'company-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, CompanyInvoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    store.dispatch('company-invoice/fetchCompanyInvoice', { id: router.currentRoute.params.id })
      .then(response => {
        invoiceData.value = response.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          invoiceData.value = undefined
        }
      })

    const printInvoice = () => {
      window.print()
    }

    return {
      invoiceData,
      printInvoice,
    }
  },
  methods: {
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
.gap-2 {
  grid-gap: 25px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.invoice-preview-list .invoice-date-wrapper{
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}
.invoice-preview-list .invoice-date-wrapper p.invoice-date-title{
  width: 12rem !important;
  min-width: max-content;
  font-size: 12px;
}
.invoice-preview-list .invoice-date-wrapper.invoice-middle-content p.invoice-date-title{
  width: auto !important;
  min-width: max-content;
}

.invoiceStat .invoice-total-item{
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}
.invoice-preview-list .invoice-date-title,.invoiceStat .invoice-total-item .invoice-total-title{
  font-weight: 500 !important;
}
.invoice-preview-list .invoice-date{
  font-weight: bold !important;
}
.invoice-preview.date-issued{
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}
.invoiceNumber{
  font-weight: 500;
  font-size: 16px;
}
.card.invoice-card{
  border: 1px solid #ebe9f1;
  border-radius: 20px;
  overflow: hidden;
  height: calc(100% - 2rem );
}
.dark-layout .card.invoice-card{
  border-color: #3b4253!important;
}
.card-header.invoice-header{
    background-color: #7367f0 !important;
    padding: 0.75rem;
    border: 0;
    border-radius: 0;
}
.card-header.invoice-header h5{
  color: #fff !important;
}

.card-body.invoice-body .invoice-date-wrapper{
  margin-bottom: 0 !important;
  padding: 0.2rem 0 !important;
  border-bottom: 1px solid #ebe9f1;
}
.dark-layout .card-body.invoice-body .invoice-date-wrapper{
  border-color: #3b4253!important;
}
.card-body.invoice-body.invoice-body-pdf{
  padding: 1rem;
  padding-top: 0;
}

.flex-1{
  flex: 1;
}
.invoice-pdf{
  background-color: #f8f8f8;
}

.dark-layout .invoice-pdf{
  background-color: #161d31;
}
.invoice-preview .invoice-date-wrapper .invoice-date-title,.invoice-preview .invoice-date-wrapper .invoice-date{
  margin-bottom: 0;
}
.invoice-pdf .gap-2{
  gap: 15px;
}
</style>
