import axios from 'axios'
import useJwt from "@/auth/jwt/useJwt";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

      //fetching list of all vat reports
    fetchVatReports(ctx, queryParams) {
      let pageNumber = queryParams.currentPage
      let perPageValue = queryParams.perPage
      let companyId = queryParams.companyId

      let token = useJwt.getToken()
      let axiosVatReports = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })

      //searching a list of values
      if (queryParams.q) {
        let config = {
          headers: { 'Authorization': "Bearer " + token },
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
            searchTerm: queryParams.q
          },
        }
        return new Promise((resolve, reject) => {
          axiosVatReports
            .get(`account/api/report/search/${pageNumber ? pageNumber : 1}/${perPageValue ? perPageValue : 10}`, config)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })

      }
      //getting a list of values
      else {
 
        let config = {
          headers: { 'Authorization': "Bearer " + token },
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
          },
        }
        return new Promise((resolve, reject) => {
          axiosVatReports
            .get(`/account/api/report/list/${companyId}/${pageNumber ? pageNumber : 1}/${perPageValue ? perPageValue : 10}`, config)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })

      }
    },

     //fetching a single vat-report
     fetchSingleVatReport(ctx, { id }) {
      let token = useJwt.getToken()
      let  axiosVatReports = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })
      let config = {
        headers: {'Authorization': "Bearer "+token},
      }
      return new Promise((resolve, reject) => {
        axiosVatReports
          .get(`/account/api/report/${id}`,config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  }
}