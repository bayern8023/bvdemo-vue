<template>
  <div class="app-container" v-loading="loading">
    <div class="app-name">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- 创建会议左部选择会议类型界面    teplont是里面返回的参会人员 -->
            <fixed-thead ref="establish" @teplont="teplont" :uuid="uuid"  />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!-- 通讯录组件 Templatedetails放进组件的参会人-->
            <unfixed-thead ref="attendee" :Templatedetails="Templatedetails" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark app-center faqi">
            <el-button type="primary" @click="release" :disabled="disabled"
              >发起会议</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FixedThead from "./components/FixedThead";//创建会议类型
import UnfixedThead from "@/components/poltal/UnfixedThead";//通讯录组件
import { createMeeting, period_create } from "@/api/article"; //创建会议 创建周期会议
export default {
  name: "DynamicTable",
  components: { FixedThead, UnfixedThead },
  data() {
    return {
      isfalse: true,
      radio: "公开",
      loading: false,
      Templatedetails: "",//放进通讯录的参会人
      uuid: "",//模板id
      disabled: false,
    };
  },
  created() {
    //从模板详情里面的发起会议点击进来，判断有没有模板id
    if (this.$route.query.query) {
      this.uuid = this.$route.query.query;
    }
  },
  methods: {
    //接收参会人，赋值给通讯录
    teplont(a) {
      this.Templatedetails = a;
    },
    //创建会议
    release() {
      let dataesta = this.$refs.establish.ruleForm;
      let attendee = this.$refs.attendee.changname;
      ///软终端
      attendee.forEach((element) => {
        if (element.business == "6") {
          element.is_volte = false;
        }
      });
      if (dataesta.name == "") {
        this.$message.error("请输入会议主题");
        return;
      }
      if (dataesta.initiation == 0) {
        if (dataesta.data == "") {
          this.$message.error("请输入预约开始时间");
          return;
        }else{
          if (
            // new Date(dataesta.data).getTime() <
            // new Date().getTime() + 300000
            new Date(dataesta.data).getTime() <
            new Date().getTime() + 240000
          ) {
            this.$message.error("预约会议开始时间必须距离创建会议时间大于5分钟!");
            return;
            // dataesta.data = this.dateTostring(
            //   new Date(new Date().getTime() + 300000)
            // );
          }
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
      this.disabled = true;
      if (dataesta.initiation == "2") {
        //周期会议
        let data = {
          meetingTheme: dataesta.name,
          templateUuid: this.$refs.establish.templateItem,
          periodStarttime: dataesta.dataTime,
          periodEndtime: dataesta.datasTime,
          meetingDate: dataesta.repeat == "" ? "" : dataesta.repeat.join(","),
          meetingTime: dataesta.itemdata.split(" ")[1],
          periodType: dataesta.time.toUpperCase(),
          meetingIfmute: dataesta.Mute == "静音" ? true : false,
          meetingLength:
            String(dataesta.delivery).indexOf(".") != -1
              ? String(dataesta.delivery)
              : dataesta.delivery + ".0",
          meetingAttendee: attendee,
        };
        period_create(data)
          .then((res) => {
            this.loading = false;
            this.disabled = false;
            if (res.code == 200) {
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
        //即时会议，预约会议
        let data = {
          // meeting_operate_type: "0", //操作的会议类别，0：公开会议；1：保密会议；2：纯软终端会议，默认2
          template_uuid: this.$refs.establish.templateItem,
          meeting_theme: dataesta.name, //会议主题
          meeting_attendee: attendee, //会议参会人
          meeting_ifmute: dataesta.Mute == "静音" ? true : false, //是否开启全场静音，true静音，false不静音。默认false。会议类型为纯软终端会议时，该字段无效
          // meeting_mode: "HD", //会议模式，高清：HD、语音：VO，只有开通07业务的账号才能发起高清会议；开通08业务的账号才能发起语音会议；保密会议此参数填写HD；会议类型为纯软终端会议时，该字段无效
          meeting_type: dataesta.initiation, //会议类型，即时会议：1，预约会议：0
          meeting_time: dataesta.data, //会议开始时间，北京时间，(即时会议此字段不填)，预约会议必須填写会议开始时间，格式： "yyyy-MM-dd HH:mm:ss"
          meeting_length:
            String(dataesta.delivery).indexOf(".") != -1
              ? String(dataesta.delivery)
              : dataesta.delivery + ".0", //		会议时长，单位秒
        };
        createMeeting(data)
          .then((res) => {
            this.loading = false;
            if (res.code == 200) {
              this.$message({
                message: "创建会议成功",
                type: "success",
              });
              if (dataesta.initiation == "1") {
                this.$router.push({
                  path: "/inline-edit-table/meetingControl",
                  query: {
                    query: res.data,
                  },
                });
              } else {
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
    },
  },
};
</script>
<style scoped >
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

