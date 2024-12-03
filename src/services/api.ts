import { AppError } from '@utils/AppError';
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.169.1.11:3333'
})

api.interceptors.request.use(
  response => response, error => {
    if(error.response && error.response.data){
      return Promise.reject(new AppError(error.response.data.message));
    }else{
      return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde.'))
    }
  }
)