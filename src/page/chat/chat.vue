<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-06 09:56:05
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-21 10:07:13
--> 
<template>
  <div class="content" ref="screens">
    <div class="msglist">
      <search></search>
      <chatlist></chatlist>
    </div>
    <div class="chatbox" :style="{backgroundImage: 'url(' + backImg + ')',backgroundSize:'cover'}">
      <message></message>
      <v-text @screenCapture="screenCapture"></v-text>
    </div>
  </div>
</template>

<script>
import search from "../../components/search/search";
import chatlist from "../../components/chatlist/chatlist";
import message from "../../components/message/message";
import vText from "../../components/text/text";

import { mapState } from "vuex";
import html2canvas from "html2canvas";

export default {
  components: {
    search,
    chatlist,
    message,
    vText,
  },
  computed: {
    ...mapState(["backImg"]),
  },
  methods: {
    // 截屏
    screenCapture() {
      html2canvas(this.$refs.screens).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        // console.log(dataURL)
        // 下载图片
        this.downloadIamge(dataURL, "pic");
        this.$message.success("下载图片成功");
      });
    },
    // 下载图片
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        console.log(name, url);
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "screenCapture"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
  },
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;

  // width: 800px;
  .msglist {
    width: 250px;
    background: rgb(230, 230, 230);
  }

  .chatbox {
    flex: 1;
  }
}
</style>
