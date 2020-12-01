import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const EnterpriseId = 'Admin-EnterpriseId'
const txltoken = 'X-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
///////////////////////////////
export function getEnterpriseId() {
  return Cookies.get(EnterpriseId)
}
export function setEnterpriseId(token) {
  return Cookies.set(EnterpriseId, token)
}

export function removeEnterpriseId() {
  return Cookies.remove(EnterpriseId)
}
///////t通讯录
export function gettxl() {
  return Cookies.get(txltoken)
}
export function settxl(token) {
  return Cookies.set(txltoken, token)
}

export function removetxl() {
  return Cookies.remove(txltoken)
}