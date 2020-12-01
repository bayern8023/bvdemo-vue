<template>
  <div class="app-containers">
    <el-card class="box-card txl">
      <div slot="header" class="clearfix">
        <span>参会人员</span>
        <!-- <i
          class="el-icon-circle-plus-outline"
          @click="maillist"
          style="float: right; padding: 3px 0; font-size: 20px; color: #409eff"
          v-if="routequery == 'Viewtemplates' ? false : true"
        ></i> -->
        <img :src="jiahao" alt="" srcset=""  class="el-icon-circle-plus-outline"
          @click="maillist"
          style="float: right;width:15px;height:15px; color: #409eff"
          v-if="routequery == 'Viewtemplates' ? false : true">
      </div>
      <div class="app-eneme" style="height: 270px">
        <el-row class="text item">
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    <img :src="img" alt style="width: 100%; height: 100%" />
                  </div>
                </el-col>
                <el-col :span="21">
                  <div
                    class="grid-content bg-purple-light"
                    style="padding-left: 20px"
                  >
                    主持人
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content bg-purple-light">{{ moilom }}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
        <div
          class="app-eneme"
          style="height: 270px"
          v-if="changname.length != 0"
        >
          <happy-scroll color="rgba(0,0,0,0.5)" size="5">
            <div>
              <div>
                <div
                  v-for="(item, index) in changname"
                  :key="index"
                  class="text item"
                >
                  <el-row>
                    <el-col :span="11">
                      <div class="grid-content bg-purple">
                        <el-row>
                          <el-col :span="2">
                            <div class="grid-content bg-purple">
                              <img
                                :src="imglist"
                                alt
                                style="width: 100%; height: 100%"
                              />
                            </div>
                          </el-col>
                          <el-col :span="21">
                            <div
                              class="grid-content bg-purple-light"
                              style="padding-left: 20px"
                            >
                              {{ item.name }}
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col :span="11">
                      <div class="grid-content bg-purple-light">
                        {{ item.mobile == "" ? "暂无" : item.mobile }}
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content bg-purple-light">
                        <i
                          class="el-icon-close"
                          @click="deletename(item, index)"
                        ></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </happy-scroll>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="通讯录"
      :visible.sync="dialogVisible"
      width="65%"
      top="40px"
    >
      <span>
        <el-row style="margin-top: 10px">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="24">
                  <div
                    class="grid-content bg-purple"
                    style="padding: 0 20px 0px 0px"
                  >
                    <div class="demo-input-suffix">
                      <el-row :gutter="20" style="display: flex">
                        <el-col :span="18"
                          ><div class="grid-content bg-purple">
                            <el-input
                              placeholder="请输入名称或账号"
                              suffix-icon="el-icon-search"
                              v-model="seaname"
                            ></el-input></div
                        ></el-col>
                        <el-col :span="6"
                          ><div class="grid-content bg-purple">
                            <el-button
                              style="
                                background: #7c7cff;
                                border: 1px solid #7c7cff;
                              "
                              type="primary"
                              @click="userSeach"
                              >搜索</el-button
                            >
                          </div></el-col
                        >
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="22">
                  <div class="grid-content bg-purple-dark">
                    <div class="chioceTelListBox" v-if="isname">
                      <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
                      <happy-scroll color="#ccc" size="5" resize>
                        <div style="padding: 16px 0">
                          <el-tree
                            :props="props"
                            :load="loadNode"
                            node-key="id"
                            ref="choice_person_tree_search_huichang"
                            :default-expanded-keys="['1-1']"
                            lazy
                            accordion
                            @node-click="Changline"
                          >
                            <span
                              class="custom-tree-node"
                              slot-scope="{ node, data }"
                            >
                              <span>{{ node.label }}</span>
                              <span
                                v-if="data.sex == undefined && data.id != '1-1'"
                              >
                                <el-button
                                  type="text"
                                  size="mini"
                                  @click.stop="append(data)"
                                  >全选</el-button
                                >
                              </span>
                            </span>
                          </el-tree>
                        </div>
                      </happy-scroll>
                    </div>
                    <div style="height: 320px" v-else>
                      <div style="height: 320px" v-if="sealistname.length != 0">
                        <happy-scroll color="rgba(0,0,0,0.5)" size="5">
                          <div>
                            <div v-loading="listLoading">
                              <div>
                                <a
                                  v-for="(item, index) in sealistname"
                                  class="listname"
                                  :key="index"
                                  @click="sealineken(item)"
                                >
                                  <el-row>
                                    <el-col :span="12">
                                      <div
                                        class="grid-content bg-purple"
                                        style="
                                          overflow: hidden;
                                          text-overflow: ellipsis;
                                          white-space: nowrap;
                                          padding-left: 4px;
                                        "
                                      >
                                        {{ item.name }}
                                      </div>
                                    </el-col>
                                    <el-col :span="12">
                                      <div
                                        class="grid-content bg-purple-light"
                                        style="
                                          overflow: hidden;
                                          text-overflow: ellipsis;
                                          white-space: nowrap;
                                        "
                                      >
                                        {{
                                          item.mobile == ""
                                            ? "暂无"
                                            : item.mobile
                                        }}
                                      </div>
                                    </el-col>
                                  </el-row>
                                </a>
                              </div>
                            </div>
                          </div>
                        </happy-scroll>
                      </div>
                      <div v-else class="zanwu">暂无用户</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card txl" style="height: 400px">
                <div slot="header" class="clearfix">
                  <span
                    >已添加 软终端
                    <el-link type="primary">{{ ruanname }}/500 </el-link
                    >，硬终端
                    <el-link type="primary">{{ yingname }}/800</el-link></span
                  >
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="empty"
                    >清空</el-button
                  >
                </div>
                <div v-if="isfalseken">
                  <div class="app-wolisuye" style="height: 320px">
                    <happy-scroll color="rgba(0,0,0,0.5)" size="5">
                      <div>
                        <div
                          v-for="(item, index) in changLink"
                          :key="index"
                          class="text item"
                        >
                          <el-row>
                            <el-col :span="11">
                              <div class="grid-content bg-purple">
                                <el-row>
                                  <el-col :span="2">
                                    <div class="grid-content bg-purple">
                                      <img
                                        :src="img"
                                        alt
                                        style="width: 100%; height: 100%"
                                      />
                                    </div>
                                  </el-col>
                                  <el-col :span="21">
                                    <div
                                      class="grid-content bg-purple-light"
                                      style="padding-left: 10px"
                                    >
                                      {{ item.name }}
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </el-col>
                            <el-col :span="11">
                              <div class="grid-content bg-purple-light">
                                {{ item.mobile == "" ? "暂无" : item.mobile }}
                              </div>
                            </el-col>
                            <el-col :span="2">
                              <div class="grid-content bg-purple-light">
                                <i
                                  class="el-icon-close"
                                  @click="deletetab(item, index)"
                                ></i>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </happy-scroll>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button 
        style="background: #7C7CFF;border:none;color:#fff"
          @click="tabname(changLink)"
          :disabled="dialogVisibleope"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEnterpriseId } from "@/utils/auth"; //企业id
import jiahao from "@/icons/svg/blue.png";
import {
  PrimaryDepartment, //通讯录一级部门
  SubordinateDepartments, //下级部门
  DepartmentStaff, //部门下的员工
  userName, //搜索
} from "@/api/mail-list";
import store from "@/store";

import { mapGetters } from "vuex";
import { setyuan } from "@/utils/auth";
import oneChecked_url from "@/icons/svg/people.png";
import oneChecked_urls from "@/icons/svg/people3.png";
export default {
  props: ["routequery", "Templatedetails"],
  data() {
    return {
      dialogVisible: false,
      isfalse: 1,
      jiahao:jiahao,
      img: oneChecked_url,
      imglist: oneChecked_urls,
      name: [
        {
          name: "普通参会人",
          key: "",
          back: "yellow",
        },
        {
          name: "VoLTE 参会人",
          key: "",
          back: "#ccc",
        },
      ],
      //搜索的名称
      seaname: "",
      //已添加多少参会人
      numdialog: 1,
      signList: [],
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      chekeys_canyuPerson_search_huichang: [],
      changLink: [],
      ruanname: 0,
      yingname: 0,
      changname: [],
      sealistname: [],
      isname: false,
      listLoading: true,
      isfalseken: false,
      dialogVisibleope: false,
      moilom: JSON.parse(getEnterpriseId()).userName,
    };
  },
  created() {},
  watch: {
    // seaname: function (a) {
    //   console.log(a);
    //   if (a != "") {
    //     this.isname = false;
    //   } else {
    //     this.isname = true;
    //   }
    // },
    Templatedetails: function (a) {
      console.log(a);
      this.changname = [];
      if (a.meeting_memberlist != undefined) {
        //显示通讯录数据   云视讯返回的参会人员
        a.meeting_memberlist.forEach((res, index) => {
          console.log(res);
          if (res.mobile != this.moilom) {
            if (index != 0) {
              this.changname.push({
                mobile: res.device_id,
                name: res.device_name,
                business: res.device_authority,
              });
            }
          }
        });
      } else {
        //选择模板返回的
        if (a.periodMeeting != undefined) {
          a.periodMeeting.meetingAttendee.forEach((res, index) => {
            console.log(res);
            if (res.mobile != this.moilom) {
              this.changname.push({
                mobile: res.mobile,
                name: res.name,
                business: res.business,
              });
            }
          });
        } else {
          //周期会议
          if (a.attendeeCOList != null) {
            a.attendeeCOList.forEach((res) => {
              console.log(res);
              if (res.mobile != this.moilom) {
                this.changname.push({
                  mobile: res.mobile,
                  name: res.name,
                  business: res.business,
                });
              }
            });
          } else {
          }
        }
      }
    },
    ruanname: function (a) {
      console.log(a);
      if (a > 500) {
        this.dialogVisibleope = true;
        this.$message.error("软终端最多选择500人");
      }
    },
    yingname: function (a) {
      console.log(a);
      if (a > 800) {
        this.dialogVisibleope = true;
        this.$message.error("硬终端最多选择800人");
      }
    },
  },
  methods: {
    empty() {
      this.changLink = [];
      this.yingname = 0;
      this.ruanname = 0;
      this.dialogVisibleope = false;
    },
    //删除参会人
    deletetab(data, index) {
      this.changLink.splice(index, 1);
      if (data.business == "6") {
        this.ruanname -= 1;
      } else {
        this.yingname -= 1;
      }
    },
    //删除已选择的参会人
    deletename(data, index) {
      this.changname.splice(index, 1);
    },
    //搜索
    userSeach() {
      let getEnterprise = getEnterpriseId();
      let enterpriseId = JSON.parse(getEnterprise).enterpriseId; //企业id
      this.listLoading = true;
      if (this.seaname.length != 0) {
        userName({
          enterpriseId: enterpriseId,
          key: this.seaname.split(" ").join(""), //搜索条件
          //userType: "0", //通讯录类型,0：所有
          //1：账号中心通讯录
          mode: "1", //	匹配模式，默认为1。
          // //1：模糊匹配。支持手机号，固话号码，分机号码，姓名，简拼字段的匹配
          // //2：精确匹配。支持手机号，固话号码，分机号码字段的匹配
          start: "0",
          limit: "500",
        }).then((res) => {
          console.log(res);
          this.isname = false;
          if ("data" in res) {
            this.sealistname = res.data;
          } else {
            this.sealistname = [];
          }
          this.listLoading = false;
        });
      } else {
        this.isname = true;
      }
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([
          {
            name: "企业通讯录",
            id: "1-1",
            children: [],
            isLeaf: "leaf",
          },
        ]);
      }
      console.log(node);
      this.getUser_canyuPerson_huichang(node.level, node, resolve);
    },
    getUser_canyuPerson_huichang(level, node, resolve) {
      let getEnterprise = getEnterpriseId();
      console.log(level, node, resolve);
      console.log(getEnterprise);
      let enterpriseId = JSON.parse(getEnterprise).enterpriseId; //企业id
      if (isNaN(node.data.id)) {
        PrimaryDepartment(enterpriseId, {
          enterpriseId: enterpriseId,
        })
          .then((res) => {
            console.log("企业通讯录", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("企业通讯录", err);
          });
      } else {
        console.log(node);

        SubordinateDepartments(enterpriseId, {
          enterpriseId: enterpriseId,
          pdepartmentId: node.data.id,
        })
          .then((subRes) => {
            console.log(subRes);
            if (subRes.data.length != 0) {
              resolve(subRes.data);
            } else {
              DepartmentStaff({
                enterpriseId: enterpriseId,
                pdepartmentId: node.data.id,
                start: 0,
                limit: 500,
              })
                .then((res) => {
                  console.log("选择参会人-部门通讯录详情", res);
                  if (res.data) {
                    let enter = res.data;
                    enter.forEach((element) => {
                      element.leaf = true;
                    });
                    resolve(enter);
                  } else {
                    resolve([]);
                  }
                })
                .catch((err) => {
                  console.log("选择参会人-部门通讯录详情", err);
                });
              //resolve([]);
            }
          })
          .catch((subErr) => {
            console.log("企业通讯录-下级", subErr);
          });
      }
    },
    //点击显示通讯录
    maillist() {
      this.dialogVisible = true;
      this.changLink = [];
      this.isname = false;
      this.seaname = "";
      this.ruanname = 0;
      this.yingname = 0;
      setTimeout(() => {
        this.isname = true;
      }, 40);
    },
    append(data) {
      let getEnterprise = getEnterpriseId();
      let enterpriseId = JSON.parse(getEnterprise).enterpriseId; //企业id
      DepartmentStaff({
        enterpriseId: enterpriseId,
        pdepartmentId: data.id,
        start: 0,
        limit: 500,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          let enter = res.data;
          enter.forEach((element) => {
            var when = true;
            this.changLink.forEach((item) => {
              if (item.id == element.id) {
                when = false;
              }
            });
            if (when) {
              console.log(element.business);
              if (element.business == "6") {
                this.ruanname += 1;
              } else {
                this.yingname += 1;
              }
              this.changLink.push(element);
            }
          });
        }
        this.isfalseken = true;
      });
      this.isfalseken = false;
      // SubordinateDepartments(enterpriseId, {
      //   enterpriseId: enterpriseId,
      //   departmentId: data.id,
      // })
      //   .then((subRes) => {
      //     console.log(subRes)
      //     if (subRes.total!= 0) {
      //      resolve(subRes.data);
      //     } else {
      //       DepartmentStaff(enterpriseId, Yuan, {
      //         enterpriseId: enterpriseId,
      //         departmentId: data.id,
      //       })
      //         .then((res) => {
      //           console.log("选择参会人-部门通讯录详情", res);
      //           if (res.data) {
      //             let enter =res.data;
      //             enter.forEach((element) => {
      //               var when = true;
      //               this.changLink.forEach((item) => {
      //                 if (item.id == element.id) {
      //                   when = false;
      //                 }
      //               });
      //               if (when) {
      //                 console.log(element);
      //                 this.changLink.push(element);
      //               }
      //             });

      //             //resolve(enter);
      //           } else {
      //             //resolve([]);
      //           }
      //         })
      //         .catch((err) => {
      //           console.log("选择参会人-部门通讯录详情", err);
      //         });
      //       //resolve([]);
      //     }
      //   })
      //   .catch((subErr) => {
      //     console.log("企业通讯录-下级", subErr);
      //   });
    },
    //点击通讯录人员
    Changline(data, node) {
      console.log(data, node);
      if (data.sex != undefined) {
        var when = true;
        this.changLink.forEach((item) => {
          if (item.id == data.id) {
            this.$message.error("已选择参会人");
            when = false;
          }
        });
        if (when) {
          console.log(data);
          if (data.business == "6") {
            this.ruanname += 1;
          } else {
            this.yingname += 1;
          }
          this.changLink.push(data);
        }
        this.isfalseken = true;
      }
    },
    //搜索添加人员
    sealineken(data) {
      if (data.sex != undefined) {
        var when = true;
        this.changLink.forEach((item) => {
          if (item.id == data.id) {
            this.$message.error("已选择参会人");
            when = false;
          }
        });
        if (when) {
          console.log(data);
          if (data.business == "6") {
            this.ruanname += 1;
          } else {
            this.yingname += 1;
          }
          this.changLink.push(data);
        }
        this.isfalseken = true;
      }
    },
    tabname(data) {
      this.dialogVisible = false;
      console.log(data);
      //通讯录选择的人员
      data.forEach((element) => {
        console.log(element.mobile, 6666666666, this.moilom);
        var when = true;
        //已经选择的人员
        this.changname.forEach((item) => {
          console.log(item, 777777777);
          if (element.mobile == item.mobile) {
            when = false;
          }
        });
        //默认写死的主持人也需要判断
        if (element.mobile == this.moilom) {
          when = false;
        }
        if (when) {
          console.log(element);
          this.changname.push(element);
        }
      });
    },
  },
};
</script>
<style>
.el-link.el-link--primary {
  color: #4848ef;
}
.el-link.el-link--primary:hover {
  color: #4848ef;
}
.el-button--text {
  color: #4848ef;
}
.el-button--text：hover {
  color: #4848ef;
}
</style>
<style scoped>
.text {
  font-size: 14px;
}

/* /deep/.el-card__header {
  padding: 11px 20px 8px 20px;
} */
.app-eneme {
  height: 260px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
}

.unfix-th {
  width: 100%;
  height: 30px;
}

.title {
  height: 50px;
  text-align: center;
  border: 1px solid #ccc;
}

.chioceTelListBox {
  height: 360px;
}

.title span {
  height: 48px;
  display: inline-block;
  line-height: 48px;
  /* 设置行和当前元素的高度相等,就可以让文本内容上下居中 */
  text-align: center;
}

/* /deep/.happy-scroll-content {
  width: 90% !important;
} */
.active {
  background: #409eff;
  color: #fff;
}

.list {
  color: #000;
}

.app-wolisuye {
  /* height: 260px; */
}

.listname {
  width: 100%;
  height: 32px;
  line-height: 32px;
}

.zanwu {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
