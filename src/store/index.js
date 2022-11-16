
import { createStore } from 'vuex'

export const store = createStore({
    state () {
      return {
        token: localStorage.getItem('token'),
        transactionsList: null
      }
    },
    getters: {
      token (state) {
          return state.token
      },
      isLoggedIn (state) {
        return !!state.token
      },
      transactionsList (state) {
        return state.transactionsList
      }
    },
    mutations: {
      SET_TOKEN (state, payload) {
        state.token = payload
      },
      SET_TRANSACTIONS_LIST (state, payload) {
        state.transactionsList = payload
      },
      LOGOUT (state) {
        localStorage.removeItem('token')
        state.token = null
      }
    },
    actions: {
      async login (context, payload) {
        try{
          const res = await window.axios.post('v1/login', payload?.body ? payload?.body : {} )
          if(res.status === 200 && res.data?.access_token){
            context.commit('SET_TOKEN', res.data.access_token)
            localStorage.setItem('token', res.data.access_token)
          }
        }
        catch(err) {
          console.error(err)
        }
      },
      async getTransactionsList (context, payload) {
        context.commit('SET_TRANSACTIONS_LIST', null)
        try{
          const res = await window.axios.post('/v1/transaction/report', payload?.body ? payload?.body : {}, {
            headers:{
              Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
            }
          } )
          if(res.status === 200 && res.data){
            console.log(res.data)
            context.commit('SET_TRANSACTIONS_LIST', res.data.Transactions)
          }
        }
        catch(err) {
          if(err.response.status === 401) {
            context.commit('LOGOUT')
          }
        }
      }
    },
  })