<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <!--          <b-img-->
          <!--            ref="previewEl"-->
          <!--            rounded-->
          <!--            :src="optionsLocal.avatar"-->
          <!--            height="80"-->
          <!--          />-->
          <feather-icon
            v-if="userDetail.accountType === 'PERSONAL'"
            icon="UserIcon"
            size="80"
          />
          <feather-icon
            v-if="userDetail.accountType === 'COMPANY'"
            icon="HomeIcon"
            size="80"
          />

        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Upload
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
          @click="getUserDetail()"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form
        class="mt-2"
        @submit.prevent="validationForm()"
      >
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="First Name"
              label-for="first-name"
            >
              <validation-provider
                #default="{ errors }"
                name="First Name"
                vid="First Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.firstName"
                  :state="errors.length > 0 ? false:null"
                  name="firstName"
                  placeholder="First Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Last Name"
              label-for="last-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Last Name"
                vid="Last Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.lastName"
                  :state="errors.length > 0 ? false:null"
                  name="lastName"
                  placeholder="Last Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Account Type"
              label-for="account-type"
            >
              <validation-provider
                #default="{ errors }"
                name="Account Type"
                vid="Account Type"
                rules="required"
              >
                <b-form-select
                  v-model="userDetail.accountType"
                  :options="$store.state.ProfileSettings.userAccountTypes"
                  name="accountType"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Name"
              label-for="account-company"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Name"
                vid="Company Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyName"
                  :state="errors.length > 0 ? false:null"
                  name="companyName"
                  placeholder="Company name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Address"
              label-for="company-address"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Address"
                vid="Company Address"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyAddress"
                  :state="errors.length > 0 ? false:null"
                  name="companyAddress"
                  placeholder="Company Address"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                vid="Email"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.email"
                  :state="errors.length > 0 ? false:null"
                  name="email"
                  placeholder="Email"
                  disabled="disabled"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Registration Number"
              label-for="company-register-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Registration Number"
                vid="Company Registration Number"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyRegistrationNumber"
                  :state="errors.length > 0 ? false:null"
                  name="companyRegistrationNumber"
                  placeholder="Company Registration Number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="password"
              label-for="password"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="Password"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.password"
                  type="password"
                  :state="errors.length > 0 ? false:null"
                  name="password"
                  placeholder="Password"
                  required
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Country"
              label-for="country"
            >
              <validation-provider
                #default="{ errors }"
                name="Country"
                vid="Country"
                rules="required"
              >
                <v-select
                  v-model="userDetail.country"
                  :state="errors.length > 0 ? false:null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="countries"
                  :clearable="false"
                  input-id="country"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mt-2 mr-1"
            >
              Save changes
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
              class="mt-2"
              @click="getUserDetail()"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BAlert,
  BButton,
  BCard,
  BCardText,
  BCol,
  BForm,
  BFormFile,
  BFormGroup,
  BFormInput,
  BImg,
  BLink,
  BMedia,
  BMediaAside,
  BMediaBody,
  BRow,
  BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import { confirmed, min, required } from 'vee-validate/dist/rules'

extend('required', required)
extend('min', min)
extend('confirmed', confirmed)

export default {
  components: {
    BButton,
    BForm,
    // eslint-disable-next-line vue/no-unused-components
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BFormSelect,
    BLink,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
    }
  },
  created() {
    this.getUserDetail()
    // this.populateCountries()
    // console.log(JSON.parse(localStorage.getItem('userData')).data)
  },
  // watch: {
  //   'userDetail.accountType': function (newV, oldV) {
  //     console.log(newV, oldV)
  //   },
  // },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate()
        .then(success => {
          if (success) {
            // eslint-disable-next-line
            this.updateUser()
          }
        })
    },
    getImg(img) {
      // eslint-disable-next-line import/no-unresolved,global-require,no-shadow
      const defaultPath = require('../../../assets/flags/aw.png')
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const path = require(`../../../assets/flags/${img}.png`)
      try {
        return path
      } catch (e) {
        return defaultPath
      }
    },
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
    async getUserDetail() {
      const data = await axios.get('account/api/user/who-am-i')
      this.userDetail = data.data
      // await this.getUserInfo()
    },
    async getUserInfo() {
      const data = await axios.get(`account/api/user/${this.userDetail.email}`)
      console.log('getUserInfo ', data.data)
    },
    populateCountries() {
      useJwt
        .clientToken()
        .then(res => {
          const token = res.data.access_token
          useJwt
            .countries(token)
            .then(response => {
              // eslint-disable-next-line array-callback-return
              response.data.map((value, key) => {
                this.countries.push({
                  Country: value.isoAlpha2Country,
                  value: value.isoAlpha2Country,
                  text: value.country,
                  src: value.isoAlpha2Country.toLocaleLowerCase(),
                })
              })
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error}`,
                  icon: 'EditIcon',
                  variant: 'error',
                },
              })
            })
        })
        .catch(error => {
          // this.$refs.registerForm.setErrors(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.errorMessage}`,
              icon: 'EditIcon',
              variant: 'error',
            },
          })
        })
    },
    async updateUser() {
      if (this.userDetail.accountType === 'PERSONAL') {
        this.userDetail.company = ''
        this.userDetail.companyAddress = ''
        this.userDetail.companyRegistrationNumber = ''
        this.userDetail.companyName = ''
      }
      const data = await axios.put(`account/api/user/update/${this.userDetail.email}`, this.userDetail)
      if (data.status === 200) {
        this.makeToast('success', 'Success', 'Settings Updated Successfully')
      }
    },
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
      })
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const userDetail = ref({
      accountType: '',
    })

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      countries,
      userDetail,
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
