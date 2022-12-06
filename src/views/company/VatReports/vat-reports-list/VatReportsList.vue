<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
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
            class="mr-1"
            variant="primary"
            @click="actionTab"
            :to="{
              name: 'company-vat-report-add',
              params: { companyId: $route.params.id },
            }"
          >
            Add Record
          </b-button>

          <!-- Generate Button -->

          <b-button v-b-modal.modal-prevent-closing variant="primary">
            Generate
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
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

    <!-- Modal pop-up to select month -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Select Month"
      ok-title="Submit"
      cancel-title="Close"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleMonthSelected">
        <validation-observer ref="selectMonthRules" tag="form">
          <validation-provider
            #default="{ errors }"
            v-bind:name="$t('month_selected')"
            rules="required"
          >
            <vue-monthly-picker
              v-model="selectedMonthData.date"
              id="month_selected"
              name="month_selected"
              dateFormat="Y-MM"
              :monthLabels="monthLabels"
              :class="errors.length > 0 ? 'is-invalid' : null"
              placeHolder="Please Select: "
            >
            </vue-monthly-picker>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </validation-observer>
      </form>
    </b-modal>

    <!-- Modal pop-up containing the list of invoices for vat report -->
    <b-modal
      id="modal-invoices-for-report"
      ref="modal"
      title="Invoices for Vat Reports"
      ok-title="Download Zip"
      cancel-title="Close"
      @ok="getZipFile()"
      scrollable
    >
      <form ref="form" @submit.stop.prevent="handleMonthSelected">
        <!-- Vat Reports Table -->
        <b-table
          :items="invoicesForReport"
          responsive
          :fields="InvoicesTableColumns"
          primary-key="id"
          show-empty
          empty-text="No matching records found"
          class="position-relative invoiceList"
        > 
          <template #cell(isChecked)="data">
            <b-form-checkbox
              :id="'checkbox' + data.item.id"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
              v-model="status[data.item.id]"
              ></b-form-checkbox
            >
          </template>

          <!-- Column: Id -->
          <template #cell(id)="data"> #{{ data.value }} </template>

          <!-- Column: cell-01 -->
          <template #cell(invoiceNumber)="data">
            <span class="text-nowrap">
              {{ data.value }}
            </span>
          </template>

          <!-- Column: cell-20 -->
          <template #cell(dateIssued)="data">
            <span class="text-nowrap">
              {{ data.value }}
            </span>
          </template>
        </b-table>
      </form>
    </b-modal>

    <!-- Vat Reports Table -->
    <b-table
      ref="refVatReportsTable"
      :items="fetchVatReports"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
    >
      <!-- Column: Id -->
      <template #cell(id)="data">
        <!-- <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        > -->
        #{{ data.value }}
        <!-- </b-link> -->
      </template>

      <!-- Column: cell-01 -->
      <template #cell(cell-01)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-20 -->
      <template #cell(cell-20)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-30 -->
      <template #cell(cell-30)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-31 -->
      <template #cell(cell-31)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-40 -->
      <template #cell(cell-40)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-50 -->
      <template #cell(cell-50)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-60 -->
      <template #cell(cell-60)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-70 -->
      <template #cell(cell-70)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-71 -->
      <template #cell(cell-71)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon
            :id="`report-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1 cursor-pointer"
            @click="
              $router.push({
                name: 'company-vat-report-preview',
                params: { id: data.item.id, companyId: companyID },
              })
            "
          />
          <b-tooltip
            title="Preview Report"
            class="cursor-pointer"
            :target="`report-row-${data.item.id}-preview-icon`"
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
            <!-- <b-dropdown-item @click="generatePDF(data.item.id)">
            <feather-icon icon="DownloadIcon" />
            <span class="align-middle ml-50">Download</span>
          </b-dropdown-item> -->
            <b-dropdown-item
              :to="{
                name: 'company-vat-report-edit',
                params: { companyId: companyID, id: data.item.id },
              }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="vatReportDelete(data.item.id, refetchData)"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-table>
  </b-card>
</template>
  
  <script>
import {
  BCard,
  BRow,
  BCol,
  BCardBody,
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
  BTableLite,
  BCardText,
  BAlert,
  VBToggle,
  BCardHeader,
  BFormCheckbox,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useVatReportsList from "./useVatReportsList";
import VueHtml2pdf from "vue-html2pdf";
import vatReportsStoreModule from "../vatReportsStoreModule";
import useJwt from "@/auth/jwt/useJwt";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { extend } from "vee-validate";
import VueMonthlyPicker from "vue-monthly-picker";

import axios from "@/libs/axios";

extend("required", {
  ...required,
  message: "This field is mandatory",
});

export default {
  props: ["vatReportsTab"],
  methods: {
    state() {
      return 1;
    },

    //getting zip file from backend
    getZipFile() {
      let j = 0;
      for (let i = 0; i < this.totalInvoicesForReport; i++) {
        if (this.status[this.invoicesForReport[i].id] == "accepted") {
          this.idsToSend[j] = this.invoicesForReport[i].id;
          j++;
        }
      }

      let token = useJwt.getToken();
      useJwt.GetVatReportsZip(token, this.idsToSend).then((response) => {
        if(response.data.fileId != null){
        const data = JSON.parse(response.data.fileId);
        axios
          .get(
            `${axios.defaults.baseURL}/binaries/api/get-binary/${data.binaryId}/${data.companyId}`,
            { responseType: "blob" }
          )
          .then((response) => {
            // console.log(response);
            if (response.status === 200) {
              const reader = new FileReader();
              reader.readAsDataURL(response.data);
              reader.onload = function () {
                const filePath = reader.result;
                const a = document.createElement("a");
                a.href = filePath;
                a.download = `${data.binaryId}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              };
            }
          })
          .catch((error) => {
            // console.log(error);
            this.makeToast(
              "danger",
              error.response.errorCode,
              error.response.errorMessage
            );
          });
        }
        });
    },

    //
    resetModal() {
      this.selectedMonthData.date = "";
    },

    //
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleMonthSelected();
    },

    //
    handleMonthSelected() {
      this.$refs.selectMonthRules.validate().then((success) => {
        if (success) {
          let monthVal;
          let tPeriod = this.selectedMonthData.date._i;

          let year = tPeriod.substring(0, 4);
          let month = tPeriod.substring(5, tPeriod.length);

          if (month.length === 1) {
            monthVal = year + "-0" + month + "-01";
          } else {
            monthVal = year + "-" + month + "-01";
          }

          this.selectedMonthData.date = monthVal;
          let token = useJwt.getToken();
          useJwt
            .InvoicesForVatReport(token, this.selectedMonthData)
            .then((response) => {
              this.invoicesForReport = response.data.elements;
              this.totalInvoicesForReport = response.data.totalElements;
              for (let i = 0; i < this.totalInvoicesForReport; i++) {
                this.status[this.invoicesForReport[i].id] = "accepted";
              }
              // console.log(this.invoicesForReport);
            });
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });

          this.$nextTick(() => {
            this.$bvModal.show("modal-invoices-for-report");
          });
        }
      });
    },

    //
    actionTab() {
      this.$emit("state", this.state());
    },

    //Delete vat report
    vatReportDelete(id, refetchData) {
      let token = useJwt.getToken();
      useJwt
        .DeleteVatReport(token, id)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Vat Deleted Successfully`,
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          refetchData();
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
  },
  data() {
    return {
      checkedAll: true,
      idsToSend: [],
      totalInvoicesForReport: "",
      status: [],
      invoicesForReport: [],
      selectedMonthData: {
        companyId: "",
        date: "",
        pageNumber: 1,
        pageSize: 5000,
      },
      companyID: "",
      monthLabels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      InvoicesTableColumns: [
        { key: "isChecked", label: "" },
        { key: "id", label: "#", sortable: true },
        { key: "invoiceNumber" },
        { key: "dateIssued", label: "date Issued" },
      ],
    };
  },
  created: function () {
    this.companyID = this.$route.params.id;
    this.selectedMonthData.companyId = this.companyID;
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
    BFormCheckbox,
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    //   InvoiceDownload
    useVatReportsList,
    vatReportsStoreModule,
    ValidationProvider,
    ValidationObserver,
    VueMonthlyPicker,
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "vat-reports";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(
        INVOICE_APP_STORE_MODULE_NAME,
        vatReportsStoreModule
      );

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      companyId,
      totalVatReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVatReportsTable,

      refetchData,
    } = useVatReportsList();

    companyId.value = router.currentRoute.params.id;

    return {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      companyId,
      totalVatReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVatReportsTable,
      refetchData,
      avatarText,
    };
  },
};
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
@import "@core/scss/vue/libs/vue-select.scss";
.invoiceList th {
  position: relative;
  vertical-align: middle !important;
}
.gap-2 {
  grid-gap: 25px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.invoice-preview-list .invoice-date-wrapper {
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}
.invoice-preview-list .invoice-date-wrapper p.invoice-date-title {
  width: 12rem !important;
  min-width: max-content;
  font-size: 12px;
}
.invoice-preview-list
  .invoice-date-wrapper.invoice-middle-content
  p.invoice-date-title {
  width: auto !important;
  min-width: max-content;
}

.invoiceStat .invoice-total-item {
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}
.invoice-preview-list .invoice-date-title,
.invoiceStat .invoice-total-item .invoice-total-title {
  font-weight: 500 !important;
}
.invoice-preview-list .invoice-date {
  font-weight: bold !important;
}
.invoice-preview.date-issued {
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}
.invoiceNumber {
  font-weight: 500;
  font-size: 16px;
}
.card.invoice-card {
  border: 1px solid #ebe9f1;
  border-radius: 20px;
  overflow: hidden;
  height: calc(100% - 2rem);
}
.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
}
.card-header.invoice-header {
  background-color: #7367f0 !important;
  padding: 0.75rem;
  border: 0;
  border-radius: 0;
}
.card-header.invoice-header h5 {
  color: #fff !important;
}

.card-body.invoice-body .invoice-date-wrapper {
  margin-bottom: 0 !important;
  padding: 0.2rem 0 !important;
  border-bottom: 1px solid #ebe9f1;
}
.dark-layout .card-body.invoice-body .invoice-date-wrapper {
  border-color: #3b4253 !important;
}
.card-body.invoice-body.invoice-body-pdf {
  padding: 1rem;
  padding-top: 0;
}

.flex-1 {
  flex: 1;
}
.invoice-pdf {
  background-color: #f8f8f8;
}

.dark-layout .invoice-pdf {
  background-color: #161d31;
}
.invoice-preview .invoice-date-wrapper .invoice-date-title,
.invoice-preview .invoice-date-wrapper .invoice-date {
  margin-bottom: 0;
}
.invoice-pdf .gap-2 {
  gap: 15px;
}

.vue-monthly-picker .input {
  width: 76% !important;
}

.vue-monthly-picker .selected {
  background-color: #7367f0 !important;
}

@media (min-width: 576px) {
  .modal-dialog {
    margin: 16rem auto auto auto;
  }

  #modal-invoices-for-report .modal-dialog {
    max-width: 900px !important;
  }

  #modal-invoices-for-report .modal-dialog {
    margin: 8rem auto auto auto;
    height: auto;
    max-height: 42rem !important;
  }
}
</style>
  