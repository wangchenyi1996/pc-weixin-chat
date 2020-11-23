<template>
  <div class="my-set">
    <header class="set-title">设置</header>
    <!--主体 -->
    <div class="main-set">
      <div class="users u-f">
        <img src="@/static/images/q.png" alt="头像" />
        <div class="u-right u-f-c u-f-jsb">
          <div class="u-f u-f-ac">
            <span style="font-size:18px;color:#345;">李一桐</span>
            <img
              src="@/assets/icon-imgs/person-icon.png"
              alt="头像"
              style="height:16px;width:16px;margin-left:10px;"
            />
          </div>
          <p style="color:#898989;">手机：+86 1825188666</p>
        </div>
      </div>
      <div class="set-m1">
        <div class="u-f u-f-sbc ml">
          <span>清除缓存</span>
          <div class="u-f u-f-ac">
            <span>2.33M</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="u-f u-f-sbc ml">
          <span>清空所有聊天记录</span>
          <div class="u-f u-f-ac">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="u-f u-f-sbc ml">
          <span>修改密码</span>
          <div class="u-f u-f-ac">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="u-f u-f-sbc ml">
          <span>开启新消息通知</span>
          <div class="u-f u-f-ac">
            <el-switch v-model="openInform" active-color="#45c00c" inactive-color="#e6e6e6"></el-switch>
          </div>
        </div>
        <div class="u-f u-f-sbc ml">
          <span>关于我们</span>
          <div class="u-f u-f-ac">
            <span>当前版本 1.0.0</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="del-chat-btn">
        <el-button type="danger" @click="logoutDialog = true" style="width:100%;">退出当前账号</el-button>
      </div>
    </div>
    <!-- 退出设置 -->
    <div class="friend-dialog">
      <el-dialog title="提示" :visible.sync="logoutDialog" :before-close="handlelogoutDialog">
        <div class="chat-content">确定要退出当前账号吗？ 推出后无法接受在线新消息！</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="logoutDialog = false">取 消</el-button>
          <el-button type="danger" @click="logoutDialog = false" style="margin-left:25px;">退 出</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openInform: false,
      logoutDialog: false,
    };
  },
  methods: {
    handlelogoutDialog(done) {
      this.logoutDialog = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.friend-dialog >>> .el-dialog {
  width: 340px !important;
  margin-top: 30vh !important;
}

.friend-dialog >>> .el-dialog__title {
  color: #333;
  font-size: 16px;
}

.friend-dialog >>> .el-dialog__body {
  padding: 10px;
}
.dialog-footer{
  margin-top:30px;
}

.chat-content {
  color: 666;
  font-size: 15px;
  line-height: 2;
  padding:0 15px;
}

.my-set {
  height: 100%;
  width: 100%;
  background-image: url('../../static/images/bg/bg4.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .set-title {
    font-size: 18px;
    color: #456;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;

    &::after {
      display: block;
      content: ' ';
      height: 1px;
      width: 100%;
      margin-left: -30px;
      padding-right: 30px;
      background-color: rgba(233, 233, 233, 0.6);
      transform: scaleY(0.5);
    }
  }

  .main-set {
    width: 86%;
    margin: 20px auto;

    .users {
      img {
        height: 56px;
        line-height: 56px;
        border-radius: 4px;
      }

      .u-right {
        margin: 6px 10px;
      }
    }

    .set-m1 {
      margin-top: 40px;

      span {
        color: #567;
        margin-right: 6px;
      }

      .el-icon-arrow-right {
        color: #345;
      }

      .ml {
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eaeaea;
      }
    }

    .del-chat-btn {
      width: 100%;
      margin: 40px auto 0;
    }
  }
}
</style>