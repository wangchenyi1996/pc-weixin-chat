<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji">
      <div class="u-f u-f-ac" style="padding-top:10px;">
        <img
          src="@/assets/icon-imgs/emoij.png"
          class="icon-img"
          @click="showEmoji=!showEmoji"
          style="margin-left:0;"
        />
        <!-- 
          action = https://jsonplaceholder.typicode.com/posts/ 
          :on-success="handleAvatarSuccess"
        -->
        <el-upload
          name="file"
          style="width:20px;height:20px;"
          action
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="doUpload"
        >
          <img
            src="@/assets/icon-imgs/f-icon.png"
            class="icon-img"
            style="position:relative;top:-5px;left:-3px;"
          />
        </el-upload>

        <a title="截屏" class="icon-img" style="position:relative;top:-5px;">
          <img src="@/assets/icon-imgs/caputre.png" class="icon-img" @click="screenCapture" />
        </a>
        <img src="@/assets/icon-imgs/send-msg.png" class="icon-img" />
        <div style="margin-left:auto;" class="u-f u-f-ac">
          <a title="语音输入" class="icon-img" style="position:relative;top:-5px;right:3px;">
            <img
              src="@/assets/icon-imgs/voice-icon.png"
              class="icon-img"
              @click="showVoice = !showVoice"
            />
          </a>
          <a title="视频聊天" class="icon-img" style="position:relative;top:-5px;right:3px;">
            <img src="@/assets/icon-imgs/video-icon.png" class="icon-img" />
          </a>
        </div>
      </div>
      <transition name="showbox">
        <div class="emojiBox" v-show="showEmoji">
          <li v-for="(item, index) in emojis" :key="index">
            <img
              :src="require('@/static/emoji/'+item.file)"
              :data="item.code"
              @click="content +=item.code"
            />
          </li>
        </div>
      </transition>
    </div>
    <textarea ref="text" v-model="content" @keyup="onKeyup" @click="showEmoji=false"></textarea>
    <div class="send" @click="send">
      <span>发送(S)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>

    <div v-if="showVoice" class="showVoice" @click.stop="showVoice = false">
      <div class="voice-input-button-wrapper" @click="ev => ev.stopPropagation()">
        <voice-input-button
          appId="5d7f07d2"
          apiKey="37fa5446a26040d0ead4785876aea1f3"
          apiSecret="53f25dde0a16de39430a23426898ce89"
          v-model="result"
          @record="showResult"
          @record-start="recordStart"
          @record-stop="recordStop"
          @record-blank="recordNoResult"
          @record-failed="recordFailed"
          @record-ready="recordReady"
          @record-complete="recordComplete"
          interactiveMode="touch"
          color="#fff"
          tipPosition="top"
        >
          <template slot="no-speak">没听清您说的什么</template>
        </voice-input-button>
      </div>
    </div>
  </div>
</template>

<script>
import { robotChat } from "../../utils/network/user";
import { mapGetters, mapState } from "vuex";
import { douploadFiles } from "@/utils/network/user.js";
import Config from "@/utils/config";
import voiceInputButton from "voice-input-button2";

export default {
  data() {
    return {
      content: "",
      reply: "未找到",
      frequency: 0,
      warn: false,
      showEmoji: false,
      file: null,
      fileType: 1,
      fileUrl: "",
      showVoice: false,
      result: "",
    };
  },
  components: {
    voiceInputButton,
  },
  computed: {
    ...mapState(["selectId", "emojis", "user"]),
    ...mapGetters(["selectedChat", "selectedChat"]),
  },
  methods: {
    /********************* 语音输入 **************************/
    recordReady() {
      console.log("按钮就绪!");
    },
    recordStart() {
      console.log("录音开始");
    },
    showResult(text) {
      console.log("收到识别结果：", text);
    },
    recordStop() {
      console.log("录音结束");
    },
    recordNoResult() {
      console.log("没有录到什么，请重试");
    },
    recordComplete(text) {
      console.log("识别完成! 最终结果：", text);
      let msg = {
        content: text,
        fileType: 5,
      };
      this.$store.dispatch("sendMessage", msg);
      this.$message({
        message: "发送成功",
        type: "success",
        duration: 500,
      });
      // this.voicePrompt(text);
      this.showVoice = false
    },
    recordFailed(error) {
      console.log("识别失败，错误栈：", error);
    },
    //语音提醒
    voicePrompt(text) {
      new Audio(
        "http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" +
          text
      ).play();
    },
    /********************* 语音输入 **************************/
    // 截屏
    screenCapture() {
      this.$emit("screenCapture");
    },
    /*********************发送文件 **************************/
    handleAvatarSuccess(res, files) {
      this.file = URL.createObjectURL(files.raw);
      let msg = {
        content: this.file,
        fileType: this.fileType,
      };
      this.$store.dispatch("sendMessage", msg);
    },
    beforeAvatarUpload(file) {
      const type1 = ["image/png", "image/jpeg", "image/jpg","image/gif"];
      const type2 = ["application/msword", "application/pdf", "text/plain"];
      const type3 = ["video/mp4", "video/mp3"];
      if (type1.includes(file.type)) {
        this.fileType = 2;
      }
      if (type3.includes(file.type)) {
        this.fileType = 3;
      }
      if (type2.includes(file.type)) {
        this.fileType = 4;
      }
      const max10m = file.size / 1024 / 1024 < 10;
      if (!max10m) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return max10m;
    },
    // 上传文件
    async doUpload(file) {
      // 文件对象
      let form = new FormData();
      form.append("file", file.file);
      let result = await douploadFiles(form);
      if (result.code === 200) {
        this.fileUrl = Config.domain + result.path;
        // console.log("文件路径：", this.fileUrl);
        let msg = {
          content: this.fileUrl,
          fileType: this.fileType,
        };
        this.$store.dispatch("sendMessage", msg);
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 500,
        });
      } else {
        this.$message({
          message: "上传失败~~",
          type: "error",
          duration: 500,
        });
      }
    },
    /*********************发送文件 **************************/
    // 按回车发送信息
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send();
      }
    },
    // 点击发送按钮发送信息
    async send() {
      this.showEmoji = false;
      if (this.content.length <= 1) {
        this.warn = true;
        this.content = "";
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      } else {
        if (this.selectedChat.user.name === "机器人") {
          let datas = {
            content: this.content,
          };
          let results = await robotChat(datas);
          // console.log(results);
          if (results.result === 0) {
            this.$message({
              message: "机器人回复成功",
              type: "success",
              duration: 500,
            });
            this.reply = results.content;
            if (this.content.includes("/:")) {
              this.reply = "嘻嘻";
            }
            var msg = {
              content: this.content,
              reply: this.reply,
              fileType: 1,
            };
            this.$store.dispatch("sendMessage", msg);
            this.content = "";
          } else {
            this.$message({
              message: "机器人出错了",
              type: "error",
              duration: 800,
            });
          }
        } else {
          // 这边还需要判断是否是去群聊
          if (this.selectedChat && this.selectedChat.groupChat) {
            // console.log("群聊");
            let obj = {
              user: {
                name: this.user.name,
                img: this.user.img || require("@/static/images/father.jpg"),
              },
              content: this.content,
              date: new Date(),
              self: true,
              fileType: 1,
            };
            this.$store.commit("sendGroupMessage", obj);
            this.content = "";
          } else {
            let msg = {
              content: this.content,
              fileType: 1,
            };
            this.$store.dispatch("sendMessage", msg);
            this.content = "";
          }
        }
      }
    },
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus();
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectId() {
      setTimeout(() => {
        this.$refs.text.focus();
      }, 0);
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === "") {
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++;
          setTimeout(() => {
            this.warn = false;
          }, 1000);
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
>>> .el-upload {
  width: 20px;
  height: 20px;
}

.text {
  position: relative;
  height: 150px;
  background: rgba(255, 255, 255, 0.8);

  .emoji {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    padding: 0 12px;
    box-sizing: border-box;
    color: #7c7c7c;

    .icon-img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin: 0 5px;

      &:hover {
        color: #1aad19;
      }
    }

    .emojiBox {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      top: -210px;
      left: -100px;
      width: 300px;
      height: 200px;
      padding: 5px;
      background-color: #fff;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      box-shadow: 0 1px 2px 1px #d1d1d1;

      &.showbox-enter-active, &.showbox-leave-active {
        transition: all 0.5s;
      }

      &.showbox-enter, &.showbox-leave-active {
        opacity: 0;
      }
    }
  }

  textarea {
    box-sizing: border-box;
    padding: 0 30px;
    height: 110px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
    background-color: rgba(255, 255, 255, 0);
  }

  .send {
    position: absolute;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;
    cursor: pointer;

    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }

  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;

    &.appear-enter-active, &.appear-leave-active {
      transition: all 1s;
    }

    &.appear-enter, &.appear-leave-active {
      opacity: 0;
    }

    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}

.showVoice {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);

  .voice-input-button-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-color: #45c00c;
    border-radius: 50%;
  }

  .result {
    width: 100%;
    padding: 25px;
    border: #e2e2e2 1px solid;
    border-radius: 5px;
    line-height: 2;
    font-size: 16px;
    color: #727272;
    min-height: 24px;
    margin-bottom: 25px;
  }
}
</style>
