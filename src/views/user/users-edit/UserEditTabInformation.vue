<template>
  <div>

    <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="userEdit(userDataInfo)"
        >
          
          <!-- Full Name -->
          <validation-provider
            #default="validationContext"
            name="firstMiddleAndLastName"
             
          >
            <b-form-group
              label="Full Name"
              label-for="firstMiddleAndLastName"
            >
              <b-form-input
                id="FirstMiddleAndLastName"
                v-model="userDataInfo.firstMiddleAndLastName"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="John Doe"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="Address"
             
          >
            <b-form-group
              label="Address"
              label-for="address"
            >
              <b-form-input
                id="address"
                v-model="userDataInfo.address"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="IdCardNumber"
             
          >
            <b-form-group
              label="Id Card Number"
              label-for="idcardNumber"
            >
              <b-form-input
                id="idcardNumber"
                v-model="userDataInfo.idcardNumber"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="IdentificationNumber"
             
          >
            <b-form-group
              label="Identification Number"
              label-for="identificationNumber"
            >
              <b-form-input
                id="identificationNumber"
                v-model="userDataInfo.identificationNumber"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            #default="validationContext"
            name="VatIdentificationNumber"
             
          >
            <b-form-group
              label="Vat Identification Number"
              label-for="vatIdentificationNumber"
            >
              <b-form-input
                id="vatIdentificationNumber"
                v-model="userDataInfo.vatIdentificationNumber"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Save Changes
            </b-button>
          </div>

        </b-form>
      </validation-observer>
  </div>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BFormRadioGroup, BFormCheckboxGroup, BButton, BInputGroup, BInputGroupPrepend, BFormInvalidFeedback
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import useJwt from "@/auth/jwt/useJwt";
import router from '@/router'
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    BRow, BCol, BForm, BFormGroup, flatPickr, BFormInput, vSelect, BFormRadioGroup, BFormCheckboxGroup, BButton, BInputGroup, BInputGroupPrepend, ValidationProvider, ValidationObserver, BFormInvalidFeedback
  },
  directives: {
    Ripple,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const userDataInfo = ref(null)
    userDataInfo.value = props.userData
    
    const {
      refFormObserver,
      getValidationState,
    } = formValidation()


    return {
      userDataInfo,
      props,
      refFormObserver,
      getValidationState,
    }
  },
  methods: {
    userEdit(userData){
      let token = useJwt.getToken()
      useJwt
          .EditUser(token, router.currentRoute.params.id, userData)
          .then((response) => {
            
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `User Updated Successfully`,
                icon: "EditIcon",
                variant: "success",
              },
            });
            return this.$router.push({
              name: "invoices", 
              params: { 
                id: 2 
              }
            })
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `${error.response.data.errorMessage}`,
                icon: "EditIcon",
                variant: "error",
              },
            });
          });
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
