import request from '@/utils/teplate'
//获取用户下的所有模板     -------
export function getTemplateByOwner(data) {
  return request({
    url: '/template/get_template_owner',
    method: 'get',
    params:data
  })
}
//更新模板     --------------
export function updateTemplate(data) {
  return request({
    url: '/template/update_template',
    method: 'post',
    data
  })
}
//创建模板     ---------
export function createTemplate(data) {
  return request({
    url: '/template/create_template',
    method: 'post',
    data
  })
}
//获取单个模板详情  
export function getTemplateByUuid(data) {
  return request({
    url: '/template/get_template_uuid',
    method: 'get',
    params:data
  })
}

//模板名称唯一性检查
export function ifOnlyName(data) {
  return request({
    url: '/template/if_only_name',
    method: 'post',
    data
  })
}
//删除模板
export function deleteTemplate(query) {
  return request({
    url: '/template/delete_template',
    method: 'get',
    params:query
  })
}
//会议保存成模板
export function meetingToTemplate(data) {
  return request({
    url: '/template/meeting_to_template',
    method: 'post',
    data
  })
}
//周期会议保存成模板
export function cycleMeetingToTemplate(data) {
  return request({
    url: '/template/pmeeting_to_template',
    method: 'post',
    data
  })
}
