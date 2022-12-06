<template>

    <b-col lg="12" sm="12" md="12" class="p-0">
    <b-navbar toggleable="lg" type="light" variant="light" style="padding: 2rem;">
    <b-navbar-brand href="#">
        <div class="d-flex align-items-center">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1 mb-0">
          {{ $t("app_logo_title") }}
        </h2>
        </div>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="navbar-desktop" type="dark">
        <b-nav-item href="/login"> {{ $t("navbar.login") }}</b-nav-item>
        <b-nav-item href="/register">{{ $t("navbar.signup") }}</b-nav-item>
        <b-nav-item href="/about">{{ $t("navbar.about") }}</b-nav-item>
        <b-nav-item href="/questions">{{ $t("navbar.questions") }}</b-nav-item>
        <b-nav-item href="/videos/advertisement">{{ $t("navbar.videos") }}</b-nav-item>
        <b-nav-item href="/pricing">{{ $t("navbar.prices") }}</b-nav-item>
        <b-nav-item href="/free-digital-invoices">{{ $t("navbar.free_digital_invoices") }}</b-nav-item>
        </b-navbar-nav>
    </b-collapse>
    </b-navbar>
</b-col>
</template>
<script>
  import VuexyLogo from "@core/layouts/components/Logo.vue";
  import {
    BRow,
    BCol,
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BCollapse,
    BNavItem,
    BNavbarToggle
  } from 'bootstrap-vue'
  export default {
    components:{
        BRow,
        BCol,
        BNavbar,
        BNavbarBrand,
        BNavbarNav,
        BCollapse,
        BNavItem,
        BNavbarToggle,
        VuexyLogo
    }
  }
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.navbar-desktop a{
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  color: #6e6b7b !important;
  padding-bottom: 0 !important;
}

</style>