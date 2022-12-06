import axios from 'axios'
import useJwt from "@/auth/jwt/useJwt";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {

      let pageNumber = queryParams.currentPage
      let perPageValue = queryParams.perPage
      
      let token = useJwt.getToken()
      let axiosUser = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })
      if(queryParams.q){
        let config = {
          headers: {'Authorization': "Bearer "+token},
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
            searchTerm: queryParams.q
          },
        }
        return new Promise((resolve, reject) => {
          axiosUser
            .get(`/account/api/user-person/search/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      } else{
        let config = {
          headers: {'Authorization': "Bearer "+token},
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
          },
        }
        return new Promise((resolve, reject) => {
          axiosUser
            .get(`/account/api/user-person/list/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      }

    },
    fetchUser(ctx, { id }) {
      let token = useJwt.getToken()
      let axiosUser = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })
      let config = {
        headers: {'Authorization': "Bearer "+token},
      }
      return new Promise((resolve, reject) => {
        axiosUser
          .get(`/account/api/user-person/${id}`,config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      let token = useJwt.getToken()
      let axiosUser = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })
      let config = {
        headers: {'Authorization': "Bearer "+token},
      }
      return new Promise((resolve, reject) => {
        axiosUser
          .post(`/account/api/user-person/create`, userData, config )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
