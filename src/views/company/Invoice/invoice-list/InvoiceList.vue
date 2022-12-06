<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="9"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            class="mr-1"
            @click="actionTab"
            :to="{ name: 'company-invoice-add', params: { companyId: $route.params.companyId ? $route.params.companyId : $route.params.id   }}"
          >
            Add Record
          </b-button>
          <b-button
            variant="primary"
            class="mr-1 position-relative p-set"
          >
            <b-form-file
              class="file-input"
              v-model="file"
              @input="addfile(companyId)"
            />

            <b-spinner v-if="fileLoading" small variant="light" />
              Add From File
            <svg-icon width="20" height="20" class="file-upload" type="mdi" :path="path">
            </svg-icon>
          </b-button>
          <b-button
            variant="primary"
            class="mr-1 position-relative p-set"
          >
            <b-form-file
              ref="imageUploader"
              class="file-input"
              multiple
              @change="addMultiplefile"
            />
            <b-spinner v-if="multiplefileLoading" small variant="light" />
             Add Multiple Files
            <svg-icon width="20" height="20" class="file-upload" type="mdi" :path="path1">
            </svg-icon>
          </b-button>

        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="3"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />

          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="fetchInvoices"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
    >

      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId  }}"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: invoiceNumber -->
      <template #cell(invoiceNumber)="data">
        <b-link
          :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId  }}"
          class="font-weight-bold"
        >
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </b-link>
      </template>

      <!-- Column: Issued Date -->
      <template #cell(invoiceDate)="data">
        <span class="text-nowrap">
          {{ data.item.dateIssued }}
        </span>
      </template>

      <template #cell(documentType)="data">
        <b-link
          :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId  }}"
          class="font-weight-bold"
        >
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </b-link>
      </template>

      <template #cell(transactionType)="data">
        <b-link
          :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId  }}"
          class="font-weight-bold"
        >
          <span class="text-nowrap"  :id="`transactionType-row-${data.item.id}`">
            <b-badge
              pill
              :variant="`${ data.value == 'EXPENSE' ? 'light-danger' : 'light-success'}`"
              class="text-capitalize"
            >
              {{ data.value }}
            </b-badge>
          </span>
        </b-link>
      </template>

      <!-- Column: recipientCompany -->
      <template #cell(recipientCompanyName)="data">
        <span class="text-nowrap"  :id="`recipientCompany-row-${data.item.id}`">
          <b-badge
            pill
            :variant="`light-success`"
            class="text-capitalize"
          >
            {{ data.item.recipientCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip
          :target="`recipientCompany-row-${data.item.id}`"
          placement="top"
        >
          <p class="mb-0">
            Company Eic: {{ data.item.recipientCompany.companyEic }}
          </p>
          <p class="mb-0">
            Company Owner Name: {{ data.item.recipientCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.recipientCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.recipientCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.recipientCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: supplierCompany -->
      <template #cell(supplierCompanyName)="data">
 
        <span class="text-nowrap"  :id="`supplierCompany-row-${data.item.id}`">
          <b-badge
            pill
            :variant="`light-success`"
            class="text-capitalize"
          >
            {{ data.item.supplierCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip
          :target="`supplierCompany-row-${data.item.id}`"
          placement="top"
        >
        
          <p class="mb-0">
            Company Eic: {{ data.item.supplierCompany.companyEic }}
          </p>
          <p class="mb-0">
            Company Owner Name: {{ data.item.supplierCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.supplierCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.supplierCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.supplierCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: amount non vat -->
      <template #cell(amountNonVat)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: totalAmount -->
      <template #cell(totalAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: vatAmount -->
      <template #cell(vatAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: currency -->
      <!-- <template #cell(currency)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template> -->

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1 cursor-pointer"
            @click="$router.push({ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId  }})"
          />
          <b-tooltip
            title="Preview Invoice"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="generatePDF(data.item.id)">
              <feather-icon icon="DownloadIcon" />
              <span class="align-middle ml-50">Download</span>
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'company-invoice-edit', params: { id: data.item.id, companyId: companyId  } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="invoiceDelete(data.item.id,refetchData)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
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
            :ref="`invoicePdf${data.item.id}`"
          >
            <section class="invoice-pdf invoice-preview-list" slot="pdf-content">
              <invoice-download :invoice-data="data.item"  />
            </section>
          </vue-html2pdf>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>

      
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol,BCardBody, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,BTableLite,BCardText,BAlert,VBToggle,BCardHeader,BFormFile,BSpinner
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useInvoicesList from './useInvoiceList'
import VueHtml2pdf from "vue-html2pdf";
import invoiceStoreModule from '../invoiceStoreModule'
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import InvoiceDownload from '../invoice-download/InvoiceDownload.vue'
import router from '@/router'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTrayArrowUp } from '@mdi/js';
import { mdiCloudUploadOutline } from '@mdi/js';
export default {
  props: ['invoiceTab'],
  data(){
    return{
      file: null,
      fileLoading: false,
      multiplefile: null,
      multiplefileLoading: false,
      path:  mdiTrayArrowUp,
      path1: mdiCloudUploadOutline
    }
  },
  methods: {
    state() {
      return 1;
    },
    actionTab() {
      this.$emit("state", this.state())
    },
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    generatePDF(itemID) {
      this.$refs['invoicePdf'+itemID].generatePdf();
    },
    invoiceDelete(id, refetchData) {
      let token = useJwt.getToken()
      useJwt
        .DeleteCompanyInvoice(token,id)
        .then((response) => {
          
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Invoice Deleted Successfully`,
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          refetchData()
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    },
    addfile(companyId){
      this.fileLoading = true
      let token = useJwt.getToken()
      let formData = new FormData()
      formData.append('file',this.file)
      this.file = null
      useJwt
        .addFileInvoice(token,companyId,formData)
        .then((response) => {
          this.fileLoading = false
          return this.$router.push({
            name: "company-invoice-add", 
            params: { 
              companyId: companyId,
              invoiceData : response.data
            }
          })
        })
        .catch((error) => {
          this.fileLoading = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    },
    addMultiplefile(event){
      this.multiplefile = event.target.files
      this.multiplefileLoading = true
      let companyID = router.currentRoute.params.companyId ? router.currentRoute.params.companyId : router.currentRoute.params.id
      let token = useJwt.getToken()
      let formData = new FormData()
      for( var i = 0; i < this.multiplefile.length; i++ ){
        formData.append(`files`,this.multiplefile[i]);
      }
      
      useJwt
        .addMultipleFileInvoice(token,companyID,formData)
        .then((response) => {
          this.multiplefileLoading = false
          event.target.value = ''
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `You will see your invoices in "Not verified invoices" tab of the company`,
              icon: "EditIcon",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          this.multiplefileLoading = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    }

  },
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
    BCardBody,
    BTableLite,
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    InvoiceDownload,
    BFormFile,
    BSpinner,
    SvgIcon
  },
  setup() {
    
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      companyId,
      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList()

    companyId.value = router.currentRoute.params.companyId ? router.currentRoute.params.companyId : router.currentRoute.params.id
    
    return {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      companyId,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant
    }
  },

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.invoiceList th{
  position: relative;
  vertical-align: middle !important;
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
.file-input{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
}
.p-set{
  padding-right: calc(1.5rem + 20px);
}
.file-input label{
  cursor: pointer;
}
.file-upload{
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%) !important;
}
</style>
