<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <navbarAds />
      
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">
            {{ $t('register.title')}}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('register.subtitle')}}
          </b-card-text>

          <!-- form -->
          <validation-observer
                  ref="registerForm"
                  #default="{invalid}"
          >
            <b-form
                    class="auth-register-form mt-2"
                    @submit.prevent="register"
            >
              <!-- username -->
              <b-form-group
                      v-bind:label="$t('register.lbl_f_name')"
                      label-for="register-firstname"
              >
                <validation-provider
                        #default="{ errors }"
                        v-bind:name="$t('register.lbl_f_name')"
                        vid="firstname"
                        rules="required"
                >
                  <b-form-input
                          id="register-firstname"
                          v-model="firstname"
                          name="register-firstname"
                          :state="errors.length > 0 ? false:null"
                          v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                      v-bind:label="$t('register.lbl_l_name')"
                      label-for="register-lastname"
              >
                <validation-provider
                        #default="{ errors }"
                        v-bind:name="$t('register.lbl_f_name')"
                        vid="lastname"
                        rules="required"
                >
                  <b-form-input
                          id="register-lastname"
                          v-model="lastname"
                          name="register-lastname"
                          :state="errors.length > 0 ? false:null"
                          v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Company -->
                <b-form-group
                  :label="$t('register.lbl_c_accountType')"
                  label-for="register-accountType"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="accountType"
                    vid="accountType"
                    rules="required"
                  >
                    <b-form-select
                      v-model="account"
                      :options="accountType"
                      id="register-accountType"
                      name="register-accountType"
                      :state="errors.length > 0 ? false:null"
                    >
                    </b-form-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <div v-if="account === 'COMPANY'">
                  <b-form-group
                          v-bind:label="$t('register.lbl_c_name')"
                          label-for="register-companyName"
                  >
                    <validation-provider
                            #default="{ errors }"
                            v-bind:name="$t('register.lbl_f_name')"
                            vid="companyName"
                            rules="required"
                    >
                      <b-form-input
                              id="register-companyName"
                              v-model="companyName"
                              name="register-companyName"
                              :state="errors.length > 0 ? false:null"
                              v-bind:placeholder="$t('register.lbl_c_name')"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group
                          v-bind:label="$t('register.lbl_c_address')"
                          label-for="register-companyAddress"
                  >
                    <validation-provider
                            #default="{ errors }"
                            v-bind:name="$t('register.lbl_c_address')"
                            vid="companyAddress"
                            rules="required"
                    >
                      <b-form-input
                              id="register-companyAddress"
                              v-model="companyAddress"
                              name="register-companyAddress"
                              :state="errors.length > 0 ? false:null"
                              v-bind:placeholder="$t('register.lbl_c_address')"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group
                          v-bind:label="$t('register.lbl_c_registrationNumber')"
                          label-for="register-registrationNumber"
                  >
                    <validation-provider
                            #default="{ errors }"
                            name="registrationNumber"
                            vid="registrationNumber"
                            rules="required"
                    >
                      <b-form-input
                              id="register-registrationNumber"
                              v-model="registrationNumber"
                              name="register-registrationNumber"
                              :state="errors.length > 0 ? false:null"
                              v-bind:placeholder="$t('register.lbl_c_registrationNumber')"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </div>

              <!-- email -->
              <b-form-group
                      v-bind:label="$t('register.lbl_email')"
                      label-for="register-email"
              >
                <validation-provider
                        #default="{ errors }"
                        v-bind:name="$t('register.lbl_email')"
                        vid="email"
                        rules="required|email"
                >
                  <b-form-input
                          id="register-email"
                          v-model="userEmail"
                          name="register-email"
                          :state="errors.length > 0 ? false:null"
                          v-bind:placeholder="$t('register.email_placeholder')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                      label-for="register-password"
                      v-bind:label="$t('register.lbl_password')"
              >
                <validation-provider
                        #default="{ errors }"
                        v-bind:name="$t('register.lbl_password')"
                        vid="password"
                        rules="required"
                >
                  <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                            id="register-password"
                            v-model="password"
                            class="form-control-merge"
                            :type="passwordFieldType"
                            :state="errors.length > 0 ? false:null"
                            name="register-password"
                            placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                              :icon="passwordToggleIcon"
                              class="cursor-pointer"
                              @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                      label="Country"
                      label-for="register-country"
              >
                <validation-provider
                        #default="{ errors }"
                        name="country"
                        vid="country"
                        rules="required"
                >
                  <!-- <b-form-select
                    v-model="country"
                    :options="items"
                    id="register-country"
                    name="register-country"
                    :state="errors.length > 0 ? false:null"
                  >
                  </b-form-select> -->
                  <v-select
                          v-model="country"
                          :options="options"
                          :filterBy="(option, label, search)=> {
                        return (option.text || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
                      }"
                          v-bind:label="$t('register.lbl_country')"
                          id="register-country"
                          name="country"
                          v-bind:placeholder="$t('register.country_placeholder')"
                          :value="$store.state.selected"
                          :state="errors.length > 0 ? false:null"
                  >
                    <template #selected-option="option">
                      <div style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">
                        <img :src="getImg(option.src)">
                        {{ option.text }}
                      </div>
                    </template>
                    <template v-slot:option="option">
                        <span style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">
                          <img :src=  "getImg(option.src)">  {{ option.text }}
                        </span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                        id="register-privacy-policy"
                        v-model="gdpr"
                        name="checkbox-1"
                >{{$t('register.i_agree_to')}}
                  <b-link>{{ $t('register.lbl_privacy_term_link')}}</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                      variant="primary"
                      block
                      type="submit"
                      :disabled="invalid || loading"
              >
              <b-spinner
                v-if="loading"
                small
                variant="light"
              />
              {{ $t('register.lbl_submit')}}
              </b-button>


            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>{{$t('register.have_account')}}</span>
            <b-link :to="{name:'login'}">
              <span>&nbsp;{{$t('register.lbl_login_link')}}</span>
            </b-link>
          </p>

          <!-- divider -->
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
  </div>
</template>


<script>
  /* eslint-disable global-require */
  import Vue from "vue";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import VuexyLogo from "@core/layouts/components/Logo.vue";
  import {
    BRow,
    BCol,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText,
    BDropdown,
    BDropdownItem,
    BFormSelect,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavForm,
    BCollapse,
    BNavItemDropdown,
    BDropdownDivider,
    BAvatar,
    BNavItem,
    BSpinner
  } from "bootstrap-vue";
  import { required, email } from "@validations";
  import { togglePasswordVisibility } from "@core/mixins/ui/forms";
  import store from "@/store/index";
  import useJwt from "@/auth/jwt/useJwt";
  import vSelect from "vue-select";
  import navbarAds from "./navbarAds.vue"
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
  export default {
    components: {
      VuexyLogo,
      BRow,
      BImg,
      BCol,
      BLink,
      BButton,
      BForm,
      BCardText,
      BCardTitle,
      BFormCheckbox,
      BFormGroup,
      BDropdown,
      BFormSelect,
      BDropdownItem,
      BFormInput,
      BNavbar,
      BNavbarBrand,
      BNavbarToggle,
      BCollapse,
      BNavbarNav,
      BNavItemDropdown,
      BNavForm,
      BDropdownDivider,
      BAvatar,
      BNavItem,
      BInputGroup,
      BInputGroupAppend,
      // validations
      ValidationProvider,
      ValidationObserver,
      vSelect,
      navbarAds,
      BSpinner
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        status: "",
        firstname: "",
        lastname: "",
        userEmail: "",
        password: "",
        gdpr: false,
        companyName: "",
        country: "",
        ipAddress: "",
        isoAlpha2Country: "",
        companyAddress: "",
        registrationNumber: "",
        sideImg: require("@/assets/images/pages/register-v2.svg"),
        // validation
        required,
        email,
        selected: null,
        country: null,
        account: null,
        options: [],
        accountType: [
          { value: null, text: 'Please select account type', disabled: true },
          { value: 'COMPANY', text: 'COMPANY' },
          { value: 'PERSONAL', text: 'PERSON' },
        ],
        loading: false
      };
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
      },
      imgUrl() {
        if (store.state.appConfig.layout.skin === "dark") {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
          return this.sideImg;
        }
        return this.sideImg;
      },
    },
    methods: {
      register() {
        this.$refs.registerForm.validate().then((success) => {
          if (success) {
            this.loading = true
            useJwt
              .clientToken()
              .then((res) => {
                let token = res.data.access_token;
                useJwt
                  .getIpAddress()
                  .then((res) => {
                    let IpAddress = res?.data?.ip
                    useJwt
                      .register(token, {
                        firstName: this.firstname,
                        lastName: this.lastname,
                        email: this.userEmail,
                        password: this.password,
                        accountType: this.account,
                        companyAddress: this.account == "COMPANY" ? this.companyAddress : "",
                        companyName: this.account == "COMPANY" ? this.companyName : "",
                        companyRegistrationNumber: this.account == "COMPANY" ? this.registrationNumber : "",
                        country: this.country?.text,
                        gdpr: this.gdpr,
                        identifier: "",
                        ipAddress: IpAddress,
                        isoAlpha2Country: this.country?.value,
                      })
                      .then((response) => {
                        this.loading = false
                        return this.$router.push({ name: "verify-email" })
                      })
                      .catch((error) => {
                        this.loading = false
                        this.$toast({
                          component: ToastificationContent,
                          props: {
                            title: `${error.response.data.errorMessage}`,
                            icon: "EditIcon",
                            variant: "error",
                          },
                        });
                      });
                  })
                  .catch((error) => {
                    this.loading = false
                  });        
              })
              .catch((error) => {
                this.loading = false
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `${error.errorMessage}`,
                    icon: "EditIcon",
                    variant: "error",
                  },
                });
              });
          }
        });
      },
      getImg(img) {
        let defaultPath = require("../assets/flags/aw.png");
        let path = require("../assets/flags/" + img + ".png");
        try {
          return path;
        } catch (e) {
          return defaultPath;
        }
      },
      populateCountries() {
        var optionsArr = this;
        useJwt
                .clientToken()
                .then((res) => {
                  let token = res.data.access_token;
                  useJwt
                          .countries(token)
                          .then((response) => {
                            response.data.map(function (value, key) {
                              optionsArr.options.push({
                                Country: value.isoAlpha2Country,
                                value: value.isoAlpha2Country,
                                text: value.country,
                                src: value.isoAlpha2Country.toLocaleLowerCase(),
                              });
                            });
                          })
                          .catch((error) => {
                            this.$toast({
                              component: ToastificationContent,
                              props: {
                                title: `${error}`,
                                icon: "EditIcon",
                                variant: "error",
                              },
                            });
                          });
                })
                .catch((error) => {
                  // this.$refs.registerForm.setErrors(error)
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: `${error.errorMessage}`,
                      icon: "EditIcon",
                      variant: "error",
                    },
                  });
                });
      },
    },
    mounted() {
      this.populateCountries();
    },
  };
  /* eslint-disable global-require */
</script>

<style lang="scss">
  .navbar-desktop a{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
    color: #6e6b7b !important;
    padding-bottom: 0 !important;
  }

  @import "@core/scss/vue/pages/page-auth.scss";
  @import "@core/scss/vue/libs/vue-select.scss";
</style>
