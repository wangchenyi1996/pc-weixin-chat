<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-06 09:56:05
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-06 15:06:38
--> 
<template>
  <div class="content">
    <div class="msglist">
      <search></search>
      <chatlist></chatlist>
    </div>
    <div class="chatbox">
      <message></message>
      <v-text></v-text>
    </div>
  </div>
</template>

<script>
import search from "../../components/search/search";
import chatlist from "../../components/chatlist/chatlist";
import message from "../../components/message/message";
import vText from "../../components/text/text";
export default {
  components: {
    search,
    chatlist,
    message,
    vText
  }
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  width: 800px;

  .msglist {
    width: 250px;
    background: rgb(230, 230, 230);
  }

  .chatbox {
    flex: 1;
  }
}
</style>
