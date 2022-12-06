import jwtDefaultConfig from './jwtDefaultConfig'
import axios from 'axios'
var qs = require('qs');
var FormData = require('form-data');

export default class JwtService {
  // Will be used by this service for making API calls

  axiosIns1 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'http://167.86.93.80:8765',
    // timeout: 1000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic cmVnaXN0ZXItYXBwOmFjbWVzZWNyZXQ='
    }
  })
  axiosIns2 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'http://167.86.93.80:8765',

  })
  axiosIns3 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'http://167.86.93.80:8765',

  })

  axiosIns4 = axios.create({
    baseURL: 'https://api.ipify.org/?format=json',
  })

  axiosIns5 = axios.create({
    baseURL: 'http://167.86.93.80:8898',
  })

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
        config => {
          // Get token from localStorage
          const accessToken = this.getToken()

          // If token is present add it to request's Authorization Header
          if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          }
          return config
        },
        error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
        response => response,
        error => {
          // const { config, response: { status } } = error
          const { config, response } = error
          const originalRequest = config

          // if (status === 401) {
          if (response && response.status === 401) {
            if (!this.isAlreadyFetchingAccessToken) {
              this.isAlreadyFetchingAccessToken = true
              this.refreshToken().then(r => {
                this.isAlreadyFetchingAccessToken = false

                // Update accessToken in localStorage
                this.setToken(r.data.accessToken)
                this.setRefreshToken(r.data.refreshToken)

                this.onAccessTokenFetched(r.data.accessToken)
              })
            }
            const retryOriginalRequest = new Promise(resolve => {
              this.addSubscriber(accessToken => {
                // Make sure to assign accessToken according to your response.
                // Check: https://pixinvent.ticksy.com/ticket/2413870
                // Change Authorization header
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
                resolve(this.axiosIns(originalRequest))
              })
            })
            return retryOriginalRequest
          }
          return Promise.reject(error)
        },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    let data = new FormData();
    for ( var key in arguments[0] ) {
      if (arguments[0].hasOwnProperty(key)) {
        data.append(key, arguments[0][key]);
      }
    }

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic YWNtZTphY21lc2VjcmV0',
    }
    return this.axiosIns3.post(this.jwtConfig.loginEndpoint, data, {
      headers: headers
    })
  }

  getIpAddress(){
    return this.axiosIns4.get()
  }
  clientToken(){
    const data = qs.stringify({
      'grant_type': 'client_credentials'
    })
    return this.axiosIns1.post(this.jwtConfig.clientToken, data)
  }

  register(token,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(this.jwtConfig.registerEndpoint, ...args, {
      headers: headers
    })
  }

  resetPasswordRequest(token,...args) {
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`
    }
    return this.axiosIns2.post(this.jwtConfig.resetPasswordRequestEndpoint, ...args, {
      headers: headers
    })
  }

  resetPassword(token,...args) {
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`
    }
    return this.axiosIns2.post(this.jwtConfig.resetPasswordEndpoint, ...args, {
      headers: headers
    })
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  countries(token){
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
    }
    return this.axiosIns2.get(this.jwtConfig.countryToken, {
      headers: headers
    })
  }

  //add invoice

  addInvoice(token,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(this.jwtConfig.invoiceAddEndpoint, ...args, {
      headers: headers
    }) 
  }

  EditInvoice(token,id,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.put(`${this.jwtConfig.invoiceEditEndpoint}/${id}`, ...args, {
      headers: headers
    }) 
  }

  addCompanyInvoice(token,id,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(`${this.jwtConfig.CompanyInvoiceAddEndpoint}/${id}`, ...args, {
      headers: headers
    }) 
  }

  EditCompanyInvoice(token,id,companyId,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.put(`${this.jwtConfig.companyInvoiceEditEndpoint}/${id}/${companyId}`, ...args, {
      headers: headers
    }) 
  }

  DeleteInvoice(token,id) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.delete(`${this.jwtConfig.invoiceDeleteEndpoint}/${id}`,{
      headers: headers
    }) 
  }

  DeleteCompanyInvoice(token,id) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.delete(`${this.jwtConfig.companyInvoiceDeleteEndpoint}/${id}`,{
      headers: headers
    }) 
  }

  //Add Vat-Report
  addCompanyVatReport(token,id,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(`${this.jwtConfig.VatReportAddEndPoint}/${id}`, ...args, {
      headers: headers
    }) 
  }

  //Edit Vat-Report
  editCompanyVatReport(token,id,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.put(`${this.jwtConfig.VatReportEditEndPoint}/${id}`, ...args, {
      headers: headers
    }) 
  }

  //Delete Vat Report
  DeleteVatReport(token,id) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.delete(`${this.jwtConfig.VatReportDeleteEndPoint}/${id}`,{
      headers: headers
    }) 
  }

  //Get Invoices for report
  InvoicesForVatReport(token,...args){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(`${this.jwtConfig.GetInvoicesForReportEndPoint}`, ...args, {
      headers: headers
    }) 

  }

  //Get Create-Vat-Report-Zip
  GetVatReportsZip(token,...args){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(`${this.jwtConfig.CreateVatReportZipFileEndPoint}`, ...args, {
      headers: headers
    }) 

  }

  EditUser(token,id,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.put(`${this.jwtConfig.UserEditEndpoint}/${id}`, ...args, {
      headers: headers
    }) 
  }

  DeleteUser(token,id) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.delete(`${this.jwtConfig.UserDeleteEndpoint}/${id}`,{
      headers: headers
    }) 
  }

  EditCompanyUser(token,id,companyId,...args) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.put(`${this.jwtConfig.UserCompanyEditEndpoint}/${id}/${companyId}`, ...args, {
      headers: headers
    }) 
  }

  DeleteCompanyUser(token,id) {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.delete(`${this.jwtConfig.UserCompanyDeleteEndpoint}/${id}`,{
      headers: headers
    }) 
  }

  SearchCompanyName(token, ...args){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.post(this.jwtConfig.SearchCompanyEndpoint, ...args, {
      headers: headers
    }) 
  }

  SearchCompanyEic(token, eic){
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Accept': 'application/json'
    }
    return this.axiosIns2.get(`${this.jwtConfig.SearchEicEndpoint}/${eic}`, {
      headers: headers
    }) 
  }

  SearchCompanyPerson(token, params){

    let config = {
      headers: {
        'Authorization': `${this.jwtConfig.tokenType} ${token}`
      },
      params: params,
    }
    return this.axiosIns2.get(this.jwtConfig.SearchEicPerson, config) 
  }

  SearchCompaniesPerson(token, companyId, params){

    let config = {
      headers: {
        'Authorization': `${this.jwtConfig.tokenType} ${token}`
      },
      params: params,
    }
    return this.axiosIns2.get(`${this.jwtConfig.searchEicPersonCompanies}/${companyId}/1/100`, config) 
  }

  verifyToken(token,UrlToken){
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
    }
    return this.axiosIns2.get(`${this.jwtConfig.verifyToken}?token=${UrlToken}`, {
      headers: headers
    })
  }

  companies(token) {
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
    }

    return this.axiosIns2.get(`${this.jwtConfig.getCompanies}`, {
      headers: headers
    })
  }

  addFileInvoice(token,CompanyId,file){
    let headers = {
      'Authorization': `${this.jwtConfig.tokenType} ${token}`,
      'Content-Type' : 'multipart/form-data'
    }
    return this.axiosIns2.post(`${this.jwtConfig.fileInvoiceEndpoint}/${CompanyId}`, file, {
      headers: headers
    }) 
  }
}
