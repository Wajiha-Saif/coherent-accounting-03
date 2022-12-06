<template>
  <b-card
    v-if="userName"
    class="card-congratulation-medal"
  >
    <h5 class="text-lg text-no-wrap font-weight-semibold">Hello {{ userName }}! 🎉</h5>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="mt-1"
      :to="{ name: 'CreateCompany'}"
    >
      Create Company
    </b-button>
    <b-img
      :src="require('@/assets/images/congo-illustration.png')"
      class="congratulation-medal"
      alt="User Pic"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import { ref } from "@vue/composition-api";
import axios from "@/libs/axios";
export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BImg,
    BButton,
  },
  directives: {
    Ripple,
  },
  setup() {
    const userName = ref()
    axios.get('account/api/user/who-am-i')
      .then(response => {
        const userData = response.data
        userName.value = userData.firstName + " " + userData.lastName
    })
    return{
      userName
    }
  },
  methods: {
    kFormatter,
  },
}
</script>
