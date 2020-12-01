<template>
	<div class="app-container" v-loading="loading">
		<div class="app-name">
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<modifyFixedThead ref="establish" @teplont="teplont" />
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						<UnfixedThead ref="attendee" :Templatedetails="Templatedetails" />
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark app-center faqi">
						<el-button type="primary" @click="release" v-if="Launchagain=='Launchagain-E'">再次发起</el-button>
						<el-button type="primary" @click="release" v-else>保存编辑</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import modifyFixedThead from "./dynamic-table/components/modifyFixedThead";
	import UnfixedThead from "@/components/poltal/UnfixedThead";
	import {
		modifyMeeting,//编辑会议
		period_edit,//编辑周期会议
		createMeeting,//创建会议
		period_create//创建周期
	} from "@/api/article";   ; 

	export default {
		name: "DynamicTable",
		components: {
			modifyFixedThead,
			UnfixedThead
		},
		data() {
			return {
				//选择直播
				broadcast: "",
				isfalse: true,
				radio: "公开",//会议
				loading: false,//加载框state
				Templatedetails: "",//模板参数信息
				data: JSON.parse(this.$route.query.meetingData),//url携带过来的参数
				Launchagain:this.$route.query.Launchagain,//周期会议是未开始还是已结束
			};
		},
		beforeMount() {
			// console.log(JSON.parse(this.$route.query.meetingData));
		},
		methods: {
			//是否直播
			broadcasten() {
				let a = this.isfalse;
				if (a) {
					this.broadcast = "#E6A23C";
					this.isfalse = false;
				} else {
					this.broadcast = "";
					this.isfalse = true;
				}
			},
			//组件方法-选择会议参数
			teplont(a) {
				console.log(a);
				this.Templatedetails = a;
			},
			establish(establish) {
				console.log(establish);
			},
			//创建会议
			release() {
				let dataesta = this.$refs.establish.ruleForm;//修改会议的参数
				let attendee = this.$refs.attendee.changname;//修改会议的参数
				let Launchagain = this.$refs.establish.Launchagain; //有值结束结束会议重新发起
				let meetingData = JSON.parse(this.$route.query.meetingData);
				let TemplateId = this.$route.query.TemplateId; //会议详情,编辑会议,拿到模板id
				///软终端
				attendee.forEach(element => {
					console.log(element)
					if (element.business == '6') {
						element.is_volte = false;
					}
				});
				console.log(dataesta);
				//参数为空的提示
				if (dataesta.name == "") {
					this.$message.error("请输入会议主题");
					return;
				}
				if (dataesta.initiation == 0) {
					if (dataesta.data == "") {
						this.$message.error("请输入预约开始时间");
						return;
					}
				} else if (dataesta.initiation == 2) {
					if (dataesta.dataTime == "") {
						this.$message.error("请选择周期开始时间");
						return;
					}
					if (dataesta.datasTime == "") {
						this.$message.error("请选择周期结束时间");
						return;
					}
					if (dataesta.time != "DAY") {
						if (dataesta.repeat.length == 0) {
							this.$message.error("请选择周期");
							return;
						}
					}
					if (dataesta.itemdata == "") {
						this.$message.error("请选择时间");
						return;
					}
				}
				this.loading = true;
				if (Launchagain == "Launchagain-E") {
					if (dataesta.initiation == "2") {
						//创建周期-----------------------------------------------
						//接口参数
						let data = {
							meetingTheme: dataesta.name,
							templateUuid: this.$refs.establish.templateItem,
							periodStarttime: dataesta.dataTime,
							periodEndtime: dataesta.datasTime,
							meetingDate: dataesta.repeat == "" ? "" : dataesta.repeat.join(","),
							meetingTime: dataesta.itemdata.split(" ")[1],
							periodType: dataesta.time.toUpperCase(),
							meetingIfmute: dataesta.Mute == "静音" ? "true" : "false",
							meetingLength: String(dataesta.delivery).indexOf(".") != -1 ?
								String(dataesta.delivery) :
								dataesta.delivery + ".0",
							meetingAttendee: attendee,
						};
						//调用创建周期会议接口
						period_create(data)
							.then((res) => {
								console.log(res);
								this.loading = false;
								if (res.code == 200) {
									// this.$message("");
									this.$message({
										message: "创建会议成功",
										type: "success",
									});
									this.$router.push({
										path: "/inline-edit-table/InlineEditTable",
										query: {
											query: res.data,
										},
									});
								} else {
									this.$message.error(res.msg);
								}

								this.loading = false;
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						//创建会议-------------------------------
						//接口参数
						let data = {
							// meeting_operate_type: "0", //操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议，默认2
							template_uuid: this.$refs.establish.templateItem,
							meeting_theme: dataesta.name, //会议主题
							meeting_attendee: attendee, //会议参会人
							meeting_ifmute: dataesta.Mute == "静音" ? "true" : "false", //是否开启全场静音，true静音，false不静音。默认false。会议类型为纯软终端会议时，该字段无效
							// meeting_mode: "HD", //会议模式，高清：HD、语音：VO，只有开通07业务的账号才能发起高清会议；开通08业务的账号才能发起语音会议；保密会议此参数填写HD；会议类型为纯软终端会议时，该字段无效
							meeting_type: dataesta.initiation, //会议类型，即时会议：1，预约会议：0
							meeting_time: dataesta.data == '' ? '' : dataesta.data, //会议开始时间，北京时间，(即时会议此字段不填)，预约会议必須填写会议开始时间，格式： "yyyy-MM-dd HH:mm:ss"
							meeting_length: String(dataesta.delivery).indexOf(".") != -1 ?
								String(dataesta.delivery) :
								dataesta.delivery + ".0", //		会议时长，单位秒
						};
						//调用创建会议接口
						createMeeting(data)
							.then((res) => {
								console.log(res);
								this.loading = false;
								if (res.code == 200) {
									this.$message({
										message: "创建会议成功",
										type: "success",
									});
									//如果是即使会议就跳转到会议控制
									if (dataesta.initiation == "1") {
										this.$router.push({
											path: "/inline-edit-table/meetingControl",
											query: {
												query: res.data,
											},
										});
									} else {
										//预约会议就跳转到列表
										this.$router.push({
											path: "/inline-edit-table/InlineEditTable",
											query: {
												query: res.data,
											},
										});
									}
								} else {
									this.$message.error(res.msg);
								}

								this.loading = false;
							})
							.catch((err) => {
								console.log(err);
							});
					}
				} else {
					console.log(dataesta.initiation)
					if (dataesta.initiation == undefined||dataesta.initiation == 2) {
						console.log(this.Templatedetails);
						//编辑周期会议------------------------------
						let data = {
							uuid: meetingData, //会议id
							meetingTheme: dataesta.name,
							templateUuid: this.Templatedetails.uuid, //模板id
							periodStarttime: dataesta.dataTime,
							periodEndtime: dataesta.datasTime,
							meetingDate: dataesta.repeat == "" ? "" : dataesta.repeat.join(","),
							meetingTime: dataesta.itemdata.split(" ")[1],
							periodType: dataesta.time,
							meetingIfmute: dataesta.Mute == "静音" ? true : false,
							meetingLength: String(dataesta.delivery).indexOf(".") != -1 ?
								String(dataesta.delivery) :
								dataesta.delivery + ".0",
							meetingAttendee: attendee,
						};
						//调用编辑周期会议接口
						period_edit(data)
							.then((res) => {
								console.log(res);
								if (res.code == 200) {
									this.$message({
										message: "编辑周期会议成功",
										type: "success",
									});
									//修改成功后跳转到会议列表
									this.$router.push({
										path: "/inline-edit-table/InlineEditTable",
										query: {
											query: res.data,
										},
									});
								} else {
									this.$message.error(res.msg);
								}

								this.loading = false;
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						//修改会议-------------------------
						console.log(this.Templatedetails, TemplateId);
						let data = {
							// meeting_operate_type: "0", //操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议，默认2
							template_uuid: TemplateId == undefined || TemplateId == "" ?
								this.Templatedetails.uuid :
								TemplateId, //修改的模板id
							meeting_theme: dataesta.name, //会议主题
							meeting_id: meetingData,
							meeting_attendee: attendee, //会议参会人
							meeting_ifmute: dataesta.Mute == "静音" ? true : false, //是否开启全场静音，true静音，false不静音。默认false。会议类型为纯软终端会议时，该字段无效
							// meeting_mode: "HD", //会议模式，高清：HD、语音：VO，只有开通07业务的账号才能发起高清会议；开通08业务的账号才能发起语音会议；保密会议此参数填写HD；会议类型为纯软终端会议时，该字段无效
							meeting_type: dataesta.initiation, //会议类型，即时会议：1，预约会议：0
							meeting_time: dataesta.data == '' ? '' : dataesta.data, //会议开始时间，北京时间，(即时会议此字段不填)，预约会议必須填写会议开始时间，格式： "yyyy-MM-dd HH:mm:ss"
							meeting_length: String(dataesta.delivery).indexOf(".") != -1 ?
								String(dataesta.delivery) :
								dataesta.delivery + ".0", //		会议时长，单位秒
						};
						//调用修改会议接口
						modifyMeeting(data)
							.then((res) => {
								console.log(res);
								this.loading = false;
								if (res.code == 200) {
									this.$message({
										message: "编辑会议成功",
										type: "success",
									});
									//如果修改为即使会议则跳转到会议控制页面
									if (dataesta.initiation == "1") {
										this.$router.push({
											path: "/inline-edit-table/meetingControl",
											query: {
												query: res.data,
											},
										});
									} else {
										//预约会议跳转到会议列表
										this.$router.push({
											path: "/inline-edit-table/InlineEditTable",
											query: {
												query: res.data,
											},
										});
									}
								} else {
									this.$message.error(res.msg);
								}
							})
							.catch((err) => {
								console.log(err);
							});
					}
				}
			},
		},
	};
</script>
<style scoped>
	.app-list {
		display: inline-block;
		padding-top: 5px;
	}

	.app-list p {
		margin: 0;
		padding: 0;
		height: 25px;
		line-height: 25px;
	}

	.app-quanyi {
		height: 60px;
		padding: 15px 15px 15px 20px;
		line-height: 60px;
		text-align: center;
	}

	.app-quan {
		width: 30px;
		height: 30px;
		border: 1px solid #409eff;
		border-radius: 50%;
	}

	.app-oene {
		width: 26px;
		height: 26px;
		margin-left: 1px;
		margin-top: 1px;
		border-radius: 50%;
	}

	.app-center {
		text-align: center;
		margin: 20px;
	}
</style>
