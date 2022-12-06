<template>
    <b-card-code title="">
      <div>
        <b-embed
          type="iframe"
          aspect="16by9"
          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
          allowfullscreen
        />
      </div>
  
      <template #code>
        {{ codeTypes }}
      </template>
    </b-card-code>
  </template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import { BEmbed, BCardText } from 'bootstrap-vue'
  import { codeTypes } from './code'
  
  export default {
    components: {
      BCardCode,
      BEmbed,
      BCardText,
    },
    data() {
      return { codeTypes }
    },
  }
  </script>
  