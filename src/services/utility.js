import axios from 'axios'
const token = window.localStorage.getItem('token');
export default axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    // baseURL: 'https://dev.udiseapis.staggings.in/api/v1',

    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${token}`
    }
})