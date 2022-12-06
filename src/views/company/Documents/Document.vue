<template>
  <div>
    <b-card>
      <b-col
        v-if="!showForm"
        cols="12"
        class="d-flex justify-content-end align-items-center mb-1"
      >
        <b-col cols="2">
          <b-button
            small
            type="button"
            variant="primary"
            block
            @click="showForm = true"
          >
            Add Asset
          </b-button>
        </b-col>
      </b-col>

      <b-form
        v-if="showForm"
        @submit.prevent="createBinary"
      >
        <b-row>
          <b-col
            class="pb-2"
            cols="12"
          >
            <b-input-group class="input-group-merge">
              <b-form-textarea
                v-model="notes"
                placeholder="Add notes about binary file"
                rows="5"
              />
            </b-input-group>
          </b-col>
          <b-col cols="12">
            <file-pond
              ref="pond"
              required
              name="file"
              label-idle="Drop files here..."
              :allow-multiple="false"
              :files="myFiles"
              :server="server"
            />
          </b-col>
          <b-col
            cols="12"
            class="d-flex justify-content-end align-items-center mb-1"
          >
            <b-col cols="2">
              <b-button
                small
                type="submit"
                variant="primary"
                block
              >
                Create
              </b-button>
            </b-col>
          </b-col>
        </b-row>
      </b-form>
      <b-form
        v-if="showEditForm"
        @submit.prevent="updateBinary"
      >
        <b-row>
          <b-col
            class="pb-2"
            cols="12"
          >
            <b-input-group class="input-group-merge">
              <b-form-textarea
                v-model="asset.notes"
                required
                placeholder="Add notes about binary file"
                rows="5"
              />
            </b-input-group>
          </b-col>
          <b-col
            cols="12"
            class="d-flex justify-content-end align-items-center mb-1"
          >
            <b-col cols="2">
              <b-button
                small
                type="submit"
                variant="primary"
                block
              >
                Update
              </b-button>
            </b-col>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col cols="12">
          <b-table
            :fields="fields"
            :items="items"
            responsive
            class="mb-0"
            @sort-changed="checkStatus"
          >
            <template #cell(Media)="data">
              <div>
                <!--                :src="images[data.item.id].type === 'image/jpeg' ? images[data.item.id].image : require(filesImages[images[data.item.id].type])"-->
                <!--                :src="!!images[data.item.id] ? images[data.item.id].type === 'image/jpeg' ? images[data.item.id].image : require(filesImages[images[data.item.id].type]) : ''"-->

                <b-img
                  :key="images.length + '-' + !!images[data.item.id]"
                  class="hover-img"
                  blank-color="#ccc"
                  :src="images[data.item.id].type === 'image/bmp' || images[data.item.id].type === 'image/jpeg' || images[data.item.id].type === 'image/png' ? images[data.item.id].image : filesImages[images[data.item.id].type]"
                  rounded
                  width="62px"
                  @click="showImageDetail(data.item.id)"
                />
              </div>
            </template>
            <template #cell(Notes)="data">
              <b-row class="w-100" v-if="asset.id === data.item.id">
                <b-col
                  cols="10"
                >
                  <b-form-input
                    :id="'notes-' + data.item.id"
                    v-model="data.item.notes"
                    type="text"
                    name="notes"
                  />
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="success"
                    @click="updateBinary"
                  >
                    <feather-icon icon="CheckCircleIcon" />
                  </b-button>
                </b-col>
              </b-row>
              <p v-else>
                {{ data.item.notes }}
              </p>
            </template>
            <template
              #cell(action)="data"
              style="text-align: center !important"
            >
              <b-link
                @click="showImageDetail(data.item.id)"
              >
                <feather-icon
                  icon="EyeIcon"
                />
              </b-link>
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
                <b-dropdown-item
                  @click="editRecord(data)"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>
                <b-dropdown-item
                  @click="deleteAsset(data.item.binaryId)"
                >
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Delete</span>
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="images[data.item.id]"
                  :download="JSON.parse(data.item.binaryId).binaryId"
                  :href="images[data.item.id].image"
                >
                  <feather-icon icon="DownloadIcon" />
                  <span class="align-middle ml-50">Download</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </b-col>
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
            @input="getAssets"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="modal-center-media"
      title="Download Image"
      hide-footer
    >
      <b-img
        class="w-100"
        :src="imageD.type === 'image/bmp' || imageD.type === 'image/jpeg' || imageD.type === 'image/png' ? imageD.image : filesImages[imageD.type]"
      />
      <b-link
        class="btn btn-primary download-icon"
        :download="imageD.name"
        :href="imageD.image"
      >
        <feather-icon
          icon="DownloadIcon"
          size="30"
          class="text-danger"
        />
      </b-link>
    </b-modal>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css'
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import Ripple from 'vue-ripple-directive'

import axios from '@/libs/axios'
import router from '@/router'
import {
  BCard,
  BFormInput,
  BRow,
  BInputGroupAppend,
  BCol,
  BInputGroup,
  BFormTextarea,
  BButton,
  BForm,
  BPagination,
  BTable,
  BImg,
  BModal,
  BDropdown,
  BDropdownItem,
  BLink,
} from 'bootstrap-vue'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
)

export default {
  components: {
    FilePond,
    BCard,
    BRow,
    BCol,
    BForm,
    BButton,
    BTable,
    BInputGroup,
    BFormTextarea,
    BFormInput,
    BInputGroupAppend,
    BPagination,
    BImg,
    BModal,
    BDropdown,
    BDropdownItem,
    BLink,
  },
  directives: {
    Ripple,
  },
  data() {
    const self = this
    return {
      filesImages: {
        // eslint-disable-next-line global-require
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': require('@/assets/images/icons/doc.png'),
        // eslint-disable-next-line global-require
        'application/pdf': require('@/assets/images/icons/pdf.png'),
        // eslint-disable-next-line global-require
        'text/plain': require('@/assets/images/icons/txt.png'),
        // eslint-disable-next-line global-require
        'application/vnd.rar': require('@/assets/images/icons/zip.png'),
        // eslint-disable-next-line global-require
        'application/zip': require('@/assets/images/icons/zip.png'),
        // eslint-disable-next-line global-require
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': require('@/assets/images/icons/xls.png'),
      },
      asset: {},
      showForm: false,
      showEditForm: false,
      sortDesc: false,
      sortBy: 'id',
      currentPage: 1,
      perPage: '10',
      totalRecords: '',
      totalPages: '',
      searchQuery: '',
      binary: {},
      notes: '',
      myFiles: [],
      images: [],
      items: [],
      progress: 0,
      imageD: '',
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('companyId', router.currentRoute.params.id)

          const request = new XMLHttpRequest()
          const token = localStorage.getItem('accessToken')
          request.open('POST', `${axios.defaults.baseURL}/binaries/api/store-binary/${this.$route.params.id}`)
          request.setRequestHeader('Authorization', `Bearer ${token}`)
          request.upload.onprogress = e => {
            progress(e.lengthComputable, e.loaded, e.total)
          }
          // eslint-disable-next-line func-names
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              self.onResponse(request.response)
              load(request.responseText)
            } else {
              error('oh no')
            }
          }
          request.send(formData)
          return {
            abort: () => {
              request.abort()
              abort()
            },
          }
        },
      },
      fields: [
        'Media',
        // {
        //   key: 'binaryId',
        //   label: 'Binary Id',
        //   sortable: true,
        // },
        // 'Notes',
        {
          key: 'notes',
          label: 'Notes',
          sortable: true,
          class: 'w-100',
        },
        {
          key: 'action',
          label: 'Action',
        },
      ],
    }
  },
  mounted() {
    this.getAssets()
  },
  created() {
  },
  methods: {
    checkStatus(ctx) {
      if (ctx.sortDesc === false) {
        this.direction = 'asc'
      } else {
        this.direction = 'desc'
      }
      this.sortField = ctx.sortBy
      this.getAssets()
    },
    async getAssets() {
      const self = this
      const response = await axios.get(`/account/api/asset/list/${router.currentRoute.params.id}/${this.currentPage}/${this.perPage}?sortField=id&direction=desc&type=ASSET`)
      // eslint-disable-next-line no-restricted-syntax
      for (const item of response.data.elements) {
        self.images[item.id] = {
          image: '',
          type: '',
          id: item.id,
        }
        // eslint-disable-next-line no-await-in-loop
        await this.getImage(JSON.parse(item.binaryId), item.id)
      }
      this.items = response.data.elements
      this.totalRecords = response.data.totalElements
      this.totalPages = Math.ceil(this.totalRecords / this.perPage)
    },
    onResponse(r) {
      this.binary = JSON.parse(r)
    },
    async createBinary() {
      const postData = {}
      postData.binaryId = this.binary.binaryId
      postData.notes = this.notes
      postData.type = 'ASSET'
      await axios.post('/account/api/asset/create', postData)
        .then(async response => {
          if (response.status === 201) {
            this.notes = ''
            this.showForm = false
            this.makeToast('success', 'Created', 'Asset Created Successfully')
            await this.getAssets()
          }
        })
        .catch(error => {
          this.makeToast('danger', error.response.data.errorCode, error.response.data.errorMessage)
        })
    },
    async updateBinary() {
      const assetApi = {}
      assetApi.binaryId = JSON.parse(this.asset.binaryId).binaryId
      assetApi.notes = this.asset.notes
      assetApi.type = 'ASSET'
      const response = await axios.put(`/account/api/asset/update/${this.asset.id}`, assetApi)
      // eslint-disable-next-line func-names
      if (response.status === 200) {
        this.notes = ''
        this.asset = {}
        this.showEditForm = false
        this.makeToast('success', 'Updated', 'Asset Updated Successfully')
        await this.getAssets()
      }
      // .catch(error => {
      //   console.log(error.response)
      //   this.makeToast('danger', error.response.data.errorCode, error.response.data.errorMessage)
      // })
    },
    // eslint-disable-next-line consistent-return
    async getImage(data, id) {
      const self = this
      await axios.get(`${axios.defaults.baseURL}/binaries/api/get-binary/${data.binaryId}/${router.currentRoute.params.id}`, { responseType: 'blob' })
        .then(response => {
          if (response.status === 200) {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            console.log(response.data.type)
            // eslint-disable-next-line func-names
            reader.onload = function () {
              self.images[id] = {
                image: reader.result,
                name: id,
                type: response.data.type,
              }
              // self.images.push({
              //   image: reader.result,
              //   type: response.data.type,
              // })
            }
          } else {
            self.images[id] = {
              image: '',
              type: '',
              name: id,
            }
          }
        })
        .catch(error => {
          self.images[id] = {
            image: '',
            name: id,
            type: '',
          }
          this.makeToast('danger', error.response.data.errorCode, error.response.data.errorMessage)
        })
    },
    showImageDetail(index) {
      this.imageD = this.images[index]
      this.$bvModal.show('modal-center-media')
    },
    async deleteAsset(data) {
      const rec = JSON.parse(data)
      try {
        await axios.delete(`/account/api/asset/${rec.binaryId}`)
          .then(async response => {
            if (response.status === 204) {
              await this.getAssets()
              this.makeToast('success', 'Deleted', 'Asset Deleted Successfully')
            }
          })
          .catch(error => {
            this.makeToast('danger', error.response.data.errorCode, error.response.data.errorMessage)
          })
      } catch (error) {
        console.log('error ', error)
      }
    },
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
      })
    },
    async editRecord(data) {
      // this.showEditForm = true
      this.asset = data.item
    },
  },
}
</script>
