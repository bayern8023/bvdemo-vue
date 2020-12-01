<template>
  <div class="app-container">
    <div class="app-name">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <fixed-thead  ref="template" :Templatedetails="Templatedetails" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <unfixed-thead ref="attendee" :Templatedetails="Templatedetails" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark app-center quan">
            <el-button @click="Canceltemplate">取消</el-button>          
            <el-button type="primary" @click="establish()" >确认修改</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FixedThead from "./editor/index";
import UnfixedThead from "@/components/poltal/UnfixedThead";
import { updateTemplate ,getTemplateByUuid} from "@/api/Template"; //修改模板 //模板详情
import { getEnterpriseId } from "@/utils/auth"; //企业id
export default {
  name: "DynamicTable",
  components: { FixedThead, UnfixedThead },
  data() {
    return {
      uuid: this.$route.query.query,
      Templatedetails:''
    };
  },
created() {
  //初始化模板详情
   this.release()
},
  methods: {
    //返回上一级
    Canceltemplate() {
      this.$router.go(-1);
    },
     //模板详情
    release() {
      let data = {
       uuid:this.uuid,//获取单个模板详情
      };
      getTemplateByUuid(data)
        .then((response) => {
          console.log(response);
          this.Templatedetails = response.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存模板
    establish(){
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
      updateTemplate({
        uuid:this.uuid,
        templateName:template.name,//模板名称
        createPeople:userId,//	是	string	创建人
        meetingIfmute:template.Mute == "静音" ? true : false,
        attendeeCOList:attendee,//模板参会人
      }).then(res=>{
        console.log(res)
            this.$message({
              message: "修改会议模板成功!",
              type: "success",
            });
            this.$router.push({path:'/template/template'})
      })
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

