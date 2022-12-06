<template>
  <div>
  
        <form-wizard
          color="#7367F0"
          :title="null"
          :subtitle="null"
          shape="square"
          finish-button-text="Create"
          back-button-text="Previous"
          class="mb-3"
          @on-complete="saveCompany()"
        >
         <!-- First Tab: Company Details -->
          <tab-content title="Company Details" :before-change="validationForm">
            <validation-observer ref="companyRules" tag="form">
              <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Company Details
              </h5>
              <small class="text-muted">
                Enter Your Company Details
              </small>
            </b-col>
            </b-row>
              <b-form-row>
                <!-- Company Name -->
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Company Name"
                    label-for="company_name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_name')"
                      rules="required"
                    >
                      <b-form-input
                        id="company_name"
                        v-model="form.company_name"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Name"
                        @input="SearchCompanyName(form.company_name)"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <b-list-group v-if="showSuggestions === true" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item
                              v-for="data in datalist"
                              :key="data.eic"
                              @click= autoCompletefn(data,1)                        
                            >
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- Company ID -->
                <b-col>
                  <b-form-group
                    id="input-group-2"
                    label="Company Identification Number"
                    label-for="company_identification_number"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_identification_number')"
                      rules="required"
                    >
                      <b-form-input
                        id="company_identification_number"
                        v-model="form.company_identification_number"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Identification Number"
                        @input="SearchCompanyID(form.company_identification_number)"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <b-list-group v-if="showIDSuggestions === true" id="my-company_id" class="input-suggesstions">
                            <b-list-group-item
                              v-for="data in datalistID"
                              :key="data.eic"
                              @click= autoCompletefn(data,2)                        
                            >
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <!-- Company Address -->
                <b-col>
                  <b-form-group
                    id="input-group-3"
                    label="Company Address"
                    label-for="company_address"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_address')"
                      rules="required"
                    >
                      <b-form-input
                        id="company_address"
                        v-model="form.company_address"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Address"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- Company Country -->
                <b-col>
                  <b-form-group
                    id="input-group-4"
                    label="Country"
                    label-for="country"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('country')"
                      rules="required"
                    >
                    <v-select
                        v-model="getCompanyCountry"
                        :options="getCountries"
                        :filterBy="
                          (option, search) => {
                            return (
                              (option.country || '')
                                .toLocaleLowerCase()
                                .indexOf(search.toLocaleLowerCase()) > -1
                            );
                          }
                        "
                       
                        id="company-country"
                        name="country"
                        v-bind:placeholder="$t('Please select your country')"
                        :value="$store.state.selected"
                        v-on:input="updateCountryStatus()"
                      >
                      
                        <template #selected-option="option" v-if="isCountrySelected === false">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: left;
                              grid-gap: 8px;
                            "
                          >
                          <img :src='"@/assets/flags/" + getCompanyISO.toLowerCase() + ".png"' style="width: 30px; height: 20px"/>
                            {{ getCompanyCountry }}
                          </div>
                        </template>

                        <template #selected-option="option" v-else>
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: left;
                              grid-gap: 8px;
                            "
                          >
                          <img :src='"@/assets/flags/" + option.isoAlpha2Country.toLowerCase() + ".png"' style="width: 30px; height: 20px"/>

                            {{ option.country }}
                          </div>
                        </template>

                        <template v-slot:option="option">
                          <span
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: left;
                              grid-gap: 8px;
                            "
                          >
                          <img :src='"@/assets/flags/" + option.isoAlpha2Country.toLowerCase() + ".png"' style="width: 30px; height: 20px"/>

                            {{ option.country }}
                          </span>
                        </template>
                      </v-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>

                    <!-- <v-select
          v-model="form.country"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="country"
          :options="getCountries"
        /> -->
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <!-- Company onwner name -->
                <b-col>
                  <b-form-group
                    id="input-group-5"
                    label="Owner Name"
                    label-for="owner_name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('owner_name')"
                      rules="required"
                    >
                      <b-form-input
                        id="owner_name"
                        v-model="form.owner_name"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Owner Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- company egn -->
                <b-col>
                  <b-form-group
                    id="input-group-6"
                    label="Owner EGN"
                    label-for="owner_egn"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('owner_egn')"
                      rules="required|digits:10"
                    >
                      <b-form-input
                        id="owner_egn"
                        v-model="form.owner_egn"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Owner EGN"

                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row v-if="isVatCheck === true">
                <b-col
                  ><b-form-group
                    id="input-group-7"
                    label="Company Vat Number"
                    label-for="company_vat_no"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_vat_number')"
                      rules="required"
                    >
                      <b-form-input
                        id="vat_number"
                        v-model="form.vat_no"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Vat Number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group></b-col
                >
                <b-col></b-col>
              </b-form-row>
              <b-form-row>
                <b-col>
                  <b-form-checkbox
                    id="vat-checkbox"
                    name="vat-checkbox"
                    value="accepted"
                    @change="vatHandled()"
                  >
                    VAT
                  </b-form-checkbox>
                </b-col>
              </b-form-row>
            </validation-observer>
          </tab-content>
          <!-- Second Tab: Account Details -->
          <tab-content
            title="Account Details"
            :before-change="validationFormTab2"
          >
            <validation-observer ref="accountRules" tag="form">
              <b-row>
            <b-col
              cols="12"
              class="mb-2"
             
            >
              <h5 class="mb-0">
               Account Details
              </h5>
              <small class="text-muted">
                Enter Your Account Details
              </small>
            </b-col>
            </b-row>
              <b-form-row>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Company Bank Account"
                    label-for="company_bank_account"
                  >
                    <b-form-input
                      id="company_bank_account"
                      v-model="form.company_bank_account"
                      type="text"
                      placeholder="Company Bank Account"
                      autocomplete="off"
                      required
                    ></b-form-input> </b-form-group
                ></b-col>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Company Currency"
                    label-for="company_currency"
                  >
                  <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_currency')"
                      rules="required"
                    >
                    <v-select
                      v-model="form.company_currency"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="currencies"
                      :value="$store.state.selected"
                      id="company_currency"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('Please select currency')"
                    >
                      <template #selected-option="option">
                        <div
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            grid-gap: 8px;
                          "
                        >
                          {{ option.value }} - {{ option.name }} 
                         
                        </div>
                      </template>
                      <template v-slot:option="option">
                        <span
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            grid-gap: 8px;
                          "
                        >
                          {{ option.value }} - {{ option.name }} 
                         
                        </span>
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Company Phone Number"
                    label-for="company_phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_phone')"
                      rules="required"
                    >
                      <b-form-input
                        id="company_phone"
                        v-model="form.phone_no"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Phone Number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Company Email"
                    label-for="company_email"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company email')"
                      rules="required|email"
                    >
                      <b-form-input
                        id="company_email"
                        v-model="form.company_email"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Company Email"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row>
                <b-col
                  ><b-form-group
                    id="input-group-1"
                    label="Company Financial Star of Year"
                    label-for="company_fin_year"
                  >
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('company_fin_year')"
                      rules="required"
                    >
                      <flat-pickr
                        id="company_fin_year"
                        class="form-control"
                        v-model="form.fin_year"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Select date"
                        style="background-color: white !important;"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group></b-col
                >
                <b-col></b-col>
              </b-form-row>
            </validation-observer>
          </tab-content>
        </form-wizard>
        
      <!-- </b-card-body>
    </b-card> -->
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BcardText,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRow,
  BRow,
  BCol,
  BFormSelect,
  BFormCheckbox,
  BListGroup, 
    BListGroupItem
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";
import Swal from "sweetalert2";
import vSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { digits } from "@validations";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is mandatory",
});

extend("digits", {
  ...digits,
  message: "This field must be numeric and exactly contain 10 digits",
});

export default {
  components: {
    BCard,
    BcardText,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormRow,
    BRow,
    BCol,
    BCardBody,
    vSelect,
    BFormSelect,
    FormWizard,
    TabContent,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
    BListGroup, 
    BListGroupItem
  },
  data() {
    return {
      companyCountrySelected : "",
      companyCountryISOSelected : "",
      getCompanyISO: '',
      getCompanyCountry: '',
      isCountrySelected: false,
      showIDSuggestions: false,
      datalistID:[],
      showSuggestions: false,
      datalist:[],
      form: {
        company_name: null,
        company_identification_number: null,
        company_email: null,
        company_address: null,
        country: null,
        owner_name: null,
        company_iso_country: null,
        owner_egn: null,
        company_bank_account: null,
        company_currency: null,
        phone_no: null,
        vat_no: null,
        fin_year: null,
      },
      options: [],
      getCountries:[],
      // getCountries: [{ country: "" }, { isoAlpha2Country: "" }],
      selectedItem: "",
      required,
      isVatCheck: "false",
      currencies: [
        { name: "Afghan Afghani", value: "AFN", symbol: "؋" },
        { name: "Albanian Le", value: "ALL", symbol: "Lek" },
        { name: "Algerian Dinar", value: "DZD", symbol: "دج" },
        { name: "Angolan Kwanza", value: "AOA", symbol: "Kz" },
        { name: "Argentine Peso", value: "ARS", symbol: "$" },
        { name: "Armenian Dram", value: "AMD", symbol: "֏" },
        { name: "Aruban Florin", value: "AWG", symbol: "ƒ" },
        { name: "Australian Dollar", value: "AUD", symbol: "$" },
        { name: "Azerbaijani Manat", value: "AZN", symbol: "m" },
        { name: "Bahamian Dollar", value: "BSD", symbol: "B$" },
        { name: "Bahraini Dinar", value: "BHD", symbol: ".د.ب" },
        { name: "Barbadian Dollar", value: "BBD", symbol: "Bds$" },
        { name: "Belarusian Ruble", value: "BYR", symbol: "Br" },
        { name: "Belgian Franc", value: "BEF", symbol: "fr" },
        { name: "Belize Dollar", value: "BZD", symbol: "$" },
        { name: "Bhutanese Ngultrum", value: "BTN", symbol: "Nu" },
        { name: "Bitcoin", value: "BTC", symbol: "฿" },
        { name: "Bolivian Boliviano", value: "BOB", symbol: "Bs" },
        {name: "Bosnia-Herzegovina Convertible Mark",value: "BAM",symbol: "KM"},
        { name: "Botswanan Pula", value: "BWP", symbol: "P" },
        { name: "Brazilian Real", value: "BRL", symbol: "R$" },
        { name: "British Pound Sterling", value: "GBP", symbol: "£" },
        { name: "Brunei Dollar ", value: "BND", symbol: "B$" },
        { name: "Bulgarian Lev", value: "BGN", symbol: "Лв." },
        { name: "Burundian Franc", value: "BIF", symbol: "FBu" },
        { name: "Cambodian Riel", value: "KHR", symbol: "KHR" },
        { name: "Canadian Dollar", value: "CAD", symbol: "$" },
        { name: "Cape Verdean Escudo", value: "CVE ", symbol: "$" },
        { name: "Cayman Islands Dollar", value: "KYD", symbol: "$" },
        { name: "CFA Franc BCEAO", value: "XOF", symbol: "CFA" },
        { name: "CFA Franc BEAC", value: "XAF", symbol: "FCFA" },
        { name: "CFP Franc", value: "XPF", symbol: "₣" },
        { name: "Chilean Peso", value: "CLP", symbol: "$" },
        { name: "Chinese Yuan", value: "CNY", symbol: "¥" },
        { name: "Colombian Peso", value: "COP", symbol: "$" },
        { name: "Comorian Franc", value: "KMF", symbol: "CF" },
        { name: "Congolese Franc", value: "CDF ", symbol: "FC" },
        { name: "Costa Rican ColÃ³n", value: "CRC", symbol: "₡" },
        { name: "Croatian Kuna", value: "HRK", symbol: "kn" },
        { name: " Cuban Convertible Peso", value: "CUC", symbol: "CUC" },
        { name: "Czech Republic Koruna", value: "CZK", symbol: "Kč" },
        { name: "Danish Krone", value: "DKK", symbol: "Kr." },
        { name: "Djiboutian Franc ", value: "DJF", symbol: "Fdj" },
        { name: "Dominican Peso ", value: "DOP", symbol: "$" },
        { name: "East Caribbean Dollar ", value: "XCD", symbol: "$" },
        { name: "Egyptian Pound ", value: "EGP", symbol: "ج.م" },
        { name: "Eritrean Nakfa  ", value: "ERN ", symbol: "Nfk" },
        { name: "Estonian Kroon ", value: "EEK", symbol: "kr" },
        { name: "Ethiopian Birr ", value: "ETB", symbol: "Nkf" },
        { name: "Euro ", value: "EUR", symbol: "€" },
        { name: "Falkland Islands Pound ", value: "FKP", symbol: "£" },
        { name: "Fijian Dollar  ", value: "FJD ", symbol: "FJ$" },
        { name: "Gambian Dalasi", value: "GMD", symbol: "D" },
        { name: "Georgian Lari", value: "GEL", symbol: "ლ" },
        { name: "German Mark", value: "DEM", symbol: "DM" },
        { name: "Ghanaian Cedi ", value: "GHS", symbol: "GH₵" },
        { name: "Gibraltar Pound", value: "GIP", symbol: "£" },
        { name: "Greek Drachma", value: "GRD", symbol: "D" },
        { name: "Guatemalan Quetzal", value: "GTQ", symbol: "Q" },
        { value: "GNF", name: "Guinean Franc", symbol: "FG" },
        { value: "GYD", name: "Guyanaese Dollar", symbol: "$" },
        { value: "HTG", name: "Haitian Gourde", symbol: "G" },
        { value: "HNL", name: "Honduran Lempira", symbol: "L" },
        { value: "HKD", name: "Hong Kong Dollar", symbol: "$" },
        { value: "HUF", name: "Hungarian Forint", symbol: "Ft" },
        { value: "ISK", name: "Icelandic KrÃ³na", symbol: "kr" },
        { value: "INR", name: "Indian Rupee", symbol: "₹" },
        { value: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
        { value: "IRR", name: "Iranian Rial", symbol: "﷼" },
        { value: "IQD", name: "Iraqi Dinar", symbol: "د.ع" },
        { value: "ILS", name: "Israeli New Sheqel", symbol: "₪" },
        { value: "ITL", name: "Italian Lira", symbol: "L,£" },
        { value: "JMD", name: "Jamaican Dollar", symbol: "J$" },
        { value: "JPY", name: "Japanese Yen", symbol: "¥" },
        { value: "JOD", name: "Jordanian Dinar", symbol: "ا.د" },
        { value: "KZT", name: "Kazakhstani Tenge", symbol: "лв" },
        { value: "KES", name: "Kenyan Shilling", symbol: "KSh" },
        { value: "KWD", name: "Kuwaiti Dinar", symbol: "ك.د" },
        { value: "KGS", name: "Kyrgystani Som", symbol: "лв" },
        { value: "LAK", name: "Laotian Kip", symbol: "₭" },
        { value: "LVL", name: "Latvian Lats", symbol: "Ls" },
        { value: "LBP", name: "Lebanese Pound", symbol: "£" },
        { value: "LSL", name: "Lesotho Loti", symbol: "L" },
        { value: "LRD", name: "Liberian Dollar", symbol: "$" },
        { value: "LYD", name: "Libyan Dinar", symbol: "د.ل" },
        { value: "LTL", name: "Lithuanian Litas", symbol: "Lt" },
        { value: "MOP", name: "Macanese Pataca", symbol: "$" },
        { value: "MKD", name: "Macedonian Denar", symbol: "ден" },
        { value: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
        { value: "MWK", name: "Malawian Kwacha", symbol: "MK" },
        { value: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
        { value: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
        { value: "MRO", name: "Mauritanian Ouguiya", symbol: "MRU" },
        { value: "MUR", name: "Mauritian Rupee", symbol: "₨" },
        { value: "MXN", name: "Mexican Peso", symbol: "$" },
        { value: "MDL", name: "Moldovan Leu", symbol: "L" },
        { value: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
        { value: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
        { value: "MZM", name: "Mozambican Metical", symbol: "MT" },
        { value: "MMK", name: "Myanmar Kyat", symbol: "K" },
        { value: "NAD", name: "Namibian Dollar", symbol: "$" },
        { value: "NPR", name: "Nepalese Rupee", symbol: "₨" },
        { value: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
        { value: "TWD", name: "New Taiwan Dollar", symbol: "$" },
        { value: "NZD", name: "New Zealand Dollar", symbol: "$" },
        { value: "NIO", name: "Nicaraguan CÃ³rdoba", symbol: "C$" },
        { value: "NGN", name: "Nigerian Naira", symbol: "₦" },
        { value: "KPW", name: "North Korean Won", symbol: "₩" },
        { value: "NOK", name: "Norwegian Krone", symbol: "kr" },
        { value: "OMR", name: "Omani Rial", symbol: ".ع.ر" },
        { value: "PKR", name: "Pakistani Rupee", symbol: "₨" },
        { value: "PAB", name: "Panamanian Balboa", symbol: "B/." },
        { value: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
        { value: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
        { value: "PEN", name: "Peruvian Nuevo Sol", symbol: "S/." },
        { value: "PHP", name: "Philippine Peso", symbol: "₱" },
        { value: "PLN", name: "Polish Zloty", symbol: "zł" },
        { value: "QAR", name: "Qatari Rial", symbol: "ق.ر" },
        { value: "RON", name: "Romanian Leu", symbol: "lei" },
        { value: "RUB", name: "Russian Ruble", symbol: "₽" },
        { value: "RWF", name: "Rwandan Franc", symbol: "FRw" },
        { value: "SVC", name: "Salvadoran ColÃ³n", symbol: "₡" },
        { value: "WST", name: "Samoan Tala", symbol: "SAT" },
        { value: "SAR", name: "Saudi Riyal", symbol: "﷼" },
        { value: "RSD", name: "Serbian Dinar", symbol: "din" },
        { value: "SCR", name: "Seychellois Rupee", symbol: "SRe" },
        { value: "SLL", name: "Sierra Leonean Leone", symbol: "Le" },
        { value: "SGD", name: "Singapore Dollar", symbol: "$" },
        { value: "SKK", name: "Slovak Koruna", symbol: "Sk" },
        { value: "SBD", name: "Solomon Islands Dollar", symbol: "Si$" },
        { value: "SOS", name: "Somali Shilling", symbol: "Sh.so." },
        { value: "ZAR", name: "South African Rand", symbol: "R" },
        { value: "KRW", name: "South Korean Won", symbol: "₩" },
        { value: "XDR", name: "Special Drawing Rights", symbol: "SDR" },
        { value: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
        { value: "SHP", name: "St. Helena Pound", symbol: "£" },
        { value: "SDG", name: "Sudanese Pound", symbol: ".س.ج" },
        { value: "SRD", name: "Surinamese Dollar", symbol: "$" },
        { value: "SZL", name: "Swazi Lilangeni", symbol: "E" },
        { value: "SEK", name: "Swedish Krona", symbol: "kr" },
        { value: "CHF", name: "Swiss Franc", symbol: "CHf" },
        { value: "SYP", name: "Syrian Pound", symbol: "LS" },
        { value: "STD", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
        { value: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
        { value: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
        { value: "THB", name: "Thai Baht", symbol: "฿" },
        { value: "TOP", name: "Tongan pa'anga", symbol: "$" },
        { value: "TTD", name: "Trinidad & Tobago Dollar", symbol: "$" },
        { value: "TND", name: "Tunisian Dinar", symbol: "ت.د" },
        { value: "TRY", name: "Turkish Lira", symbol: "₺" },
        { value: "TMT", name: "Turkmenistani Manat", symbol: "T" },
        { value: "UGX", name: "Ugandan Shilling", symbol: "USh" },
        { value: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
        { value: "AED", name: "United Arab Emirates Dirham", symbol: "إ.د" },
        { value: "UYU", name: "Uruguayan Peso", symbol: "$" },
        { value: "USD", name: "US Dollar", symbol: "$" },
        { value: "UZS", name: "Uzbekistan Som", symbol: "лв" },
        { value: "VUV", name: "Vanuatu Vatu", symbol: "VT" },
        { value: "VEF", name: "Venezuelan BolÃ­var", symbol: "Bs" },
        { value: "VND", name: "Vietnamese Dong", symbol: "₫" },
        { value: "YER", name: "Yemeni Rial", symbol: "﷼" },
        { value: "ZMK", name: "Zambian Kwacha", symbol: "ZK" },
      ],
    };
  },
  methods: {
    // 
    updateCountryStatus(){
      this.isCountrySelected = true;
    },
    // Searching a company by companyIdentificationNumber
    async SearchCompanyID(val){
      let self = this;
      var config = {
        method: "get",
        url: "/index/api/search-companies/"+val,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      };
      if(val != ''){
        const data1 = await axios(config).then(function (response) {
        // console.log(response.data);
        if(response.data != undefined || response.data.length != 0){
              self.showIDSuggestions = true;
            }
            else{
              self.showIDSuggestions = false;
            }
            self.datalistID = response.data
      })
      .catch(function (error) {
      });
    }
    },

    //function to auto-fill some input fields
    autoCompletefn(item,val){
      if(val===1){
      this.showSuggestions  = false;
      this.datalist.value = []
      }
      if(val===2){
        this.showIDSuggestions  = false;
        this.datalistID.value = []
      }
        this.form.company_name = item.company_name;
        this.form.company_address = item.address; 
        this.form.company_identification_number  = item.eic;
        if(item.managers.length > 0){
        this.form.owner_name = item.managers[0];
        }
        else{
          this.form.owner_name = '';
        }
        
        this.autofillCountry = true;
        if(this.autofillCountry === true){
          this.getCompanyISO = item.country;
          for (let i=0; i< this.getCountries.length ; i++){
            if(this.getCountries[i].isoAlpha2Country === item.country){
              this.getCompanyCountry = this.getCountries[i].country;

            }
          }
        }
    },
    // Searching a company by companyName
    async SearchCompanyName(val){
      let self = this;
      var data = JSON.stringify({
        companyName: val
      });
      var config = {
        method: "post",
        url: "/index/api/search-companies/search-by-name",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        data: data,
      };

      const data1 = await axios(config).then(function (response) {
        // console.log(response.data);
        if(response.data != undefined || response.data.length != 0){
              self.showSuggestions = true;
            }
            else{
              self.showSuggestions = false;
            }
            self.datalist = response.data
      })
      .catch(function (error) {
      });
    },

     //validation check for account details
    validationFormTab2() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then((success) => {
          if (success) {
            this.saveCompany();
          } else {
            reject();
          }
        });
      });
    },
    //validation check for company details
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.companyRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    // 
    vatHandled(){
      // this.isVatCheck = !this.isVatCheck; 
      if(this.isVatCheck === true){
        this.isVatCheck = false;
      }
      else{
        this.isVatCheck = true;
      }
    },
    //create a company
    async saveCompany() {
      let self = this;
      if(this.isCountrySelected === true){
        this.companyCountrySelected = this.getCompanyCountry.country;
        this.companyCountryISOSelected = this.getCompanyCountry.isoAlpha2Country;
        this.getCompanyCountry =  this.companyCountrySelected;
        this.getCompanyISO =  this.companyCountryISOSelected;
      }
      else{

      }
      if(this.isVatCheck === false){
        this.form.vat_no = "";
      }
      var data = JSON.stringify({
        //   companyName: "My Company",
        //   companyCountry: "Bulgaria",
        //   companyIsoAlpha2Country: "BG",
        //   companyOwnerApi: {
        //     companyOwnerName: "Ivan",
        //     ownerEGN: "8523155",
        //   },

        //   companyAddress: "Sofia Petar Stanev N5",
        //   companyIdentificationNumber: "12q34775dd6",
        //   companyPhone: "0556412459",
        //   companyMail: "office@abv.bg",
        //   companyBankAccount: "BG123456789",
        //   companyCurrency: "LEV",
        //   companyVatNumber: "123456",
        //   digitalSignature: "",
        //   companyFinancialStartOfYear: "2022-05-19",
        //   vat: true,
        // });

        companyName: this.form.company_name,
        companyCountry:this.getCompanyCountry,
        companyIsoAlpha2Country:  this.getCompanyISO ,
        companyOwnerApi: {
          companyOwnerName: this.form.owner_name,
          ownerEGN: this.form.owner_egn,
        },
        companyAddress: this.form.company_address,
        companyIdentificationNumber: this.form.company_identification_number,
        companyPhone: this.form.phone_no,
        companyMail: this.form.company_email,
        companyBankAccount: this.form.company_bank_account,
        companyCurrency: this.form.company_currency.value,
        companyVatNumber: this.form.vat_no,
        digitalSignature: "",
        companyFinancialStartOfYear: this.form.fin_year,
        vat: this.isVatCheck,
      });

      var config = {
        method: "post",
        url: "/account/api/company/create",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        data: data,
      };

      const data1 = await axios(config).then(function (response) {
  console.log(JSON.stringify(response.data));
  Swal.fire({
            position: "center",
            icon: "success",
            title: "Company Created!",
            showConfirmButton: false,
            timer: 1700,
          });
           setTimeout(() => {
         self.$router.go(-1);
      }, 1740);
})
.catch(function (error) {
  console.log(error);
  Swal.fire({
            position: "center",
            icon: "error",
            title: 'Oops...',
            text: "Something went wrong!",
           
            showConfirmButton: false,
            timer: 1700,
          });
          setTimeout(() => {
        self.$router.go();
      }, 1740);
});
    },
    //
    async populateCountries() {
      var config = {
        method: "get",
        url: "/account/api/countries",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      };

      const data = await axios(config);

      if (data.data != "") {
        this.getCountries = data.data;
      }
    },
  },
  created() {
    this.populateCountries();
  },
};
</script>

<style lang="scss">
/*  */

@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss'; 

.vue-form-wizard .wizard-card-footer .wizard-footer-left .wizard-btn::before {
    content: "<";
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right .wizard-btn:after{
  content: ">";
    font-family: feather!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 1rem;
    position: relative;
}

.vue-form-wizard .wizard-navigation .wizard-nav li:not(:first-child) a:before {
  content: ">";

}

.vs__open-indicator {
    fill: rgba(60,60,60,.5);
}

.input-suggesstions{
  position: absolute;
  z-index: 99;
  width: 98.5%;
  border: 1px solid rgba(87, 100, 111, 0.3);
  border-radius: 0 !important;
}
.dark-layout .input-suggesstions{
  border-color: #3b4253;
}
.input-suggesstions .list-group-item{
  border-bottom: 0 !important;
  border-radius: 0 !important; 
  background-color: #f8f8f8 !important;
  cursor: pointer;
}

.input-suggesstions .list-group-item :hover{
  background-color: lightgrey !important;

}
.dark-layout .input-suggesstions .list-group-item{
  background-color: #161d31 !important;
}


</style>