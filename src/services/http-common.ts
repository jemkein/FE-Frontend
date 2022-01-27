import axios from 'axios'
const test : any = localStorage.getItem('user')
const user = JSON.parse(test)
// function authHeader () {
//   const test : any = localStorage.getItem('user')
//   const user = JSON.parse(test)
//   return {
//         headers: {
//           Authorization: 'Bearer ' + user.accessToken,
//           'Content-type': 'application/json'
//         }
//       }
//   // if (user && user.accessToken) {
//   //   return {
//   //     headers: {
//   //       Authorization: 'Bearer ' + user.accessToken,
//   //       'Content-type': 'application/json'
//   //     }
//   //   }
//   // } else {
//   //   return {
//   //     'Content-type': 'application/json'
//   //   }
//   // }
// }
// Importing Axios and setting BaseUrl which connects to Backend

// element = document.getElementById('cal_preview');
// if (element != null) {
//   str = element.value;
// }
// else {
//   str = null;
// }
// eslint-disable-next-line prefer-const
let instance = axios.create({
  baseURL: 'http://h2955127.stratoserver.net:3000/',
  headers: {
    'Content-type': 'application/json'
  }
})
try {
  instance = axios.create({
    // baseURL: 'http://h2955127.stratoserver.net:3000/',
    baseURL: 'http://192.168.1.166:3000/',
    headers: {
      Authorization: user.token,
      'Content-type': 'application/json'
    }
  })
} catch (e) {
  console.log('test')
  instance = axios.create({
    baseURL: 'http://192.168.1.166:3000/',
    headers: {
      'Content-type': 'application/json'
    }
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default instance
