<template>
  <b-row>
    <b-col cols="12" xl="12" md="12">
      <b-card no-body>
        <b-card-header
          class="justify-content-center mb-2"
          style="border-bottom: 0.5px lightgrey solid"
        >
          <div class="d-flex align-items-center mb-0">
            <h5 class="title mr-1 mb-0">VAT Report # {{ vatReportData.id }}</h5>
          </div>
        </b-card-header>
        <b-card-body>
          <b-row>
            <b-col cols="12" xl="6" md="6">
              <b-row>
                <b-col cols="8" xl="8" md="8" class="mt-1 pt-0"
                  ><p style="font-size: 12px">
                    <b>
                      СПРАВКА-ДЕКЛАРАЦИЯ ЗА ДАНЪК ВЪРХУ ДОБАВЕНАТА СТОЙНОСТ
                    </b>
                  </p>
                </b-col>
                <b-col cols="2" xl="2" md="2"> </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" xl="6" md="6" style="align-content: flex-end">
              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="7" xl="7" md="7">
                  <p style="font-size: 12px">TД на НАП/офис</p></b-col
                >
                <b-col cols="2" xl="2" md="2"></b-col>
              </b-row>
              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="9" xl="9" md="9">
                  <p style="font-size: 12px">
                    Входящ No................../....................... г.
                  </p></b-col
                >
              </b-row>
              <!--  -->
              <b-row class="mt-0">
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="6" xl="6" md="6">
                  <p style="font-size: 12px">
                    Попълва се от приходната администрация
                  </p></b-col
                >
                <b-col cols="2" xl="2" md="2"></b-col>
              </b-row>

              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"
                  ><p style="font-size: 12px">Данъчен период:</p></b-col
                >
                <b-col cols="6" xl="6" md="6">
                  <p
                    style="
                      border-radius: 5px;
                      font-size: 12px;
                      border: 1px solid lightgrey;
                      height: 35px;
                      padding-left: 5px;
                      padding-top: 5px;
                    "
                  >
                    {{ vatReportData.period.substr(0,7) }}
                  </p>
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
                  ><p style="font-size: 12px">
                    <b>
                      A. Наименование и адрес за кореспонденция на
                      регистрираното лице
                    </b>
                  </p>
                </b-col>
                <b-col cols="4" xl="4" md="4"> </b-col
              ></b-row>
              <b-row>
                <b-col cols="8" xl="8" md="8" class="mt-0">
                  <p
                    style="
                      border-radius: 5px;
                      font-size: 12px;
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
                <b-col cols="6" xl="6" md="6">
                  <p style="font-size: 12px">ИН по ЗДДС:</p></b-col
                >
                <b-col cols="3" xl="3" md="3">
                  <p
                    style="
                      border-radius: 5px;
                      font-size: 12px;
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
                <b-col cols="6" xl="6" md="6">
                  <p style="font-size: 12px">ИН:</p></b-col
                >
                <b-col cols="3" xl="3" md="3">
                  <p
                    style="
                      border-radius: 5px;
                      font-size: 12px;
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
              ><h6>
                <b>
                  Раздел А: Данни за начислен данък върху добавената стойност
                </b>
              </h6>
            </b-col>
          </b-row>

          <!--  input column 01 and 20-->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Общ размер на данъчните основи за облагане с ДДС (сума от кл. 11
                до кл. 16)
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>01</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Всичко начислен ДДС (сума от кл.21 до кл.24)
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>20</h5>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="5" xl="5" md="5" class=""
              ><h6>
                <b>Данъчна основа, подлежаща на облагане със ставка 20%:</b>
              </h6>
            </b-col>
          </b-row>

          <!--input column 11 and 21  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - данъчна основа на облагаемите доставки, вкл. Доставките при
                условията на дистанционни продажби с място на изпълнение на
                територията на страната
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>11</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">Начислен ДДС:</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>21</h5>
            </b-col>
          </b-row>

          <!-- input column 12 and 22 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - данъчна основа на ВОП и данъчна основа на получени доставки по
                чл.82, ал. 2 - 5 ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>12</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Начислен ДДС за ВОП и за получени доставки по чл. 82, ал. 2-5
                ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>22</h5>
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
              ><p style="font-size: 12px">
                Начислен данък за доставки на стоки и услуги за лични нужди
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>23</h5>
            </b-col>
          </b-row>

          <!-- input columns 13 and 24 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Данъчна основа на облагаемите доставки със ставка 9%
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>13</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">Начислен ДДС (9%)</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>24</h5>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="5" xl="5" md="5" class=""
              ><h6>
                <b>Данъчна основа, подлежаща на облагане със ставка 0%:</b>
              </h6>
            </b-col>
          </b-row>

          <!-- input column 14-->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - данъчна основа за доставки по глава трета от ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>14</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 15  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">- данъчна основа ВОД на стоки</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>15</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 16  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - данъчна основа на доставки по чл. 140, 146 и чл. 173 ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>16</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 17 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - Данъчна основа на доставки на услуги по чл. 21, ал. 2 с място
                на изпълнение на територията на друга държава членка
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>17</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  input column 18-->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
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
                  font-size: 12px;
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
              ><h5>18</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 19 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - Данъчна основа на освободените доставки и освободените ВОП
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>19</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h6>
                <b> Раздел Б: Данни за упражнено право на данъчен кредит </b>
              </h6>
            </b-col>
          </b-row>

          <!-- input column 30 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - Данъчна основа и данък на получените доставки по чл. 82, ал.
                2-5 ЗДДС и вноса без право на данъчен кредит или без данък
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>30</h5>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Данъчна основа на получените доставки, ВОП, получените доставки
                по чл. 82, ал. 2-5 ЗДДС, вноса, както и данъчна основа на
                получените доставки, използвани за извършване на доставки по чл.
                69, ал. 2 ЗДДС:
              </p>
            </b-col>
            <b-col cols="8" xl="8" md="8" style="padding: 0px"> </b-col>
          </b-row>

          <!-- input column 31 and 41 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">- с право на пълен данъчен кредит</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>31</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                ДДС с право на пълен данъчен кредит
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>41</h5>
            </b-col>
          </b-row>

          <!-- input column 32 and 42 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                - с право на частичен данъчен кредит
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>32</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                ДДС с право на частичен данъчен кредит
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>42</h5>
            </b-col>
          </b-row>

          <!-- input column 43 -->
          <b-row class="mt-1">
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Годишна корекция по чл. 73, ал. 8 (+/-)
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>43</h5>
            </b-col>
          </b-row>

          <!--  input column 33 and 40-->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">- коефициент по чл. 73, ал. 5 ЗДДС</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>33</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Общо данъчен кредит (кл.41 + кл.42 х кл. 33 + кл.43)
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>40</h5>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h6><b> Раздел В: Резултат за периода </b></h6>
            </b-col>
          </b-row>

          <!-- input column 50 and 60 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                ДДС за внасяне (кл.20 - кл.40) >= 0
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>50</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p style="font-size: 12px">
                ДДС за възстановяване (кл.20 - кл.40) < 0
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>60</h5>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h6><b> Раздел Г: ДДС за внасяне </b></h6>
            </b-col>
          </b-row>

          <!-- input column 70 and 71 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Данък за внасяне от кл. 50, приспаднат по реда на чл. 92, ал. 1
                ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>70</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p style="font-size: 12px">
                Данък за внасяне от кл. 50, внесен ефективно
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>71</h5>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h6><b> Раздел Д: ДДС, подлежащ на възстановяване </b></h6>
            </b-col>
          </b-row>

          <!-- input column 80 and 81 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">
                Съгласно чл. 92, ал. 1 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>80</h5>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p style="font-size: 12px">
                Съгласно чл. 92, ал. 3 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>81</h5>
            </b-col>
          </b-row>

          <!-- input column 82 -->
          <b-row class="mt-1">
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p style="font-size: 12px">
                Съгласно чл. 92, ал. 4 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><h5>82</h5>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col cols="12" xl="12" md="12">
              <p style="font-size: 12px">Долуподписаният:</p></b-col
            >
          </b-row>

          <!-- responsible person -->
          <b-row class="mt pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class="">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><p style="font-size: 12px">декларирам, че:</p>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
              <p style="font-size: 12px">
                представлявам лицето, посочено в кл. А, и посочената в този
                формуляр информация е вярна и точна.
              </p></b-col
            >
          </b-row>

          <b-row class="">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
              <p style="font-size: 12px">
                са налице обстоятелствата по чл. 92, ал. 3 и 4 ЗДДС.
              </p></b-col
            >
          </b-row>

          <b-row class="mt-0">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
              <p style="font-size: 12px">
                Известно ми е, че за неверни данни нося отговорност по чл. 313
                НК
              </p></b-col
            >
          </b-row>

          <!-- dateCreated -->
          <b-row class="">
            <b-col cols="4" xl="4" md="4" class=""
              ><p style="font-size: 12px">Дата на съставяне:</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px">
              <p
                style="
                  border-radius: 5px;
                  font-size: 12px;
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
              ><p style="font-size: 12px">Длъжност: Изпълнителен директор</p>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>


<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BTableLite,
  BCardText,
  BButton,
  BAlert,
  BLink,
  VBToggle,
  BCardHeader,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    BCardHeader
  },
  props: {
    vatReportData: {
      type: Object,
      required: true,
    },
  },
};
</script>