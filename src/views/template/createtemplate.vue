<template>
  <div class="app-container">
    <div class="app-name">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- //模板的创建条件 -->
            <fixed-thead ref="template" :totol="routequery" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!-- 通讯录 -->
            <unfixed-thead ref="attendee" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark app-center quan">
            <el-button
              @click="Canceltemplate"
              >取消</el-button
            >
            <el-button
              type="primary"
              @click="Savetemplate"
              >保存模板</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FixedThead from "./editor/index";//创建模板条件
import UnfixedThead from "@/components/poltal/UnfixedThead";//通讯录
import { createTemplate } from "@/api/Template"; //创建模板
import { getEnterpriseId } from "@/utils/auth"; //企业id
export default {
  name: "DynamicTable",
  components: { FixedThead, UnfixedThead },
  data() {
    return {
      routequery: this.$route.query.query,//默认模板主题名称
    };
  },

  methods: {
    //返回上一级
    Canceltemplate() {
      this.$router.go(-1);
    },
    //跳转发起会议
    establish(data) {
      this.$router.push({ path: "/DynamicTable", query: { query: data } });
    },
    //保存模板
    Savetemplate() {
      let template = this.$refs.template.ruleForm;
      let attendee = this.$refs.attendee.changname;
       ///软终端
      attendee.forEach((element) => {
        console.log(element);
        if (element.business == "6") {
          element.is_volte = false;
        }
      });
      let userId = JSON.parse(getEnterpriseId()).userId; //企业id
      createTemplate({
        templateName: template.name, //模板名称
        createPeople: userId, //	是	string	创建人
        meetingIfmute: template.Mute == "静音" ? true : false,
        attendeeCOList: attendee, //模板参会人
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "模板保存成功",
            type: "success",
          });
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>
<style scoped >
.app-name {
  background: #fff;
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
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

