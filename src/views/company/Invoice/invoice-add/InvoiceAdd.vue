<template>
  <section class="invoice-add-wrapper">
    <validation-observer ref="invoiceForm" #default="{ invalid }">
      <b-form @submit.prevent="invoiceAdd(invoiceData,AccountTypeOption)">
        <b-row class="invoice-add">
          <!-- Col: Left (Invoice Container) -->
          <b-col cols="12" xl="10" md="10">
            
            <b-card
              no-body
              class="invoice-add"
            >
              <b-card-header class="justify-content-center"> 
                <div class="d-flex align-items-center mb-0">
                  <h4 class="title mr-1 mb-0">Invoice</h4>
                  <validation-provider
                    #default="{ errors }"
                    name="invoiceNumber"
                    vid="Invoice"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge invoice-edit-input-group invoice-input-top"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>

                      <b-form-input
                        id="invoice-data-id"
                        v-model="invoiceData.invoiceNumber"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>
              </b-card-header>
            </b-card>
             
            <div>
              <div class="accountType">
                <b-form-radio
                  v-model="AccountTypeOption"
                  plain
                  name="accountTypeoptions"
                  value="company"
                >
                  <h5>COMPANY</h5>
                </b-form-radio>
                <b-form-radio
                  v-model="AccountTypeOption"
                  plain
                  name="accountTypeoptions"
                  value="person"
                >
                  <h5>PERSON</h5>
                </b-form-radio>
              </div>
            
              <div
                class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2 invoice-add-input invoice-input-middle"
              >
                <div class="mt-md-0 mt-2 flex-1">
                  <b-card
                    no-body
                    class="invoice-add invoice-card"
                  >
                    <b-card-header class="justify-content-center invoice-header mb-1">
                        <h5 
                          class="m-0" 
                        >
                          Supplier
                        </h5>
                    </b-card-header> 
                    <b-card-body class="invoice-body">
                      <div
                          class="d-flex justify-content-end border-left py-50 px-25 clear-all"
                        >
                          <feather-icon
                            size="16"
                            icon="XIcon"
                            class="cursor-pointer"
                            @click="clearAll('supplier')"
                          />
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">Company Name: </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyName"
                            rules="required"
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companName"
                              @input="SearchCompanyName(invoiceData.supplierCompany.companName)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestion()"
                              @focus="ShowSuggestion(datalist)"
                            />
                            <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalist"
                                :key="data.eic"
                                @click= autoCompletefn(data)                        
                              >
                                {{ data.company_name }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Company Address:
                        </span>

                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyAddress"
                            rules="required"
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companyAddress"
                              autocomplete="off"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Company ID Number:
                        </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyIdNumber"
                            rules="required"
                            
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companyEic"
                              @input="SearchCompanyEic(invoiceData.supplierCompany.companyEic)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestionEic()"
                              @focus="ShowSuggestionEic(datalistEic)"
                            />
                            <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalistEic"
                                :key="data.eic"
                                @click= autoCompletefnEic(data)                        
                              >
                                {{ data.eic }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">Company Owner: </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyOwner"
                            rules="required"
                          >
                            <b-form-input
                              v-model="
                                invoiceData.supplierCompany.companyOwnerName
                              "
                              autocomplete="off"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="supplierVat[0] == 'true'" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Company Vat No:
                        </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <b-form-input
                            v-model="invoiceData.supplierCompany.companyVatEic"
                            autocomplete="off"
                          />
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <b-form-checkbox
                            v-model="supplierVat"
                            value="true"
                            plain
                          >
                          </b-form-checkbox>
                          <span class="title mr-1">
                            Vat
                          </span>
                      </div>
                    </b-card-body>
                  </b-card>
                </div>

                <div class="mt-md-0 mt-2 flex-1">
                  <b-card
                    no-body
                    class="invoice-add invoice-card"
                  >
                    <b-card-header class="justify-content-center invoice-header mb-1">
                        <h5 
                          class="m-0" 
                        >
                          Recipient
                        </h5>
                    </b-card-header> 
                    <b-card-body class="invoice-body">
                      <div
                          class="d-flex justify-content-end border-left py-50 px-25 clear-all"
                        >
                          <feather-icon
                            size="16"
                            icon="XIcon"
                            class="cursor-pointer"
                            @click="clearAll('recipient')"
                          />
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span v-if="AccountTypeOption=='company'" class="title mr-1">Company Name:</span> 
                        <span v-if="AccountTypeOption=='person'" class="title mr-1">Person Name:</span>         
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            :name="AccountTypeOption == 'company' ? 'recipientCompanyName' : 'personName'"
                            rules="required"
                          >
                            <b-form-input
                              v-if="AccountTypeOption == 'company'"
                              v-model="invoiceData.recipientCompany.companName"
                              @input="SearchCompanyNameRecipient(invoiceData.recipientCompany.companName)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestionRecipient()"
                              @focus="ShowSuggestionRecipient(datalistRecipient)"
                            />
                            <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalistRecipient"
                                :key="data.eic"
                                @click= autoCompletefnRecipient(data)                        
                              >
                                {{ data.company_name }}
                              </b-list-group-item>
                            </b-list-group>
                            <b-form-input
                              v-if="AccountTypeOption == 'person'"
                              v-model="invoiceData.recipientCompany.companyOwnerName"
                              @input="SearchCompanyPerson(invoiceData.recipientCompany.companyOwnerName)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestionPerson()"
                              @focus="ShowSuggestionPerson(datalistPerson)"
                            />
                            <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalistPerson"
                                :key="data.eic"
                                @click= autoCompletefnPerson(data)                        
                              >
                                {{ data.firstMiddleAndLastName }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1" v-if="AccountTypeOption=='company'">Company Address:</span>
                        <span class="title mr-1" v-if="AccountTypeOption=='person'">Person Address:</span>  
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            :name="AccountTypeOption=='company' ? 'recipientCompanyAddress' : 'personAddress'"
                            rules="required"
                          >
                            <b-form-input
                              v-model="invoiceData.recipientCompany.companyAddress"
                              autocomplete="off"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1" v-if="AccountTypeOption=='company'">Company ID Number:</span>
                        <span class="title mr-1" v-if="AccountTypeOption=='person'">Person ID Number:</span>  
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            :name="AccountTypeOption=='company' ? 'recipientCompanyIdNumber' : 'personIdNumber'"
                            rules="required"
                          >
                            <b-form-input
                              v-if="AccountTypeOption == 'company'"
                              v-model="invoiceData.recipientCompany.companyEic"
                              @input="SearchCompanyEicRecipient(invoiceData.recipientCompany.companyEic)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestionEicRecipient()"
                              @focus="ShowSuggestionEicRecipient(datalistEicRecipient)"
                            />
                            <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalistEicRecipient"
                                :key="data.eic"
                                @click= autoCompletefnEicRecipient(data)                        
                              >
                                {{ data.eic }}
                              </b-list-group-item>
                            </b-list-group>

                            <b-form-input
                              v-if="AccountTypeOption == 'person'"
                              v-model="invoiceData.recipientCompany.companyEic"
                              @input="SearchCompanyPersonIdNumber(invoiceData.recipientCompany.companyEic)"
                              list="my-company_name"
                              autocomplete="off"
                              @blur="hideSuggestionPersonIdNumber()"
                              @focus="ShowSuggestionPersonIdNumber(datalistPersonIdNumber)"
                            />
                            <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name" class="input-suggesstions">
                              <b-list-group-item
                                v-for="data in datalistPersonIdNumber"
                                :key="data.eic"
                                @click= autoCompletefnPersonIdNumber(data)                        
                              >
                                {{ data.identificationNumber }}
                              </b-list-group-item>
                            </b-list-group>

                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="AccountTypeOption=='company'" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">Company Owner: </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="recipientCompanyOwner"
                            :rules="AccountTypeOption=='company' ? 'required' : ''"
                          >
                            <b-form-input
                              v-model="invoiceData.recipientCompany.companyOwnerName"
                              autocomplete="off"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="AccountTypeOption=='company' && recipientVat[0] == 'true'" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Company Vat No:
                        </span>
                        <b-input-group
                          class="input-group invoice-edit-input-group"
                        >
                          <b-form-input
                            v-model="invoiceData.recipientCompany.companyVatEic"
                            autocomplete="off"
                          />
                        </b-input-group>
                      </div>
                      <div v-if="AccountTypeOption=='company'" class="d-flex align-items-center mb-1">
                        <b-form-checkbox
                            v-model="recipientVat"
                            value="true"
                            plain
                          >
                          </b-form-checkbox>
                          <span class="title mr-1">
                            Vat
                          </span>
                      </div>
                    </b-card-body>
                  </b-card>

                </div>
              </div>
            </div>

            <b-card
              no-body
              class="invoice-preview date-issued"
            >
              <b-card-header class="justify-content-end"> 
                <div class="mt-md-0 mt-2">
                  <div class="d-flex align-items-center mb-0">
                    <span class="title mr-1"> Date: </span>
                    <validation-provider
                      #default="{ errors }"
                      name="dateIssued"
                      rules="required"
                    >
                      <flat-pickr
                        v-model="invoiceData.dateIssued"
                        class="form-control invoice-edit-input invoice-input-top"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                </div>
              </b-card-header>
            </b-card>

            <b-card no-body class="invoice-add-card">
           
              <!-- Items Section -->
              <b-card-body class="invoice-padding form-item-section px-0">
                <div
                  ref="form"
                  class="repeater-form h-auto"
                  :style="{ height: trHeight }"
                >
                  <b-row
                    v-for="(item, index) in invoiceData.transactions"
                    :key="index"
                    ref="row"
                    class="pb-2 m-0"
                  >
                    <!-- Item Form -->
                    <!-- ? This will be in loop => So consider below markup for single item -->
                    <b-col cols="12" class="p-0">
                      <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                      <div class="d-none d-lg-flex">
                        <b-row class="flex-grow-1 px-1 invoice-add-transections">
                          <!-- Single Item Form Headers -->
                          <b-col cols="12" lg="1"> No. </b-col>
                          <b-col cols="12" lg="2"> Item name or Service </b-col>
                          <b-col cols="12" lg="1"> Qty </b-col>
                          <b-col cols="12" lg="2"> Measurement </b-col>
                          <b-col cols="12" lg="2"> Single Price </b-col>
                          <b-col cols="12" lg="2"> Currency </b-col>
                          <b-col cols="12" lg="2"> Total Price </b-col>
                        </b-row>
                        <div class="form-item-action-col" />
                      </div>

                      <!-- Form Input Fields OR content inside bordered area  -->
                      <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                      <div class="d-flex border rounded">
                        <b-row class="flex-grow-1 py-2 px-1 invoice-add-transections">
                          <!-- Single Item Form Headers -->
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none"
                              >No.</label
                            >
                            
                            <b-form-input
                              :value="index+1"
                              type="text"
                              class="mb-2"
                              disabled
                            />
                             
                          </b-col>

                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none"
                              >Item name or Service</label
                            >
                            <validation-provider
                              #default="{ errors }"
                              name="transectionServiceOrItemDescription"
                              rules="required"
                            >
                              <b-form-input
                                v-model="item.serviceOrItemDescription"
                                :dir="
                                  $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                                "
                                type="text"
                                class="mb-2"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none">Qty</label>
                            <validation-provider
                              #default="{ errors }"
                              name="transectionQuantity"
                              rules="required"
                            >
                              <b-form-input
                                v-model="item.quantity"
                                type="number"
                                class="mb-2"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none"
                              >Measurement</label
                            >
                            <validation-provider
                              #default="{ errors }"
                              name="transectionMeasurement"
                              rules="required"
                            >
                              <b-form-input
                                v-model="item.measurement"
                                type="text"
                                class="mb-2"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none"
                              >Single Price</label
                            >
                            <validation-provider
                              #default="{ errors }"
                              name="transectionSingleAmountTransaction"
                              rules="required"
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text class="mb-2">
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <b-form-input
                                  v-model="item.singleAmountTransaction"
                                  type="number"
                                  class="mb-2"
                                  step="0.01"
                                  placeholder="0.00"
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none">Currency</label>
                            <validation-provider
                              #default="{ errors }"
                              name="transectionCurrency"
                              rules="required"
                            >
                              
                              <b-form-select
                                  v-model="invoiceData.currency"
                                  :options="currencyOptions"
                                >
                              </b-form-select>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none"
                              >Total Price</label
                            >
                            <validation-provider
                              #default="{ errors }"
                              name="transectionTotal"
                              rules="required"
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text class="mb-2">
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <b-form-input
                                  :value="(item.singleAmountTransaction * item.quantity).toFixed(2)"
                                  disabled
                                  class="mb-2"
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                        </b-row>
                        <div
                          class="d-flex flex-column justify-content-between border-left py-50 px-25"
                        >
                          <feather-icon
                            size="16"
                            icon="XIcon"
                            class="cursor-pointer"
                            @click="removeItem(index)"
                          />
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  size="sm"
                  variant="primary"
                  @click="addNewItemInItemForm"
                >
                  Add Item
                </b-button>
              </b-card-body>

              <!-- Invoice Description: Total -->
              <b-card-body class="invoice-padding pb-0">
                <b-row>
                  <!-- Col: Sales Persion -->
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-md-0 mt-3 d-flex align-items-center"
                    order="2"
                    order-md="1"
                  >
                  </b-col>

                  <!-- Col: Total -->
                  <b-col
                    cols="12"
                    md="6"
                    class="mt-md-6 d-flex justify-content-end"
                    order="1"
                    order-md="2"
                  >
                    <div class="invoice-total-wrapper">
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">Total price NonVat:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="amountNonVat"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-input-group-prepend is-text>
                                <span>{{ invoiceData.currency }}</span>
                              </b-input-group-prepend>

                              <b-form-input
                                :value="amountNonVat(invoiceData.transactions) ? amountNonVat(invoiceData.transactions) : 0"
                                disabled
                              />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">VAT:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="vat"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-form-input
                                v-model="invoiceData.vatPercent"
                                :value="
                                  invoiceData.vatPercent
                                    ? invoiceData.vatPercent
                                    : 20
                                "
                                step="0.01"
                                type="number"
                              />

                              <b-input-group-append is-text>
                                <span>%</span>
                              </b-input-group-append>
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">VAT Amount:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="vatPercent"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-input-group-prepend is-text>
                                <span>{{ invoiceData.currency }}</span>
                              </b-input-group-prepend>
                              <b-form-input                    
                                :value="vatAmount(invoiceData.transactions,invoiceData.vatPercent)"
                                type="number"
                                disabled
                              />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">Discount Percent:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="tradeDiscountPercent"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-form-input
                                v-model="invoiceData.tradeDiscountPercent"
                                :value="
                                  invoiceData.tradeDiscountPercent
                                    ? invoiceData.tradeDiscountPercent
                                    : 0
                                "
                                step="0.01"
                                type="number"
                              />

                              <b-input-group-append is-text>
                                <span>%</span>
                              </b-input-group-append>
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">Discount Sum:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="tradeDiscountAmount"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-input-group-prepend is-text>
                                <span>{{ invoiceData.currency }}</span>
                              </b-input-group-prepend>

                              <b-form-input
                                :value="
                                  tradeDiscountAmount(
                                    invoiceData.transactions,
                                    invoiceData.vatPercent,
                                    invoiceData.tradeDiscountPercent
                                  )
                                    ? tradeDiscountAmount(
                                        invoiceData.transactions,
                                        invoiceData.vatPercent,
                                        invoiceData.tradeDiscountPercent
                                      )
                                    : 0
                                "
                                disabled
                              />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                      <hr class="my-50" />
                      <div class="invoice-total-item">
                        <p class="invoice-total-title">Total Price:</p>
                        <p class="invoice-total-amount">
                          <validation-provider
                            #default="{ errors }"
                            name="totalPrice"
                            rules="required"
                          >
                            <b-input-group
                              class="input-group-merge invoice-edit-input-group"
                            >
                              <b-input-group-prepend is-text>
                                <span>{{ invoiceData.currency }}</span>
                              </b-input-group-prepend>

                              <b-form-input
                                :value="
                                  totalPrice(
                                    invoiceData.transactions,
                                    invoiceData.vatPercent,
                                    invoiceData.tradeDiscountPercent
                                  )
                                    ? totalPrice(
                                        invoiceData.transactions,
                                        invoiceData.vatPercent,
                                        invoiceData.tradeDiscountPercent
                                      )
                                    : 0
                                "
                                disabled
                              />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>

              <!-- Spacer -->
              <hr class="invoice-spacing" />
            </b-card>
          </b-col>

          <!-- Right Col: Card -->
          <b-col cols="12" md="2" xl="2" class="invoice-actions mt-md-0 mt-2">
            <!-- Action Buttons -->
            <b-card>
              <!-- Button: DOwnload -->
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                class="mb-75"
                block
                type="submit"
                :disabled="invalid || loading"
              >
                <b-spinner v-if="loading" small variant="light" />
                Preview
              </b-button>

              <!-- Button: Print -->
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                block
                type="submit"
                :disabled="invalid || loading"
              >
                <b-spinner v-if="loading" small variant="light" />
                Save
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                block
                type="button"
                @click="clearForm"
              >
                Clear
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <invoice-sidebar-add-new-customer />

  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Logo from "@core/layouts/components/Logo.vue";
import { ref, onUnmounted } from "@vue/composition-api";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import store from "@/store";
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BCardText,
  BForm,
  BFormSelect,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormTextarea,
  BFormCheckbox,
  BPopover,
  VBToggle,
  BSpinner,
  BFormRadio,
  BListGroup, 
  BListGroupItem
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import invoiceStoreModule from "../invoiceStoreModule";
import InvoiceSidebarAddNewCustomer from "../InvoiceSidebarAddNewCustomer.vue";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from '@/router'
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    flatPickr,
    vSelect,
    Logo,
    InvoiceSidebarAddNewCustomer,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
    BListGroup, 
    BListGroupItem
  },
  data() {
    return {
      loading: false,
      supplierVat: [],
      recipientVat: []
    };
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  mixins: [heightTransition],
  mounted() {
    this.initTrHeight();
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  methods: {
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = "hidden";
      this.invoiceData.transactions.push(
        JSON.parse(JSON.stringify(this.itemFormBlankItem))
      );

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
        setTimeout(() => {
          this.$refs.form.style.overflow = null;
        }, 350);
      });
    },
    removeItem(index) {
      this.invoiceData.transactions.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },
    invoiceAdd(invoiceData,AccountTypeOption) {

      if(AccountTypeOption == 'person'){
         invoiceData.recipientCompany.companName = invoiceData.recipientCompany.companyOwnerName
         invoiceData.recipientCompany.companyVatEic = ''
      }
      
      invoiceData.transactions.map(item =>{
        item.transactionTotalAmountNonVat = (parseFloat(item.singleAmountTransaction) * parseFloat(item.quantity)).toFixed(2)
        return item
      })
      this.$refs.invoiceForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          let token = useJwt.getToken()
          useJwt
            .addCompanyInvoice(token, router.currentRoute.params.companyId, invoiceData)
            .then((response) => {
              this.loading = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `Invoice Create Successfully`,
                  icon: "EditIcon",
                  variant: "success",
                },
              });
              this.$router.push({ name: 'company-invoice-preview', params: { id: response.data.id , companyId: router.currentRoute.params.companyId }})
            })
            .catch((error) => {
              this.loading = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error.response.data.errorMessage}`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        }
      });
    }
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });
    
    var AccountTypeOption = "company"
    
    const itemFormBlankItem = {
      serviceOrItemDescription: "",
      singleAmountTransaction: 0.00,
      quantity: 0,
      measurement: "",
      transactionTotalAmountNonVat: ""
    };

    var invoiceData = ref({
      invoiceNumber: "",
      dateIssued: "",
      supplierCompany: {
        companyOwnerName: "",
        companName: "",
        companyEic: "",
        companyVatEic: "",
        companyAddress: "",
      },
      recipientCompany: {
        companyOwnerName: "",
        companName: "",
        companyEic: "",
        companyVatEic: "",
        companyAddress: "",
      },
      currency: "лв.",
      amountNonVat: "",
      vatAmount:"",
      vatPercent: 20,
      tradeDiscountPercent: 0,
      tradeDiscountAmount: "",
      totalAmount: "",

      // ? Set single Item in form for adding data
      transactions: [JSON.parse(JSON.stringify(itemFormBlankItem))],

      documentType: "INVOICE",
      verified: true
    });

    invoiceData.value = router.currentRoute.params.invoiceData ? router.currentRoute.params.invoiceData : invoiceData.value
    invoiceData.value.currency = invoiceData.value.currency.toLowerCase().trim() == 'lv' ? "лв." : invoiceData.value.currency
    
    const currencyOptions =  [
      { value: 'лв.', text: 'лв.' },
      { value: '$', text: '$' },
      { value: '€', text: '€' },
    ]

    const vatAmount = (item, vatPercent)=> {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totalVatAmount = parseFloat(amountNonVat) * (parseFloat(vatPercent)/100)
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);
      return parseFloat(totalVatAmount).toFixed(2);
    }

    const amountNonVat = (item)=> {
      let totalAmountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity) * parseFloat(ele.singleAmountTransaction);
      }, 0);
      invoiceData.value.amountNonVat = parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
      return parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
    }

    const tradeDiscountAmount = (item, vatPercent, tradeDiscountPercent)=> {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totaltradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount = parseFloat(totaltradeDiscountAmount).toFixed(2);
      return parseFloat(totaltradeDiscountAmount).toFixed(2);
    }

    const totalPrice = (item, vatPercent, tradeDiscountPercent)=> {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let tradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));

      let totalPrice =
        parseFloat(amountNonVat) +
        (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat) -
        tradeDiscountAmount;
      invoiceData.value.totalAmount = parseFloat(totalPrice).toFixed(2);
      return parseFloat(totalPrice).toFixed(2);
    }

    const clearForm = () => {
      invoiceData.value = {
        invoiceNumber: "",
        dateIssued: "",
        supplierCompany: {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        },
        recipientCompany: {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        },
        currency: invoiceData.value.currency,
        amountNonVat: "",
        vatAmount:"",
        vatPercent: 20,
        tradeDiscountPercent: 0,
        tradeDiscountAmount: "",
        totalAmount: "",

        // ? Set single Item in form for adding data
        transactions: invoiceData.value.transactions,

        documentType: "INVOICE",
        verified: true
      }
    }
    var datalist = ref([])
    var showSuggestions = ref(false)
    
    const SearchCompanyName = (companyName)=>{   
      if(companyName.length > 0){
        let token = useJwt.getToken()
        useJwt
          .SearchCompanyName(token, { companyName })
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestions.value = true
            }
            else{
              showSuggestions.value = false
            }
            datalist.value = response?.data
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestions.value  = false
      }
    }

    const autoCompletefn = (item) =>{      
      if(item.company_name){
        invoiceData.value.supplierCompany.companName = item.company_name
      }
      if(item.address){
        invoiceData.value.supplierCompany.companyAddress = item.address
      }
      if(item.eic){
        invoiceData.value.supplierCompany.companyEic = item.eic
      }
      if( item.managers && item.managers[0]){
        invoiceData.value.supplierCompany.companyOwnerName = item.managers[0]
      }
      showSuggestions.value  = false
      datalist.value = []
    }

    const hideSuggestion = () => {
      setTimeout(() => {
        if(showSuggestions.value){
         showSuggestions.value = false
        }
      }, 100);
    }

    const ShowSuggestion = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestions.value = true
      }
      else{
        showSuggestions.value = false
      }
    }

    var datalistEic = ref([])
    var showSuggestionsEic = ref(false)
    
    const SearchCompanyEic = (companyEic)=>{   
      if(companyEic){
        let token = useJwt.getToken()
        useJwt
          .SearchCompanyEic(token, companyEic)
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestionsEic.value = true
            }
            else{
              showSuggestionsEic.value = false
            }
            datalistEic.value = response?.data
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestionsEic.value  = false
      }
    }

    const autoCompletefnEic = (item) =>{      
      if(item.company_name){
        invoiceData.value.supplierCompany.companName = item.company_name
      }
      if(item.address){
        invoiceData.value.supplierCompany.companyAddress = item.address
      }
      if(item.eic){
        invoiceData.value.supplierCompany.companyEic = item.eic
      }
      if( item.managers && item.managers[0]){
        invoiceData.value.supplierCompany.companyOwnerName = item.managers[0]
      }
      showSuggestionsEic.value  = false
      datalistEic.value = []
    }

    const hideSuggestionEic = () => {
      setTimeout(() => {
        if(showSuggestionsEic.value){
          showSuggestionsEic.value = false
        }
      }, 100);
    }

    const ShowSuggestionEic = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestionsEic.value = true
      }
      else{
        showSuggestionsEic.value = false
      }
    }
    
    var datalistRecipient = ref([])
    var showSuggestionsRecipient = ref(false)
    
    const SearchCompanyNameRecipient = (companyName)=>{   
      if(companyName.length > 0){
        let token = useJwt.getToken()
        useJwt
          .SearchCompanyName(token, { companyName })
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestionsRecipient.value = true
            }
            else{
              showSuggestionsRecipient.value = false
            }
            datalistRecipient.value = response?.data
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestionsRecipient.value  = false
      }
    }

    const autoCompletefnRecipient = (item) =>{      
      if(item.company_name){
        invoiceData.value.recipientCompany.companName = item.company_name
      }
      if(item.address){
        invoiceData.value.recipientCompany.companyAddress = item.address
      }
      if(item.eic){
        invoiceData.value.recipientCompany.companyEic = item.eic
      }
      if( item.managers && item.managers[0]){
        invoiceData.value.recipientCompany.companyOwnerName = item.managers[0]
      }
      showSuggestionsRecipient.value  = false
      datalistRecipient.value = []
    }

    const hideSuggestionRecipient = () => {
      setTimeout(() => {
        if(showSuggestionsRecipient.value){
         showSuggestionsRecipient.value = false
        }
      }, 100);
    }

    const ShowSuggestionRecipient = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestionsRecipient.value = true
      }
      else{
        showSuggestionsRecipient.value = false
      }
    }

    var datalistEicRecipient = ref([])
    var showSuggestionsEicRecipient = ref(false)
    
    const SearchCompanyEicRecipient = (companyEic)=>{   
      if(companyEic){
        let token = useJwt.getToken()
        useJwt
          .SearchCompanyEic(token, companyEic)
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestionsEicRecipient.value = true
            }
            else{
              showSuggestionsEicRecipient.value = false
            }
            datalistEicRecipient.value = response?.data
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestionsEicRecipient.value  = false
      }
    }

    const autoCompletefnEicRecipient = (item) =>{      
      if(item.company_name){
        invoiceData.value.recipientCompany.companName = item.company_name
      }
      if(item.address){
        invoiceData.value.recipientCompany.companyAddress = item.address
      }
      if(item.eic){
        invoiceData.value.recipientCompany.companyEic = item.eic
      }
      if( item.managers && item.managers[0]){
        invoiceData.value.recipientCompany.companyOwnerName = item.managers[0]
      }
      showSuggestionsEicRecipient.value  = false
      datalistEicRecipient.value = []
    }

    const hideSuggestionEicRecipient = () => {
      setTimeout(() => {
        if(showSuggestionsEicRecipient.value){
          showSuggestionsEicRecipient.value = false
        }
      }, 100);
    }

    const ShowSuggestionEicRecipient = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestionsEicRecipient.value = true
      }
      else{
        showSuggestionsEicRecipient.value = false
      }
    }

    var datalistPerson = ref([])
    var showSuggestionsPerson = ref(false)
    
    const SearchCompanyPerson = (companyPerson)=>{   
      if(companyPerson){
        let token = useJwt.getToken()
        useJwt
          .SearchCompaniesPerson(token, router.currentRoute.params.companyId, {         
            direction: 'desc',
            sortField: 'id',
            searchTerm: companyPerson
          })
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestionsPerson.value = true
            }
            else{
              showSuggestionsPerson.value = false
            }
            datalistPerson.value = response?.data?.elements
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestionsPerson.value  = false
      }
    }

    const autoCompletefnPerson = (item) =>{      
      if(item.firstMiddleAndLastName){
        invoiceData.value.recipientCompany.companyOwnerName = item.firstMiddleAndLastName
      }
      if(item.address){
        invoiceData.value.recipientCompany.companyAddress = item.address
      }
      if(item.identificationNumber){
        invoiceData.value.recipientCompany.companyEic = item.identificationNumber
      }
      showSuggestionsPerson.value  = false
      datalistPerson.value = []
    }

    const hideSuggestionPerson = () => {
      setTimeout(() => {
        if(showSuggestionsPerson.value){
          showSuggestionsPerson.value = false
        }
      }, 100);
    }

    const ShowSuggestionPerson = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestionsPerson.value = true
      }
      else{
        showSuggestionsPerson.value = false
      }
    }

    var datalistPersonIdNumber = ref([])
    var showSuggestionsPersonIdNumber = ref(false)
    
    const SearchCompanyPersonIdNumber = (companyPersonIdNumber)=>{   
      if(companyPersonIdNumber){
        let token = useJwt.getToken()
        useJwt
          .SearchCompaniesPerson(token, router.currentRoute.params.companyId, {         
            direction: 'desc',
            sortField: 'id',
            searchTerm: companyPersonIdNumber
          })
          .then((response) => {
            if(response?.data != undefined || response?.data.length != 0 ){
              showSuggestionsPersonIdNumber.value = true
            }
            else{
              showSuggestionsPersonIdNumber.value = false
            }
            datalistPersonIdNumber.value = response?.data?.elements
          })
          .catch((error) => {
            console.log("error",error)
          });
      } else{
        showSuggestionsPersonIdNumber.value  = false
      }
    }

    const autoCompletefnPersonIdNumber = (item) =>{      
      if(item.firstMiddleAndLastName){
        invoiceData.value.recipientCompany.companyOwnerName = item.firstMiddleAndLastName
      }
      if(item.address){
        invoiceData.value.recipientCompany.companyAddress = item.address
      }
      if(item.identificationNumber){
        invoiceData.value.recipientCompany.companyEic = item.identificationNumber
      }
      showSuggestionsPersonIdNumber.value  = false
      datalistPersonIdNumber.value = []
    }

    const hideSuggestionPersonIdNumber = () => {
      setTimeout(() => {
        if(showSuggestionsPersonIdNumber.value){
          showSuggestionsPersonIdNumber.value = false
        }
      }, 100);
    }

    const ShowSuggestionPersonIdNumber = (items) => {
      if(items != undefined || items.length != 0 ){
        showSuggestionsPersonIdNumber.value = true
      }
      else{
        showSuggestionsPersonIdNumber.value = false
      }
    }

    const clearAll = (type)=>{
      if(type == 'supplier'){
        invoiceData.value.supplierCompany =  {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        }
     
      } else if(type == 'recipient'){
        invoiceData.value.recipientCompany = {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        }
      }
    }

    return {
      AccountTypeOption,
      invoiceData,
      currencyOptions,
      itemFormBlankItem,
      vatAmount,
      totalPrice,
      amountNonVat,
      tradeDiscountAmount,
      datalist,
      showSuggestions,
      SearchCompanyName,
      autoCompletefn,
      hideSuggestion,
      ShowSuggestion,
      datalistEic,
      showSuggestionsEic,
      SearchCompanyEic,
      autoCompletefnEic,
      hideSuggestionEic,
      ShowSuggestionEic,
      datalistRecipient,
      showSuggestionsRecipient,
      SearchCompanyNameRecipient,
      autoCompletefnRecipient,
      hideSuggestionRecipient,
      ShowSuggestionRecipient,
      datalistEicRecipient,
      showSuggestionsEicRecipient,
      SearchCompanyEicRecipient,
      autoCompletefnEicRecipient,
      hideSuggestionEicRecipient,
      ShowSuggestionEicRecipient,
      datalistPerson,
      showSuggestionsPerson,
      SearchCompanyPerson,
      autoCompletefnPerson,
      hideSuggestionPerson,
      ShowSuggestionPerson,
      datalistPersonIdNumber,
      showSuggestionsPersonIdNumber,
      SearchCompanyPersonIdNumber,
      autoCompletefnPersonIdNumber,
      hideSuggestionPersonIdNumber,
      ShowSuggestionPersonIdNumber,
      clearForm,
      clearAll
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import "~@core/scss/base/components/variables-dark";

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }
  }
}
.gap-2 {
  grid-gap: 20px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.accountType{
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-bottom: 2rem;
}
.invoice-add-input span.title.mr-1 {
  width: 12rem !important;
  min-width: 12rem !important;
}
.invoice-add-input .invoice-number-date .title.mr-1 {
  width: 5rem !important;
  min-width: 5rem !important;
}
.input-suggesstions{
  position: absolute;
  z-index: 99;
  width: 100%;
  border: 1px solid rgba(87, 100, 111, 0.3);
  border-radius: 0 !important;
  max-height: 15rem;
  overflow: auto;
}
.dark-layout .input-suggesstions{
  border-color: #3b4253;
}
.input-suggesstions .list-group-item{
  border-bottom: 0 !important;
  border-radius: 0 !important; 
  background-color: #f8f8f8 !important;
  cursor: pointer;
}
.dark-layout .input-suggesstions .list-group-item{
  background-color: #161d31 !important;
}
.invoice-add-transections .col-12{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.card.invoice-card{
  border: 1px solid #ebe9f1;
  border-radius: 20px;
  overflow: hidden;
  height: calc(100% - 2rem );
}
.dark-layout .card.invoice-card{
  border-color: #3b4253!important;
}
.card-header.invoice-header{
    background-color: #7367f0 !important;
    padding: 0.75rem;
    border: 0;
    border-radius: 0;
}
.card-header.invoice-header h5{
  color: #fff !important;
}
.flex-1{
  flex: 1;
}
.invoice-input-top{
  width: 16rem; 
  max-width: 100%;
}
.invoice-input-middle .input-group.invoice-edit-input-group span{
  width: 100%;
}
.clear-all{
  top: -0.7rem;
  position: relative;
  right: -1rem;
}
</style>
