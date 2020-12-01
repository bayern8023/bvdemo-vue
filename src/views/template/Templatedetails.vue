<template>
  <div class="app-container">
    <div class="app-name">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <fixed-thead
              :routequery="routequery"
              :Templatedetails="Templatedetails"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <unfixed-thead
              :routequery="routequery"
              :Templatedetails="Templatedetails"
            />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark app-center quan">
            <el-button
              @click="Canceltemplate"
              v-if="routequery == 'Createtemplate'"
              >取消</el-button
            >
            <el-button
              @click="deletetepl(uuid.uuid)"
              v-if="routequery == 'Viewtemplates'"
              >删除</el-button
            >
            <el-button
              @click="Modifytemplate(uuid.uuid)"
              v-if="routequery == 'Viewtemplates'"
              >编辑模板</el-button
            >
            <el-button type="primary" v-if="routequery == 'Createtemplate'"
              >保存模板</el-button
            >
            <el-button type="primary" @click="establish(uuid)" v-else
              >发起会议</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisibleadd" width="30%">
      <span>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple">确定要删除该模板？</div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button  style="background: #7C7CFF;border:none;color:#fff" @click="mouseDelete(moudele)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FixedThead from "./editor/index";
import UnfixedThead from "@/components/poltal/UnfixedThead";
import { getTemplateByUuid, deleteTemplate } from "@/api/Template"; //模板详情
export default {
  name: "DynamicTable",
  components: { FixedThead, UnfixedThead },
  data() {
    return {
      ModifyTemplate: "修改模板",
      routequery: this.$route.query.query,
      uuid: JSON.parse(this.$route.query.uuid),
      Templatedetails: "",
      dialogVisibleadd: false,
      moudele:""
    };
  },
  created() {
    //模板详情
    this.release();
  },
  methods: {
    //返回上一级
    Canceltemplate() {
      this.$router.go(-1);
    },
    //打开删除弹框
    deletetepl(uuid) {
      this.dialogVisibleadd = true;
      this.moudele = uuid;
    },
    //删除模板
    mouseDelete(uuid) {
      deleteTemplate({
        uuid: uuid,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message(res.msg);
          this.$router.go(-1);
        }
      });
    },

    //模板详情
    release() {
      let data = {
        uuid: this.uuid.uuid, //获取单个模板详情
      };
      getTemplateByUuid(data)
        .then((response) => {
          console.log(response);
          this.Templatedetails = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //跳转发起会议
    establish(data) {
      this.$router.push({ path: "/DynamicTable", query: { query: data } });
    },
    //跳转修改模板页面
    Modifytemplate(query) {
      this.$router.push({
        path: "/template/Modifytemplate",
        query: { query: query },
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

