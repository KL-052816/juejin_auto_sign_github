const axios = require("axios");
const instance = axios.create({
  baseURL: 'https://api.juejin.cn/'
});
const cookie = 'csrf_session_id=f0b1f5e8f94d40aa22c9910398507e85; _tea_utm_cache_2608={%22utm_source%22:%22course_list%22}; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227155390599892698657%2522%252C%2522web_id%2522%253A%25227155390599892698657%2522%252C%2522timestamp%2522%253A1700218131867%257D; n_mh=IcyZ9gf_i9dBEHNlwM-ogpTq3b8wtVKc-nEzlQXyDj8; sid_guard=ab520bf3a84d024247139732ff55394e%7C1701161179%7C31536000%7CWed%2C+27-Nov-2024+08%3A46%3A19+GMT; uid_tt=030c4acab2c5051bdd5611f0b98e6766; uid_tt_ss=030c4acab2c5051bdd5611f0b98e6766; sid_tt=ab520bf3a84d024247139732ff55394e; sessionid=ab520bf3a84d024247139732ff55394e; sessionid_ss=ab520bf3a84d024247139732ff55394e; sid_ucp_v1=1.0.0-KDJhMjgyYzUyMmNhZDM4MDUyNTM0ZDA0MWNiNTA2OGIyNzE2ZTEyZjEKFwin5bCa7ozHAxDb0ZarBhiwFDgCQPEHGgJscSIgYWI1MjBiZjNhODRkMDI0MjQ3MTM5NzMyZmY1NTM5NGU; ssid_ucp_v1=1.0.0-KDJhMjgyYzUyMmNhZDM4MDUyNTM0ZDA0MWNiNTA2OGIyNzE2ZTEyZjEKFwin5bCa7ozHAxDb0ZarBhiwFDgCQPEHGgJscSIgYWI1MjBiZjNhODRkMDI0MjQ3MTM5NzMyZmY1NTM5NGU; store-region=cn-zj; store-region-src=uid; msToken=X7jvF5w5LShxHcLZoiJj9r6PS43va11o1ygHQKpwLBLFD2W48mvze37EKxVGp1W4-DBAW88xTreGc-G_sZSwTEN5ZfLz_Ip1KPkFGz26L4vuOYXXCuPO3fVQL8XsyfM=';
instance.defaults.headers.common['cookie'] = cookie;
const user = {
  aid: 2608,
  uuid: 7155390599892698657,
  spider: 0,
  _signature: '_02B4Z6wo00901C - ablAAAIDAt.H5I5KAA2gvnmrAAGjokWL7rpnlR5R79Banu5LzpGe0c2h.XPzHvK2ivbVnXPLGHatQ1pkvS8r1HX8VHjdcwaqrJgmnNHsKYmI6m7hZ0n3mNok1Oz2D2ZsH18',

}
const url = 'growth_api/v1/check_in';
let errorNnum = 1;
function juejin() {
  juejinList()
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

const urlList = [
  'tag_api/v1/query_category_briefs?aid=2608&uuid=7130907594448815627&spider=0&show_type=0',
  'user_api/v1/author/recommend?aid=2608&uuid=7130907594448815627&spider=0&category_id=&cursor=0&limit=20',
  'content_api/v1/column/selected_rank?aid=2608&uuid=7130907594448815627&spider=0',
  'interact_api/v2/collectionset/collection_recommend_rank?aid=2608&uuid=7130907594448815627&spider=0',
];
function juejinList() {
  urlList.forEach((url) => {
    new Promise((resolve, reject) => {
      instance.post(url, user).then((res) => {
      }).catch((err) => {
      })
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
