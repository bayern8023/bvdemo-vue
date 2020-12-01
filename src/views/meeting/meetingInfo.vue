<template>
  <div class="app-container" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <!-- <div class="meetingControlInfo"> -->
          <el-row :gutter="20">
            <el-col :span="15">
              <div class="grid-content bg-purple meetingControlInfo">
                <!-- <div class="topLeftInfo"> -->
                <div class="meetingTitle">
                  <el-row :gutter="20">
                    <el-col style="padding-left: 0" :span="12" :offset="1">
                      <div
                        class="grid-content bg-purple"
                        style="
                          color: #333333;
                          font-size: 22px;
                          line-height: 30px;
                        "
                      >
                        {{ meetinglistname.meeting_theme }}
                      </div>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="20">
                    border-bottom: 1.5px solid rgb(158, 158, 158);
                    <el-col
                      style="
                        
                        padding-left: 0;
                      "
                      :span="12"
                      :offset="1"
                    >
                      <div
                        class="grid-content bg-purple"
                        style="color: #333333"
                      >
                        视频会议
                      </div>
                    </el-col>
                  </el-row> -->
                </div>
                <!-- <div class="meetingTitle">
									<el-row :gutter="20">
										<el-col :span="12" :offset="1">
											<div class="grid-content bg-purple" style="color:#333333">{{meetinglistname.meeting_theme}}</div>
										</el-col>
									</el-row>
								</div> -->
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        会议类型：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        视频会议
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        主持人：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        {{ meetinglistname.meeting_host_id }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        会议ID：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        {{ meetinglistname.meeting_id_return }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        会议密码：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        {{ meetinglistname.meeting_password }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        开始时间：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        {{ meetinglistname.meeting_starttime }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        会议时长：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light type-cen">
                        {{ meetinglistname.meeting_length / 60 }}分钟
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- </div> -->
            </el-col>
            <el-col :span="9">
              <div
                style="display: flex; justify-content: center"
                class="grid-content bg-purple meetingControlInfo"
              >
                <div>
                  <el-row style="margin-top: 60px">
                    <el-col :span="24">
                      <div
                        class="grid-content bg-purple-dark"
                        style="margin-top: 30px"
                      >
                        <div>
                          <el-row :gutter="20">
                            <el-col
                              :span="2"
                              :offset="6"
                              style="padding-top: 8px"
                            >
                              <div class="grid-content bg-purple">
                                <div></div>
                                <div
                                  class="meeting-tayp"
                                  style="background: #46dfa7"
                                  v-show="meeting_status == 'R'"
                                ></div>
                                <div
                                  class="meeting-tayp"
                                  style="background: #ffae50"
                                  v-show="meeting_status == 'W'"
                                ></div>
                                <div
                                  class="meeting-tayp"
                                  style="background: #bbbbbb"
                                  v-show="meeting_status == 'E'"
                                ></div>
                              </div>
                            </el-col>
                            <el-col :span="15">
                              <div class="grid-content bg-purple">
                                <div
                                  style="
                                    font-size: 20px;
                                    font-weight: bold;
                                    color: #46dfa7;
                                  "
                                  v-if="meeting_status == 'R'"
                                >
                                  会议进行中
                                </div>
                                <div
                                  style="
                                    font-size: 20px;
                                    font-weight: bold;
                                    color: #ffae50;
                                  "
                                  v-if="meeting_status == 'W'"
                                >
                                  未开始会议
                                </div>
                                <div
                                  style="
                                    font-size: 20px;
                                    font-weight: bold;
                                    color: #333333;
                                  "
                                  v-if="meeting_status == 'E'"
                                >
                                  会议已结束
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <div
                          style="color: #999999; font-size: 14px"
                          class="sty-hei"
                          v-if="meeting_status == 'R'"
                        >
                          剩余时间
                        </div>
                        <div
                          style="color: #999999; font-size: 14px"
                          class="sty-hei"
                          v-if="meeting_status == 'W'"
                        >
                          开始时间
                        </div>
                        <div
                          style="color: #999999; font-size: 14px"
                          class="sty-hei"
                          v-if="meeting_status == 'E'"
                        >
                          开始/结束时间
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <div
                          style="font-size: 64px; color: #333"
                          class="sty-hei"
                          v-if="meeting_status == 'R'"
                        >
                          <span>{{ meetingTime_d }}:</span>
                          <span>{{ meetingTime_m }}:</span>
                          <span>{{ meetingTime_s }}</span>
                        </div>
                        <div
                          style="font-size: 32px; color: #333"
                          class="sty-hei"
                          v-if="meeting_status == 'W'"
                        >
                          <span>{{ meetinglistname.meeting_starttime }}</span>
                        </div>
                        <div
                          style="font-size: 32px; color: #333"
                          class="sty-hei"
                          v-if="meeting_status == 'E'"
                        >
                          <div class="meeting-e">
                            {{ meetinglistname.meeting_starttime }}
                          </div>
                          <div class="meeting-e">
                            {{
                              meetingdata(
                                meetinglistname.meeting_starttime,
                                meetinglistname.meeting_length
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- </div> -->
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark personList">
          <!-- <div class="meetingControlInfo"> -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>参会人</span>
            </div>
            <div class="text item">
              <el-row :gutter="20">
                <el-col
                  :span="12"
                  v-for="(tiem, index) in meetinglistname.meeting_memberlist"
                  :key="index"
                >
                  <div class="grid-content bg-purple">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="grid-content bg-purple">
                          <el-row>
                            <el-col :span="2">
                              <div
                                class="grid-content bg-purple"
                                style="padding-top: 2px"
                              >
                                <img
                                  v-if="index == 0"
                                  :src="img"
                                  alt
                                  style="width: 16px; height: 16px"
                                />
                                <img
                                  v-else
                                  :src="imglist"
                                  alt
                                  style="width: 16px; height: 16px"
                                />
                              </div>
                            </el-col>
                            <el-col :span="21">
                              <div
                                class="grid-content bg-purple-light"
                                style="padding-left: 10px; font-size: 14px"
                              >
                                <span v-if="index == 0">主持人：</span>
                                {{ tiem.device_name }}
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          class="grid-content bg-purple"
                          style="font-size: 14px"
                        >
                          {{ tiem.device_id }}
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <span v-if="index == 0">
                            <img
                              :src="muteimglist"
                              alt
                              style="width: 40px; height: 20px; margin-top: 7px"
                            />
                          </span>
                          <span v-else>
                            <img
                              v-if="tiem.if_voice == false"
                              :src="muteimg"
                              alt
                              style="width: 40px; height: 20px; margin-top: 7px"
                            />
                            <img
                              v-else
                              :src="muteimglist"
                              alt
                              style="width: 40px; height: 20px; margin-top: 7px"
                            />
                          </span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <!-- <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="grid-content bg-purple">{{o}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">11111111</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">静音1</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>-->
              </el-row>
            </div>
          </el-card>
          <!-- </div> -->
        </div>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="padding-top: 40px"
      v-if="meeting_status == 'E' && meetinglistname.operator_id == moilom"
    >
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple quan" style="text-align: center">
          <el-button @click="meetingDelete(meetinglistname)"
            >删除会议</el-button
          >
        </div>
      </el-col>
      <el-col :span="6">
        <div
          class="grid-content bg-purple"
          style="text-align: center"
          v-if="meeting_status == 'E' && meetinglistname.operator_id == moilom"
        >
          <el-button
            type="primary"
            @click="
              meetingModify(
                meetinglistname.meeting_id,
                meetinglistname.template_uuid,
                'Launchagain-E'
              )
            "
            >再次发起</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding-top: 40px" v-else>
      <el-col :span="4" :offset="9">
        <div
          class="grid-content bg-purple"
          style="text-align: center"
          v-if="meeting_status == 'W' && meetinglistname.operator_id == moilom"
        >
          <el-button
            type="primary"
            @click="
              meetingModify(
                meetinglistname.meeting_id,
                meetinglistname.template_uuid
              )
            "
            >编辑会议</el-button
          >
        </div>
      </el-col>
    </el-row>
    <!-- 删除会议弹框 -->
    <el-dialog title="提示" :visible.sync="deleteMeetingState" width="30%">
      <span>是否删除该会议?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteMeetingState = false">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="IimplementDeleteMeeting"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMeetingInfo, //会议详情
  endMeeting, //结束会议
  setBoardroomSilenceState, //会场闭音
  prolongMeeting, //会议延时
  deleteMeetings, //删除会议
  period_info, //周期会议详情
} from "@/api/article";
import { getEnterpriseId } from "@/utils/auth"; //企业id
import oneChecked_url from "@/icons/svg/people.png";
import oneChecked_urls from "@/icons/svg/people3.png";
import oneChecked_mute from "@/icons/svg/closed.png";
import oneChecked_mutes from "@/icons/svg/on.png";
export default {
  name: "InlineEditTable",
  data() {
    return {
      loading: true,
      img: oneChecked_url,
      imglist: oneChecked_urls,
      muteimg: oneChecked_mute,//静音图片
      muteimglist: oneChecked_mutes,
      dialogVisible: false, //会议延迟
      dialogVisibleadd: false, //结束会议
      meeting: "", //延时时间
      meetinglistname: "", //参水人列表数据
      deleteMeetingState: false, //删除会议弹框
      deleteMeetingItem: "", //删除会议的参数
      mutetext: "全体静音", //是否全体静音
      moilom: JSON.parse(getEnterpriseId()).userName, //用户id/用户名
      meetingTime_timer: "", //定时器
      meetingTime_d: "00", //会议剩余时间-小时
      meetingTime_m: "00", //会议剩余时间-分钟
      meetingTime_s: "00", //会议剩余时间-秒
      meeting_status: this.$route.query.meeting_status, //url参数-会议状态
      type: this.$route.query.type, //url-type参数
    };
  },
  created() {},
  beforeMount() {
    clearInterval(this.meetingTime_timer);
    this.meetingTime_timer = null;
    this.Meetingdetails();
    let timerNum = 0;
    let meeting_status = this.$route.query.meeting_status;
    if (meeting_status == "R") {
      this.meetingTime_timer = setInterval(() => {
        let current = new Date().getTime();
        console.log(
          new Date(this.meetinglistname.meeting_starttime).getTime(),
          this.meetinglistname.meeting_length * 60 * 1000
        );
        let startTime =
          new Date(this.meetinglistname.meeting_starttime).getTime() +
          this.meetinglistname.meeting_length * 1000;
        console.log(startTime);
        let time = Math.abs(current - startTime) / 1000; //秒
        console.log(time);
        let d_data = parseInt(time / 60 / 60);
        this.meetingTime_d = d_data < 10 ? "0" + d_data : d_data;
        console.log(time, this.meetingTime_d);
        let m_data = parseInt((time / 60) % 60);
        this.meetingTime_m = m_data < 10 ? "0" + m_data : m_data;
        let s_data = parseInt(time % 60);
        this.meetingTime_s = s_data < 10 ? "0" + s_data : s_data;
        console.log("1230", current - startTime);
        if (current - startTime >= 1) {
          this.leaveTheChair();
        }
        if (timerNum % 3 == 0 && timerNum > 3) {
          this.Meetingdetails(false, timerNum); //调用获取会议详情函数
        }
        timerNum++;
      }, 1000);
    }
  },
  //页面销毁后
  destroyed() {
    //页面离开后销毁定时器
    clearInterval(this.meetingTime_timer);
    this.meetingTime_timer = null;
  },
  //页面离开前
  beforeDestroy() {
    //页面离开前销毁定时器
    clearInterval(this.meetingTime_timer);
    this.meetingTime_timer = null;
  },
  methods: {
    //判断是否是ie
    IEVersion() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return 7;
        } else if (fIEVersion == 8) {
          return 8;
        } else if (fIEVersion == 9) {
          return 9;
        } else if (fIEVersion == 10) {
          return 10;
        } else {
          return 6; //IE版本<=7
        }
      } else if (isEdge) {
        return "edge"; //edge
      } else if (isIE11) {
        return 11; //IE11
      } else {
        return -1; //不是ie浏览器
      }
    },
    //当前会议的结束时间
    meetingdata(data, length) {
      console.log(this.IEVersion())
      let datas = ''
      if (this.IEVersion() == -1) {
         datas = data;
      } else {
         datas = data.replace(/-/g, "/");
      }

      if (this.loading == false) {
        console.log(new Date(datas).getTime(), length * 1000);
        let dateTime = new Date(datas).getTime() + length * 1000;
        let dataTimename = this.dateTostring(dateTime);
        return dataTimename;
      }
    },
    dateTostring(now) {
      console.log(now);
      var datetime = new Date(now);
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1;
      month = month >= 10 ? month : "0" + month;
      var date = datetime.getDate();
      date = date >= 10 ? date : "0" + date;
      var hour = datetime.getHours();
      hour = hour >= 10 ? hour : "0" + hour;
      var minute = datetime.getMinutes();
      minute = minute >= 10 ? minute : "0" + minute;
      var second = datetime.getSeconds();
      second = second >= 10 ? second : "0" + second;
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    meetingModify(item, template_uuid, Launchagain) {
      this.$router.push({
        path: "meetingModify",
        query: {
          meetingData: JSON.stringify(item),
          type: "General_meeting", //General meeting
          TemplateId: template_uuid,
          Launchagain: Launchagain,//'Launchagain-E   结束的会议，重新发起类型
        },
      });
    },
    //打开删除会议弹框
    meetingDelete(item) {
      this.deleteMeetingState = true;
      this.deleteMeetingItem = item;
    },
    //删除会议
    IimplementDeleteMeeting() {
      deleteMeetings({
        ids: this.deleteMeetingItem.meeting_id,
        meeting_operate_type: "0",
      }).then((res) => {
        console.log("删除会议", res);
        switch (res.code) {
          case 200:
            this.$message({
              message: "删除会议成功!",
              type: "success",
            });
            this.deleteMeetingState = false;
            this.$router.go(-1);
            break;
          default:
            this.$message.error(res.msg);
            break;
        }
      });
    },
    Meetingdetails() {
      console.log(111111111111111111);
      let meetmingid = this.$route.query.meeting_id;
      console.log(meetmingid);
      // this.loading = true;
      let data = {
        // meeting_operate_type: 0, //操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议
        meeting_id: meetmingid, //会议Id
      };
      if (this.$route.query.uuid) {
        period_info({
          uuid: this.$route.query.uuid,
        }).then((res) => {
          console.log(res);
          this.meetinglistname = res.data;
          this.loading = false;
        });
      } else {
        getMeetingInfo(data).then((res) => {
          console.log(res);
          this.meetinglistname = res.data;
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style scoped>
.el-button--primary {
  background: #7c7cff;
  width: 240px;
  height: 40px;
  border: none;
}
/* .meetingControlBtn .el-button {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin: 20px 0;
} */
.meeting-btn {
  width: 100%;
  text-align: center;
  position: relative;
}

.meeting-mute {
  position: absolute;
  bottom: 16px;
  width: 328px;
  left: 50%;
  margin-left: -164px;
  font-size: 14px;
  color: #ffffff;
}

.meeting-btn img {
  width: 100%;
}

.meetingControlBtn {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 5px;
  height: 200px;
  line-height: 200px;
}

.topLeftTime div {
  text-align: center;
}

.topLeftTime {
  display: flex;
  align-items: center;
  justify-content: center;
}

.meetingTitle {
  font-size: 20px;
  line-height: 40px;
  /* font-weight: bold; */
  color: #333333;
  padding-bottom: 16px;
  margin-top: 20px;
}

.meetingTitles {
  font-size: 18px;
  line-height: 40px;
}

.topLeftInfo > div {
  margin-top: 8px;
}

.meetingControlInfo {
  width: 100%;
  height: 360px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 5px;
  color: #666666;
  box-sizing: border-box;
  padding: 20px;
}

.line-hei {
  line-height: 32px;
  height: 32px;
  font-size: 14px;
  margin-top: 4px;
  font-weight: bold;
}

.sty-hei {
  text-align: center;
  padding: 16px 0px 10px 0;
}

.meeting-e {
  height: 40px;
  line-height: 40px;
}

.text {
  line-height: 35px;
}

.type-list {
  text-align: right;
  font-weight: 400;
}
.type-cen {
  padding-left: 20px;
}
.meeting-tayp {
  width: 10px;
  height: 10px;

  border-radius: 50%;
}
</style>
