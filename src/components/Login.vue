<template>
  <div class="login">
      <!--<div>{{loginData}}</div>-->
      <!--<div>{{username}}</div>-->
      <div>{{getQueryUserInfo?'':''}}</div>
    <div class="loginWrap">
      <div class="loginBox">
        <div class="loginCnt">
          <div class="loginItemTit">用户名</div>
          <div class="loginItemVal"><div class="loginItemIptBox"><input type="text" class="loginItemIpt loginUserNameVal"/></div> </div>
        </div>
        <div class="loginCnt">
          <div class="loginItemTit">密码</div>
          <div class="loginItemVal"><div class="loginItemIptBox"><input type="text" class="loginItemIpt loginPasswordVal"/></div></div>
        </div>
        <div class="loginCnt loginBtn">
          <div class="loginItemTit"></div>
          <div class="loginItemVal" v-on:click="login()"><div class="btn">登录</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import $ from 'jquery'
export default {
    name: 'Login',
    store,
    data () {
        return {
            msg: '这个是登录组件',
            loginData: '',
            username: '',
            queryUserInfoPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            }
        }
    },
    created () {
        this.$store.commit('appSideSet', {name: 'appCntLeft', show: false})
    // this.ini() userLoginNameSet
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
                    that.$router.push('/Gongying')
                } else {
                    // that.$router.push('/Login')
                }
            }
            return this.$store.state.key.loginOut
        }
    },
    updated () {
    // $('.nav_bottom').css({'display': 'none'})
    },
    destroyed () {
        this.$store.commit('appSideSet', {name: 'all', show: true})
    // $('.nav_bottom').fadeIn()
    },
    mounted () {
    // j
    // this.$store.commit('changeRightBtn', {btnClassName: 'navTopAtcShareTag', show: true, link: ''})
    },
    methods: {
    // changestate: function () {
    //   this.$store.commit('changeState', 'lala')
    //   // $('.testjq').fadeOut()
    // }
        // 查询用户信息
        queryUserInfoCommit: function () {
            // console.log('触发查询用户信息')
            this.$store.commit('callservice', this.queryUserInfoPayload)
        },
        login: function () {
            var userName = $('.loginUserNameVal').val()
            var userPwd = $('.loginPasswordVal').val()
            var that = this
            $.ajax({
            // upload/picUpload
                url: that.$store.state.baseServiceUrl + '/login/login',
                // url: "http://www.baidu.com",
                // dataType: "json",
                type: 'POST',
                xhrFields: {
                    withCredentials: true,
                    useDefaultXhrHeader: false
                },
                data: {
                    userName: userName,
                    pwd: userPwd
                },
                crossDomain: true,
                success: function (data) {
                    that.loginData = data
                    if (data.code === 200) {
                        console.log('登录成功')
                        that.username = data.msg.name
                        that.$store.commit('userLoginNameSet', that.username)
                        that.queryUserInfoCommit()
                    // window.location.href = 'classify.html'
                    } else {
                    // window.location.href = 'classify.html'
                    }
                },
                error: function (data) {
                    console.log(data)
                }
            })
        }
    }
}
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .loginWrap{
    padding-top: 50px;
  }
  .loginBox{
    width: 320px;
    border: 1px solid #eee;
    margin: 0 auto;
    padding: 25px 0;
  }
  .loginCnt{
    display: flex;
    display: -webkit-flex;
    padding-bottom: 15px;
  }
  .loginItemTit{
    width: 70px;
    text-align: right;
  }
  .loginItemVal{
    padding-left: 20px;
  }
  .loginItemIpt{
    border: none;
    outline: none;
    line-height: 26px;
    width: 100%;
  }
  .loginItemIptBox{
    width: 190px;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
    padding-left: 10px;
  }
  .loginBtn{
    margin-top: 20px;
  }
  .btn{
    width: 50px;
    border-radius: 6px;
    border: 1px solid #eee;
    padding: 2px 10px;
  }
</style>
