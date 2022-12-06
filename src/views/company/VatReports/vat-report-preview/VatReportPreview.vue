<template>
  <section class="invoice-add-wrapper">
    <b-row class="invoice-preview-list" v-if="vatReportData !== null">
      <!-- Col: Left (Vat Report Container) -->
      <b-col cols="12" xl="10" md="10" class="w-100-print">
        <b-form>
          <b-card no-body>
            <b-card-header
              class="justify-content-center mb-2"
              style="border-bottom: 0.5px lightgrey solid"
            >
              <div class="d-flex align-items-center mb-0">
                <h4 class="title mr-1 mb-0">
                  VAT Report # {{ vatReportData.id }}
                </h4>
              </div>
            </b-card-header>
            <b-card-body>
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
                      <vue-monthly-picker
                        id="input_01"
                        v-model="vatReportData.period"
                        name="input_01"
                        style="
                          background-color: #fff;
                          background-clip: padding-box;
                          height: 40px;
                          border: 1px solid #dbdbdb;
                          border-radius: 0.357rem;
                        "
                        dateFormat="Y-MM"
                        disabled
                      />
                      <small><b>мм / гггг</b></small>
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
                    <b-col cols="8" xl="8" md="8" class="mt-0">
                      <p
                        style="
                          border-radius: 5px;
                          border: 1px solid lightgrey;
                          height: 35px;
                          padding-left: 5px;
                          padding-top: 5px;
                        "
                      >
                        {{ vatReportData.nameAndAddress }}
                      </p>
                    </b-col>
                    <b-col cols="4" xl="4" md="4"> </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" xl="6" md="6">
                  <b-row class="mt-2">
                    <b-col cols="3" xl="3" md="3"></b-col>
                    <b-col cols="6" xl="6" md="6"> <p>ИН по ЗДДС:</p></b-col>
                    <b-col cols="3" xl="3" md="3">
                      <p
                        style="
                          border-radius: 5px;
                          border: 1px solid lightgrey;
                          height: 35px;
                          padding-left: 5px;
                          padding-top: 5px;
                        "
                      >
                        {{ vatReportData.vatNumber }}
                      </p>
                    </b-col>
                  </b-row>

                  <!--  -->
                  <b-row class="mt-1">
                    <b-col cols="3" xl="3" md="3"></b-col>
                    <b-col cols="6" xl="6" md="6"> <p>ИН:</p></b-col>
                    <b-col cols="3" xl="3" md="3">
                      <p
                        style="
                          border-radius: 5px;
                          border: 1px solid lightgrey;
                          height: 35px;
                          padding-left: 5px;
                          padding-top: 5px;
                        "
                      >
                        {{ vatReportData.eic }}
                      </p>
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
                      Раздел А: Данни за начислен данък върху добавената
                      стойност
                    </b>
                  </h5>
                </b-col>
              </b-row>

              <!--  input column 01 and 20-->
              <b-row
                class="mt-1 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    Общ размер на данъчните основи за облагане с ДДС (сума от
                    кл. 11 до кл. 16)
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px"
                  ><p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell01 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell20 }}
                  </p>
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
                    - данъчна основа на облагаемите доставки, вкл. Доставките
                    при условията на дистанционни продажби с място на изпълнение
                    на територията на страната
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell11 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell21 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    - данъчна основа на ВОП и данъчна основа на получени
                    доставки по чл.82, ал. 2 - 5 ЗДДС
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell12 }}
                  </p>
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
                    Начислен ДДС за ВОП и за получени доставки по чл. 82, ал.
                    2-5 ЗДДС
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell22 }}
                  </p>
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
              <b-row class="mt-0">
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell23 }}
                  </p>
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
              <b-row
                class="mt-0 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>Данъчна основа на облагаемите доставки със ставка 9%</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell13 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell24 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell14 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>- данъчна основа ВОД на стоки</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell15 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    - данъчна основа на доставки по чл. 140, 146 и чл. 173 ЗДДС
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell16 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    - Данъчна основа на доставки на услуги по чл. 21, ал. 2 с
                    място на изпълнение на територията на друга държава членка
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell17 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell18 }}
                  </p>
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
              <b-row
                class="mt-1 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    - Данъчна основа на освободените доставки и освободените ВОП
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell19 }}
                  </p>
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
                    <b>
                      Раздел Б: Данни за упражнено право на данъчен кредит
                    </b>
                  </h5>
                </b-col>
              </b-row>

              <!-- input column 30 -->
              <b-row class="mt-1">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    - Данъчна основа и данък на получените доставки по чл. 82,
                    ал. 2-5 ЗДДС и вноса без право на данъчен кредит или без
                    данък
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell30 }}
                  </p>
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
              <b-row class="mt-0">
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>- с право на пълен данъчен кредит</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell31 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell41 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>- с право на частичен данъчен кредит</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell32 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell42 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="6" xl="6" md="6" class=""> </b-col>
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>Годишна корекция по чл. 73, ал. 8 (+/-)</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell43 }}
                  </p>
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
              <b-row
                class="mt-0 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>- коефициент по чл. 73, ал. 5 ЗДДС</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell33 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell40 }}
                  </p>
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
              <b-row
                class="mt-1 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>ДДС за внасяне (кл.20 - кл.40) >= 0</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell50 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell60 }}
                  </p>
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
              <b-row
                class="mt-1 pb-2"
                style="border-bottom: 1px solid lightgrey"
              >
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>
                    Данък за внасяне от кл. 50, приспаднат по реда на чл. 92,
                    ал. 1 ЗДДС
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell70 }}
                  </p>
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
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell71 }}
                  </p>
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
                    Съгласно чл. 92, ал. 1 ЗДДС в 30-дневен срок от подаването
                    на тази декларация
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell80 }}
                  </p>
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
                    Съгласно чл. 92, ал. 3 ЗДДС в 30-дневен срок от подаването
                    на тази декларация
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell81 }}
                  </p>
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
              <b-row class="mt-0">
                <b-col cols="6" xl="6" md="6" class=""> </b-col>
                <b-col cols="4" xl="4" md="4" class="">
                  <p>
                    Съгласно чл. 92, ал. 4 ЗДДС в 30-дневен срок от подаването
                    на тази декларация
                  </p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.cell82 }}
                  </p>
                </b-col>
                <b-col
                  cols="1"
                  xl="1"
                  md="1"
                  style="text-align: center; padding-top: 7px"
                  ><h4>82</h4>
                </b-col>
              </b-row>

              <b-row class="mt-0">
                <b-col cols="12" xl="12" md="12">
                  <p>Долуподписаният:</p></b-col
                >
              </b-row>

              <!-- responsible person -->
              <b-row class="mt pb-2" style="border-bottom: 1px solid lightgrey">
                <b-col cols="4" xl="4" md="4" class="">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.responsiblePerson }}
                  </p>
                </b-col>
                <b-col cols="2" xl="2" md="2" style="padding: 0px"
                  ><p>декларирам, че:</p>
                </b-col>
              </b-row>

              <!--  -->
              <b-row class="mt-1">
                <b-col cols="4" xl="4" md="4"> </b-col>
                <b-col cols="8" xl="8" md="8" style="padding-left: 0px;">
                  <p>
                    представлявам лицето, посочено в кл. А, и посочената в този
                    формуляр информация е вярна и точна.
                  </p></b-col
                >
              </b-row>

              <b-row class="">
                <b-col cols="4" xl="4" md="4"> </b-col>
                <b-col cols="8" xl="8" md="8" style="padding-left: 0px;">
                  <p>
                    са налице обстоятелствата по чл. 92, ал. 3 и 4 ЗДДС.
                  </p></b-col
                >
              </b-row>

              <b-row class="mt-0">
                <b-col cols="4" xl="4" md="4"> </b-col>
                <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
                  <p>
                    Известно ми е, че за неверни данни нося отговорност по чл.
                    313 НК
                  </p></b-col
                >
              </b-row>

              <!-- dateCreated -->
              <b-row class="">
                <b-col cols="4" xl="4" md="4" class=""
                  ><p>Дата на съставяне:</p>
                </b-col>
                <b-col cols="1" xl="1" md="1" style="padding: 0px">
                  <p
                    style="
                      border-radius: 5px;
                      border: 1px solid lightgrey;
                      min-height: 35px;
                      padding-left: 10px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.dateCreated }}
                  </p>
                </b-col>
                <b-col cols="4" xl="4" md="4" style="padding-top: 7px"
                  ><p>Длъжност: Изпълнителен директор</p>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-form>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="2" xl="2" class="invoice-actions hide-from-print">
        <b-card>
          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="generatePDF()"
          >
            Download
          </b-button>

          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="800"
            :filename="'vat-report-' + vatReportData.id"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            :pdf-margin="10"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            ref="html2Pdf"

          >
            <vat-report-download
              :vat-report-data="this.vatReportData"
              slot="pdf-content"
            />
          </vue-html2pdf>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            @click="printVatReport()"
          >
            Print
          </b-button>

          <!-- Button: Edit -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mb-75"
            block
            :to="{
              name: 'company-vat-report-edit',
              params: { companyId: companyID, id: vatReportData.id },
            }"
          >
            Edit
          </b-button>
        </b-card>
      </b-col>
    </b-row>
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
  BLink,
  BCardHeader,
  VBToggle,
} from "bootstrap-vue";

import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store";

import router from "@/router";
import vatReportsStoreModule from "../vatReportsStoreModule";

import VueMonthlyPicker from "vue-monthly-picker";
import { avatarText } from "@core/utils/filter";
import Ripple from "vue-ripple-directive";

import VatReportDownload from "../vat-report-download/VatReportDownload.vue";

import VueHtml2pdf from "vue-html2pdf";

export default {
  props: { 
    htmlToPdfOptions: { 

margin: 100, 
      }

  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BLink,
    BCardBody,
    BCardHeader,

    vatReportsStoreModule,
    VueMonthlyPicker,
    VueHtml2pdf,
    VatReportDownload,
  },
  data() {
    return {
     
      companyID: "",
      
    };
  },

  created: function () {
    this.companyID = this.$route.params.companyId;
  },
  methods: {
    state() {
      return 1;
    },

    //
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "vat-reports";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(
        INVOICE_APP_STORE_MODULE_NAME,
        vatReportsStoreModule
      );

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const vatReportData = ref(null);
    // const vatReportData = ref({
    //   responsiblePerson: "",
    //   taxPeriod: "",
    //   nameAndAddress: "",
    //   vatNumber: "",
    //   input04: "",
    //   cell01: "",
    //   cell11: "",
    //   cell12: "",
    //   cell13: "",
    //   cell14: "",
    //   cell15: "",
    //   cell16: "",
    //   cell17: "",
    //   cell18: "",
    //   cell19: "",
    //   cell20: "",
    //   cell21: "",
    //   cell22: "",
    //   cell23: "",
    //   cell24: "",
    //   cell25: "",
    //   cell26: "",
    //   cell30: "",
    //   cell31: "",
    //   cell32: "",
    //   cell33: "",
    //   cell40: "",
    //   cell41: "",
    //   cell42: "",
    //   cell50: "",
    //   cell60: "",
    //   cell70: "",
    //   cell80: "",
    //   cell81: "",
    //   dateCreated: "",
    // });
    store
      .dispatch("vat-reports/fetchSingleVatReport", {
        id: router.currentRoute.params.id,
      })
      .then((response) => {
        vatReportData.value = response.data;
        // console.log(vatReportData.value);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          vatReportData.value = undefined;
        }
      });

    //print vat report
    const printVatReport = () => {
      window.print();
    };

    return {
      vatReportData,
      avatarText,
      printVatReport,
    };
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

.vue-monthly-picker .vmp-input-append {
  display: none !important;
}
.vue-monthly-picker:hover {
  cursor: auto;
}

@media print {

// Global Styles
body {
  background-color: transparent !important;
}
nav.header-navbar {
  display: none;
}
.main-menu {
  display: none;
}
.header-navbar-shadow {
  display: none !important;
}
.content.app-content {
  margin-left: 0;
  padding-top: 2rem !important;
}
footer.footer {
  display: none;
}
.card {
  background-color: transparent;
  box-shadow: none;
}
.customizer-toggle {
  display: none !important;
}
}

@media print {
  .w-100-print{
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
  .hide-from-print {
       display : none;
  }
  // @page { margin: 0 }
}
</style>