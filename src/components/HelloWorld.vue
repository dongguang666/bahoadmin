<template>
  <div class="hello">
      <div>{{getQueryUserInfo?'':''}}</div>
    <h1>{{ msg }}</h1>
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
      <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li><br>-->
      <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
      <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
      <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
      <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Baho',
            queryUserInfoPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            }
        }
    },
    created () {
        this.ini()
    },
    watch: {
        // moneyVal (curVal, oldVal) {
        //   if (curVal > 0) {
        //   }
        // }
    },
    computed: {
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
        }
    },
    updated () {
        // var windowHeight = parseInt($(window).height())
    },
    destroyed () {
        // this.$store.commit('appSideSet', {name: 'all', show: true})
    },
    mounted () {
        // var windowHeight = parseInt($(window).height())
    },
    methods: {
        ini: function () {
            // j
            this.queryUserInfoCommit()
        },
        // 查询用户信息
        queryUserInfoCommit: function () {
            this.$store.commit('callservice', this.queryUserInfoPayload)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
