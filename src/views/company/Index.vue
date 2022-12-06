

<template>
  <div>
    <div class="row">
      <!-- <input data-v-9a6e255c="" type="text" placeholder="Search..." class="d-inline-block mr-1 form-control col-4" style="margin-left: 15px" /> -->
      <div
        
        
        class="input-group col-4 abc"
      >
        <!----><input
          data-v-15eba8c6=""
          type="text"
          placeholder="Search Product"
          class="search-product form-control "
          id="__BVID__3198"
          v-model="searchQuery"
          @keyup="searchCompanies()"
        />
        <div data-v-15eba8c6="" class="input-group-append">       
          <div data-v-15eba8c6="" class="input-group-text" style="height: 38px; cursor:pointer" > 
            <!-- #7367f0 -->
            <svg
              data-v-15eba8c6=""
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-muted feather feather-search"
            >
              <circle data-v-15eba8c6="" cx="11" cy="11" r="8"></circle>
              <line
                data-v-15eba8c6=""
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              ></line>
            </svg>
          </div>
        </div>
        <!---->
      </div>
      <b-button
        to="/company/create"
        variant="relief-primary"
        class="float-right mb-1 col-2 ml-auto"
        style="margin-right: 15px"
        >Add Company</b-button
      >
    </div>
    <b-table :fields="fields" :items="items" responsive class="mb-0"  :sort-by.sync="sortBy"  :sort-desc.sync="sortDesc" @sort-changed="checkStatus">
      <template #cell(Country)="data">
        <div>
          <!-- {{data.item.companyCountry}} -->
          <!-- :src="getImage(data.item.companyCountry)" -->
          <img
            :src='"@/assets/flags/" + data.item.companyIsoAlpha2Country.toLowerCase() + ".png"'
            style="width: 30px; height: 20px; margin-left: 10px"
          />
        </div>
      </template>


      <template #cell(companyName)="data">
        <div
          v-if="data.item.companyName.indexOf(' ') > 0"
          style="
            margin-right: 8px;
            padding-top: 4px;
            border-radius: 50%;
            background-color: #7367f0;
            color: white;
            width: 32px;
            height: 28px;
            display: inline-flex;
            justify-content: center;
          "
        >
          <span
            >{{ data.item.companyName.substr(0, 1)
            }}{{
              data.item.companyName.substr(
                data.item.companyName.indexOf(" ") + 1,
                1
              ).toUpperCase()
            }}</span
          >
        </div>
        <div
          v-else
          style="
            margin-right: 8px;
            padding-top: 4px;
            border-radius: 50%;
            background-color: #7367f0;
            color: white;
            width: 32px;
            height: 28px;
            display: inline-flex;
            justify-content: center;
          "
        >
          <span
            >{{ data.item.companyName.substr(0, 1)
            }}{{ data.item.companyName.substr(1, 1).toUpperCase() }}</span
          >
        </div>
        <b-link :to="{ name: 'CompanyView', params: { id: data.item.id } }"
          >{{ data.item.companyName }}
        </b-link>

        <!-- <div>{{data.item.companyName}}</div> -->
      </template>

      <template #cell(companyMail)="data">
        <div>{{ data.item.companyMail }}</div>
      </template>

      <template #cell(companyOwnerFirstName)="data">
        <div>{{ data.item.companyOwnerApi.companyOwnerName }}</div>
      </template>

      <template #cell(companyIdentificationNumber)="data">
        <b-link :to="{ name: 'CompanyView', params: { id: data.item.id } }">{{
          data.item.companyIdentificationNumber
        }}</b-link>

        <!-- <div>{{data.item.companyIdentificationNumber}}</div> -->
      </template>

      <template style="text-align: center !important" #cell(action)="data">
        <!-- <b-button variant="outline-primary" class="btn-icon"> -->

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
              class="align-middle text-body ml-1"
            />
          </template>
          <!-- <b-dropdown-item>
            <feather-icon icon="DownloadIcon" />
            <span class="align-middle ml-50">Download</span>
          </b-dropdown-item> -->
          <b-dropdown-item
            :to="{
              name: 'EditCompany',
              params: { id: data.item.id },
            }"
          >
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Edit</span>
          </b-dropdown-item>
          <b-dropdown-item>
            <feather-icon icon="TrashIcon" />
            <span
              class="align-middle ml-50"
              @click="deleteCompany(data.item.id)"
              >Delete</span
            >
          </b-dropdown-item>
          <!-- <b-dropdown-item>
            <feather-icon icon="CopyIcon" />
            <span class="align-middle ml-50">Duplicate</span>
          </b-dropdown-item> -->
        </b-dropdown>

        <!-- </b-button> -->
      </template>
    </b-table>

    <div class="mx-2 mb-2 mt-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <!-- <span class="text-muted"
            >Showing {{ currentPage + 9 - 9 }} to {{ currentPage + 9 }} of
            {{ this.totalRecords }} entries</span
          > -->
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRecords"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
            prev-text
            @input="getNewRecord"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template> 
<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import Swal from "sweetalert2";

// import {  BBadge, BButton, BLink, } from 'bootstrap-vue'

import {
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
  BProgress,
} from "bootstrap-vue";

import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";

// import store from '@/store'

export default {
  components: {
    BCardCode,
    BTable,
    BProgress,
    BBadge,
    BButton,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
  },

  data() {
    return {
      direction:"asc",
      sortField: "companyName",
      sortBy : 'companyName',
      sortDesc: false,
      fields: [
        // A virtual column that doesn't exist in items
        "Country",
        // A column that needs custom formatting
        { key: "companyName", label: "Company Name", sortable: true},
        {key: "companyMail", label: "Email", sortable: true},
        // A regular column
        { key: "companyOwnerFirstName", label: "Owner Name", sortable: true },
        // A regular column
        { key: "companyIdentificationNumber", label: "Company ID", sortable: true },
        // A virtual column made up from two fields
        { key: "action", label: "Action" },
      ],
      items: [],
      currentPage: 1,
      perPage: "10",
      totalRecords: "",
      totalPages: "",
      searchQuery:"",
     

      // items: [
      //   {
      //     id: '1234567',
      //     Country: 'BG',
      //     company_name: 'Accounting Software',
      //     Email: 'accounting@software.com',
      //     owner_name: 'Ivan Ivonov',
      //     company_identification_number: 'CVS1234567NHY',
      //     action: 'Edit/Delete'
      //   },
      //   {
      //     id: '1234568',
      //     Country: 'EN',
      //     company_name: 'NodeJs Software',
      //     Email: 'accounting@software.com',
      //     owner_name: 'Ivan Ivonov',
      //     company_identification_number: 'CVS1234567NHY',
      //     action: 'Edit/Delete'
      //   },
      //   {
      //     id: '1234569',
      //     Country: 'EN',
      //     company_name: 'Accounting Software',
      //     Email: 'accounting@software.com',
      //     owner_name: 'Ivan Ivonov',
      //     company_identification_number: 'CVS1234JH7NHY',
      //     action: 'Edit/Delete'
      //   },
      //   {
      //     id: '1234570',
      //     Country: 'BG',
      //     company_name: 'Laravel Software',
      //     Email: 'laravel@software.com',
      //     owner_name: 'Ivan Ivonov',
      //     company_identification_number: 'CVS1254567NHY',
      //     action: 'Edit/Delete'
      //   },
      //   {
      //     id: '1234571',
      //     Country: 'EN',
      //     company_name: 'VueJs Software',
      //     Email: 'vue@software.com',
      //     owner_name: 'Ivan Ivonov',
      //     company_identification_number: 'CVS12877NHY',
      //     action: 'Edit/Delete'
      //   }
      // ],
    };
  },
  methods: {
    checkStatus(ctx){
      if(ctx.sortDesc === false){
        this.direction = "asc";
      }
      else{
        this.direction = "desc";
      }
      this.sortField = ctx.sortBy;
     this.getAllCompanies();
     
    },

     // getting the list of all companies
     async searchCompanies() {
      const data = await axios.get(
        "/account/api/company/search/" +
          this.currentPage +
          "/" +
          this.perPage +
          "?direction="+this.direction+"&queryString="+this.searchQuery +"&sortField="+this.sortField,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      );

      if (data.data.elements != "") {
        this.items = data.data.elements;
        this.totalRecords = data.data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / this.perPage);
        // console.log(this.totalPages);
      }
      else{
        this.items = [];
        this.totalRecords = "";
        this.totalPages = "";
      }
 
    },

    // getImage(country) {
    //   var countryImage = "https://countryflagsapi.com/svg/" + country;
    //   return countryImage;
    // },

    //
    async deleteCompany(companyID) {
      var config = {
        method: "delete",
        url: "/account/api/company/" + companyID,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      };

      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          // console.log(companyID);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Company Deleted!",
            showConfirmButton: false,
            timer: 1400,
          });
         
        })
        .catch(function (error) {
          console.log(error);
        });
        setTimeout(() => {
       this.getAllCompanies();
      }, 1400);
    },

    // getting the list of all companies
    async getAllCompanies() {
      const data = await axios.get(
        "/account/api/company/list/" +
          this.currentPage +
          "/" +
          this.perPage +
          "?direction="+this.direction+"&sortField="+this.sortField,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      );

      if (data.data.elements != "") {
        this.items = data.data.elements;
        this.totalRecords = data.data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / this.perPage);
        // console.log(this.totalPages);
      }

      // axios.get("/account/api/company/list/1/10?direction=desc&sortField=id", {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //     'Access-Control-Allow-Credentials' : true,
      //     'Access-Control-Allow-Origin': "http://localhost:8080"
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     if(responseJson.success){
      //       this.items = responseJson.success.elements;
      //       console.log(this.items);
      //     }
      //   })
      //   .catch();
    },

    //
    async getNewRecord(cP) {
      // alert(cP);
      const data = await axios.get(
        "/account/api/company/list/" +
          cP +
          "/" +
          this.perPage +
          "?direction=desc&sortField=id",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      );

      if (data.data.elements != "") {
        this.items = data.data.elements;
      }
    },
  },
  created() {
    console.log();
    this.getAllCompanies();
    // useJwt.clientToken().then(res => {
    //   let token = res.data.access_token
    //   useJwt.companies(token).then(response => {
    //     console.log(response);
    //   }).catch(error => {
    //     //
    //   })
    // })
  },
};
</script>
<style scoped>
/*  */
.input-group{
  box-shadow: none !important;
}

</style>>

