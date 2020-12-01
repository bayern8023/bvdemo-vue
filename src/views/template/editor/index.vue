<template>
  <div class="app-containers">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="模板名称 :" prop="name">
        <el-input
          v-model="ruleForm.name"
          maxlength="40"
          :disabled="routequery == 'Viewtemplates' ? true : false"
          placeholder="请输入模板名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="静音设置 :" prop="Mute">
        <el-radio-group v-model="ruleForm.Mute">
          <el-radio
            label="静音"
            :disabled="routequery == 'Viewtemplates' ? true : false"
          ></el-radio>
          <el-radio
            label="不静音"
            :disabled="routequery == 'Viewtemplates' ? true : false"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会议类型 :" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio
            label="视频会议"
            :disabled="routequery == 'Viewtemplates' ? true : false"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["routequery", "Templatedetails", "totol"],
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
      ruleForm: {
        //模板名称
        name: "会议模板" + this.totol,
        //会议模式
        resource: "视频会议",
        //静音设置
        Mute: "静音",
      },
      rules: {
        name: [
          { trigger: "change", validator: checkName },
        ],
        Mute: [{ message: "请选择静音设置", trigger: "change" }],
        resource: [{ message: "请选择活动资源", trigger: "change" }],
      },
    };
  },
  watch: {
    //正确给 Data 赋值的 方法
    Templatedetails: function (newVal, oldVal) {
      console.log(newVal);
      this.ruleForm.name = newVal.templateName;
      this.ruleForm.Mute = newVal.meetingIfmute == false ? "不静音" : "静音";
      
    },
  },
};
</script>
<style scoped >
.el-picker-panel__footer .el-button--text.el-picker-panel__link-btn {
  display: none;
}
</style>
