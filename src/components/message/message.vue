<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header u-f u-f-sbc">
      <div class="friendname">{{selectedChat.user.name}}</div>
      <img src="@/assets/icon-imgs/c-gb.png" style="margin-left:auto;" alt="Notice" @click="openNotice" />
      <img :src="isCloseInform ? require('@/assets/icon-imgs/inform.png') : require('@/assets/icon-imgs/no-tz.png')" alt="notice" @click="closeInform"/>
      <img src="@/assets/icon-imgs/c-more.png" alt="set" @click="openChatSet" />
    </header>
    <div class="message-wrapper" ref="list">
      <ul v-if="selectedChat">
        <!-- 群聊 -->
        <template v-if="selectedChat.groupChat">
          <li v-for="item in selectedChat.messages" class="message-item" :key="item.id">
            <div class="time">
              <span>{{item.date | time}}</span>
            </div>
            <div class="main" :class="{ self: item.self }">
              <img
                class="avatar"
                width="36"
                height="36"
                :src="item.user ? item.user.img : require('@/static/images/UserAvatar.jpg')"
              />
              <!-- <div class="content">
                <div class="text" v-html="replaceFace(item.content)"></div>
              </div> -->
              <!-- 1 - 文本内容     2 - 图片   3 - 视频   4 - 文件 pdf doc txt  5 - 语音  -->
              <div class="content" v-if="item.fileType===1" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <div class="text" v-html="replaceFace(item.content)"></div>
              </div>
              <div v-else-if="item.fileType===2" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <img class="imgs" :src="item.content" preview='0' preview-text="图片1"/>
              </div>
              <div v-else-if="item.fileType===3" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <video style="width:50%;margin:0 10px;border-radius:4px;" controls>
                  <source :src="item.content" type="video/mp4" />您的浏览器不支持Video标签。
                </video>
              </div>
              <div class="u-f u-f-ac u-f-end" v-else-if="item.fileType===4" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <span style="color:#456;">{{item.content | handleFileExtname}}</span>
                <img src="@/assets/icon-imgs/filec.png" style="width:44px;height:37px;margin-left:8px;"/>
              </div>
              <div class="content" @mousedown.prevent="mousedown" @click.right.prevent="rightClick" v-else-if="item.fileType===5">
                <div class="text u-f u-f-ac" @click="handleVoice(item.content)">
                  <img :src="isVoice ? require('@/assets/icon-imgs/icon-voice.png') : require('@/assets/icon-imgs/voice-play.png')" style="width:26px;height:26px;">
                </div>
              </div>
            </div>
          </li>
        </template>
        <!-- 单聊 -->
        <template v-else>
          <li v-for="item in selectedChat.messages" class="message-item" :key="item.id">
            <div class="time">
              <span>{{item.date | time}}</span>
            </div>
            <div class="main" :class="{ self: item.self }">
              <img
                class="avatar"
                width="36"
                height="36"
                :src="item.self ? user.img : selectedChat.user.img"
              />
              <!-- <div class="content">
                <div class="text" v-html="replaceFace(item.content)"></div>
              </div> -->
               <!-- 1 - 文本内容   2 - 图片   3 - 视频   4 - 文件 pdf doc txt   5 - 语音  -->
              <div class="content" v-if="item.fileType===1" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <div class="text" v-html="replaceFace(item.content)"></div>
              </div>
              <div v-else-if="item.fileType===2" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <img class="imgs" :src="item.content" preview='0' preview-text="图片1"/>
              </div>
              <div v-else-if="item.fileType===3" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <video style="width:50%;margin:0 10px;border-radius:4px;" controls>
                  <source :src="item.content" type="video/mp4" />您的浏览器不支持Video标签。
                </video>
              </div>
              <div class="u-f u-f-ac u-f-end" v-else-if="item.fileType===4" @mousedown.prevent="mousedown" @click.right.prevent="rightClick">
                <span style="color:#456;">{{item.content | handleFileExtname}}</span>
                <img src="@/assets/icon-imgs/filec.png" style="width:44px;height:37px;margin-left:8px;"/>
              </div>
              <div class="content" @mousedown.prevent="mousedown" @click.right.prevent="rightClick" v-else-if="item.fileType===5">
                <div class="text u-f u-f-ac" @click="handleVoice(item.content)">
                  <img :src="isVoice ? require('@/assets/icon-imgs/icon-voice.png') : require('@/assets/icon-imgs/voice-play.png')" style="width:26px;height:26px;">
                </div>
              </div>
            </div>
          </li>
        </template>
        <!-- 右击，设置消息 -->
        <div class="user-info" v-show="showList" @click="handleshowList">
          <el-card class="box-card" :style="{top: top+'px',left: left+'px' }">
            <div class="u-list u-f-c u-f-jsb">
              <p>发送给朋友</p>
              <p>复制</p>
              <p>转发</p>
              <el-divider></el-divider>
              <p>收藏</p>
              <p>另存为</p>
              <p>删除</p>
            </div>
          </el-card>
        </div>
      </ul>
    </div>

    <!-- 群聊设置弹框 -->
    <el-dialog
      :title="chatPerson"
      :visible.sync="chatDialog"
      width="30%"
      :before-close="handleChatClose"
    >
      <div class="person-list u-f u-f-wrap" v-if="personlist.length<=9">
        <div class="person-item u-f-c u-f-ajc" v-for="item in personlist" :key="item.id">
          <img :src="item.faceImg" alt="face" class="face" />
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="person-list u-f u-f-wrap" v-else>
        <div class="person-item u-f-c u-f-ajc" v-for="item in shortPersonList" :key="item.id">
          <img :src="item.faceImg" alt="face" class="face" />
          <span>{{item.name}}</span>
        </div>
        <template v-if="showList">
          <div class="person-item u-f-c u-f-ajc" v-for="item in longPersonList" :key="item.id">
            <img :src="item.faceImg" alt="face" class="face" />
            <span>{{item.name}}</span>
          </div>
        </template>
        <div class="person-item u-f-c u-f-ajc" @click="showList = !showList">
          <img :src="showList ? require('@/assets/icon-imgs/up.png') : require('@/assets/icon-imgs/down.png')" alt="more" style="width:32px;height:32px;margin-bottom:10px;"/>
          <span>{{ showList ? '收起好友' : '更多好友' }}</span>
        </div>
      </div>

      <div class="chat-content">
        <div class="chat-1">
          <div class="c-txt u-f u-f-sbc">
            <span>群聊名称</span>
            <span>Vue、uni-app技术学习交流群</span>
          </div>
          <div class="c-txt u-f u-f-sbc">
            <span>我在群聊的名称</span>
            <span>生命的尊严</span>
          </div>
        </div>
        <div class="chat-1">
          <div class="c-txt u-f u-f-sbc">
            <span>置顶聊天</span>
            <span>
              <el-switch v-model="isTop" active-color="#45c00c" inactive-color="#e6e6e6"></el-switch>
            </span>
          </div>
          <div class="c-txt u-f u-f-sbc">
            <span>显示群聊成员名称</span>
            <span>
              <el-switch v-model="isShowPersonName" active-color="#45c00c" inactive-color="#e6e6e6"></el-switch>
            </span>
          </div>
        </div>
        <div class="chat-1">
          <div class="c-txt u-f" style="border-bottom:none;">
            <span>设置聊天背景</span>
          </div>
        </div>
      </div>
     
      <div class="del-chat-btn">
        <el-button type="danger" @click="chatDialog = false" style="width:100%;">删除并退出该群聊</el-button>
      </div>
    </el-dialog>

    <!-- 好友设置 -->
    <div class="friend-dialog">
      <el-dialog
        title="好友设置"
        :visible.sync="friendDialog"
        :before-close="handlefriendClose"
      >
        <div class="chat-content">
          <div class="chat-1">
            <div class="c-txt u-f u-f-sbc" style="border-bottom:none;">
              <span>好友昵称</span>
              <span>周星驰9527</span>
            </div>
            <div class="c-txt u-f u-f-sbc" style="border-bottom:none;">
              <span>置顶聊天</span>
              <span>
                <el-switch v-model="isTop" active-color="#45c00c" inactive-color="#e6e6e6"></el-switch>
              </span>
            </div>
            <div class="c-txt u-f u-f-sbc">
              <span>消息免打扰</span>
              <span>
                <el-switch v-model="isShowPersonName" active-color="#45c00c" inactive-color="#e6e6e6"></el-switch>
              </span>
            </div>
             <div class="c-txt u-f" style="border-bottom:none;">
              <span>设置聊天背景</span>
            </div>
          </div>
        </div>
      
        <div class="del-chat-btn">
          <el-button type="danger" @click="friendDialog = false" style="width:100%;">删除好友</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 群聊公告弹框 -->
    <div class="nt-dialog">
      <el-dialog
      title="群公告"
      :visible.sync="noticeDialog"
      :before-close="handleNoticeClose"
    >
     <div style="line-height:1.8;color:#666;font-size:14px;">
      在该群，大家可以互相交流，互帮互助，共同发展，共同进步，为确保群良性发展，特制定此群规：</br>
      1、群内禁止私自拉朋友入群，加群请@群主</br>
      2、群内禁止发送任何广告（软广告、硬广告）</br>
      3、群内禁止讨论一切政治敏感话题，群内禁止发布任何未经证实的消息，群内禁止散播谣言 </br>
      4、严禁对外透露群友个人信息，明确说明不可分享聊天记录，违者后果自行承担</br>
     </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import chatPersonList from "@/assets/data/chatPersonList";
export default {
  data() {
    return {
      chatDialog: false,
      noticeDialog: false,
      friendDialog: false,
      person: 100,
      personlist: chatPersonList.personList,
      shortPersonList:[],
      longPersonList:[],
      isShowPersonName: false,
      isTop: false,
      isCloseInform: true,
      showList:false,
      showList: false,
      left:0,
      top:0,
      isVoice:false
    };
  },
  computed: {
    ...mapGetters(["selectedChat", "messages"]),
    ...mapState(["user", "emojis"]),
    chatPerson() {
      return `群聊成员共${this.person}人`;
    },
  },
  created() {
    if(chatPersonList.personList.length>9){
      this.shortPersonList = chatPersonList.personList.slice(0,9)
      this.longPersonList = chatPersonList.personList.slice(9)
      // console.log(this.shortPersonList,this.longPersonList)
    }
  },
  mounted() {
    //  在页面加载时让信息滚动到最下面
    // setTimeout(
    //   () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
    //   0
    // );
    // 这种方式也ok
    this.chatBackToBottom();
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages() {
      setTimeout(
        () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
        0
      );
      // 这种方式也ok
      // this.chatBackToBottom();
    },
  },
  methods: {
    // 点击播放
    handleVoice(txt){
      this.isVoice = true
      this.voicePrompt(txt)
    },
     //语音提醒
    voicePrompt(text) {
      new Audio(
        "http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" +
          text
      ).play();
     
    },
    // 关闭蒙版
    handleshowList() {
      this.showList = false;
    },
    // 右击
    rightClick(){
      this.showList = true;
    },
    // 消息设置
    mousedown(e) {
      let clientY = e.clientY;
      let clientX = e.clientX;
      // console.log('Y坐标距离',clientY)
      // console.log('X坐标距离',clientX)
      // 这里的400 是一个范围值
      if (clientY >= 400) {
        this.top = 400;
      }else{
        this.top = clientY;
      }
      let w = (window.innerWidth-860)/2
      if(clientX >= (w+860-120)){
        this.left = (w+860-130);
      }else{
        this.left = clientX;
      }
    },

    // 聊天回到底部
    chatBackToBottom() {
      this.$nextTick(() => {
        let tops = this.$refs.list;
        tops.scrollTop = tops.scrollHeight - tops.clientHeight;
        // console.log("高度", tops.scrollHeight);
      });
    },

    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace(con) {
      if (con.includes("/:")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            "<img src=" + require("@/static/emoji/" + emojis[i].file) + " />"
          );
        }
        return con;
      }
      return con;
    },
    // 打开设置
    openChatSet() {
      // 需要判断是 好友 还是群聊
      if (this.selectedChat.groupChat) {
        this.chatDialog = true;
        console.log("群聊");
      } else {
        this.friendDialog = true;
        console.log("好友");
      }
    },
    handleChatClose(done) {
      this.chatDialog = false;
    },
    handleNoticeClose(done) {
      this.noticeDialog = false;
    },
    handlefriendClose(done) {
      this.friendDialog = false;
    },
    openNotice(){
      this.noticeDialog = true
    },
    // 关闭通知
    closeInform(){
      if(this.isCloseInform){
        // console.log('关闭')
        this.$message({
          message: "关闭通知成功",
          type: "error",
          duration: 800,
        });
        this.isCloseInform = false
      }else{
        // console.log('打开')
        this.$message({
          message: "关闭通知成功",
          type: "success",
          duration: 800,
        });
        this.isCloseInform = true
      }
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    },
    // 处理文件后缀加文件名
    handleFileExtname(file){
      let tmp = file.replace(/\\/g,"/")
      let res = tmp.split('/')
      return res[res.length-1].replace(/\d+/,'')
    }
  }
};
</script>

<style lang="stylus" scoped>
>>> .el-dialog {
  width: 500px !important;
}
>>> .el-dialog__body{
  padding: 10px 20px 20px;
}
>>> .el-dialog__header {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding 15px 20px 0 20px;
}
>>> .el-dialog__title {
  color: #666;
  font-size: 16px;
}
.nt-dialog >>> .el-dialog{
  width: 440px !important;
  margin-top:30vh !important;
}
.nt-dialog >>> .el-dialog__title {
  color: #333;
  font-size: 16px;
}
.nt-dialog >>> .el-dialog__header{
  text-align: left;
}
.friend-dialog >>> .el-dialog{
  width: 500px !important;
  margin-top:30vh !important;
}
.friend-dialog >>> .el-dialog__title {
  color: #333;
  font-size: 16px;
}
.imgs{
  max-width:32%;
  border-radius:4px;
}
// 消息设置
.user-info {
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  .box-card {
    position: absolute;
    left: 60px;
    width: 120px;
    height: 184px;
    background: rgba(255, 255, 255, 0.9);
    padding-bottom: 10px;
    z-index: 6;
    >>> .el-card__header {
      padding: 10px;
    }
    >>> .el-card__body {
      padding: 10px;
    }
    >>> .el-divider--horizontal {
      margin: 4px 0;
    }
    .u-list {
      padding-left: 10px;
      cursor: pointer;
      p {
        font-size: 14px;
        margin: 7px 0;
      }
    }
  }
}

.del-chat-btn{
  width: 90%;
  margin: 20px auto 0;
}
.person-list {
  // margin-top:10px;
  .person-item {
    width: 20%;
    margin: 12px 0;

    .face {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      margin-bottom: 10px;
    }

    span {
      font-size: 12px;
      color: #777;
    }
  }
}

.chat-content {
  width: 90%;
  background-color: #fff;
  margin: 15px auto;

  .chat-1 {
    background-color: #f9f9f9;
    margin-bottom: 10px;

    .c-txt {
      &:nth-child(1) {
        border-bottom: 1px solid #efefef;
      }

      padding: 15px;

      span {
        font-size: 13px;

        &:nth-of-type(1) {
          color: #000;
        }

        &:nth-of-type(2) {
          color: #777;
        }
      }
    }
  }
}

.message {
  width: 100%;
  height: 450px;

  .header {
    height: 60px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;

    .friendname {
      font-size: 18px;
      color: #f5f5f5;
    }

    img {
      width: 24px;
      height: 24px;
      margin: 0 6px;
      cursor: pointer;
    }
  }

  .message-wrapper {
    min-height: 390px;
    max-height: 390px;
    padding: 10px 15px;
    box-sizing: border-box;
    overflow-y: auto;
    border-bottom: 1px solid #e7e7e7;

    .message {
      margin-bottom: 15px;
    }

    .time {
      width: 100%;
      font-size: 12px;
      margin: 7px auto;
      text-align: center;

      span {
        display: inline-block;
        padding: 4px 6px;
        color: #fff;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
    }

    .main {
      .avatar {
        float: left;
        margin-left: 15px;
        border-radius: 3px;
      }

      .content {
        display: inline-block;
        margin-left: 10px;
        position: relative;
        padding: 6px 10px;
        max-width: 330px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;

        &:before {
          content: ' ';
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #fafafa;
        }
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 15px;
      }

      .content {
        background-color: #b2e281;

        &:before {
          right: -12px;
          vertical-align: middle;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
}
</style>
