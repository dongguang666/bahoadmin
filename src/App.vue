<template>
  <div id="app">
      <div>{{getLoginOutData?'':''}}</div>
      <div>{{getQueryUserInfo?'':''}}</div>
    <!--<img src="./assets/logo.png">-->
    <!--<button class="testbtn" v-on:click="greet">testBtn</button>-->
    <!--<button class="routerBtn" v-on:click="toGongying">去供应商</button>-->
    <div class="appHeader" v-if="$store.state.appSideCfg.appHeader">
      <div class="appHeaderBox">
        <div class="appHeaderLogo">
          <div class="appHeaderLogoPic"><img src="./assets/kub_logo.png" /></div>
          <div class="appHeaderLogoText">供应商协同系统</div>
        </div>
        <div class="appHeaderContent">
          <div class="appHeaderNavBox">
            <div class="appHeaderNavItem">控制台</div>
            <div class="appHeaderNavItem">商品管理</div>
            <div class="appHeaderNavItem">用户</div>
            <div class="appHeaderNavItem">其它系统</div>
          </div>
          <div class="appHeaderUserInfo">
            <div class="appHeaderUserInfoItem appUserHeaderImg">
              <div class="appHeaderUserInfoPic"><img src="./assets/userHeaderImg.png" /></div>
            </div>
            <div class="appHeaderUserInfoItem">
              <div class="headerUserInfoName">{{$store.state.key.queryUserInfo?$store.state.key.queryUserInfo.msg.name:''}}</div>
            </div>
            <div class="appHeaderUserInfoItem">
              <div class="headerUserInfoLogout" v-on:click="loginOut()" v-if="$store.state.key.queryUserInfo && $store.state.key.queryUserInfo.code === 200">退出</div>
              <!--<div class="headerUserInfoLogout" v-on:click="toLogin()" v-if="$store.state.key.queryUserInfo === '' || $store.state.key.queryUserInfo.code !== 200"></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容主体-->
    <div class="appContent" v-if="$store.state.appSideCfg.appContent">
      <div class="appCntLeft" v-if="$store.state.appSideCfg.appCntLeft">
        <div class="appCntLeftList">
          <!---->
          <div class="appCntLeftListItem">
            <div class="appLeftListTit" v-on:click="openToggle($event)">填报</div>
            <div class="appLeftOpenItemBox">
              <div class="appLeftOpenItem" v-on:click="caiTianbao($event)">采购员-采购单</div>
              <div class="appLeftOpenItem" v-on:click="gongTianbao($event)">供应商-填报单</div>
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
            </div>
          </div>
          <!---->
          <div class="appCntLeftListItem">
            <div class="appLeftListTit" v-on:click="openToggle($event)">管理</div>
            <div class="appLeftOpenItemBox closed">
              <div class="appLeftOpenItem" v-on:click="admin($event)">管理员</div>
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
            </div>
          </div>
          <!---->
          <!--<div class="appCntLeftListItem">-->
            <!--<div class="appLeftListTit" v-on:click="openToggle($event)">所有商品</div>-->
            <!--<div class="appLeftOpenItemBox closed">-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
            <!--</div>-->
          <!--</div>-->
          <!---->
          <!--<div class="appCntLeftListItem">-->
            <!--<div class="appLeftListTit" v-on:click="openToggle($event)">所有商品</div>-->
            <!--<div class="appLeftOpenItemBox closed">-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
              <!--<div class="appLeftOpenItem">展开项目</div>-->
            <!--</div>-->
          <!--</div>-->
          <!---->
        </div>
      </div>
      <div class="appCntRight" v-if="$store.state.appSideCfg.appCntRight">
        <!--<div>{{$store.state.mymsg}}</div>-->
        <router-view/>
      </div>
    </div>
    <!---->
    <!--<router-view/>-->
  </div>
</template>

<script>
// import store from '@/vuex/store'
import $ from 'jquery'
export default {
    name: 'dongguang',
    // 在 `methods` 对象中定义方法
    data () {
        return {
            msg: 'DongGuang',
            loginOutPayload: {
                key: 'loginOut',
                url: this.$store.state.baseServiceUrl + '/login/logout',
                postData: {}
            },
            queryUserInfoPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            }
        }
    },
    created () {
        this.$store.commit('appSideSet', {name: 'appCntRight', show: true})
        this.ini()
    },
    watch: {
    // moneyVal (curVal, oldVal) {
    //   if (curVal > 0) {
    //   }
    // }
    },
    computed: {
    // getCreateCommentRecordData () {
    //   if (this.$store.state.key.key_CreateCommentRecord) {
    //     return this.$store.state.key.key_CreateCommentRecord
    //   }
    // }
        getQueryUserInfo () {
            var that = this
            if (this.$store.state.key.queryUserInfo) {
                if (this.$store.state.key.queryUserInfo.code === 200) {
                    // this.queryUserInfoCommit()
                } else {
                    that.$router.push('/Login')
                }
            }
            return this.$store.state.key.loginOut
        },
        getLoginOutData () {
            if (this.$store.state.key.loginOut) {
                if (this.$store.state.key.loginOut.code === 200) {
                    this.queryUserInfoCommit()
                }
            }
            return this.$store.state.key.loginOut
        }
    },
    updated () {
        var windowHeight = parseInt($(window).height())
        $('.appCntLeft').css('height', (windowHeight - 60) + 'px')
        this.userInfoData = ''
    // $('.nav_bottom').css({'display': 'none'})
    },
    destroyed () {
        this.$store.commit('appSideSet', {name: 'all', show: true})
    },
    mounted () {
        var windowHeight = parseInt($(window).height())
        $('.appCntLeft').css('height', (windowHeight - 60) + 'px')
    },
    methods: {
        ini: function () {
            // j
            this.setLeftHeight()
        },
        setLeftHeight: function () {
            // w_H - 60
        },
        greet: function (event) {
            // `this` 在方法里指向当前 Vue 实例
            this.$router.push('../Test')
            // alert('Hello ' + this.msg + '!')
            // `event` 是原生 DOM 事件
            if (event) {
                // alert(event.target.tagName)
            }
        },
        toGongying: function () {
            // k
        },
        gongTianbao: function () {
            this.$router.push('./Gongying')
        },
        // 采购员填报
        caiTianbao: function () {
            this.$router.push('./Caigou')
        },
        // 管理员
        admin: function () {
            this.$router.push('./Admin')
        },
        openToggle: function (e) {
            var obj = e.currentTarget
            $(obj).siblings().toggle('normal')
        },
        // 查询用户信息
        queryUserInfoCommit: function () {
            this.$store.commit('callservice', this.queryUserInfoPayload)
        },
        // 退出登录
        loginOut: function () {
            this.$store.commit('callservice', this.loginOutPayload)
            // this.$router.push('/Login')
        }
    }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
div img{
  width: 100%;
  display: block;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  _margin-top: 60px;
}

.appHeader{
  width: 100%;
  background-color: #23262e;
  color: #fff;
  font-size: 14px;
}
.appHeaderBox{
  display: flex;
  display: -webkit-flex;
  line-height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
}
.appHeaderLogo{
  display: flex;
  display: -webkit-flex;
  width: 165px;
}
.appHeaderLogoPic{
  width: 30px;
  padding-top: 22px;
}
.appHeaderLogoText{
  color: #009688;
  font-size: 16px;
  padding-left: 10px;
}
.appHeaderContent{
  display: flex;
  display: -webkit-flex;
  flex-grow: 1;
  justify-content: space-between;
}
.appHeaderNavBox{
  display: flex;
  display: -webkit-flex;
}
.appHeaderNavItem{
  padding-left: 15px;
}
.appHeaderUserInfo{
  display: flex;
  display: -webkit-flex;
}
.appHeaderUserInfoItem{
  padding-right: 15px;
}
.appUserHeaderImg{
  padding-top: 15px;
}
.appHeaderUserInfoPic{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
}
/*内容主体部分*/
.appContent{
  _height: 100%;
  display: flex;
  display: -webkit-flex;
}
.appCntLeft{
  width: 200px;
  background-color: #393d49;
}
.appCntRight{
  flex-grow: 1;
  -webkit-flex-grow: 1;
}
.appCntLeftList{
  /**/
}
.appCntLeftListItem{
  color: #fff;
  font-size: 14px;
  /*padding: 10px 0;*/
}
.appLeftListTit{
  color: #c4c5c9;
  padding: 10px 0;
  cursor: pointer;
}
.appLeftListTit:hover{
  color: #fff;
  background-color: #4e5465;
  border-left: 3px solid #009688;
}
  .appLeftOpenItemBox{
    background-color: #282b33;
  }
  .appLeftOpenItemBox.closed{
    display: none;
  }
  .appLeftOpenItem{
    color: #949599;
    padding: 5px 0;
    font-size: 12px;
    cursor: pointer;
  }
  .appLeftOpenItem:hover{
    color: #c4c5c9;
  }
</style>
