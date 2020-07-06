<!-- 最左边的选择框 -->
<template>
  <div class="mycard">
    <header @click.right.prevent="showOnline">
      <!-- <img :src="user.img" class="avatar" /> -->
      <!-- 更换头像 -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img :src="user.img" class="avatar" />
      </el-upload>
    </header>
    <div class="navbar" @click="clearSearch">
      <router-link to="/chat" class="icon iconfont icon-msg"></router-link>
      <router-link to="/friend" class="icon iconfont icon-friend"></router-link>
      <router-link to="/my" class="icon iconfont icon-collection"></router-link>
      <router-link to="/myfile" class="icon1 icons">
        <!-- <img src="@/assets/icon-imgs/file-icon.png" alt class="icons" /> -->
      </router-link>
    </div>
    <footer>
      <img src="@/assets/icon-imgs/xcx-icon.png" class="icons2" />
      <div class="red-box">
        <span class="dot-red"></span>
        <i class="icon iconfont icon-more" style="margin-top:0;"></i>
      </div>
    </footer>
    <!-- 在线状态显示列表 -->
    <div class="onlie-card" v-show="ishow">
      <el-card class="box-card">
        <div
          v-for="item in onlineStatusList"
          :key="item.id"
          class="text-item"
          @click="changeOnlineStatus(item)"
        >
          <span :class="item.id ===1 ? 'onlines' : item.id ===2 ? 'leaves' : item.id ===3 ? 'busys' : 'appears'" class="dot"></span>
          <span>{{ item.name }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imageUrl: "",
      ishow: false,
    };
  },
  computed: {
    ...mapState(["user", "onlineStatusList"]),
  },
  methods: {
    // 选择离线还是在线
    changeOnlineStatus(item) {
      console.log(item);
    },

    // 显示在线状态
    showOnline() {
      this.ishow = !this.ishow;
    },

    clearSearch() {
      this.$store.dispatch("search", "");
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log("新头像：", this.imageUrl);
      this.$store.commit("changeFace", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const typeArr = ["image/png", "image/jpeg", "image/jpg"];
      const isJPG = typeArr.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG|PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="stylus" scoped>
.mycard {
  position: relative;
  width: 100%;
  height: 100%;

  .avatar {
    width: 36px;
    height: 36px;
    margin: 20px 12px 0 12px;
    border-radius: 2px;
  }

  .navbar {
    width: 100%;
    text-align: center;
  }

  .icons {
    background-image: url('../../assets/icon-imgs/file-icon.png');
    width: 26px;
    height: 26px;
    margin-top: 22px;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &.active {
      width: 26px;
      height: 26px;
      background-image: url('../../assets/icon-imgs/active-file.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .icon1 {
    display: inline-block;
    opacity: 0.8;
    cursor: pointer;
  }

  .icon {
    display: inline-block;
    font-size: 26px;
    margin-top: 28px;
    padding: 0 16px;
    box-sizing: border-box;
    color: rgb(173, 174, 175);
    opacity: 0.8;
    cursor: pointer;

    &.active {
      color: rgb(0, 220, 65);
    }

    &:hover {
      opacity: 1;
    }
  }

  .icon-msg, .icon-more {
    font-size: 22px;
  }

  .icon-msg {
    padding: 0 19px;
  }
}

footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;

  .red-box {
    position: relative;
    margin-top: 20px;

    .dot-red {
      position: absolute;
      right: 15px;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #FA5151;
    }
  }

  .icons2 {
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
}

.onlie-card {
  position: absolute;
  left: 52px;
  top: 20px;
  z-index: 9;
  width: 100px;
  height: 170px;

  >>> .box-card {
    padding-left: 12px;
    background: rgba(255, 255, 255, 0.9);
  }

  >>> .el-card__body {
    padding: 0;
  }

  .text-item {
    font-size: 13px;
    margin: 16px 0;
    .dot{
       display:inline-block;
      height: 10px;
      width: 10px;
      border-radius: 100%;
      margin-right 10px;
    }
    .onlines {
      background-color: #45C00C;
    }

    .leaves {
       background-color: #FFBA00;
    }

    .busys {
      background-color #F54F63
    }

    .appears {
      background-color #D9D9D9
    }
  }
}
</style>
