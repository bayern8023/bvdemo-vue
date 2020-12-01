<template>
  <div class="app-container" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <!-- <div class="meetingControlInfo"> -->
          <el-row :gutter="20">
            <el-col :span="16">
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
                    <el-col
                      style="
                        border-bottom: 1.5px solid rgb(158, 158, 158);
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
                <div class="line-hei">
                  <el-row>
                    <el-col :span="4">
                      <div class="grid-content bg-purple type-list">
                        会议类型：
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light">视频会议</div>
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
                      <div class="grid-content bg-purple-light">
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
                      <div class="grid-content bg-purple-light">
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
                      <div class="grid-content bg-purple-light">
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
                      <div class="grid-content bg-purple-light">
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
                      <div class="grid-content bg-purple-light">
                        {{ meetinglistname.meeting_length / 60 }}分钟
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- </div> -->
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple meetingControlInfo">
                <el-row style="margin-top: 40px">
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
                              <div class="meeting-tayp"></div>
                            </div>
                          </el-col>
                          <el-col :span="16">
                            <div class="grid-content bg-purple">
                              <div
                                style="
                                  font-size: 20px;
                                  font-weight: bold;
                                  color: #46dfa7;
                                "
                              >
                                会议进行中
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
                      >
                        剩余时间
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <div style="font-size: 64px; color: #333" class="sty-hei">
                        <span>{{ meetingTime_d }}:</span>
                        <span>{{ meetingTime_m }}:</span>
                        <span>{{ meetingTime_s }}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- </div> -->
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 15px">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple meeting-btn">
                  <!-- <el-button type="info">全体静音</el-button> -->
                  <img
                    v-if="meetinglistname.meeting_ifmute == false"
                    src="@/icons/svg/card1-.png"
                    alt
                    @click="mutemmeeting(meetinglistname.meeting_ifmute)"
                    srcset
                  />
                  <img
                    v-else
                    src="@/icons/svg/card1.png"
                    @click="mutemmeeting(meetinglistname.meeting_ifmute)"
                    alt
                    srcset
                  />
                  <div class="meeting-mute">{{ mutetext }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple meeting-btn">
                  <img
                    src="@/icons/svg/card2.png"
                    alt
                    srcset
                    @click="Postponement"
                  />
                  <div class="meeting-mute">延时</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple meeting-btn">
                  <img
                    src="@/icons/svg/card3.png"
                    alt
                    srcset
                    @click="leaveTheChair"
                  />
                  <div class="meeting-mute">结束会议</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
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
    <el-dialog title="会议延迟" :visible.sync="dialogVisible" width="40%">
      <span>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8">
                  <div
                    class="grid-content bg-purple"
                    style="height: 40px; line-height: 40px"
                  >
                    延迟时间:
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-select v-model="meeting" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="delayed(meeting)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleadd" width="30%">
      <span>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple">确定要结束该会议？</div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="endMeet"
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
      img: oneChecked_url, //图标/图片
      imglist: oneChecked_urls, //图标/图片
      muteimg: oneChecked_mute, //图标/图片
      muteimglist: oneChecked_mutes, //图标/图片
      dialogVisible: false, //会议延迟
      dialogVisibleadd: false, //结束会议
      meeting: "", //延迟时间
      meetinglistname: "", //参会人列表数据
      mutetext: "全体静音", //是否静音
      moilom: JSON.parse(getEnterpriseId()).userName, //用户id/用户名称
      loading: true, //加载框
      options: [
        {
          value: "30",
          label: "30分钟",
        },
        {
          value: "60",
          label: "1小时",
        },
      ], //延时时间选项
      meetingTime_timer: "", //定时器
      meetingTime_d: "00", //会议剩余时间-小时
      meetingTime_m: "00", //会议剩余时间-分钟
      meetingTime_s: "00", //会议剩余时间-秒
    };
  },
  created() {},
  beforeMount() {
    clearInterval(this.meetingTime_timer); //清空销毁定时器
    this.meetingTime_timer = null;
    this.Meetingdetails(true); //调用获取会议详情函数
    let timerNum = 0;
    this.meetingTime_timer = setInterval(() => {
      let current = new Date().getTime(); //当前时间
      console.log(
        new Date(this.meetinglistname.meeting_starttime).getTime(),
        this.meetinglistname.meeting_length * 60 * 1000
      );
       let datas = ''
      if (this.IEVersion() == -1) {
         datas = this.meetinglistname.meeting_starttime;
      } else {
         datas = this.meetinglistname.meeting_starttime.replace(/-/g, "/");
      }

      let startTime =
        new Date(datas).getTime() +
        this.meetinglistname.meeting_length * 1000; //开始时间
      // console.log(startTime);
      let time = Math.abs(current - startTime) / 1000; //秒-当前时间距离开始时间  开始了多少秒
      // console.log(time);
      //计算出小时
      let d_data = parseInt(time / 60 / 60);
      this.meetingTime_d = d_data < 10 ? "0" + d_data : d_data;
      // console.log(time, this.meetingTime_d);
      //计算出分钟
      let m_data = parseInt((time / 60) % 60);
      this.meetingTime_m = m_data < 10 ? "0" + m_data : m_data;
      //计算出秒
      let s_data = parseInt(time % 60);
      this.meetingTime_s = s_data < 10 ? "0" + s_data : s_data;

      console.log("1230", current - startTime);
      if (timerNum % 2 == 0 && timerNum > 2) {
        this.Meetingdetails(false, timerNum); //调用获取会议详情函数
      }
      timerNum++;
    }, 1000);
  },
  //页面销毁后
  destroyed() {
    //页面离开后销毁定时器
    clearInterval(this.meetingTime_timer);
    this.meetingTime_timer = null;
  },
  //页面销毁前
  beforeDestroy() {
    //页面离开前销毁定时器
    clearInterval(this.meetingTime_timer);
    this.meetingTime_timer = null;
  },
  methods: {
    //会议静音或会议不静音
    mutemmeeting(mute) {
      console.log(mute);
      let meetmingid = this.$route.query.query; //url参数
      let data = {
        meeting_id: meetmingid, //会议id
        meeting_ifmute: mute == true ? "false" : "true", //静音状态
      };
      //调用会场是否闭音接口
      setBoardroomSilenceState(data).then((res) => {
        console.log(res);
        console.log();
        if (res.code == 200) {
          if (mute) {
            this.$message({
              message: "已解除全体静音",
              type: "success",
            });
          } else {
            this.$message({
              message: "已全体静音",
              type: "error",
            });
          }
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    //打开会议延迟弹框
    Postponement() {
      this.dialogVisible = true;
      this.meeting = "";
    },
    //打开结束会议弹框
    leaveTheChair() {
      this.dialogVisibleadd = true;
    },
    //会议延时
    delayed(time) {
      if (time) {
        let meetmingid = this.$route.query.query; //url参数
        let data = {
          meeting_id: meetmingid, //会议id
          prolong_time_min: time,
        };
        //调用会议延时接口
        prolongMeeting(data).then((res) => {
          console.log(res);
          this.dialogVisible = false;
          if (res.code == 200) {
            this.$message({
              message: "延时" + time + "分钟",
              type: "success",
            });
          } else {
            this.$message.error("操作失败");
          }
        });
      } else {
        this.$message.error("请选择时间");
      }
    },
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
    //结束会议
    endMeet() {
      let meetmingid = this.$route.query.query;
      console.log(meetmingid);
      let data = {
        meeting_id: meetmingid, //会议Id
      };
      //调用结束会议接口
      endMeeting(data).then((res) => {
        console.log(res);
        this.dialogVisibleadd = false; //关闭弹框
        if (res.code == 200) {
          this.$message({
            message: "结束会议成功",
            type: "success",
          });
          this.$router.push({
            path: "/inline-edit-table/InlineEditTable",
          });
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    //获取会议详情
    Meetingdetails(a) {
      let meetmingid = this.$route.query.query;
      if (a) {
        this.loading = true;
      }
      console.log(meetmingid);
      let data = {
        meeting_operate_type: 0, //操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议
        meeting_id: meetmingid, //会议Id
      };
      //调用会议详情接口
      getMeetingInfo(data).then((res) => {
        console.log(res);
        this.meetinglistname = res.data;
        if (a) {
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.personList .el-card__header {
  border: none;
  padding: 40px 40px 10px;
}
.personList .el-card__body {
  padding: 0px 40px 40px;
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
.line-hei .el-col-4 {
  font-weight: normal;
}
.sty-hei {
  text-align: center;
  padding: 16px 0px 10px 0;
}

.text {
  line-height: 35px;
}

.type-list {
  text-align: right;
  padding-left: 25px;
  /* font-weight: normal; */
}

.meeting-tayp {
  width: 10px;
  height: 10px;
  background: #46dfa7;
  border-radius: 50%;
}
</style>
