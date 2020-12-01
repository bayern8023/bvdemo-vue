import request from '@/utils/request'



// //通讯录 获取企业信息
// export function enterprise(query) {
//   return request({
//     url: 'enterprise',
//     method: 'get',
//     params: { query }
//   })
// }
export function token(query) {
  return request({
    url: 'token',
    method: 'get',
    params: query
  })
}
//通讯录 获取企业一级部门列表
export function PrimaryDepartment(getEnterpriseken,query) {
  return request({
    url: 'maillist/department_list',
    method: 'get',
    params: query
  })
}
//通讯录 获取下级部门列表
export function SubordinateDepartments(getEnterpriseken,query) {
  return request({
    url: 'maillist/department_list_forparent',
    method: 'get',
    params: query
  })
}
//通讯录 获取部门下的员工
export function DepartmentStaff(query) {

  return request({
    url: 'maillist/userlist_for_departmentid',
    method: 'get',
    params: query
  })
}
//通讯录 搜索企业下的员工
export function userName(query) {
  return request({
    url: 'maillist/userlist_for_enterpriseid',
    method: 'get',
    params: query
  })
}
// //通讯录 搜索部门下的员工
// export function useridname(getEnterpriseken,departmentId,query) {
//   return request({
//     url: getEnterpriseken + '/user/list/'+departmentId,
//     method: 'get',
//     params: query
//   })
// }
