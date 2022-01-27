import axios from 'axios'

// Importing Axios and setting BaseUrl which connects to Backend
export default axios.create({
  baseURL: 'http://192.168.1.131:8000/',
  headers: {
    'Content-type': 'application/json'
  }
})
