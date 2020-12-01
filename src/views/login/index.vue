<template>
  <div class="login-container">
    <el-row :gutter="20" style="width: 100%; height: 100%">
      <el-col :span="18" :offset="3" class="login-center">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="login-image"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form
                  ref="loginForm"
                  :model="loginForm"
                  :rules="loginRules"
                  class="login-form"
                  autocomplete="on"
                >
                  <div class="title-container">
                    <div class="login-imagelogn">
                      <img :src="bagimglogn" alt="" />
                    </div>
                  </div>

                  <el-form-item prop="username">
                    <span class="svg-container">
                      <!-- <svg-icon icon-class="user" /> -->
                      <img
                        src="../../icons/svg/login_icon_account.png"
                        alt=""
                      />
                    </span>
                    <el-input
                      ref="username"
                      autocomplete="on"
                      v-model="loginForm.username"
                      placeholder="请输入账号"
                      name="username"
                      type="text"
                      tabindex="1"
                    />
                  </el-form-item>

                  <el-tooltip
                    v-model="capsTooltip"
                    content="Caps lock is On"
                    placement="right"
                    manual
                  >
                    <el-form-item prop="password">
                      <span class="svg-container">
                        <!-- <svg-icon icon-class="password" /> -->
                        <img
                          src="../../icons/svg/login_icon_password.png"
                          alt=""
                        />
                      </span>
                      <el-input
                        :key="passwordType"
                        ref="password"
                        autocomplete="on"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                      />
                      <span class="show-pwd" @click="showPwd">
                        <svg-icon
                          :icon-class="
                            passwordType === 'password' ? 'eye' : 'eye-open'
                          "
                        />
                      </span>
                    </el-form-item>
                  </el-tooltip>
                  <el-button
                    :loading="loading"
                    type="primary"
                    style="
                      width: 100%;
                      margin-top: 20px;
                      margin-bottom: 60px;
                      background: #7c7cff;
                      border: 1px solid #7c7cff;
                    "
                    @click.native.prevent="handleLogin"
                    >登录</el-button
                  >
                </el-form>
              </div>
              <el-row :gutter="20">
                <el-col :span="12" :offset="6">
                  <div
                    class="grid-content bg-purple"
                    style="
                      text-align: center;
                      font-size: 12px;
                      color: #8c8c8c;
                      margin-top: 30px;
                    "
                  >
                    申请账号请咨询10086-8
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername, yanzma, logpass } from "@/utils/validate";
import oneChecked_logn from "@/icons/svg/login_logo_right.png";
import login_icon_account from "@/icons/svg/login_icon_account.png";
import login_icon_password from "@/icons/svg/login_icon_password.png";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      login_icon_account: login_icon_account,
      login_icon_password: login_icon_password,
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      valiimg: "",
      bagimglogn: oneChecked_logn,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
    },
    imglist() {},
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          //登录前，先删一下token
          this.logout();
          //登录
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #fff;
$light_gray: #000;
$cursor: #000;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
//
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  //   .el-form-item--medium .el-form-item__content{
  //   background: #FFF;
  // }
}
</style>
<style>
.login-container .el-input input {
  height: 40px;
}
.login-container .el-input {
  height: 40px;
}
.login-container .el-form-item--medium .el-form-item__content {
  line-height: 36px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.login-container .svg-container {
  background-color: #f1f1f1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container .el-button--medium {
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
/* 判断是否是ie */
  @media screen and(-ms-high-contrast:active), (-ms-high-contrast: none) {
     .login-container .el-input input{
       line-height: 20px;
     }
    
  }
</style>
<style lang="scss" scoped>
$bg: #f1f2f7;
$dark_gray: #000;
$light_gray: #000;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../icons/svg/bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  overflow: hidden;
  align-items: center;

  .login-center {
    // width: 100%;
    width: 66.6% !important;
    margin-left: 16.7% !important;
    background: #fff;
    height: 55.6% !important;
    border-radius: 5px;
    // margin-top: 100px;

    .login-image {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 500px;
      // padding: 10px 35px 0;
      // margin: 0 auto;
      background-size: 100% 100%;
      background: url("../../icons/svg/login_left.jpg");
    }
  }

  .login-form {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;

    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    /* padding: 6px 5px 6px 15px; */
    color: #000;
    vertical-align: middle;
    width: 48px;
    text-align: center;
    /* line-height: 49px; */
    // display: inline-block;
  }

  .title-container {
    position: relative;
    height: 120px;
    line-height: 170px;
    top: 0px;
    text-align: center;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-imagelogn img {
      width: 280px;
      height: 56px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  // 判断是否是ie
  @media screen and(-ms-high-contrast:active), (-ms-high-contrast: none) {
     .login-center{
       margin-top: 90px;
     }
    
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
