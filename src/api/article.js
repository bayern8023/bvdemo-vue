import request from '@/utils/request'
//创建会议
export function createMeeting(data) {
  return request({
    url: 'meeting/create_meeting',
    method: 'post',
    data
  })
}
//编辑会议
export function modifyMeeting(data) {
  return request({
    url: 'meeting/update_meeting',
    method: 'post',
    data
  })
}
//编辑周期会议
export function period_edit(data) {
  return request({
    url: 'period/period_edit',
    method: 'post',
    data
  })
}
//删除周期
export function period_delete(data) {
  return request({
    url: 'period/period_delete',
    method: 'post',
    params:data
  })
}
//会议列表
export function getMeetingList(query) {
  return request({
    url: 'meeting/meeting_list',
    method: 'get',
    params: query
  })
}
//创建周期会议
export function period_create(data) {
  return request({
    url: 'period/period_create',
    method: 'post',
    data
  })
}
//周期会议列表
export function getPeriodList(data) {
  return request({
    url: 'period/period_list',
    method: 'get',
	params:data
	// 参数:uuid-周期uuid
  })
}
//周期会议下列表
export function getSubPeriodList(data) {
  return request({
    url: 'period/meeting_list',
    method: 'get',
	params:data,
  })
}
//查询会议详情
export function getMeetingInfo(query) {
  return request({
    url: 'meeting/meeting_info',
    method: 'get',
    params: query 
  })
}
//周期会议详情
export function period_info(query) {
  return request({
    url: 'period/period_info',
    method: 'get',
    params: query 
  })
}
//结束会议
export function endMeeting(data) {
  return request({
    url: 'meeting/end_meeting',
    method: 'post',
    params:data
  })
}
//延迟会议时间
export function prolongMeeting(data) {
  return request({
    url: 'meeting/prolong_meeting',
    method: 'post',
    data
  })
}
//修改预约会议
export function updateMeeting(data) {
  return request({
    url: 'updateMeeting',
    method: 'post',
    data
  })
}
//取消预约会议
export function cancelMeeting(data) {
  return request({
    url: 'meeting/cancel_meeting',
    method: 'post',
    params:data
  })
}
//会议列表删除会议
export function deleteMeetings(query) {
  return request({
    url: 'meeting/delete_meeting',
    method: 'post',
    params: query
  })
}
//会议保存成模板
export function meetingToTemplate(data) {
  return request({
    url: 'template/meeting_to_template',
    method: 'post',
    params: data
  })
}
//全场闭音设置 会场闭音成功，其他参会人被闭音；分会场可听到主持人声音
export function setBoardroomSilenceState(data) {
  return request({
    url: 'meeting/set_boardroom_silence',
    method: 'post',
    data
  })
}
// //会议中进行多画面设置时，可以通过此接口获取会议中在线参会人的列表，
// //每个参会人的信息包含了设备号，设备名称，对应的callid，如果是软终端还有对应的桥接号
// export function getMultiScreenOnlineDevices(query) {
//   return request({
//     url: 'getMultiScreenOnlineDevices',
//     method: 'get',
//     params: { query }
//   })
// }
// //多画面设置
// export function setMultiScreen(data) {
//   return request({
//     url: 'setMultiScreen',
//     method: 'post',
//     data
//   })
// }
