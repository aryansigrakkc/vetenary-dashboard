import axios from 'axios'
import { API_BASE_URL } from '../constants';
const token = window.localStorage.getItem('token');
export default axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${token}`
    }
})