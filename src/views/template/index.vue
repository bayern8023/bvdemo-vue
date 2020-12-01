<template>
  <div class="app-container">
    <el-row
      :gutter="20"
      class="infinite-list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      :style="{overflow:over,height:height}"
    >
      <el-col :span="8" style="margin-bottom: 10px">
        <div class="grid-content bg-purple">
          <div
            class="Template"
            @click="Createtemplate(total)"
          >
            <div>
              <img
                class="template-name"
                src="../../icons/svg/card_icon_add.png"
                alt=""
                srcset=""
              />
              <div style="padding: 5px 0">新建模板</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="8"
        v-for="(item, index) in list"
        :key="index"
        class="infinite-list-item"
        style="margin-bottom: 10px"
      >
        <div class="grid-content bg-purple">
          <div
            class="Template"
            @mouseover="mouseOver(index)"
            @mouseleave="mouseLeave(index)"
            @click="Templatedetails('Viewtemplates', item)"
          >
            <div>
              <img
                class="template-name"
                src="../../icons/svg/card_icon_template.png"
                alt=""
                srcset=""
              />
              <!-- <i class="el-icon-menu template-name"></i> -->
              <!-- <div style="font-size:14px;margin:6px">
                <span>
                </span>
              </div> -->
              <el-row>
                <el-col
                  style="word-wrap: break-word; margin-top: 12px"
                  :span="24"
                  ><div class="grid-content bg-purple-dark">
                    {{ item.templateName }}
                  </div></el-col
                >
              </el-row>
              <div style="margin-top: 12px; color: #999999">
                {{ item.createTime }}
              </div>
            </div>
            <img
              class="deleteclose"
              v-if="item.isfalse"
              @click.stop="mouseDeletes(item,index)"
              :src="img"
              alt
              srcset
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisibleadd" width="30%">
      <span>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              确定要删除{{ moudele.templateName }}模板？
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button
          style="background: #7c7cff; border: none; color: #fff"
          @click="mouseDelete(moudele,menindex)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import oneChecked_url from "@/icons/svg/deletemo.png";
import { getTemplateByOwner, deleteTemplate } from "@/api/Template";
export default {
  name: "template",
  data() {
    return {
      img: oneChecked_url,//删除图标
      dialogVisibleadd: false,//默认不打开删除弹框
      moudele: "",//当前模板
      list: [],//模板列表
      menindex:"",//当前模板的点击  下标
      loading: false,//滚动
      over:'auto',
      height:'',//当前屏幕的高度
      total: 0,//模板总条数
      listQuery: {
        page: 0, //当前页码
        page_size: 5, //默认条数.默认为8
      },
    };
  },
  beforeMount() {
    //初始化模板列表
    this.load();
    this.height = (document.body.clientHeight-80)+'px';//计算当前屏幕的高度
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
    //模板列表
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
          element.isfalse = false;
          this.list.push(element);
        });
        this.total = res.data.count;
        this.loading = false;
      });
    },
    //创建模板
    Createtemplate(query) {
      this.$router.push({
        path: "/template/createtemplate",
        query: { query: query},
      });
    },
    //模板详情
    Templatedetails(query, item) {
      this.$router.push({
        path: "/template/Templatedetails",
        query: { query: query, uuid: JSON.stringify(item) },
      });
    },
    //鼠标进去，删除图片显示
    mouseOver(index) {
      console.log(index, this.list[index]);
      this.list[index].isfalse = true;
    },
     //鼠标移出，删除图片消失
    mouseLeave(index) {
      this.list[index].isfalse = false;
    },
    //删除模板
    mouseDelete(item,index) {
      deleteTemplate({
        uuid: item.uuid,
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "删除成功!",
            type: "success",
          });
           this.listQuery.page = 0;
           this.list = [];
          this.load()
          this.dialogVisibleadd = false;
        }
      });
      
    },
    //点击删除打开弹框
    mouseDeletes(item,index) {
      this.dialogVisibleadd = true;
      this.moudele = item;
      this.menindex = index;
    },
  },
};
</script>
<style scoped>
.Template {
  width: 100%;
  height: 252px;
  /* line-height: 160px; */
  text-align: center;
  background: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 20px 0 rgba(72, 72, 239, 0.08);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.template-name {
  color: #7c7cff;
  font-size: 34px;
}
.deleteclose {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 6px 0 0 6px;
  color: red;
}
</style>