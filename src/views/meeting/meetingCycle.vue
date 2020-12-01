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
        <el-button  :disabled="disabled" style="background: #7C7CFF;border:none;color:#fff" @click="IimplementDeleteMeeting"
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
        <el-button  :disabled="disabled"  style="background: #7C7CFF;border:none;color:#fff" @click="IimplementCancelMeeting"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 保存会议弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="toTemplateState"
      width="30%"
      :before-close="nullFN"
    >
      <div style="display: flex; align-items: center">
        <span style="width: 100px">模板名称：</span>
        <el-input v-model="templateVal" placeholder="请输入模板名称"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toTemplateState = false">取 消</el-button>
        <el-button  :disabled="disabled"  style="background: #7C7CFF;border:none;color:#fff" @click="saveTemplate">确 定</el-button>
      </span>
    </el-dialog>
    <div class="app-name">
      <div class="meetingListCont">
        <!-- 全部 -->
        <div>
          <div v-show="loading" v-loading="loading" style="height: 500px"></div>
          <div v-show="!loading">
            <el-row :gutter="20">
              <el-col
                :span="8"
                v-for="(item, index) in meetingList"
                :key="index"
              >
                <div class="grid-content bg-purple">
                  <div class="meetingItem">
                    <div class="mettingItemText" @click="meetingInfo(item)">
                      <div class="meetingTips">
                        <div
                          class="meetingTipsText"
                          :class="{
                            meetingTips_W: item.meetingStatus == 'W',
                            meetingTips_R: item.meetingStatus == 'R',
                            meetingTips_E: item.meetingStatus == 'E',
                          }"
                        >
                          <span></span>
                          <p v-if="item.meetingStatus == 'W'">未开始</p>
                          <p v-if="item.meetingStatus == 'R'">进行中</p>
                          <p v-if="item.meetingStatus == 'E'">已结束</p>
                        </div>
                        <div>
                          <img src="../../icons/svg/kechengzhouqi.png" alt="" />
                        </div>
                      </div>
                      <div>
                        <div>会议主题：{{ item.meetingTheme }}</div>
                        <div>开始时间：{{ item.meetingTime }}</div>
                        <!-- <div>发起时间：{{ item.createTime }}</div> -->
                        <!-- <div>会议周期：日</div>
												<div>周期类型：日</div> -->
                        <!-- <div>模板名称：这是模板名称</div> -->
                      </div>
                    </div>
                    <div class="meetingItemBtn" v-if=" item.operatorEcUid == userId">
                      <div
                        @click="meetingModify(item.meetingId)"
                        v-if="
                          item.meetingStatus == 'W'
                        "
                      >
                        编辑会议
                      </div>
                      <div
                        @click="meetingControl(item)"
                        v-if="
                          item.meetingStatus == 'R'
                        "
                      >
                        会议控制
                      </div>
                      <!-- <div >会议详情</div> -->
                      <div
                        @click="meetingCancel(item)"
                        v-if="
                          item.meetingStatus == 'W'
                        "
                      >
                        取消预约
                      </div>
                      <div
                        @click="meetingDelete(item)"
                        v-if="
                          item.meetingStatus == 'E'
                        "
                      >
                        删除
                      </div>
                      <div
                        @click="openMeetingTemplate(item)"
                        v-if="
                          item.meetingStatus == 'E'
                        "
                      >
                        保存模板
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div
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
          @current-change="currentPageChange"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  meetingToTemplate, //会议保存为模板
} from "@/api/Template";
import {
  getSubPeriodList, //周期会议下列表
  cancelMeeting, //取消预约会议
  deleteMeetings, //会议列表删除会议
} from "@/api/article";
import { getEnterpriseId } from "@/utils/auth";
export default {
  name: "InlineEditTable",
  components: {},
  data() {
    return {
      meetingData: null,
      loading: false,
      activeName: "A",
      currentPage: 1,
      meetingList: [],
      list: null,
       disabled:false,
      listLoading: true,
      total: 0,
      listQuery: {
        meeting_operate_type: "0", //	操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议
        page: 1, //当前页码
        page_size: 12, //默认条数.默认为8
      },
      //账号id
      userId: JSON.parse(getEnterpriseId()).userName,
      deleteMeetingState: false,
      deleteMeetingItem: null,
      cancelMeetingState: false,
      cancelMeetingItem: null,
      toTemplateItem: null,
      templateVal: "",
      toTemplateState: false,
    };
  },
  watch: {},
  created() {},
  beforeMount() {
    console.log(this.$route.query);
    this.meetingData = JSON.parse(this.$route.query.meetingItem);
    this.getMeetingList();
  },
  mounted() {},
  methods: {
    saveTemplate() {
       this.disabled = true;
      meetingToTemplate({
        name: this.templateVal,
        id: this.toTemplateItem.meetingId,
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
    },
    nullFN() {},
    openMeetingTemplate(item) {
      this.toTemplateItem = item;
      this.toTemplateState = true;
    },
    meetingClick() {
      // this.$router.push({
      // 	path:''
      // })
    },
    currentPageChange(page) {
      console.log(page);
      this.listQuery.page = page;
      this.getMeetingList();
    },
    deleteMeetingCancel() {
      // this.deleteMeetingState=false;
    },
    cancelMeetingCancel() {},
    meetingTabClick(tab) {
      this.activeName = tab;
      this.listQuery.page = 1;
      this.getMeetingList();
    },
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
      deleteMeetings({
        ids: this.deleteMeetingItem.meetingId,
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
    IimplementCancelMeeting() {
      this.disabled = true;
      console.log(this.cancelMeetingItem)
      cancelMeeting({
        meeting_id: this.cancelMeetingItem.meetingId,
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
    pageChange(page) {
      this.currentPage = page;
    },
    getMeetingList() {
      this.meetingList = [];
      this.loading = true;
      getSubPeriodList({
        uuid: this.meetingData.uuid,
        page: this.listQuery.page,
        page_size: this.listQuery.page_size,
      }).then((res) => {
        if (res.code == 200) {
          this.meetingList = res.data.meetingList;
          this.total = res.data.pageSize[0];
        } else {
        }
        this.loading = false;
        console.log("会议列表", res);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.getMeetingList();
    },
    meetingModify(item) {
      this.$router.push({
        path: "meetingModify",
        query: {
          meetingData: JSON.stringify(item),
          type: "General_meeting", //General meeting
        },
      });
    },
    meetingControl(item) {
      this.$router.push({
        path: "meetingControl",
      });
    },
    meetingInfo(item) {
      this.$router.push({
        path: "meetingInfo",
        query: {
          meeting_id: item.meetingId,
          meeting_status: item.meetingStatus,
          type:'Periodic_meetings'
        },
      });
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
