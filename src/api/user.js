import request from '@/utils/request'
// //获取token
// export function login(query) {
//   return request({
//     url: 'token',
//     method: 'get',
//     params: query
//   })
// }
//获取token
export function login(data) {
  return request({
    url: 'token/get_token',
    method: 'post',
    data
  })
}
export function getInfo(query) {
  return request({
    url: 'token',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
