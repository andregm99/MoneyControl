import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = Platform.select({//conectando com api.
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',//IP para rodar dentro do emulador Android.
})

export const dtMoneyApi = axios.create({
  baseURL,
})