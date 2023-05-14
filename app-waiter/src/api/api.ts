import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.the-coffee-class.com.br/api'
});
