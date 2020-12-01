<template>
  <div class="app-container">
    <!-- 删除会议弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteMeetingState"
      width="30%"
      :before-close="deleteMeetingCancel()"
    >
      <span>是否删除该会议?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteMeetingState = false">取 消</el-button>
        <el-button
          :disabled="disabled"
          style="background: #7c7cff; border: none; color: #fff"
          @click="IimplementDeleteMeeting"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 保存会议弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="saveTemplateState"
      width="30%"
      :before-close="saveTemplateStateFn"
    >
      <div style="display: flex; align-items: center">
        <span style="width: 100px">模板名称：</span>
        <el-input
          v-model="saveTemplateVal"
          placeholder="请输入模板名称"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveTemplateState = false">取 消</el-button>
        <el-button
          :disabled="disabled"
          style="background: #7c7cff; border: none; color: #fff"
          @click="saveTemplate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 周期保存会议弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="cycleSaveTemplateState"
      width="30%"
      :before-close="saveTemplateStateFn"
    >
      <div style="display: flex; align-items: center">
        <span style="width: 100px">模板名称：</span>
        <el-input
          v-model="cycleSaveTemplateVal"
          placeholder="请输入模板名称"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cycleSaveTemplateState = false">取 消</el-button>
        <el-button
          :disabled="disabled"
          style="background: #7c7cff; border: none; color: #fff"
          @click="cycleSaveTemplate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 取消会议弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="cancelMeetingState"
      width="30%"
      :before-close="cancelMeetingCancel()"
    >
      <span>是否取消该会议?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelMeetingState = false">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="IimplementCancelMeeting"
          :disabled="disabled"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除周期弹框 -->
    <el-dialog title="提示" :visible.sync="isDeletePeriod" width="30%">
      <span>是否删除该周期?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeletePeriod = false">取 消</el-button>
        <el-button
          :disabled="disabled"
          style="background: #7c7cff; border: none; color: #fff"
          @click="deletePeriod"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="app-name">
      <!-- tab标签 -->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div style="height: 64px" v-show="tabNullBox"></div>
            <div class="meetingTabs">
              <div
                @click="meetingTabClick('cycle')"
                :class="activeName == 'cycle' ? 'meetingActive' : ''"
              >
                周期会议
              </div>
              <div
                @click="meetingTabClick('A')"
                :class="activeName == 'A' ? 'meetingActive' : ''"
              >
                全部
              </div>
              <div
                @click="meetingTabClick('W')"
                :class="activeName == 'W' ? 'meetingActive' : ''"
              >
                未开始
              </div>
              <div
                @click="meetingTabClick('R')"
                :class="activeName == 'R' ? 'meetingActive' : ''"
              >
                进行中
              </div>
              <div
                @click="meetingTabClick('E')"
                :class="activeName == 'E' ? 'meetingActive' : ''"
              >
                已结束
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 会议列表 -->
      <div class="meetingListCont">
        <div>
          <!-- loadding -->
          <div v-show="loading" v-loading="loading" style="height: 500px"></div>
          <!-- 内容 -->
          <div v-show="!loading">
            <el-row :gutter="20">
              <el-col
                :span="8"
                v-for="(item, index) in meetingList"
                :key="index"
              >
                <div class="grid-content bg-purple">
                  <div class="meetingItem" v-if="!item.uuid">
                    <div class="mettingItemText" @click="meetingInfo(item)">
                      <div class="meetingTips">
                        <!-- 会议卡片标签 -->
                        <div
                          class="meetingTipsText"
                          :class="{
                            meetingTips_W: item.meeting_status == 'W',
                            meetingTips_R: item.meeting_status == 'R',
                            meetingTips_E: item.meeting_status == 'E',
                          }"
                        >
                          <span></span>
                          <p v-if="item.meeting_status == 'W'">未开始</p>
                          <p v-if="item.meeting_status == 'R'">进行中</p>
                          <p v-if="item.meeting_status == 'E'">已结束</p>
                        </div>
                        <!--  -->
                        <!-- 周期会议icon -->
                        <div>
                          <img
                            v-show="activeName == 'cycle'"
                            src="../../icons/svg/kechengzhouqi.png"
                            alt
                          />
                        </div>
                        <!--  -->
                      </div>
                      <div style="font-size: 12px; margin-top: 20px">
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              会议主题：{{ item.meeting_theme }}
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              开始时间：{{ item.meeting_starttime }}
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              发起时间：{{ item.meeting_createtime }}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div
                      class="meetingItemBtn"
                      v-if="item.operator_ec_uid == userId"
                    >
                      <div
                        @click="meetingModify(item.meeting_id)"
                        v-if="item.meeting_status == 'W'"
                      >
                        编辑会议
                      </div>
                      <div
                        @click="meetingControl(item)"
                        v-if="item.meeting_status == 'R'"
                      >
                        会议控制
                      </div>
                      <!-- <div @click="meetingInfo(item)">会议详情</div> -->
                      <div
                        @click="meetingCancel(item)"
                        v-if="item.meeting_status == 'W'"
                      >
                        取消预约
                      </div>
                      <div
                        @click="meetingDelete(item)"
                        v-if="item.meeting_status == 'E'"
                      >
                        删除
                      </div>
                      <div
                        @click="meetingTemplate(item)"
                        v-if="item.meeting_status == 'E'"
                      >
                        保存模板
                      </div>
                    </div>
                  </div>
                  <div class="meetingItem" v-if="item.uuid">
                    <div class="mettingItemText" @click="meetingClick(item)">
                      <div class="meetingTips">
                        <div
                          class="meetingTipsText"
                          :class="{
                            meetingTips_W: item.meeting_status == 'W',
                            meetingTips_R: item.meeting_status == 'R',
                            meetingTips_E: item.meeting_status == 'E',
                          }"
                        >
                          <span></span>
                          <p v-if="item.meeting_status == 'W'">未开始</p>
                          <p v-if="item.meeting_status == 'R'">进行中</p>
                          <p v-if="item.meeting_status == 'E'">已结束</p>
                        </div>
                        <div>
                          <img src="../../icons/svg/kechengzhouqi.png" alt />
                        </div>
                      </div>
                      <div style="font-size: 12px; margin-top: 20px">
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              会议主题：{{ item.meetingTheme }}
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              会议周期：{{ item.periodTime }}
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div
                              v-if="item.periodType == 'DAY'"
                              class="grid-content bg-purple-dark"
                            >
                              周期类型：
                              <span style="color: #63b5f8">每天一次</span>
                            </div>
                            <div
                              v-if="item.periodType == 'WEEK'"
                              class="grid-content bg-purple-dark"
                            >
                              周期类型：
                              <span style="color: #63b5f8">每周一次</span>
                            </div>
                            <div
                              v-if="item.periodType == 'MONTH'"
                              class="grid-content bg-purple-dark"
                            >
                              周期类型：
                              <span style="color: #63b5f8">每月一次</span>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              下次会议：{{ item.meetingNextTime }}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div
                      class="meetingItemBtn"
                      v-if="item.operatorEcUid == userId"
                    >
                      <div @click="modifyCycleMeeting(item.uuid)">
                        编辑周期会议
                      </div>
                      <!-- <div @click="meetingInfo(item)">会议详情</div> -->
                      <div @click="deleteCycleMeeting(item)">删除周期</div>
                      <div @click="openCycleSaveTemplate(item)">保存模板</div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div
        v-if="meetingList.length"
        style="
          background: #fff;
          padding: 10px;

          display: flex;
          justify-content: center;
          border-radius: 8px;
        "
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="listQuery.page"
          @current-change="currentPageChange"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMeetingList, //会议列表
  cancelMeeting, //取消预约会议
  deleteMeetings, //会议列表删除会议
  getPeriodList, //周期会议
  period_delete, //删除周期
} from "@/api/article";
import {
  cycleMeetingToTemplate, //周期会议保存为模板
  meetingToTemplate, //会议保存为模板
} from "@/api/Template";
import { getEnterpriseId } from "@/utils/auth";
export default {
  name: "InlineEditTable",
  components: {},
  data() {
    return {
      tabNullBox: false, //tab标签吸顶会脱离文档流，使用此变量加一个空标签来解决
      saveTemplateState: false, //保存会议弹框state
      cycleSaveTemplateState: false, //周期保存会议弹框state
      saveTemplateVal: "", //会议模板名称
      toTemplateItem: null, //需要保存模板的会议参数、点击会议卡片中的保存模板会给此参数赋值
      cycleSaveTemplateVal: "", //周期模板名称
      cycleToTemplateItem: null, //需要保存模板的周期会议参数、点击会议卡片中的保存模板会给此参数赋值
      disabled: false, //按钮是否可点击
      loading: false, //页面加载图
      activeName: "cycle", //当前tab项cycle周期、A全部、W未开始、R进行中、E已结束
      currentPage: 1, //分页-当前页数
      meetingList: [], //会议列表数据
      // list: null,
      // listLoading: true,
      total: 0, //总条数
      listQuery: {
        meeting_operate_type: "0", //	操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议
        page: 1, //当前页码
        page_size: 12, //默认条数.默认为8
      },
      //账号id
      userId: JSON.parse(getEnterpriseId()).userId, //当前登录用户id
      deleteMeetingState: false, //删除会议弹框state
      deleteMeetingItem: null, //删除会议参数
      cancelMeetingState: false, //取消预约弹框state
      cancelMeetingItem: null, //取消会议参数
      isDeletePeriod: false, //删除周期弹框state
      deletePeriodItem: null, //删除周期参数
    };
  },
  beforeMount() {
    // 进入页面初始化会议列表-首次获取列表数据
    this.getMeetingList();
  },
  mounted() {
    var this_ = this;
    // tab吸顶
    window.onscroll = function () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // console.log(scrollTop,134)
      if (scrollTop > 100) {
        //页面往下滑动大概100px就看不到tab标签的字了,此时就进行吸顶
        document.querySelector(".meetingTabs").style.position = "fixed";
        document.querySelector(".meetingTabs").style.top = "10px";
        document.querySelector(".meetingTabs").style.zIndex = 9;
        document.querySelector(".meetingTabs").style.width =
          document.querySelector(".meetingListCont").offsetWidth + "px";
        document.querySelector(".meetingTabs").style.background =
          "rgba(100, 100, 100, 0.4)";
        this_.tabNullBox = true;
      } else {
        //小于100就取消吸顶效果
        document.querySelector(".meetingTabs").style.position = "static";
        document.querySelector(".meetingTabs").style.background = "#fff";
        this_.tabNullBox = false;
      }
    };
  },
  methods: {
    //周期为保存模板
    cycleSaveTemplate() {
      if (this.cycleSaveTemplateVal.trim()) {
        this.disabled = true;
        // 调用接口
        cycleMeetingToTemplate({
          name: this.cycleSaveTemplateVal,
          id: this.cycleToTemplateItem.uuid,
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "模板保存成功",
              type: "success",
            });
            setTimeout(() => {
              this.disabled = false;
            }, 1000);
          } else {
            this.$message.error("模板保存失败！");
          }
          this.cycleSaveTemplateState = false;
        });
      } else {
        this.$message.error("请输入模板名称！");
      }
    },
    //打开周期为保存模板弹框
    openCycleSaveTemplate(item) {
      this.cycleSaveTemplateState = true;
      this.cycleToTemplateItem = item;
    },
    //ui组件属性-可忽略
    saveTemplateStateFn() {},
    //会议保存为模板
    saveTemplate() {
      if (this.saveTemplateVal.trim()) {
        this.disabled = true;
        // 调用接口
        meetingToTemplate({
          name: this.saveTemplateVal,
          id: this.toTemplateItem.meeting_id,
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "模板保存成功",
              type: "success",
            });
            setTimeout(() => {
              this.disabled = false;
            }, 1000);
          } else {
            this.$message.error("模板保存失败！");
          }
          this.saveTemplateState = false;
        });
      } else {
        this.$message.error("请输入模板名称！");
      }
    },
    //编辑会议
    modifyCycleMeeting(item) {
      // 携带参数跳转页面
      this.$router.push({
        path: "meetingModify",
        query: {
          meetingData: JSON.stringify(item),
          type: "Periodic_meetings", //General meeting
          Launchagain: "Launchagain-zhouqi",//整个周期的周期会议
          bianji: "bianji",
        },
      });
    },
    // tab点击
    meetingTabClick(tab) {
      if (this.loading == false) {
        // 切换tab当前项-把分页初始为第1页然后制行获取列表数据函数
        this.activeName = tab;
        this.listQuery.page = 1;
        this.getMeetingList();
      }
    },
    //删除周期
    deletePeriod() {
      console.log(this.deletePeriodItem);
      this.disabled = true;
      // 调用接口
      period_delete({
        uuid: this.deletePeriodItem.uuid,
      }).then((res) => {
        console.log("删除周期", res);
         this.$message({
              message: "周期会议删除成功!",
              type: "success",
            });
        this.isDeletePeriod = false;
        this.getMeetingList();
        setTimeout(() => {
          this.disabled = false;
        }, 1000);
      });
    },
    //打开删除周期弹框
    deleteCycleMeeting(item) {
      console.log(item);
      this.isDeletePeriod = true;
      this.deletePeriodItem = item;
    },
    //点击周期
    meetingClick(item) {
      //跳转周期下会议列表页面
      this.$router.push({
        path: "MeetingCycle",
        query: {
          meetingItem: JSON.stringify(item),
        },
      });
    },
    //当前分页改变
    currentPageChange(page) {
      console.log(page);
      this.listQuery.page = page;
      this.getMeetingList();
    },
    deleteMeetingCancel() {},
    cancelMeetingCancel() {},
    //打开取消预约弹框
    meetingCancel(item) {
      this.cancelMeetingState = true;
      this.cancelMeetingItem = item;
    },
    //打开删除会议弹框
    meetingDelete(item) {
      this.deleteMeetingState = true;
      this.deleteMeetingItem = item;
    },
    //删除会议
    IimplementDeleteMeeting() {
      this.disabled = true;
      //调用接口
      deleteMeetings({
        ids: this.deleteMeetingItem.meeting_id,
      }).then((res) => {
        console.log("删除会议", res);
        switch (res.code) {
          case 200:
            this.$message({
              message: "删除会议成功!",
              type: "success",
            });
            setTimeout(() => {
              this.disabled = false;
            }, 1000);
            this.deleteMeetingState = false;
            this.getMeetingList();
            break;
          default:
            this.$message.error(res.msg);
            break;
        }
      });
    },
    //取消预约
    async IimplementCancelMeeting() {
      this.disabled = true;
      cancelMeeting({
        meeting_id: this.cancelMeetingItem.meeting_id,
      }).then((res) => {
        console.log("取消会议", res);

        switch (res.code) {
          case 200:
            this.$message({
              message: "取消预约会议成功!",
              type: "success",
            });
            setTimeout(() => {
              this.disabled = false; //响应后延迟几秒回复正常；
            }, 1000);
            this.cancelMeetingState = false;
            this.getMeetingList();
            break;
          default:
            this.$message.error(res.msg);
            break;
        }
      });
    },
    //分页点击事件
    pageChange(page) {
      this.currentPage = page;
    },
    //获取列表数据
    getMeetingList() {
      this.meetingList = []; //先清空列表数据
      this.loading = true; //打开加载框
      if (this.activeName == "cycle") {
        //调用接口
        getPeriodList({
          page: this.listQuery.page,
          page_size: this.listQuery.page_size,
        }).then((res) => {
          if (res.code == 200) {
            this.meetingList = res.data.periodList; //给data变量赋值
            this.total = res.data.pageSize; //总条数
          } else {
          }
          this.loading = false;
          console.log("周期会议列表", res);
        });
      } else {
        getMeetingList({
          // 会议状态，（开始R、已结束E、预约W、收藏C），纯软终端会议没有收藏类型的搜索。
          meeting_filter: this.activeName == "A" ? "" : this.activeName,
          // 操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议
          // meeting_operate_type: 0, //必须
          // 要搜索的关键字，按会议主题模糊搜索。会议类型为纯软终端会议，不支持此字段的搜索。
          // meeting_theme:'',
          // 当前页码（默认1）
          page: this.listQuery.page,
          // 每页显示的条数（默认8）
          page_size: this.listQuery.page_size,
          // 开始时间格式: yyyy-MM-dd HH:mm:ss，当会议类型为2：纯软终端会议时该字段必填
          // start_date:'',
          // 结束时间格式: yyyy-MM-dd HH:mm:ss，当会议类型为2：纯软终端会议时该字段必填
          // end_date:''
        }).then((res) => {
          if (res.code == 200) {
            this.meetingList = res.data.list;
            this.total = res.data.total;
          } else {
          }
          this.loading = false;
          console.log("会议列表", res);
        });
      }
    },
    // handleClick(tab, event) {
    // 	console.log(tab, event);
    // 	this.getMeetingList();
    // },
    //编辑会议
    meetingModify(item) {
      //携带参数跳转到编辑会议页面
      this.$router.push({
        path: "meetingModify",
        query: {
          meetingData: JSON.stringify(item),
          type: "General_meeting", //General meeting
        },
      });
    },
    //会议控制
    meetingControl(item) {
      //跳转到会议控制页面
      this.$router.push({
        path: "meetingControl",
        query: {
          query: item.meeting_id,
        },
      });
    },
    //会议详情
    meetingInfo(item) {
      // 跳转到会议详情
      this.$router.push({
        path: "meetingInfo",
        query: {
          meeting_id: item.meeting_id,
          meeting_status: item.meeting_status,
        },
      });
    },
    //打开会议保存模板
    meetingTemplate(item) {
      // this.$axios({
      // 	method:'post',
      // 	url:'http://124.70.13.190:30015/video-meeting/template/meeting_to_template',
      // 	data:{
      // 		type:'METTING',
      // 		meetingUuid:''
      // 	},
      // })
      this.toTemplateItem = item;
      this.saveTemplateState = true;
      // meetingToTemplate({
      //   ownerId: this.userId,
      //   meetingUuid: item.meeting_id,
      //   type: "METTING",
      // });
      console.log(item);
    },
  },
};
</script>

<style scoped>
.app-name {
  background-color: transparent;
}

.meetingListCont {
  /* background-color: #fff; */
  /* border-radius: 8px; */
  margin-top: 20px;
}

.meetingTabs {
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  padding-left: 30px;
  display: flex;
  align-items: center;
}

.meetingTabs > div {
  padding: 0px 22px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #fff;
}

.meetingTabs > div:hover {
  background-color: #f1f1f1;
}

.meetingTabs .meetingActive {
  color: #fafbfc;
  background-color: #46dfa7;
  border: none;
}

.meetingTabs .meetingActive:hover {
  background-color: #46dfa7;
}

.app-container {
  padding: 20px;
}

.meetingTipsText {
  display: flex;
  align-items: center;
}

.meetingTipsText span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.meetingTips_R span {
  background-color: #46dfa7;
}

.meetingTips_R p {
  color: #46dfa7;
  font-size: 14px;
  margin: 0;
  margin-left: 8px;
}

.meetingTips_W span {
  background-color: #ffae50;
}

.meetingTips_W p {
  color: #ffae50;
  font-size: 14px;
  margin: 0;
  margin-left: 8px;
}

.meetingTips_E span {
  background-color: #666;
}

.meetingTips_E p {
  color: #666;
  font-size: 14px;
  margin: 0;
  margin-left: 8px;
}

.meetingTips {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/*  */
.meetingItemBtn {
  display: flex;
  height: 64px;

  padding: 6px 0;
  background-color: #f8f7fc;
}

.meetingItemBtn > div {
  text-align: center;
  font-size: 12px;
  overflow: hidden;
  padding: 0px 10px;
  color: #999999;
  line-height: 52px;
  flex: 1;
  border-right: 1px solid #ddd;
}

.meetingItemBtn > div:hover {
  background-color: #f1f1f1;
}

.meetingItemBtn > div:last-child {
  border: none;
}

.meetingItemBtn:first-child {
  border: none;
  border-bottom-left-radius: 6px;
}

.meetingItemBtn:last-child {
  border: none;
  border-bottom-right-radius: 6px;
}

.mettingItemText > div > div {
  font-size: 13px;
  margin-top: 10px;
}

.mettingItemText {
  height: 190px;
  box-sizing: border-box;
  padding: 10px 10px;
  color: #444;
}

.meetingItem {
  width: 100%;
  height: 254px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-right: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.meetingItem:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.18), 0 0 6px rgba(0, 0, 0, 0.14);
}

.meetingList {
  /* display: flex;
  flex-wrap: wrap;
  min-height: 500px; */
}

/*  */
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
