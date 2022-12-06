<template>
  <div>
    <div class="row">
      <div class="col-md-7 col-lg-9 col-xl-9 col-12">
        <!-- Company Details -->
        <div class="card border-primary">
          <!----><!---->
          <div class="card-body" style="padding: 0px">
            <!----><!---->
            <div class="row" style="padding: 15px 0px 18px 15px">
              <div class="d-flex justify-content-between flex-column col-5" style="padding-left: 0.5rem; padding-right:0.5rem">
                <div class="card" style="margin-right: 10px">
                  <div class="card-body" style="padding: 0px">
                    <div class="d-flex justify-content-start">
                      <span
                        class="b-avatar rounded"
                        style="width: 104px; height: 104px"
                      >
                        <feather-icon
                          icon="HomeIcon"
                          size="104"
                          color="#7367f0"
                        />
                      </span>

                      <div class="d-flex flex-column ml-1">
                        <div class="mb-1">
                          <h4 class="mb-0" v-if="companyNameLength >= 43">{{ companyName.substr(0,44) }}</h4>
                          <h4 class="mb-0" v-else>{{ companyRecord.companyName }}</h4>
                          <span class="card-text">{{
                            companyRecord.companyMail
                          }}</span>
                        </div>
                        <div class="d-flex flex-wrap">
                          <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            size="sm"
                            @click="editCompany()"
                            variant="primary"
                            >Edit
                          </b-button>

                          <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="danger"
                            @click="deleteCompany"
                            size="sm"
                            class="ml-1"
                          >
                            Delete
                          </b-button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <div class="d-flex align-items-center mr-2">
                        <feather-icon
                          icon="UserIcon"
                          width="25px"
                          height="25px"
                          style="margin-left: 8px; margin-right: -5px"
                        />
                        <div class="ml-1">
                          <h6 class="mb-0">Owner Name</h6>
                          <small>{{
                            companyOwnerName
                          }}</small>
                        </div>
                      </div>
                      <div class="d-flex align-items-center">
                        <feather-icon
                          icon="InfoIcon"
                          width="25px"
                          height="25px"
                          style="margin-left: 8px; margin-right: -5px"
                        />
                        <div class="ml-1">
                          <h6 class="mb-0">Owner EGN</h6>
                          <small
                            v-if="
                              companyOwnerEGN != null
                            "
                            >{{ companyOwnerEGN }}</small
                          >
                          <small v-else>NIL</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-7">
                <b-row>
                  <b-col cols="12">
                    <table class="mt-2 mt-xl-0 w-100 company-info-table">
                      <tr>
                        <th class="pb-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-star"
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                          </svg>
                          <span class="font-weight-bold">Company ID</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          {{ companyRecord.companyIdentificationNumber }}
                        </td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="FlagIcon" class="mr-75" />
                          <span class="font-weight-bold">Vat Number</span>
                        </th>
                        <td
                          class="pb-50 text-capitalize"
                          v-if="companyRecord.companyVatNumber != null"
                        >
                          {{ companyRecord.companyVatNumber }}
                        </td>
                        <td class="pb-50 text-capitalize" v-else>NIL</td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="CreditCardIcon" class="mr-75" />
                          <span class="font-weight-bold">Bank Account</span>
                        </th>
                        <td
                          v-if="companyRecord.companyBankAccount != null"
                          class="pb-50"
                        >
                          {{ companyRecord.companyBankAccount }}
                        </td>
                        <td class="pb-50" v-else>NIL</td>
                      </tr>
                      <tr>
                        <th>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-phone"
                          >
                            <path
                              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            ></path>
                          </svg>
                          <span class="font-weight-bold">Contact</span>
                        </th>
                        <td class="pb-50">{{ companyRecord.companyPhone }}</td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="MapPinIcon" class="mr-75" />

                          <span class="font-weight-bold">Address</span>
                        </th>
                        <td class="pb-50">
                          {{ companyAddress.substr(0, 38) }}
                        </td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-globe"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path
                              d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                            ></path>
                          </svg>

                          <span class="font-weight-bold">Country</span>
                        </th>
                        <td class="pb-50">
                          {{ companyRecord.companyCountry }}
                        </td>
                      </tr>
                    </table>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <!----><!---->
        </div>
      </div>
      <!-- Summary -->
      <div class="col-md-5 col-lg-3 col-xl-3 col-12">
        <b-card class="border-primary ml-0 body-0" id="inner-card-body">
          <table class="mt-2 mt-xl-0 w-100">
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlignJustifyIcon" class="mr-50" />
                <span class="font-weight-bold">Total Assets</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalAssets }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="FileTextIcon" class="mr-50" />
                <span class="font-weight-bold">Total Invoices</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalInvoices }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlertCircleIcon" class="mr-50" />
                <span class="font-weight-bold">Total NotVerified Invoices</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalNotVerifiedInvoices }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlertTriangleIcon" class="mr-50" />
                <span class="font-weight-bold">Total Private Person</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalPrivatePerson }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="ListIcon" class="mr-50" />
                <span class="font-weight-bold">Total Vat Reports</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalVatReports }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="FileIcon" class="mr-50" />
                <span class="font-weight-bold">Total Yearly Reports</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalYearlyReports }}
              </td>
            </tr>
          </table>
          <div class="button-position-right">
            <b-dropdown
              id="dropdown-4"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              right
              class="company-info-btn"
              variant="outline-primary"
            >
              <b-dropdown-item>Create Invoice</b-dropdown-item>
              <b-dropdown-item>Create Vat Report</b-dropdown-item>
              <b-dropdown-item>Create Private Person</b-dropdown-item>
              <b-dropdown-item>Create Vat Report</b-dropdown-item>
              <b-dropdown-item>Create Yearly Report</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-card>
      </div>
    </div>

    <b-row class="" style="margin-top: 2.5rem">

      <b-col class="mb-1" cols="6">
         <!-- Report time-line card -->
        <b-card no-body style="padding: 0px" class="mb-2"  v-if="monthlyReportGraphDisplay.length > 0" >
          <b-card-header  style="padding: 1.5rem 1.5rem 1.52rem 1rem">
            <b-card-title> Report Timeline </b-card-title>
            <div class="d-flex align-items-center">
              <feather-icon
                @click="refreshMonthReportGraph()"
                icon="RefreshCcwIcon"
                size="17"
                style="cursor: pointer"
              />
              <feather-icon
                icon="ChevronDownIcon"
                size="24"
                class="ml-2"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-toggle.collapse-1
                variant="outline-primary"
                style="margin-right: -10px"
              />
            </div>   
          </b-card-header>
          <b-collapse id="collapse-1" class="mt-1" visible>
            <b-card-body
              style="padding: 0px 15px"
              v-if="monthlyReportGraph.length > 0"
            >
              <app-timeline>
                <app-timeline-item
                  v-for="(graph, index) in monthlyReportGraph"
                  :key="index"
                  :variant="variants[index % variants.length]"
                >
                  <div
                    class="
                      d-flex
                      justify-content-between
                      flex-sm-row flex-column
                      mb-sm-0 mb-1
                    "
                  >
                    <h6>{{ graph.count }} Reports have been created</h6>
                    <small
                      class="timeline-item-time text-nowrap text-muted ml-1"
                      >{{ graph.date }}</small
                    >
                  </div>
                </app-timeline-item>
              </app-timeline>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Company Invoices card -->
        <b-card
          no-body
          style="padding: 0px; margin-top: 29px"
          class="mb-2"
          v-if="companyInvoicesDisplay.length > 0" 
        >
          <b-card-header style="padding: 1.5rem 1.5rem 1.51rem 1rem">
            <b-card-title>Company Invoices</b-card-title>
            <div class="d-flex align-items-center">
              <feather-icon
           
            @click="getCompanyInvoices()"
            icon="RefreshCcwIcon"
            size="17"
            style="cursor: pointer"
        />  
              <feather-icon
                icon="ChevronDownIcon"
                size="24"
                class="ml-2"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-toggle.collapse-2
                variant="outline-primary"
                style="margin-right: -10px"
              />
            </div>
          </b-card-header>
          <b-collapse id="collapse-2" class="mt-1" visible>
          <b-card-body style="padding: 0px 15px; height: auto;
    max-height: 45.7rem;
    overflow-y: scroll;"
     v-if="companyInvoices.length > 0">
            <b-table
              :items="companyInvoices"
              responsive
              :fields="tableColumns"
              primary-key="id"
              class="position-relative invoiceList"
              :sort-by.sync="sortBy"  
              :sort-desc.sync="sortDesc" 
              @sort-changed="checkStatus"
            >

              <template #cell(id)="data">
                <b-link
                  :to="{
                    name: 'company-invoice-preview',
                    params: { companyId: companyID, id: data.item.id },
                  }"
                  class="font-weight-bold"
                >
                #{{ data.item.id }}
                </b-link>
              </template>

              <!-- Column: invoiceNumber -->
              <template #cell(invoiceNumber)="data">
                <b-link
                  :to="{
                    name: 'company-invoice-preview',
                    params: {  companyId: companyID , id: data.item.id },
                  }"
                  class="font-weight-bold"
                >
                <span class="text-nowrap">
                  {{ data.item.invoiceNumber }}
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
                  :to="{
                   name: 'company-invoice-preview',
                    params: {  companyId: companyID , id: data.item.id },
                  }"
                  class="font-weight-bold"
                >
                <span class="text-nowrap">
                  {{ data.item.documentType }}
                </span>
                </b-link>
              </template>

              <!-- Column: recipientCompany -->
              <template #cell(recipientCompanyName)="data">
                <span
                  class="text-nowrap"
                  :id="`recipientCompany-row-${data.item.id}`"
                >
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
                    Company Owner Name:
                    {{ data.item.recipientCompany.companyOwnerName }}
                  </p>

                </b-tooltip>
              </template>

              <!-- Column: supplierCompany -->
              <template #cell(supplierCompanyName)="data">
                <span
                  class="text-nowrap"
                  :id="`supplierCompany-row-${data.item.id}`"
                >
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
                    Company Owner Name:
                    {{ data.item.supplierCompany.companyOwnerName }}
                  </p>

                </b-tooltip>
              </template>

              <!-- Column: amount non vat -->
              <template #cell(amountNonVat)="data">
                <span class="text-nowrap">
                  <span
                    v-if="
                      data.item.currency == 'lv' || data.item.currency == 'LV'
                    "
                    >лв{{ data.value }}</span
                  >

                  <span v-if="data.item.currency == 'usd'"
                    >${{ data.value }}</span
                  >
                  <span v-if="data.item.currency == 'euro'"
                    >€{{ data.value }}</span
                  >
                </span>
              </template>

              <!-- Column: totalAmount -->
              <template #cell(totalAmount)="data">
                <span class="text-nowrap">
                  <span
                    v-if="
                      data.item.currency == 'lv' || data.item.currency == 'LV'
                    "
                    >лв{{ data.value }}</span
                  >
                  <span v-if="data.item.currency == 'usd'"
                    >${{ data.value }}</span
                  >
                  <span v-if="data.item.currency == 'euro'"
                    >€{{ data.value }}</span
                  >
                </span>
              </template>

              <!-- Column: vatAmount -->
              <template #cell(vatAmount)="data">
                <span class="text-nowrap">
                  <span
                    v-if="
                      data.item.currency == 'lv' || data.item.currency == 'LV'
                    "
                    >лв{{ data.value }}</span
                  >
                  <span v-if="data.item.currency == 'usd'"
                    >${{ data.value }}</span
                  >
                  <span v-if="data.item.currency == 'euro'"
                    >€{{ data.value }}</span
                  >
                </span>
              </template>

              <!-- Column: Actions -->
              <template #cell(actions)="data">
                <div class="text-nowrap">
                  <feather-icon
                    :id="`invoice-row-${data.item.id}-preview-icon`"
                    icon="EyeIcon"
                    size="16"
                    class="mx-1 cursor-pointer"
                    @click="
                      $router.push({
                        name: 'company-invoice-preview',
                        params: { companyId: companyID , id: data.item.id },
                      })
                    "
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
                    <b-dropdown-item
                      :to="{
                        name: 'apps-invoice-edit',
                        params: { id: data.item.id },
                      }"
                    >
                      <feather-icon icon="EditIcon" />
                      <span class="align-middle ml-50">Edit</span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="deleteCompanyInvoice(data.item.id)"
                    >
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
                    <section
                      class="invoice-pdf invoice-preview-list"
                      slot="pdf-content"
                    >
                      <invoice-download :invoice-data="data.item" />
                    </section>
                  </vue-html2pdf>
                </div>
              </template>
            </b-table>
            
          </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col class="mb-1" cols="6">
        <!-- Invoices Per Day -->
        <ApexBarChart
          class="mb-1"
          chart-type="daily"
          title="Invoices Per Day"
        />
        <!-- Invoices Per Month -->
        <ApexBarChart
          class="mb-1"
          chart-type="monthly"
          title="Invoices Per Month"
        />
      </b-col>
    </b-row>
  </div>
</template>
  
  <script>
import axios from "@/libs/axios";
import Swal from "sweetalert2";
import Ripple from "vue-ripple-directive";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem.vue";
// eslint-disable-next-line import/extensions
import ApexBarChart from "@/views/company/ApexBarChart";
import VueHtml2pdf from "vue-html2pdf";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import InvoiceDownload from '../../invoice/invoice-download/InvoiceDownload.vue'

const chartColors = {
  primaryColorShade: "#836AF9",
  yellowColor: "#ffe800",
  successColorShade: "#28dac6",
  warningColorShade: "#ffe802",
  warningLightColor: "#FDAC34",
  infoColorShade: "#299AFF",
  greyColor: "#4F5D70",
  blueColor: "#2c9aff",
  blueLightColor: "#84D0FF",
  greyLightColor: "#EDF1F4",
  tooltipShadow: "rgba(0, 0, 0, 0.25)",
  lineChartPrimary: "#666ee8",
  lineChartDanger: "#ff4961",
  labelColor: "#6e6b7b",
  grid_line_color: "rgba(200, 200, 200, 0.2)",
};

import {
  BCard,
  BRow,
  BCol,
  BLink,
  BDropdown,
  BDropdownItem,
  BCardTitle,
  BCardBody,
  BCardHeader,
  VBTooltip,
  BButton,
  BTable,
  BBadge,
  BTooltip,
  BCollapse,
  VBToggle,
} from "bootstrap-vue";

export default {
  components: {
    BLink,
    BRow,
    BCol,
    BCard,
    BDropdown,
    BDropdownItem,
    BCardTitle,
    BCardBody,
    BCardHeader,
    AppTimeline,
    AppTimelineItem,
    ApexBarChart,
    BButton,
    BTable,
    BBadge,
    BTooltip,
    BCollapse,
    VBToggle,
    VueHtml2pdf,
    InvoiceDownload
  },
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  data() {
    return {
      companyAddress:'',
      companyName:'',
      companyNameLength: '',
      sortBy : 'id',
      sortDesc: false,
      tableColumns: [
        { key: "id", label: "#", sortable: true},
        { key: "invoiceNumber", sortable: true },
        { key: "invoiceDate", label: "date Issued", sortable: true },
        { key: "documentType", sortable: true },
        {
          key: "recipientCompanyName",
          label: "recipient Company",
          sortable: true
        },
        {
          key: "supplierCompanyName",
          label: "supplier Company",
          sortable: true
        },
        { key: "amountNonVat", label: "Amount Non Vat", sortable: true},
        { key: "totalAmount", sortable: true },
        { key: "vatAmount", sortable: true },
        { key: "actions" },
      ],
      companyInvoices: [],
      companyInvoicesDisplay: [],
      pageNumber: 1,
      perPageInvoices: 30,
      invoiceDirection: "asc",
      invoiceSortField: "id",
      companyID: "",
      companyRecord: {},
      companyOwnerName: "",
      companyOwnerEGN:"",
      statisticItems: {
        totalAssets: 0,
        totalInvoices: 0,
        totalNotVerifiedInvoices: 0,
        totalPrivatePerson: 0,
        totalVatReports: 0,
        totalYearlyReports: 0,
      },
      variants: ["primary", "danger", "info", "warning"],
      monthlyReportGraph: [],
      monthlyReportGraphDisplay: [],
      dailyInvoices: [],
      rangePicker: [],
    };
  },
  created() {
    this.companyID = this.$route.params.id;
    this.getCompanyInfo();
    this.getStatistics();
    this.getMonthReportGraph();
    this.getCompanyInvoices();
  },
  methods: {
    // delete a single company invoice
    async deleteCompanyInvoice(invoiceID) {
      let self = this;
      var config = {
        method: "delete",
        url: "/account/api/invoice/" + invoiceID,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      };

      await axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          self.$toast({
            component: ToastificationContent,
            props: {
              title: `Company Invoice Deleted Successfully`,
              icon: "DeleteIcon",
              variant: "success",
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
        setTimeout(() => {
          this.getCompanyInvoices();
      }, 1400);
    },
    // 
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    //
    generatePDF(itemID) {
      this.$refs['invoicePdf'+itemID].generatePdf();
    },
    // 
    checkStatus(ctx){
      if(ctx.sortDesc === false){
        this.invoiceDirection = "asc";
      }
      else{
        this.invoiceDirection = "desc";
      }
      this.invoiceSortField = ctx.sortBy;
     this.getCompanyInvoices();
     
    },
    // 
    refreshMonthReportGraph() {
      this.monthlyReportGraph = [];
      this.getMonthReportGraph();
    },
    //company invoices data
    async getCompanyInvoices() {
      let self = this;
      self.companyInvoices=[];
      const data = await axios
        .get(
          "/account/api/invoice/list/" +
            this.companyID +
            "/" +
            this.pageNumber +
            "/" +
            this.perPageInvoices +
            "?direction=" +
            this.invoiceDirection +
            "&sortField=" +
            this.invoiceSortField +
            "&verified=true",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "http://localhost:8080",
            },
          }
        )
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          self.companyInvoices = response.data.elements;
          self.companyInvoicesDisplay = response.data.elements;

        })
        .catch(function (error) {
          console.log(error);
        });

    },
    getMonthReportGraph() {
      axios
        .get(
          `/account/api/company/reports-month-graph/${this.$route.params.id}`
        )
        .then((response) => {
          this.monthlyReportGraph = response.data;
          this.monthlyReportGraphDisplay = response.data;

        });
    },
    // delete the company
    async deleteCompany() {
      const config = {
        method: "delete",
        url: `/account/api/company/${this.companyID}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      };
      await axios(config)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Company Deleted!",
            showConfirmButton: false,
            timer: 1400,
          });
        })
        .catch((error) => {
          // console.log(error);
        });
      setTimeout(() => {
        this.$router.go(-1);
      }, 1410);
    },
    //function to edit the record of company
    async editCompany() {
      await this.$router.push({
        name: "EditCompany",
        params: { id: this.companyRecord.id },
      });
    },
    //
    async getCompanyInfo() {
      const data = await axios.get(`/account/api/company/${this.companyID}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });
      if (data.status === 200) {
        this.companyRecord = data.data;
        this.companyNameLength = this.companyRecord.companyName.length;
        this.companyOwnerName = this.companyRecord.companyOwnerApi.companyOwnerName;
        this.companyOwnerEGN = this.companyRecord.companyOwnerApi.ownerEGN;
        this.companyName = this.companyRecord.companyName;
        this.companyAddress = this.companyRecord.companyAddress;


      }
    },
    async getStatistics() {
      axios(
        `/account/api/company/statistics-items-count/${this.$route.params.id}`
      )
        .then((response) => {
          this.statisticItems = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
  
  <style scoped>
.rounded {
  border-radius: 0.6rem !important;
}

.card {
  margin-bottom: 0rem;
}

.card-body {
  /* padding-top: 1.1rem !important;
  padding-bottom: 0.8rem !important; */
}

#inner-card-body .card-body {
  padding: 18px 15px 15px 15px;
}
</style>
  