const axios = require("axios");
const instance = axios.create({
  baseURL: 'https://api.juejin.cn/'
});
const cookie = '_ga=GA1.2.1564144641.1660293813; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227130907594448815627%2522%252C%2522user_unique_id%2522%253A%25227130907594448815627%2522%252C%2522timestamp%2522%253A1660293812848%257D; MONITOR_WEB_ID=914fae11-f22f-4be6-8651-4358ac967344; _gid=GA1.2.1661466841.1667281314; _tea_utm_cache_2608={%22utm_source%22:%22web_nav%22}; passport_csrf_token=9548af19205f8e97791f0a66b8d96bbe; passport_csrf_token_default=9548af19205f8e97791f0a66b8d96bbe; odin_tt=67ae11c841c6ff3bb4b4d34b0d5b7091c4a4d764234234885a7ab38f5e2e937fe381716e1dbde3c168c0bb8a3b868ddf2944c1f8aa5f904f25331392c9b4d8f1; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; sid_guard=68c3f2ea6f404bfbcc3a6a7bc8ff8621%7C1667282246%7C31536000%7CWed%2C+01-Nov-2023+05%3A57%3A26+GMT; uid_tt=6b89bb81c1d2c764fc0b8126448cd758; uid_tt_ss=6b89bb81c1d2c764fc0b8126448cd758; sid_tt=68c3f2ea6f404bfbcc3a6a7bc8ff8621; sessionid=68c3f2ea6f404bfbcc3a6a7bc8ff8621; sessionid_ss=68c3f2ea6f404bfbcc3a6a7bc8ff8621; sid_ucp_v1=1.0.0-KGJjZDJhY2M3NmM4NTIxODY1NzFkYTJmMmIxNDBmNGMwMGI0MTBlNDAKFgiuyMDa4IzjAhDG6oKbBhiwFDgIQDgaAmxmIiA2OGMzZjJlYTZmNDA0YmZiY2MzYTZhN2JjOGZmODYyMQ; ssid_ucp_v1=1.0.0-KGJjZDJhY2M3NmM4NTIxODY1NzFkYTJmMmIxNDBmNGMwMGI0MTBlNDAKFgiuyMDa4IzjAhDG6oKbBhiwFDgIQDgaAmxmIiA2OGMzZjJlYTZmNDA0YmZiY2MzYTZhN2JjOGZmODYyMQ';
instance.defaults.headers.common['cookie'] = cookie;
const user = {
  aid: 2608,
  uuid: 7130907594448815627,
  spider: 0,
  _signature: '_02B4Z6wo00901C - ablAAAIDAt.H5I5KAA2gvnmrAAGjokWL7rpnlR5R79Banu5LzpGe0c2h.XPzHvK2ivbVnXPLGHatQ1pkvS8r1HX8VHjdcwaqrJgmnNHsKYmI6m7hZ0n3mNok1Oz2D2ZsH18',

}
const url = 'growth_api/v1/check_in';
let errorNnum = 1;
function juejin() {
  return new Promise((resolve, reject) => {
    instance.post(url, user).then((res) => {
      juejinLottery().then((msg) => {
        resolve(res.data.err_msg + msg)

      }).catch((err) => {
        resolve(res.data.err_msg + err)
      })
    }).catch((err) => {
      errorNnum++
      if (errorNnum < 3) {
        juejin().then((res) => { resolve(res) })
      } else {
        reject(err.data)
      }
    })
  })
}
const lotteryUrl = 'growth_api/v1/lottery/draw';
function juejinLottery() {
  return new Promise((resolve, reject) => {
    instance.post(lotteryUrl, user).then((res) => {
      resolve(res.data.err_msg)
    }).catch((err) => {
      reject(err.data.err_msg)
    })
  })
}
exports.juejin = juejin
