<template>
  <div class="app-containers">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <!-- Launchagain-E为结束的会议重新发起 -->
      <el-form-item
        label="发起方式 :"
        prop="initiation"
       v-if="Launchagain=='Launchagain-E'"
      >
        <el-radio-group v-model="ruleForm.initiation">
          <el-radio
            label="1"
            v-if="Launchagain == 'Launchagain-E'"
            @change="initchan(ruleForm.initiation)"
            >即时会议</el-radio
          >
          <el-radio
            label="0"
            v-if="type == 'General_meeting' || Launchagain == 'Launchagain-E'"
            @change="initchan(ruleForm.initiation)"
            >预约会议</el-radio
          >
          <el-radio
            label="2"
            v-if="Launchagain == 'Launchagain-E'"
            @change="initchan(ruleForm.initiation)"
            >周期会议</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会议主题 :" prop="name">
        <el-input
          maxlength="40"
          v-model="ruleForm.name"
          placeholder="请输入会议主题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="周期开始 :"
        prop="dataTime"
        v-if="type == 'Periodic_meetings' && ruleForm.initiation == 2"
      >
        <el-date-picker
          v-model="ruleForm.dataTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间"
          :picker-options="start_Date"
          @blur="startChange"
          >></el-date-picker
        >
      </el-form-item>
      <el-form-item
        label="周期结束 :"
        prop="datasTime"
        v-if="type == 'Periodic_meetings' && ruleForm.initiation == 2"
      >
        <el-date-picker
          v-model="ruleForm.datasTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间"
          :picker-options="end_Date"
          @blur="endChange"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="会议周期 :"
        prop="time"
        v-if="type == 'Periodic_meetings' && ruleForm.initiation == 2"
      >
        <el-radio-group v-model="ruleForm.time">
          <el-radio label="DAY" @change="timedata(ruleForm.time)">天</el-radio>
          <el-radio label="WEEK" @change="timedata(ruleForm.time)">周</el-radio>
          <el-radio label="MONTH" @change="timedata(ruleForm.time)"
            >月</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="repeat"
        v-show="
          type == 'Periodic_meetings' &&
          ruleForm.time != 'DAY' &&
          ruleForm.initiation == 2
        "
      >
        <Cyclecalendar
          ref="q"
          @timechanges="timechanges"
          v-if="timementing"
          :isInit="true"
          :startTime="ruleForm.dataTime"
          :endTime="ruleForm.datasTime"
          :isType="ruleForm.time"
        ></Cyclecalendar>
      </el-form-item>
      <el-form-item
        prop="itemdata"
        v-if="type == 'Periodic_meetings' && ruleForm.initiation == 2"
      >
        <el-time-picker
          v-model="ruleForm.itemdata"
          :picker-options="{
            selectableRange: Dateoftheday,
          }"
          @blur="startTimeChange('itemdata')"
          placeholder="请选择时间"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="会议时长 :" prop="delivery">
        <el-slider
          v-model="ruleForm.delivery"
          :step="0.5"
          :max="6"
          :format-tooltip="format"
          show-stops
          @change="timeLengthChange"
        ></el-slider>
      </el-form-item>
      <el-form-item
        label="开始时间 :"
        prop="data"
        v-if="ruleForm.initiation == '0'"
      >
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          v-model="ruleForm.data"
          class="date-picker"
          :picker-options="start_Datezhou"
          type="datetime"
          @blur="startTimeChange('data')"
          placeholder="选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="会议模板 :" prop="region">
        <el-link type="primary" @click="Template">{{ teplace }}</el-link>
      </el-form-item>
      <el-form-item label="静音设置 :" prop="Mute">
        <el-radio-group v-model="ruleForm.Mute">
          <el-radio label="静音"></el-radio>
          <el-radio label="不静音"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会议类型 :" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="视频会议"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-dialog
      title="请选择会议模板"
      :visible.sync="dialogVisible"
      width="660px"
      center
      top="20px"
    >
      <span>
        <el-row
          :gutter="20"
          class="infinite-list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          style="overflow: auto; height: 380px"
        >
          <el-col
            :span="8"
            v-for="(i, index) in list"
            :key="index"
            class="infinite-list-item"
          >
            <div class="grid-content bg-purple">
              <div class="SelectTemplatePopup_list" @click="licklist(index, i)">
                <div
                  :class="{
                    SelectTemplateActive: currentIndex === index,
                  }"
                >
                  <div>
                    <img
                      class="template-name"
                      src="../../../../icons/svg/card_icon_template.png"
                      alt=""
                      srcset=""
                    />
                    <div style="font-size: 14px; margin-top: 5px">
                      {{ i.templateName }}
                    </div>
                    <div style="color: #666; font-size: 14px; margin-top: 5px">
                      {{ i.createTime }}
                    </div>
                  </div>
                  <img
                    v-if="currentIndex === index"
                    class="img_name"
                    src="../../../../icons/svg/card_icon_select.png"
                    alt
                  />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="meetquxiao()">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="meetingTe(meetingTedata)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cyclecalendar from "@/components/Cyclecalendar";
import { getMeetingInfo, period_info } from "@/api/article"; //会议详情
import { getTemplateByOwner, getTemplateByUuid } from "@/api/Template"; //模板列表  模板详情
export default {
  components: { Cyclecalendar }, //会议周期
  data() {
    var checkName = (rule, value, callback) => {
      var len = 0;
      for (var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      console.log(len);
      if (len > 40) {
        //重点重点，下面就是填写提示的文字
        callback(new Error("主题长度限制为40个字符，一个中文字等于2个字符。"));
        return;
      } else {
        callback();
      }
    };
    return {
      //是否显示会议日期
      isnan: "0",
      start_Datezhou: {
        //时间限制
        disabledDate: (time) => {
          if (this.ruleForm.data) {
            return time.getTime() < Date.now() - 8.64e7;
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      start_Date: {
        //时间限制
        disabledDate: (time) => {
          if (this.ruleForm.datasTime) {
            return (
              time.getTime() > new Date(this.ruleForm.datasTime).getTime() ||
              time.getTime() < Date.now() - 8.64e7
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      end_Date: {
        disabledDate: (time) => {
          if (this.ruleForm.dataTime) {
            return (
              time.getTime() <
              new Date(this.ruleForm.dataTime).getTime() - 8.64e7 // 加- 8.64e7则表示包当天
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      pickerOptions: {
        disabledDate: (time) => {
          if (this.ruleForm.dataTime || this.ruleForm.datasTime) {
            return (
              time.getTime() <
                new Date(this.ruleForm.dataTime).getTime() - 8.64e7 ||
              time.getTime() >
                new Date(this.ruleForm.datasTime).getTime() - 8.64e7 // 加- 8.64e7则表示包当天
            );
          } else {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      //点击选择模板
      dialogVisible: false,
      list: [],
      meetingTedata: "",
      templateItemId: "",
      timementing: true,
      statimee: "",
      total: 0,
      num: 1,
      listQuery: {
        page: 0, //当前页码
        page_size: 8, //默认条数.默认为8
      },
      ruleForm: {
        //会议名称
        name: "",
        //会议议程
        region: "",
        //会议模式
        resource: "视频会议",
        //静音设置
        Mute: "静音",
        //发起方式
        data: "", //预约会议
        initiation: "2",
        repeat: "", //会议日期
        dataTime: "", //周期会议开始
        datasTime: "", //结束时间
        time: "DAY", //周期会议类型
        itemdata: "", //周期会议开始时间
        //会议时长
        delivery: 0.5,
        cycle: "",
      },
      loading: false,
      type: this.$route.query.type,
      Launchagain: this.$route.query.Launchagain,
      bianji:this.$route.query.bianji,
      currentIndex: 0,
      Dateoftheday: "",
      templateUuid: "",
      templateItem: "",
      teplace: "请选择会议模板",
      rules: {
        name: [{ trigger: "change", validator: checkName }],
      },
    };
  },
  beforeMount() {
    var meetingData = JSON.parse(this.$route.query.meetingData);//父组件传过来的会议id
    var type = this.$route.query.type;
    console.log(meetingData);
    if (type == "General_meeting") {
      //即时预约查看详情
      getMeetingInfo({
        meeting_id: meetingData,
      }).then((res) => {
        // console.log("编辑会议",new Date(res.data.meeting_starttime).getTime());
        this.ruleForm.name = res.data.meeting_theme; //会议主题
        this.ruleForm.delivery = res.data.meeting_length / 60 / 60; //会议时长
        this.ruleForm.initiation = res.data.meeting_type; //会议类型
        if (this.Launchagain != "Launchagain-E") {
          this.ruleForm.data = res.data.meeting_starttime; //开始的时间
        }

        this.ruleForm.Mute =
          res.data.meeting_ifmute == true ? "静音" : "不静音";
        if (res.data.template_uuid != null && res.data.template_uuid != "") {
          getTemplateByUuid({ uuid: res.data.template_uuid }).then((res) => {
            console.log(res);
            this.templateItem = res.data.uuid; //模板id
            this.teplace = "已选择 " + res.data.templateName + " 会议模板";
          });
        }
        this.$emit("teplont", res.data); //会议详情的参会人
      });
    } else {
      //周期会议查看详情
      period_info({
        uuid: meetingData,
      }).then((res) => {
        console.log("编辑周期会议", res);
        this.ruleForm.name = res.data.periodMeeting.meetingTheme; //会议主题
        this.ruleForm.delivery = res.data.periodMeeting.meetingLength; //会议时长
        this.ruleForm.initiation = 2; //会议类型
        this.ruleForm.data = res.data.periodMeeting.meeting_starttime; //开始的时间
        this.ruleForm.Mute =
          res.data.periodMeeting.meetingIfmute == "true" ? "静音" : "不静音";

        this.ruleForm.dataTime = res.data.periodMeeting.periodStarttime; //开始的时间
        this.ruleForm.datasTime = res.data.periodMeeting.periodEndtime; //周期结束时间
        this.ruleForm.time = res.data.periodMeeting.periodType; //周期结束时间
        //周期
        let meetname = res.data.periodMeeting.meetingDate.split(",");
        this.$refs.q.timeAll = meetname;
        this.ruleForm.repeat = meetname;
        this.templateUuid = res.data.periodMeeting.templateUuid; //模板id
         let datas = '';
      if (this.IEVersion() == -1) {
         datas = res.data.periodMeeting.periodStarttime;
      } else {
         datas = (res.data.periodMeeting.periodStarttime).replace(/-/g, "/");
      }
        //周期时间
        this.ruleForm.itemdata =
          datas+
          " " +
          res.data.periodMeeting.meetingTime;
        if (
          res.data.periodMeeting.templateUuid != null &&
          res.data.periodMeeting.templateUuid != ""
        ) {
          getTemplateByUuid({ uuid: res.data.periodMeeting.templateUuid }).then(
            (res) => {
              console.log(res);
              this.templateItem = res.data.templateUuid;
              this.teplace = "已选择 " + res.data.templateName + " 会议模板";
            }
          );
        }
        this.$emit("teplont", res.data); //周期会议参会人
      });
    }
  },
  watch: {
    ruleForm: function (a) {
      console.log(a);
      this.$emit("establish", a); //创建会议参数
    },
  },
  created() {
    this.Dateday();
    this.load();
    console.log(this.type, this.ruleForm.initiation);
  },
  computed: {
    noMore() {
      //   当循环添加的数据条数大于或等于总条数时停止加载
      return this.list.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    //模板滚动加载
    load() {
      this.loading = true;
      this.listQuery.page = this.listQuery.page + 1;
      getTemplateByOwner({
        ownerId: "",
        page: this.listQuery.page,
        size: this.listQuery.page_size,
      }).then((res) => {
        console.log(res);
        res.data.data.forEach((element) => {
          this.list.push(element);
        });
        this.meetingTedata = this.list[this.currentIndex];
        this.total = res.data.count;
        this.loading = false;
      });
      console.log(this.list);
    },
    //点击模板 切换
    licklist(index, item) {
      console.log(index);
      let num = 0;
      if (this.currentIndex == index) {
        if (this.num == num) {
          this.currentIndex = index;
          this.meetingTedata = item;
          this.num = 1;
        } else {
          this.currentIndex = "";
          this.meetingTedata = "";
          this.num = 0;
        }
      } else {
        this.currentIndex = index;
        this.meetingTedata = item;
      }
    },
    //选择模板
    meetingTe(item) {
      console.log(item);
      this.num = 1;
      if (item != "") {
        getTemplateByUuid({ uuid: item.uuid }).then((res) => {
          console.log(res);
          this.dialogVisible = false;
          //this.ruleForm.name = res.data.templateName;
          this.ruleForm.Mute =
            res.data.meetingIfmute == false ? "不静音" : "静音";
          this.teplace = "已选择 " + res.data.templateName + " 会议模板";
          this.$emit("teplont", res.data);
        });
        this.templateItemId = item;
        this.templateItem = item.uuid;
      } else {
        this.dialogVisible = false;
        this.ruleForm.Mute = "静音";
        this.teplace = "请选择会议模板";
        this.$emit("teplont", "");
        this.num = 0;
      }
    },
    //每天选择的时间
    Dateday() {
      let data = this.dateTostring(new Date()).split(" ");
      console.log(data);
      this.Dateoftheday = data[1] + "- 23:59:00";
    },
    //周期会议切换类型
    timechanges(a) {
      console.log(a);
      this.ruleForm.repeat = a;
    },
    dataCycle(vm) {
      console.log(this.ruleForm.repeat);
    },
    //有结束时间确定周期半年的会议
    startChange() {
      console.log(this.ruleForm.dataTime, this.ruleForm.datasTime);
      if (this.ruleForm.datasTime) {
        var staDate = new Date(this.ruleForm.dataTime).getTime(); //开始的时间
        var curDate = new Date(this.ruleForm.datasTime).getTime(); //结束时间

        var halfYear = (365 / 2) * 24 * 3600 * 1000; //半年的时间
        var pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）
        var pastDate = new Date(pastResult),
          pastYear = pastDate.getFullYear(),
          pastMonth = pastDate.getMonth() + 1,
          pastDay = pastDate.getDate();
        let datapast = pastYear + "-" + pastMonth + "-" + pastDay;
        let datapaer = new Date(datapast).getTime(); //半年前时间戳

        var tianYear = 8 * 3600 * 1000; //1天的时间
        var tianResult = curDate - tianYear; //1天的时间（毫秒单位）
        var tianDate = new Date(tianResult),
          tianYear = tianDate.getFullYear(),
          tianMonth = tianDate.getMonth() + 1,
          tianDay = tianDate.getDate();
        let datatian = tianYear + "-" + tianMonth + "-" + tianDay;
        let datapaertian = new Date(datatian).getTime(); //1时间戳
        console.log(datapaertian);
        if (staDate <= datapaer) {
          this.$message.error("选择周期时间过长,最多半年");
          this.ruleForm.dataTime = "";
        } else if (staDate > datapaertian) {
          this.$message.error("选择周期时间过短,不能同一天");
          this.ruleForm.dataTime = "";
        }
      }
    },
    //有结束时间确定周期半年的会议
    endChange() {
      if (this.ruleForm.dataTime) {
        var staDate = new Date(this.ruleForm.dataTime).getTime(); //开始的时间
        var curDate = new Date(this.ruleForm.datasTime).getTime(); //结束时间

        var halfYear = (365 / 2) * 24 * 3600 * 1000; //半年的时间
        var pastResult = staDate + halfYear; // 半年后的时间（毫秒单位）
        var pastDate = new Date(pastResult),
          pastYear = pastDate.getFullYear(),
          pastMonth = pastDate.getMonth() + 1,
          pastDay = pastDate.getDate();
        let datapast = pastYear + "-" + pastMonth + "-" + pastDay;
        console.log(datapast);
        var tianYear = 24 * 3600 * 1000; //1天的时间
        var tianResult = staDate + tianYear; //1天的时间（毫秒单位）
        var tianDate = new Date(tianResult),
          tianYear = tianDate.getFullYear(),
          tianMonth = tianDate.getMonth() + 1,
          tianDay = tianDate.getDate();
        let datatian = tianYear + "-" + tianMonth + "-" + tianDay;
        let datapaertian = new Date(datatian).getTime(); //1时间戳
        console.log(datapaertian);
        let datapaer = new Date(datapast).getTime(); //半年后时间戳
        if (curDate >= datapaer) {
          this.$message.error("选择周期时间过长,最多半年");
          this.ruleForm.datasTime = "";
        } else if (curDate < datapaertian) {
          this.$message.error("选择周期时间过短,不能同一天");
          this.ruleForm.datasTime = "";
        }
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
    // 预约会议开始时间必须距离创建会议时间大于5分钟!
    startTimeChange(params) {
      console.log(params)
       let datas = '';
      if (this.IEVersion() == -1) {
         datas = this.ruleForm[params];
      } else {
         datas = this.ruleForm[params].replace(/-/g, "/");
      }
      if (
        new Date(datas).getTime() <
        new Date().getTime() + 240000
      ) {
        if (datas == "data") {
          this.$message.error("预约会议开始时间必须距离创建会议时间大于5分钟!");
        } else {
          this.$message.error("周期会议开始时间必须距离创建会议时间大于5分钟!");
        }
        this.ruleForm[params] = this.dateTostring(
          new Date(new Date().getTime() + 300000)
        );
      }
    },
    meeting() {
      if (this.ruleForm.dataTime == "") {
        this.$message.error("先选择周期开始时间");
      } else if (this.ruleForm.datasTime == "") {
        this.$message.error("先选择周期结束时间");
      }
    },
    //时间格式函数
    dateTostring(now) {
      console.log(now);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      month = month >= 10 ? month : "0" + month;
      var date = now.getDate();
      date = date >= 10 ? date : "0" + date;
      var hour = now.getHours();
      hour = hour >= 10 ? hour : "0" + hour;
      var minute = now.getMinutes();
      minute = minute >= 10 ? minute : "0" + minute;
      var second = now.getSeconds();
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
    //限制会议选择时间
    timeLengthChange(res) {
      console.log(res);
      if (res <= 0.5) {
        this.ruleForm.delivery = 0.5;
      }
    },
    format(val) {
      return val + "小时";
    },
    //点击显示会议日期
    initchan(type) {
      console.log(type);
      this.ruleForm.initiation = type;
      if(type=='2'){
        this.type = 'Periodic_meetings'
      }
      this.ruleForm.Mute = "静音";
      this.teplace = "请选择会议模板";
      this.$emit("teplont", "");
      this.isnan = type;
    },
    timedata(type) {
      this.ruleForm.time = type;
      this.timementing = false;
      setTimeout(() => {
        this.timementing = true;
      }, 10);
    },
    //点击打开模板
    Template() {
      this.dialogVisible = true;
    },
    //取消模板
    meetquxiao() {
      this.dialogVisible = false;
      this.currentIndex = 0;
      this.num = 1;
    },
  },
};
</script>
<style scoped >
.el-picker-panel__footer .el-button--text.el-picker-panel__link-btn {
  display: none;
}
.SelectTemplateActive {
  border: 1px solid #ffbc6c;
}
.SelectTemplatePopup {
  width: 100%;
  height: 458px;
  background-color: #fff;
  border-radius: 8px;
}
.SelectTemplatePopup_title {
  height: 50px;
  background: #f8f7fc;
  padding-left: 30px;
  line-height: 50px;
  color: #666;
}
.SelectTemplatePopup_cont {
  height: 350px;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}
.SelectTemplatePopup_list {
  display: flex;
  flex-wrap: wrap;
}
.img_name {
  position: absolute;
  right: 0;
  bottom: 0;
}
.SelectTemplatePopup_list > div {
  position: relative;
  width: 100%;
  height: 140px;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.SelectTemplatePopup_list > div:nth-child(3n) {
  margin-right: 0;
}
.SelectTemplatePopup_btn {
  width: 620px;
  margin: 0 auto;
  border-top: 1px solid #e5e5e5;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.SelectTemplatePopup_btn > div {
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 0px 30px;
  color: #666;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}
</style>
