<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="4"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="userData.avatar"
            :text="avatarText(userData.firstMiddleAndLastName)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.firstMiddleAndLastName }}
              </h4>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'apps-users-edit', params: { id: userData.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
                @click="UserDelete(userData.id)"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="4"
      >
        <table class="mt-2 mt-xl-0 user-preview-detail">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="HashIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">ID</span>
            </th>
            <td class="pb-50">
              {{ userData.id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Username</span>
            </th>
            <td class="pb-50">
              {{ userData.firstMiddleAndLastName }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="LockIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Identification Number</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.identificationNumber }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="ItalicIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Vat Identification Number</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.vatIdentificationNumber }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="PlusCircleIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Address</span>
            </th>
            <td class="pb-50">
              {{ userData.address }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">ID Card Number</span>
            </th>
            <td>
              {{ userData.idcardNumber }}
            </td>
          </tr>
        </table>
      </b-col>
      <b-col
        cols="12"
        xl="4"
      >
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList'
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    UserDelete(id) {
      let token = useJwt.getToken()
      useJwt
        .DeleteUser(token,id)
        .then((response) => {
          
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `User Deleted Successfully`,
              icon: "DeleteIcon",
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
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    }
  },
  setup() {
    const { resolveUserRoleVariant } = useUsersList()
    return {
      avatarText,
      resolveUserRoleVariant,
    }
  },
}
</script>

<style>
.user-preview-detail th{
  padding-right: 2rem;
}
</style>
