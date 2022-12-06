<template>
  <section class="invoice-add-wrapper">
    <b-form>
      <b-card no-body>
        <b-card-header
          class="justify-content-center mb-2"
          style="border-bottom: 0.5px lightgrey solid"
        >
          <div class="d-flex align-items-center mb-0">
            <h4 class="title mr-1 mb-0">VAT Report</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <validation-observer ref="addVatReportRules" tag="form">
            <!--  -->
            <b-row>
              <b-col cols="12" xl="6" md="6">
                <b-row>
                  <b-col cols="8" xl="8" md="8" class="mt-1 pt-0"
                    ><h6>
                      <b>
                        СПРАВКА-ДЕКЛАРАЦИЯ ЗА ДАНЪК ВЪРХУ ДОБАВЕНАТА СТОЙНОСТ
                      </b>
                    </h6>
                  </b-col>
                  <b-col cols="2" xl="2" md="2"> </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" xl="6" md="6" style="align-content: flex-end">
                <!--  -->
                <b-row>
                  <b-col cols="3" xl="3" md="3"></b-col>
                  <b-col cols="7" xl="7" md="7"> <p>TД на НАП/офис</p></b-col>
                  <b-col cols="2" xl="2" md="2"></b-col>
                </b-row>
                <!--  -->
                <b-row>
                  <b-col cols="3" xl="3" md="3"></b-col>
                  <b-col cols="9" xl="9" md="9">
                    <p>
                      Входящ No................../....................... г.
                    </p></b-col
                  >
                </b-row>
                <!--  -->
                <b-row class="mt-0">
                  <b-col cols="3" xl="3" md="3"></b-col>
                  <b-col cols="6" xl="6" md="6">
                    <p>Попълва се от приходната администрация</p></b-col
                  >
                  <b-col cols="2" xl="2" md="2"></b-col>
                </b-row>

                <!--  -->
                <b-row>
                  <b-col cols="3" xl="3" md="3"><p>Данъчен период:</p></b-col>
                  <b-col cols="6" xl="6" md="6">
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('input_01')"
                      rules="required"
                    >
                      <!-- <b-form-input
                        id="input_01"
                        v-model="form.taxPeriod"
                        name="input_01"
                        :state="errors.length > 0 ? false : null"
                      /> -->
                      <vue-monthly-picker
                        id="input_01"
                        v-model="form.taxPeriod"
                        name="input_01"
                        style="
                          background-color: #fff;
                          background-clip: padding-box;
                          height: 40px;
                          border: 1px solid #dbdbdb;
                          border-radius: 0.357rem;
                        "
                        dateFormat="Y-MM"
                        :monthLabels="monthLabels"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      >
                      </vue-monthly-picker>
                      <small><b>мм / гггг</b></small>
                      <small class="text-danger ml-1">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                  <b-col cols="3" xl="3" md="3"></b-col>
                </b-row>
                <!--  -->
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="12" xl="6" md="6" class="mt-2">
                <b-row
                  ><b-col cols="8" xl="8" md="8" class="mt-1"
                    ><h6>
                      <b>
                        A. Наименование и адрес за кореспонденция на
                        регистрираното лице
                      </b>
                    </h6>
                  </b-col>
                  <b-col cols="4" xl="4" md="4"> </b-col
                ></b-row>
                <b-row>
                  <b-col cols="8" xl="8" md="8" class="mt-1">
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('input_02')"
                      rules="required"
                    >
                      <b-form-input
                        id="input_02"
                        v-model="form.nameAndAddress"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                  <b-col cols="4" xl="4" md="4"> </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" xl="6" md="6">
                <b-row class="mt-2">
                  <b-col cols="3" xl="3" md="3"></b-col>
                  <b-col cols="6" xl="6" md="6"> <p>ИН по ЗДДС:</p></b-col>
                  <b-col cols="3" xl="3" md="3">
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('input_03')"
                      rules="required"
                    >
                      <b-form-input
                        id="input_03"
                        v-model="form.vatNumber"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                </b-row>

                <!--  -->
                <b-row class="mt-1">
                  <b-col cols="3" xl="3" md="3"></b-col>
                  <b-col cols="6" xl="6" md="6"> <p>ИН:</p></b-col>
                  <b-col cols="3" xl="3" md="3">
                    <validation-provider
                      #default="{ errors }"
                      v-bind:name="$t('eic')"
                      rules="required"
                    >
                      <b-form-input
                        id="eic"
                        v-model="form.eic"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-2">
              <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
                ><h5>
                  <b>
                    Раздел А: Данни за начислен данък върху добавената стойност
                  </b>
                </h5>
              </b-col>
            </b-row>

            <!--  input column 01 and 20-->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Общ размер на данъчните основи за облагане с ДДС (сума от кл.
                  11 до кл. 16)
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-01')"
                  rules="required"
                >
                  <b-form-input
                    id="input-column-01"
                    v-model="form.inputColumn01"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>01</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Всичко начислен ДДС (сума от кл.21 до кл.24)</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-20')"
                  rules="required"
                  ><b-form-input
                    id="input-column-20"
                    v-model="form.inputColumn20"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>20</h4>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-1">
              <b-col cols="5" xl="5" md="5" class=""
                ><h5>
                  <b>Данъчна основа, подлежаща на облагане със ставка 20%:</b>
                </h5>
              </b-col>
            </b-row>

            <!--input column 11 and 21  -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - данъчна основа на облагаемите доставки, вкл. Доставките при
                  условията на дистанционни продажби с място на изпълнение на
                  територията на страната
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-11')"
                  rules="required"
                  ><b-form-input
                    id="input-column-11"
                    v-model="form.inputColumn11"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>11</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Начислен ДДС:</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-21')"
                  rules="required"
                  ><b-form-input
                    id="input-column-21"
                    v-model="form.inputColumn21"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>21</h4>
              </b-col>
            </b-row>

            <!-- input column 12 and 22 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - данъчна основа на ВОП и данъчна основа на получени доставки
                  по чл.82, ал. 2 - 5 ЗДДС
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-12')"
                  rules="required"
                >
                  <b-form-input
                    id="input-column-12"
                    v-model="form.inputColumn12"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>12</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Начислен ДДС за ВОП и за получени доставки по чл. 82, ал. 2-5
                  ЗДДС
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-22')"
                  rules="required"
                  ><b-form-input
                    id="input-column-22"
                    v-model="form.inputColumn22"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>22</h4>
              </b-col>
            </b-row>

            <!-- input column 23 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""> </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"> </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
              >
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Начислен данък за доставки на стоки и услуги за лични нужди
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-23')"
                  rules="required"
                  ><b-form-input
                    id="input-column-23"
                    v-model="form.inputColumn23"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>23</h4>
              </b-col>
            </b-row>

            <!-- input columns 13 and 24 -->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Данъчна основа на облагаемите доставки със ставка 9%</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-13')"
                  rules="required"
                  ><b-form-input
                    id="input-column-13"
                    v-model="form.inputColumn13"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>13</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Начислен ДДС (9%)</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-24')"
                  rules="required"
                  ><b-form-input
                    id="input-column-24"
                    v-model="form.inputColumn24"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>24</h4>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-1">
              <b-col cols="5" xl="5" md="5" class=""
                ><h5>
                  <b>Данъчна основа, подлежаща на облагане със ставка 0%:</b>
                </h5>
              </b-col>
            </b-row>

            <!-- input column 14-->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>- данъчна основа за доставки по глава трета от ЗДДС</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-14')"
                  rules="required"
                >
                  <b-form-input
                    id="input-column-14"
                    v-model="form.inputColumn14"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>14</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!-- input column 15  -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>- данъчна основа ВОД на стоки</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-15')"
                  rules="required"
                  ><b-form-input
                    id="input-column-15"
                    v-model="form.inputColumn15"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>15</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!-- input column 16  -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - данъчна основа на доставки по чл. 140, 146 и чл. 173 ЗДДС
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-16')"
                  rules="required"
                  ><b-form-input
                    id="input-column-16"
                    v-model="form.inputColumn16"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>16</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!-- input column 17 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - Данъчна основа на доставки на услуги по чл. 21, ал. 2 с
                  място на изпълнение на територията на друга държава членка
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-17')"
                  rules="required"
                  ><b-form-input
                    id="input-column-17"
                    v-model="form.inputColumn17"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>17</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!--  input column 18-->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - Данъчна основа на доставки по чл. 69, ал. 2 ЗДДС, вкл.
                  доставките при условията на дистанционни продажби с място на
                  изпълнение на територията на друга държава членка както и на
                  доставки като посредник в тристранна операция
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-18')"
                  rules="required"
                  ><b-form-input
                    id="input-column-18"
                    v-model="form.inputColumn18"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>18</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!-- input column 19 -->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - Данъчна основа на освободените доставки и освободените ВОП
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-19')"
                  rules="required"
                  ><b-form-input
                    id="input-column-19"
                    v-model="form.inputColumn19"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>19</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-2">
              <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
                ><h5>
                  <b> Раздел Б: Данни за упражнено право на данъчен кредит </b>
                </h5>
              </b-col>
            </b-row>

            <!-- input column 30 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  - Данъчна основа и данък на получените доставки по чл. 82, ал.
                  2-5 ЗДДС и вноса без право на данъчен кредит или без данък
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-30')"
                  rules="required"
                  ><b-form-input
                    id="input-column-30"
                    v-model="form.inputColumn30"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>30</h4>
              </b-col>
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Данъчна основа на получените доставки, ВОП, получените
                  доставки по чл. 82, ал. 2-5 ЗДДС, вноса, както и данъчна
                  основа на получените доставки, използвани за извършване на
                  доставки по чл. 69, ал. 2 ЗДДС:
                </p>
              </b-col>
              <b-col cols="8" xl="8" md="8" style="padding: 0px"> </b-col>
            </b-row>

            <!-- input column 31 and 41 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>- с право на пълен данъчен кредит</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-31')"
                  rules="required"
                  ><b-form-input
                    id="input-column-31"
                    v-model="form.inputColumn31"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>31</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>ДДС с право на пълен данъчен кредит</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-41')"
                  rules="required"
                >
                  <b-form-input
                    id="input-column-41"
                    v-model="form.inputColumn41"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>41</h4>
              </b-col>
            </b-row>

            <!-- input column 32 and 42 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>- с право на частичен данъчен кредит</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-32')"
                  rules="required"
                  ><b-form-input
                    id="input-column-32"
                    v-model="form.inputColumn32"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>32</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>ДДС с право на частичен данъчен кредит</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-42')"
                  rules="required"
                  ><b-form-input
                    id="input-column-42"
                    v-model="form.inputColumn42"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>42</h4>
              </b-col>
            </b-row>

            <!-- input column 43 -->
            <b-row class="mt-1">
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Годишна корекция по чл. 73, ал. 8 (+/-)</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-43')"
                  rules="required"
                  ><b-form-input
                    id="input-column-43"
                    v-model="form.inputColumn43"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>43</h4>
              </b-col>
            </b-row>

            <!--  input column 33 and 40-->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>- коефициент по чл. 73, ал. 5 ЗДДС</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-33')"
                  rules="required"
                  ><b-form-input
                    id="input-column-33"
                    v-model="form.inputColumn33"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>33</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Общо данъчен кредит (кл.41 + кл.42 х кл. 33 + кл.43)</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-40')"
                  rules="required"
                  ><b-form-input
                    id="input-column-40"
                    v-model="form.inputColumn40"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>40</h4>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-2">
              <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
                ><h5><b> Раздел В: Резултат за периода </b></h5>
              </b-col>
            </b-row>

            <!-- input column 50 and 60 -->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>ДДС за внасяне (кл.20 - кл.40) >= 0</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-50')"
                  rules="required"
                  ><b-form-input
                    id="input-column-50"
                    v-model="form.inputColumn50"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small></validation-provider
                >
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>50</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class="">
                <p>ДДС за възстановяване (кл.20 - кл.40) < 0</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-60')"
                  rules="required"
                  ><b-form-input
                    id="input-column-60"
                    v-model="form.inputColumn60"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>60</h4>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-2">
              <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
                ><h5><b> Раздел Г: ДДС за внасяне </b></h5>
              </b-col>
            </b-row>

            <!-- input column 70 and 71 -->
            <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Данък за внасяне от кл. 50, приспаднат по реда на чл. 92, ал.
                  1 ЗДДС
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-70')"
                  rules="required"
                  ><b-form-input
                    id="input-column-70"
                    v-model="form.inputColumn70"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>70</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class="">
                <p>Данък за внасяне от кл. 50, внесен ефективно</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-71')"
                  rules="required"
                  ><b-form-input
                    id="input-column-71"
                    v-model="form.inputColumn71"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>71</h4>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-2">
              <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
                ><h5><b> Раздел Д: ДДС, подлежащ на възстановяване </b></h5>
              </b-col>
            </b-row>

            <!-- input column 80 and 81 -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>
                  Съгласно чл. 92, ал. 1 ЗДДС в 30-дневен срок от подаването на
                  тази декларация
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-80')"
                  rules="required"
                  ><b-form-input
                    id="input-column-80"
                    v-model="form.inputColumn80"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>80</h4>
              </b-col>
              <b-col cols="4" xl="4" md="4" class="">
                <p>
                  Съгласно чл. 92, ал. 3 ЗДДС в 30-дневен срок от подаването на
                  тази декларация
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-81')"
                  rules="required"
                  ><b-form-input
                    id="input-column-81"
                    v-model="form.inputColumn81"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>81</h4>
              </b-col>
            </b-row>

            <!-- input column 82 -->
            <b-row class="mt-1">
              <b-col cols="6" xl="6" md="6" class=""> </b-col>
              <b-col cols="4" xl="4" md="4" class="">
                <p>
                  Съгласно чл. 92, ал. 4 ЗДДС в 30-дневен срок от подаването на
                  тази декларация
                </p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('input-column-82')"
                  rules="required"
                >
                  <b-form-input
                    id="input-column-82"
                    v-model="form.inputColumn82"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col
                cols="1"
                xl="1"
                md="1"
                style="text-align: center; padding-top: 7px"
                ><h4>82</h4>
              </b-col>
            </b-row>

            <b-row class="mt-1">
              <b-col cols="12" xl="12" md="12"> <p>Долуподписаният:</p></b-col>
            </b-row>

            <!-- responsible person -->
            <b-row class="mt pb-2" style="border-bottom: 1px solid lightgrey">
              <b-col cols="4" xl="4" md="4" class=""
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('responsiblePerson')"
                  rules="required"
                  ><b-form-input
                    id="responsiblePerson"
                    v-model="form.responsiblePerson"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col cols="2" xl="2" md="2" style="padding: 0px"
                ><p>декларирам, че:</p>
              </b-col>
            </b-row>

            <!--  -->
            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4"> </b-col>
              <b-col cols="8" xl="8" md="8">
                <p>
                  представлявам лицето, посочено в кл. А, и посочената в този
                  формуляр информация е вярна и точна.
                </p></b-col
              >
            </b-row>

            <b-row class="">
              <b-col cols="4" xl="4" md="4"> </b-col>
              <b-col cols="8" xl="8" md="8">
                <p>
                  са налице обстоятелствата по чл. 92, ал. 3 и 4 ЗДДС.
                </p></b-col
              >
            </b-row>

            <b-row class="mt-1">
              <b-col cols="4" xl="4" md="4"> </b-col>
              <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
                <p>
                  Известно ми е, че за неверни данни нося отговорност по чл. 313
                  НК
                </p></b-col
              >
            </b-row>

            <!-- dateCreated -->
            <b-row class="">
              <b-col cols="4" xl="4" md="4" class=""
                ><p>Дата на съставяне:</p>
              </b-col>
              <b-col cols="1" xl="1" md="1" style="padding: 0px"
                ><validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('dateCreated')"
                  rules="required"
                >
                  <!-- <b-form-input
                    id="dateCreated"
                    v-model="form.dateCreated"
                    :state="errors.length > 0 ? false : null"
                  /> -->
                  <flat-pickr
                    id="dateCreated"
                    v-model="form.dateCreated"
                    :state="errors.length > 0 ? false : null"
                    class="form-control"
                    style="background-color: white !important"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col cols="4" xl="4" md="4" style="padding-top: 7px"
                ><p>Длъжност: Изпълнителен директор</p>
              </b-col>
            </b-row>

            <b-row class="mt-2 mb-0 text-end">
              <b-col cols="11" md="11" xl="11"></b-col>
              <b-col cols="1" md="1" xl="1"
                ><b-button variant="primary" @click="addVatReport">
                  Add
                </b-button></b-col
              >
            </b-row>
          </validation-observer>
        </b-card-body>
      </b-card>
    </b-form>
  </section>
</template>


<script>
import {
  BCard,
  BForm,
  BRow,
  BCol,
  BCardBody,
  BFormInput,
  BButton,
  BCardHeader,
} from "bootstrap-vue";
import store from "@/store";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import { extend } from "vee-validate";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import VueMonthlyPicker from "vue-monthly-picker";

extend("required", {
  ...required,
  message: "This field is mandatory",
});

import router from "@/router";
export default {
  methods: {
    state() {
      return 1;
    },

    // adding a vat report
    addVatReport() {
      let finalTaxPeriod;

      let tPeriod = this.form.taxPeriod._i;
      let year = tPeriod.substring(0, 4);
      let month = tPeriod.substring(5, tPeriod.length);

      if (month.length === 1) {
        finalTaxPeriod = year + "-0" + month + "-01";
      } else {
        finalTaxPeriod = year + "-" + month + "-01";
      }
      // console.log("Final result" + finalTaxPeriod);
      this.$refs.addVatReportRules.validate().then((success) => {
        if (success) {
          var data = JSON.stringify({
            cell01: this.form.inputColumn01,
            cell11: this.form.inputColumn11,
            cell12: this.form.inputColumn12,
            cell13: this.form.inputColumn13,
            cell14: this.form.inputColumn14,
            cell15: this.form.inputColumn15,
            cell16: this.form.inputColumn16,
            cell17: this.form.inputColumn17,
            cell18: this.form.inputColumn18,
            cell19: this.form.inputColumn19,
            cell20: this.form.inputColumn20,
            cell21: this.form.inputColumn21,
            cell22: this.form.inputColumn22,
            cell23: this.form.inputColumn23,
            cell24: this.form.inputColumn24,
            cell30: this.form.inputColumn30,
            cell31: this.form.inputColumn31,
            cell32: this.form.inputColumn32,
            cell33: this.form.inputColumn33,
            cell40: this.form.inputColumn40,
            cell41: this.form.inputColumn41,
            cell42: this.form.inputColumn42,
            cell43: this.form.inputColumn43,
            cell50: this.form.inputColumn50,
            cell60: this.form.inputColumn60,
            cell70: this.form.inputColumn70,
            cell71: this.form.inputColumn71,
            cell80: this.form.inputColumn80,
            cell81: this.form.inputColumn81,
            cell82: this.form.inputColumn82,
            dateCreated: this.form.dateCreated,
            eic: this.form.eic,
            id: 0,
            nameAndAddress: this.form.nameAndAddress,
            period: finalTaxPeriod,
            responsiblePerson: this.form.responsiblePerson,
            vatNumber: this.form.vatNumber,
          });
          // console.log(data);
          let token = useJwt.getToken();
          useJwt
            .addCompanyVatReport(
              token,
              router.currentRoute.params.companyId,
              data
            )
            .then((response) => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `Vat Created Successfully`,
                  icon: "EditIcon",
                  variant: "success",
                },
              });
              return this.$router.push({
                      name: "CompanyView", 
                      params: { 
                        id: router.currentRoute.params.companyId,
                        InvoiceId: 3
                      }
                    })
            })
            .catch((error) => {
              this.loading = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `Something Went Wrong`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        }
      });
    },
  },
  data() {
    return {
      substr: "",
      form: {
        responsiblePerson: "",
        taxPeriod: "",
        nameAndAddress: "",
        vatNumber: "",
        input04: "",
        inputColumn01: "",
        inputColumn11: "",
        inputColumn12: "",
        inputColumn13: "",
        inputColumn14: "",
        inputColumn15: "",
        inputColumn16: "",
        inputColumn17: "",
        inputColumn18: "",
        inputColumn19: "",
        inputColumn20: "",
        inputColumn21: "",
        inputColumn22: "",
        inputColumn23: "",
        inputColumn24: "",
        inputColumn25: "",
        inputColumn26: "",
        inputColumn30: "",
        inputColumn31: "",
        inputColumn32: "",
        inputColumn33: "",
        inputColumn40: "",
        inputColumn41: "",
        inputColumn42: "",
        inputColumn50: "",
        inputColumn60: "",
        inputColumn70: "",
        inputColumn80: "",
        inputColumn81: "",
        dateCreated: "",
      },

      monthLabels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BCardBody,
    ValidationProvider,
    ValidationObserver,
    BCardHeader,
    flatPickr,
    VueMonthlyPicker,
  },
};
</script>

<style lang="scss">
small {
  font-size: 0.8rem;
}

.vue-monthly-picker .input {
  height: 2.7rem !important;
  webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: none !important;
}

.is-invalid {
  border-color: #ea5455 !important;
}
</style>