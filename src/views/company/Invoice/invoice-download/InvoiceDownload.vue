<template>
  <b-row class="invoice-preview-list">
    <b-col cols="12" xl="12" md="12">
      <b-card no-body class="invoice-preview">
        <b-card-header class="justify-content-center">
          <div class="d-flex align-items-center" style="gap: 15px">
            <h4 class="m-0">Invoice Number:</h4>
            <p class="m-0 position-relative invoiceNumber">
              {{ invoiceData.invoiceNumber }}
            </p>
          </div>
        </b-card-header>
      </b-card>

      <div
        class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2"
        style="padding: 0 1rem;"
      >
        <!-- Header: Left Content -->
        <div class="mt-md-0 mt-2 flex-1">
          <b-card no-body class="invoice-preview invoice-card">
            <b-card-header class="justify-content-center invoice-header">
              <h5 class="m-0">Supplier</h5>
            </b-card-header>
            <b-card-body class="invoice-body invoice-body-pdf">
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Name:</p>
                <p class="invoice-date">
                  {{ invoiceData.supplierCompany.companName }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Address:</p>
                <p class="invoice-date">
                  {{ invoiceData.supplierCompany.companyAddress }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">ID Number:</p>
                <p class="invoice-date">
                  {{ invoiceData.supplierCompany.companyEic }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Owner:</p>
                <p class="invoice-date">
                  {{ invoiceData.supplierCompany.companyOwnerName }}
                </p>
              </div>
              <div
                v-if="invoiceData.supplierCompany.companyVatEic"
                class="invoice-date-wrapper"
              >
                <p class="invoice-date-title">Vat No:</p>
                <p class="invoice-date">
                  {{ invoiceData.supplierCompany.companyVatEic }}
                </p>
              </div>
            </b-card-body>
          </b-card>
        </div>

        <div class="mt-md-0 mt-2 invoice-data-wrapper-right flex-1">
          <b-card no-body class="invoice-preview invoice-card">
            <b-card-header class="justify-content-center invoice-header">
              <h5 class="m-0">Recipient</h5>
            </b-card-header>
            <b-card-body class="invoice-body invoice-body-pdf">
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Name:</p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companName }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Address:</p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyAddress }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">ID Number:</p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyEic }}
                </p>
              </div>
              <div class="invoice-date-wrapper">
                <p class="invoice-date-title">Owner:</p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyOwnerName }}
                </p>
              </div>
              <div
                v-if="invoiceData.recipientCompany.companyVatEic"
                class="invoice-date-wrapper"
              >
                <p class="invoice-date-title">Vat No:</p>
                <p class="invoice-date">
                  {{ invoiceData.recipientCompany.companyVatEic }}
                </p>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </div>
      <div style="padding: 0 1rem;">
        <b-card no-body class="invoice-preview date-issued">
        <b-card-header class="justify-content-end">
          <div class="invoice-date-wrapper invoice-middle-content">
            <p class="invoice-date-title">Date Issued:</p>
            <p class="invoice-date">
              {{ invoiceData.dateIssued }}
            </p>
          </div>
        </b-card-header>
        </b-card>
      </div>

      <b-card no-body class="invoice-preview-card">
        <!-- Invoice Description: Table -->
        <b-table-lite
          class="invoice-table"
          responsive
          :items="invoiceData.transactions"
          :fields="[
            'no.',
            'serviceOrItemDescription',
            'qty',
            'measurement',
            'singleAmountTransaction',
            'transactionTotalAmountNonVat',
          ]"
        >
          <template #cell(no.)="data">
                {{ data.item.index }}
          </template>
          <template #cell(qty)="data">
              {{ data.item.quantity }}
          </template>
          <template #cell(singleAmountTransaction)="data">
              <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{ data.item.singleAmountTransaction }}</span>
              <span v-else>{{ invoiceData.currency }} {{ data.item.singleAmountTransaction }}</span>
          </template>
          <template #cell(transactionTotalAmountNonVat)="data">
            <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{ data.item.transactionTotalAmountNonVat }}</span>
            <span v-else>{{ invoiceData.currency }} {{ data.item.transactionTotalAmountNonVat }}</span>
          </template>
        </b-table-lite>

        <!-- Invoice Description: Total -->
        <b-card-body class="invoice-padding pb-0">
          <b-row class="invoiceStat">
            <!-- Col: Sales Persion -->
            <b-col cols="12" md="6" class="mt-md-0 mt-3" order="2" order-md="1">
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
                  <p class="invoice-total-title">Total price NonVat:</p>
                  <p class="invoice-total-amount">
                    <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{invoiceData.amountNonVat}}</span>
                    <span v-else>{{ invoiceData.currency }} {{invoiceData.amountNonVat}}</span>
                  </p>
                </div>
                <div class="invoice-total-item">
                  <p class="invoice-total-title">VAT:</p>
                  <p class="invoice-total-amount">
                    {{ invoiceData.vatPercent }} %
                  </p>
                </div>
                <div class="invoice-total-item">
                  <p class="invoice-total-title">VAT Amount:</p>
                  <p class="invoice-total-amount">
                    <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{invoiceData.vatAmount}}</span>
                    <span v-else>{{ invoiceData.currency }} {{invoiceData.vatAmount}}</span>
                  </p>
                </div>
                <div class="invoice-total-item">
                  <p class="invoice-total-title">Discount Percent:</p>
                  <p class="invoice-total-amount">
                    {{ invoiceData.tradeDiscountPercent }} %
                  </p>
                </div>
                <div class="invoice-total-item">
                  <p class="invoice-total-title">Discount Sum:</p>
                  <p class="invoice-total-amount">
                    <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{invoiceData.tradeDiscountAmount}}</span>
                    <span v-else>{{ invoiceData.currency }} {{invoiceData.tradeDiscountAmount}}</span>
                  </p>
                </div>
                <hr class="my-50" />
                <div class="invoice-total-item">
                  <p class="invoice-total-title">Total Price:</p>
                  <p class="invoice-total-amount">
                    <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' || invoiceData.currency == 'лв' || invoiceData.currency == 'лв.'">лв. {{invoiceData.totalAmount}}</span>
                    <span v-else>{{ invoiceData.currency }} {{invoiceData.totalAmount}}</span>
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BTableLite,
  BCardText,
  BButton,
  BAlert,
  BLink,
  VBToggle,
  BCardHeader,
} from "bootstrap-vue";
export default {
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
    BCardHeader,
  },
  props: {
    invoiceData: {
      type: Object,
      required: true,
    },
  }
};
</script>
<style>
.invoice-table th{
  font-size: 10px !important;
}
</style>