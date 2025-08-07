import axios from 'axios'
import { Platform } from 'react-native'
import { AppError } from '../helpers/AppError'

const baseURL = Platform.select({//conectando com api.
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',//IP para rodar dentro do emulador Android.
})

export const dtMoneyApi = axios.create({
  baseURL,
})

// Interceptando as respostas da API para tratar erros de forma global.
// Isso permite capturar erros de forma centralizada e lançar uma exceção personalizada.
dtMoneyApi.interceptors.response.use(
  (config)=>config,
  (error)=>{
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    }else {
      return Promise.reject(new AppError('Falha na requisição'))
    }
}

) 
