<template>
    <div>
        <b-row class="auth-inner m-0">
            <navbarAds />
        </b-row>
              <!-- search input -->
      <section id="questions">
        <div class="text-center">
          <h1 class="text-primary text-center mt-5 mb-5">
            {{ $t('questions.title')}}
          </h1>
        </div>
      </section>
      <!--/ search input -->
      <section id="questions-content">
  
      <!-- collapse -->
      <b-row class="kb-search-content-info match-height m-0">
        <b-col
            v-for="item in questions"
            :key="item.question"
            md="12"
            sm="12"
          >
            <app-collapse
                id="faq-payment-qna"
                accordion
                type="margin"
                class="mt-2 px-2"
            >
        
                <app-collapse-item
                 :title="$t(`${item.question}`)"
                >
                {{ $t(`${item.answer}`)}}
                </app-collapse-item>
        
            </app-collapse>
      </b-col>
    </b-row>
    </section>
      <!--/ collapse -->
    </div>
  </template>
  
  <script>
  import { BAvatar } from 'bootstrap-vue'
  import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
  import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
  import VuexyLogo from "@core/layouts/components/Logo.vue";
  import navbarAds from "./navbarAds.vue"
  import {
    BRow, BCol, BCard, BCardBody, BForm, BInputGroup, BFormInput, BCardText, BInputGroupPrepend,
  } from 'bootstrap-vue'
  export default {
    components: {
      BAvatar,
      AppCollapseItem,
      AppCollapse,
      navbarAds,
      BRow,
      BCol,
      BCard,
      BCardBody,
      BCardText,
      BForm,
      BInputGroup,
      BInputGroupPrepend,
      BFormInput,
      navbarAds
    },
    props: {
      options: {
        type: Object,
        default: () => {},
      },
    },
    data() {
        return{
            questions: [
                { question: `questions.question_qst_1` , answer: `questions.answer_qst_1` },
                { question: `questions.question_qst_2` , answer: `questions.answer_qst_2` },
                { question: `questions.question_qst_3` , answer: `questions.answer_qst_3` },
                { question: `questions.question_qst_4` , answer: `questions.answer_qst_4` },
                { question: `questions.question_qst_5` , answer: `questions.answer_qst_5` },
                { question: `questions.question_qst_6` , answer: `questions.answer_qst_6` },
                { question: `questions.question_qst_7` , answer: `questions.answer_qst_7` },
                { question: `questions.question_qst_8` , answer: `questions.answer_qst_8` },
            ]
        }
    }
  }
</script>
  <style lang="scss">
  @import "@core/scss/vue/pages/page-auth.scss";
  @import '@core/scss/vue/pages/page-knowledge-base.scss';
 </style>
  