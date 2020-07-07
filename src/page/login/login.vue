<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-07 14:14:08
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-07 16:24:50
--> 
<template>
  <div class="login-contain" v-if="type==1">
    <h2 class="lg-header">用户登录</h2>
    <div class="lg-main">
      <div class="u-f u-f-ajc lg-input">
        <el-input placeholder="请输入用户名/手机号码" v-model="username" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </div>
      <div class="u-f u-f-ajc lg-input">
        <el-input placeholder="请输入密码" v-model="pwd" type="password" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="lgcbx u-f u-f-sbc">
        <div class="u-f u-f-ac">
          <el-checkbox v-model="checked"></el-checkbox>
          <span style="font-size:12px;color:#666;margin-left:10px;">下次自动登录</span>
        </div>
        <p style="font-size:12px;color:#666;margin-left:10px;cursor: pointer;">忘记密码？</p>
      </div>
      <el-button type="danger" size="medium">登录</el-button>
      <div
        class="u-f u-f-ajc"
        style="text-align: center;margin-bottom: 15px;font-size: 13px;cursor: pointer;"
      >
        <span style="color: darkgray;">还没账号？</span>
        <span style="color: orangered;" @click="goReg(2)">立即注册</span>
      </div>

      <div class="other-lg u-f u-f-asc">
        <p style="font-size:14px;color:#666;">第三方登录</p>
        <div class="u-f u-f-ac">
          <img src="@/assets/icon-imgs/weixin.png" alt class="icon-img" />
          <img src="@/assets/icon-imgs/qq.png" alt class="icon-img" />
          <img src="@/assets/icon-imgs/xinlang.png" alt class="icon-img" />
        </div>
      </div>
    </div>
  </div>
  <div class="login-contain" v-else>
    <h2 class="lg-header">用户注册</h2>
    <div class="lg-main">
      <div class="u-f u-f-ajc lg-input">
        <el-input placeholder="请输入用户名/手机号码" v-model="username" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </div>
      <div class="u-f u-f-ajc lg-input">
        <el-input placeholder="请输入密码" v-model="pwd" type="password" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="u-f u-f-ajc lg-input">
        <el-input placeholder="请输入确认密码" v-model="confirmpwd" type="password" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <el-button type="danger" size="medium">注册</el-button>
      <div
        class="u-f u-f-ajc"
        style="text-align: center;margin-bottom: 15px;font-size: 13px;cursor: pointer;"
      >
        <span style="color: darkgray;">已有账号？</span>
        <span style="color: orangered;" @click="goReg(1)">去登陆</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pwd: "",
      confirmpwd: "",
      checked: false,
      type: 1
    };
  },
  methods: {
    goReg(type) {
      this.type = type;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-input__icon {
  font-size: 20px;
  border-right: 1px solid #ccc;
  width: 30px;
}

.el-input {
  width: 84%;
}

>>> .el-input__inner {
  padding-left: 44px;
//   &:focus {
//     box-shadow: 0px 2px 10px 0px rgba(26, 47, 99, 0.2);
//   }
}

>>> .el-input__inner:focus {
    border-color: rgba(0,0,0,0);
    outline: 0;
    box-shadow: 0px 2px 15px 0px rgba(255, 69, 0, 0.25);
}

>>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff4500;
  border-color: #ff4500;
}

>>> .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #ff4500;
}

.el-button--danger {
  color: #FFF;
  background-color: #ff4500;
  border-color: #ff4500;
  width: 84%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-contain {
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  box-shadow: -10px 20px 100px #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;

  .lg-header {
    width: 100%;
    height: 64px;
    background-color: orangered;
    border-radius: 5px 5px 0 0;
    line-height: 64px;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    cursor: move;
    font-size: 20px;
    font-weight: bold;
  }

  .lg-main {
    margin-top: 30px;

    .lg-input {
      margin-top: 20px;
    }

    .lgcbx {
      width: 84%;
      margin: 20px auto;
    }

    .other-lg {
      margin-top: 20px;

      .icon-img {
        width: 28px;
        height: 28px;
        margin: 0 14px;
        cursor: pointer;
      }
    }
  }
}
</style>