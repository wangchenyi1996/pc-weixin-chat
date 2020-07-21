<template>
  <div class="my-friends">
    <!-- tab 导航 -->
    <div class="tabs u-f u-f-ajc">
      <ul class="u-f u-f-ajc">
        <li
          class="tab"
          @click="choose(1)"
          :class="{'t-current': currentIndex===1}"
          style="width:40%;"
        >
          <i class="el-icon-star-off"></i> 推荐
        </li>
        <li
          class="tab"
          @click="choose(2)"
          :class="{'t-current': currentIndex===2}"
          style="width:60%;"
        >
          <i class="el-icon-plus"></i> 记录美好生活
        </li>
      </ul>
    </div>
    <!-- tab 对应内容 -->
    <div class="main-tab">
      <div class="tab1" v-if="currentIndex===1">
        <div class="t-item" v-for="(item,index) in wechatMoments" :key="item.id">
          <div class="u-f">
            <img :src="item.face" alt="头像" class="face" />
            <div class="t-content">
              <p>{{item.username}}</p>
              <div class="f-cont">{{item.content}}</div>
              <div class="img-list">
                <!-- <img :src="img.url" v-for="img in item.imgList" :key="img.id" /> -->
                <viewer :images="item.imgList">
                  <img v-for="(src,index) in item.imgList" :src="src.url" :key="index" />
                </viewer>
              </div>
              <div class="u-f u-f-sbc" style="color:#666;font-size:14px;margin-top:12px;">
                <span class="times">{{item.time}}</span>
                <div class="u-f u-f-ajc" style="cursor:pointer;">
                  <div class="u-f u-f-ac" @click="handleActive(index)">
                    <img
                      :src="item.active ? require('@/assets/icon-imgs/p-support-active.png') : require('@/assets/icon-imgs/p-support.png') "
                      class="c-img"
                    />
                    <span>点赞</span>
                  </div>
                  <div class="u-f u-f-ac">
                    <img src="@/assets/icon-imgs/p-msg.png" alt class="c-img" />
                    <span>评论</span>
                  </div>
                  <img src="@/assets/icon-imgs/p-more.png" alt class="c-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="comments">
            <div class="u-f u-f-ac ellipsis">
              <i class="el-icon-star-off" style="color:#60729A;"></i>
              <template v-if="item.persons.length>14">
                <span
                  v-for="person in item.persons"
                  :key="person.id"
                  class="person-t"
                >{{person.name}}</span>
              </template>
              <template v-else>
                <span
                  v-for="person in item.persons"
                  :key="person.id"
                  class="person-t"
                >{{person.name}}</span>
                <i class="el-icon-more" style="color:#60729A;margin-left:10px;"></i>
              </template>
            </div>
            <div class="com-list">
              <div class="com-item u-f u-f-ac">
                <span>张学友：</span>
                <p>高端大气上档次</p>
              </div>
              <div class="com-item u-f u-f-ac">
                <span>郭富城：</span>
                <p>大家好，我是郭富城</p>
              </div>
              <div class="com-item u-f u-f-ac">
                <span>周星驰：</span>
                <p>大家好，我是周星驰，喜剧之王..., 希望大家多支持支持</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab2" v-else>写内容</div>
    </div>
  </div>
</template>

<script>
import wechatMoments from "@/assets/data/wechatMonents.js";
import { timeFrom } from "@/utils/timeFunc.js";
export default {
  data() {
    return {
      currentIndex: 1,
      isActive: true,
      wechatMoments: wechatMoments
    };
  },
  mounted() {
    this.wechatMoments.forEach(item => {
      item.time = timeFrom(item.time);
    });
  },
  methods: {
    choose(index) {
      this.currentIndex = index;
    },
    // 点赞
    handleActive(index) {
      this.wechatMoments[index].active = !this.wechatMoments[index].active;
      if (this.wechatMoments[index].active) {
        this.$message({
          message: "点赞成功",
          type: "success",
          duration: 600
        });
      } else {
        this.$message({
          message: "取消点赞",
          type: "error",
          duration: 600
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-friends {
  height: 100%;
  overflow:scroll;
  .tabs {
    margin: 0px auto;
    background-color: #f2f2f2;
    width: 100%;
    color: #f1931f;
    position: sticky;
    top: 0px;
    padding: 8px 0;

    ul {
      background-color: #FDF6EC;
      width: 30%;
      height: 40px;
      line-height: 40px;

      .tab {
        text-align: center;

        i {
          color: #f1931f;
        }
      }

      .t-current {
        background-color: #409EFF;
        color: #fff;

        i {
          color: #fff;
        }
      }
    }
  }

  .main-tab {
    margin: 0 20px;

    .tab1 {
      .t-item {
        padding-bottom: 20px;
        margin-top: 20px;
        border-bottom: 1px solid #e8e8e8;

        .face {
          height: 45px;
          width: 45px;
          border-radius: 100%;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .t-content {
          width: 100%;

          p {
            font-size: 14px;
            color: #409EFF;
          }

          .f-cont {
            margin: 8px 0;
            line-height: 1.6;
            font-size: 13px;
            color: #666;
          }

          .img-list {
            img {
              width: 90px;
              height: 90px;
              border-radius: 4px;
              margin: 0 10px;

              &:nth-of-type(1) {
                margin-left: 0;
              }
            }
          }

          .c-img {
            width: 16px;
            height: 16px;
            margin: 0 10px;
          }
        }
      }

      .comments {
        margin-left: 55px;
        margin-top: 10px;
        background-color: #E9E9E9;
        border-radius: 8px;
        padding: 15px;
        box-sizing: border-box;

        .person-t {
          font-size: 12px;
          color: #60729A;
          margin-left: 8px;
        }

        .com-list {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.8;

          .com-item {
            span {
              color: #60729A;
            }

            p {
              color: #567;
            }
          }
        }
      }
    }
  }
}
</style>