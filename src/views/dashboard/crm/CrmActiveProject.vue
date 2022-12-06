<template>
  

  <b-card class="card-transaction" no-body>
    <b-card-header>
      <b-card-title>Unfinished Vat Reports</b-card-title>
    </b-card-header>

    <b-card-body>
      <div
          v-if="!activeProject"
        >
          <div class="alert-body">
            No record found
          </div>
      </div>
      <div
        v-if="activeProject"
        v-for="(transaction,index) in activeProject"
        :key="index"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar rounded size="42" :variant="transactionData[index].avatarVariant">
              <feather-icon size="18" :icon="transactionData[index].avatar" />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.companyName }}
            </h6>
            <small>{{ transaction.companyOwnerApi.companName }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="transactionData[index].deduction ? 'text-danger' : 'text-success'"
        >
          {{ transactionData[index].payment }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { ref } from "@vue/composition-api";
import axios from "@/libs/axios";
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BDropdown,
  BDropdownItem,
  BAlert
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BAlert
  },
  setup() {
    const activeProject = ref(null)
    axios.get('/account/api/dashboard/companies-with-unfinished-month-vat-reports')
      .then(response => {
        const projectsData = response.data
        if(projectsData?.length !== 0 && projectsData !== undefined){
          activeProject.value = projectsData
        }    
    })

    return{
      activeProject
    }
  },
  data() {
    return {
      transactionData: [
        {
          mode: "Wallet",
          types: "Starbucks",
          avatar: "PocketIcon",
          avatarVariant: "light-primary",
          payment: "-$74",
          deduction: true,
        },
        {
          mode: "Bank Transfer",
          types: "Add Money",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "+$480",
          deduction: false,
        },
        {
          mode: "Paypal",
          types: "Add Money",
          avatar: "DollarSignIcon",
          avatarVariant: "light-danger",
          payment: "+$480",
          deduction: false,
        },
        {
          mode: "Mastercard",
          types: "Ordered Food",
          avatar: "CreditCardIcon",
          avatarVariant: "light-warning",
          payment: "-$23",
          deduction: true,
        },
        {
          mode: "Transfer",
          types: "Refund",
          avatar: "TrendingUpIcon",
          avatarVariant: "light-info",
          payment: "+$98",
          deduction: false,
        },
      ],
    };
  },
};
</script>
