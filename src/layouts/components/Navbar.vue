<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <!--      <dark-Toggler class="d-none d-lg-block"/>-->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
      <!-- For Multilingual -->
      <b-nav-item-dropdown
        id="dropdown-grouped"
        variant="link"
        class="dropdown-language"
        right
      >
        <template #button-content>
          <b-img
            :src="currentLocale.img"
            height="14px"
            width="22px"
            :alt="currentLocale.locale"
          />
          <span class="ml-50 text-body">{{ currentLocale.name }}</span>
        </template>
        <b-dropdown-item
          v-for="localeObj in locales"
          :key="localeObj.locale"
          @click="changeLanguage(localeObj)"
        >
          <b-img
            :src="localeObj.img"
            height="14px"
            width="22px"
            :alt="localeObj.locale"
          />
          <span class="ml-50">{{ localeObj.name }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <!-- For Multilingual -->
      <b-nav-item-dropdown
        class="dropdown-notification mr-25"
        menu-class="dropdown-menu-media"
        right
      >
        <template #button-content>
          <feather-icon
            :badge="notificationCount"
            badge-classes="bg-danger"
            class="text-body"
            icon="BellIcon"
            size="21"
          />
        </template>

        <!-- Header -->
        <li class="dropdown-menu-header">
          <div class="dropdown-header d-flex">
            <h4 class="notification-title mb-0 mr-auto">
              Notifications
            </h4>
            <b-badge
              pill
              variant="light-primary"
            >
              {{ notificationCount }} New
            </b-badge>
          </div>
        </li>

        <!-- Notifications -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="scrollable-container media-list scroll-area notification-scroll"
          tagname="li"
          @ps-scroll-y="handleScroll"
        >
          <b-link
            v-for="(notification, index) in notifications"
            :key="index"
            @click="markNotificationAsRead(notification.id)"
          >
            <b-media :class="notification.read ? '' : 'unread'">
              <template #aside>
                <b-avatar
                  size="32"
                  :variant="notification.notificationSeverityType === 'INFO' ? 'light-success' :
                    notification.notificationSeverityType === 'WARNING' ? 'light-info' : 'light-danger'"
                >
                  <feather-icon
                    :icon="
                      notification.notificationSeverityType === 'INFO' ? 'CheckIcon' :
                      notification.notificationSeverityType === 'WARNING' ? 'AlertTriangleIcon' : 'AlertTriangleIcon'"
                  />
                </b-avatar>
              </template>
              <b-row class="justify-content-between">
                <p class="media-heading ml-1">
                  <span class="font-weight-bolder">
                    {{ notification.subject }}
                  </span>
                </p>
                <b-link class="icon-trash-notifications">
                  <feather-icon
                    :badge="notificationCount"
                    badge-classes="bg-danger"
                    class="text-body"
                    icon="Trash2Icon"
                    size="21"
                    @click="deleteNotification(notification.id)"
                  />
                </b-link>
              </b-row>
              <small class="notification-text">
                You can download file by clicking <a
                  href="javascript:void(0)"
                  @click="downloadFile(notification)"
                >here</a>
                <!--                <a-->
                <!--                  v-if="fullIndex !== notification.id"-->
                <!--                  href="javascript:void(0)"-->
                <!--                  @click="fullIndex = notification.id"-->
                <!--                >-->
                <!--                  read more-->
                <!--                </a>-->
              </small>
            </b-media>
          </b-link>
        </vue-perfect-scrollbar>

        <!-- Cart Footer -->
        <li class="dropdown-menu-footer">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            :disabled="notificationCount === 0"
            variant="primary"
            block
            @click="markNotificationReadAll()"
          >Read all notifications
          </b-button>
        </li>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown
        v-if="Object.keys(userDetail).length > 0"
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userDetail.firstName }} {{ userDetail.lastName }}
            </p>
            <span class="user-status">Admin | {{ $t('home') }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="userDetail.firstName[0] + userDetail.lastName[0]"
            :text="userDetail.firstName[0] + userDetail.lastName[0]"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item
          :to="{ name:'tickets' }"
          link-class="d-flex align-items-center"
        >
          <feather-icon
            size="16"
            icon="TagIcon"
            class="mr-50"
          />
          <span>Tickets</span>
        </b-dropdown-item>

        <!--        <b-dropdown-item link-class="d-flex align-items-center">-->
        <!--          <feather-icon-->
        <!--            size="16"-->
        <!--            icon="MailIcon"-->
        <!--            class="mr-50"-->
        <!--          />-->
        <!--          <span>Inbox</span>-->
        <!--        </b-dropdown-item>-->

        <!--        <b-dropdown-item link-class="d-flex align-items-center">-->
        <!--          <feather-icon-->
        <!--            size="16"-->
        <!--            icon="CheckSquareIcon"-->
        <!--            class="mr-50"-->
        <!--          />-->
        <!--          <span>Task</span>-->
        <!--        </b-dropdown-item>-->

        <!--        <b-dropdown-item link-class="d-flex align-items-center">-->
        <!--          <feather-icon-->
        <!--            size="16"-->
        <!--            icon="MessageSquareIcon"-->
        <!--            class="mr-50"-->
        <!--          />-->
        <!--          <span>Chat</span>-->
        <!--        </b-dropdown-item>-->
        <b-dropdown-divider />
        <b-dropdown-item
          :to="{ name:'settings' }"
          link-class="d-flex align-items-center"
        >
          <feather-icon
            size="16"
            icon="SettingsIcon"
            class="mr-50"
          />
          <span>Settings</span>
        </b-dropdown-item>
        <!--        <b-dropdown-item-->
        <!--          :to="{name:'my-plans'}"-->
        <!--          link-class="d-flex align-items-center"-->
        <!--        >-->
        <!--          <feather-icon-->
        <!--            size="16"-->
        <!--            icon="CreditCardIcon"-->
        <!--            class="mr-50"-->
        <!--          />-->
        <!--          <span>Pricing</span>-->
        <!--        </b-dropdown-item>-->
        <!--        <b-dropdown-item link-class="d-flex align-items-center">-->
        <!--          <feather-icon-->
        <!--            size="16"-->
        <!--            icon="InfoIcon"-->
        <!--            class="mr-50"-->
        <!--          />-->
        <!--          <span>FAQ</span>-->
        <!--        </b-dropdown-item>-->
        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BButton,
  BDropdownDivider,
  BDropdownItem,
  BFormCheckbox,
  BImg,
  BLink,
  BMedia,
  BNavbarNav,
  BNavItemDropdown,
  BRow,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'
import router from '@/router'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BImg,
    BRow,
    BBadge,
    BMedia,
    VuePerfectScrollbar,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BFormCheckbox,

    // Navbar Components
    DarkToggler,
  },
  directives: {
    Ripple,
  },
  filters: {},
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {
      },
    },
  },
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  created() {
    this.getUserDetail()
    this.getNotificationCount()
    this.getNotifications()
    this.getUserIpAddress()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    parseMessage(value) {
      const data = JSON.parse(value.message)
      return `You can download file by clicking <a href="javascript:void(0)" v-on:click="downloadFile(${data})">here</a>`
    },
    async downloadFile(message) {
      const data = JSON.parse(message.message)
      await axios.get(`${axios.defaults.baseURL}/binaries/api/get-binary/${data.binaryId}/${data.companyId}`, { responseType: 'blob' })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function () {
              const filePath = reader.result
              const a = document.createElement('a')
              a.href = filePath
              a.download = `${data.companyId}.zip`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }
          }
        })
        .catch(error => {
          console.log(error)
          this.makeToast('danger', error.response.errorCode, error.response.errorMessage)
        })
    },
    async getUserIpAddress() {
      const response = await fetch('https://api.ipify.org/?format=json')
      const myJson = await response.json()
      localStorage.setItem('ip', myJson.ip)
      await this.getUserLocationViaIp(myJson.ip)
    },
    async getUserLocationViaIp(ip) {
      const response = await fetch(`http://ip-api.com/json/${ip}`)
      const myJson = await response.json()
      localStorage.setItem('location', JSON.stringify(myJson))
      if (myJson.countryCode.toLowerCase() === 'bg') {
        myJson.locale = myJson.countryCode.toLowerCase()
        this.changeLanguage(myJson)
        localStorage.setItem('language', 'bg')
      } else {
        myJson.locale = 'en'
        this.changeLanguage(myJson)
        localStorage.setItem('language', 'en')
      }
    },
    toggleReadMore(id) {
      this.notifications.map(notification => {
        if (notification.id === id) {
          // eslint-disable-next-line no-param-reassign
          notification.message = notification.message.substring(0, 10)
          return notification
        }
        return notification
      })
    },
    handleScroll() {
      const container = this.$el.querySelector('.notification-scroll')
      if (container.scrollTop > 0 && container.clientHeight > 0 && container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
        this.page += 1
        this.getNotifications()
      }
    },
    changeLanguage(obj) {
      localStorage.setItem('language', obj.locale)
      this.$i18n.locale = obj.locale
    },
    async getNotifications() {
      const data = await axios.get(`account/api/notification/list/${this.page}/10?sortField=sentDate&direction=desc`)
      if (this.page > 1) {
        this.notifications.push(...data.data.elements)
      } else {
        this.notifications = data.data.elements
      }
    },
    async getNotificationCount() {
      const dataCount = await axios.get('account/api/notification/get-message-count-not-read')
      this.notificationCount = dataCount.data.unreadCount
    },
    async markNotificationAsRead(id) {
      const messageIds = [id]
      const index = this.notifications.findIndex(notification => notification.id === id)
      if (this.notifications[index].read === false) {
        const data = await axios.put('account/api/notification/mark-as-read', messageIds)
        if (data.status === 200) {
          this.notifications[index].read = true
          // eslint-disable-next-line no-plusplus
          this.notificationCount--
        }
      }
    },
    async markNotificationReadAll() {
      const data = await axios.put('account/api/notification/mark-all-as-read')
      if (data.status === 200) {
        await this.getNotifications()
        await this.getNotificationCount()
      }
    },
    async getUserDetail() {
      try {
        const data = await axios.get('account/api/user/who-am-i')
        if (data.status != 200) {
          this.logout()
        } else {
          this.userDetail = data.data
          localStorage.setItem('userData', JSON.stringify(data.data))
        }
      } catch (error) {
        console.log('error', error)
        this.logout()
      }
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Redirect to login page
      this.$router.push({ name: 'login' })
    },
    async deleteNotification(notificationId) {
      const noti = {}
      console.log(notificationId)
      noti.notificationId = notificationId
      const data = await axios.delete(`account/api/notification/${notificationId}`)
      console.log(data)
      if (data.status === 204) {
        // eslint-disable-next-line radix
        this.notifications = this.notifications.filter(notification => parseInt(notification.id) !== parseInt(notificationId))
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
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'English',
      },
      {
        locale: 'bg',
        img: require('@/assets/images/flags/bg.png'),
        name: 'Bulgaria',
      },
    ]

    const notificationCount = 0
    const fullIndex = 0
    const page = 1
    const notifications = ref([])
    const userDetail = ref({})

    const perfectScrollbarSettings = {
      maxScrollbarLength: 40,
      wheelPropagation: false,
    }

    return {
      userDetail,
      page,
      locales,
      notificationCount,
      fullIndex,
      notifications,
      perfectScrollbarSettings,
    }
  },
}
</script>
