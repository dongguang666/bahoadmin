<template>
    <div class="login">
        {{msg}}
        <div class="testMove"><div class="circleMove"></div></div>
        <button @click="mytoggle()">显示/隐藏</button>
        <transition name="lt">
            <h1 v-if="type">http://www.baidu.com百度一下就知道</h1>
        </transition>
    </div>
</template>

<script>
import store from '@/vuex/store'
// import $ from 'jquery'
export default {
    name: 'Kaifa',
    store,
    data () {
        return {
            msg: '这个是登录组件',
            type: false
        }
    },
    created () {
    // this.ini()
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
    },
    updated () {
    // $('.nav_bottom').css({'display': 'none'})
    },
    destroyed () {
    // $('.nav_bottom').fadeIn()
    },
    mounted () {
    // this.$store.commit('changeRightBtn', {btnClassName: 'navTopAtcShareTag', show: true, link: ''})
    },
    methods: {
        mytoggle: function () {
            var that = this
            window.setInterval(that.lala, 2000)
        },
        lala: function () {
            var that = this
            that.type = !that.type
            console.log(123)
        }
    // changestate: function () {
    //   this.$store.commit('changeState', 'lala')
    //   // $('.testjq').fadeOut()
    // }
    }
}
</script>

<style scoped>
    .circleMove{
        width: 50px;
        height: 50px;
        background-color: #aaa;
        animation:circleMove 1.5s linear infinite;
    }
    @-webkit-keyframes circleMove
    {
        0% { background-color: #eee}
        50% {background-color: #aaa}
        100% {background-color: #eee}
    }

    .lt-enter-active{
        animation: show-in 1.5s linear infinite;
        /*transition: all 1s;*/
    }
    .lt-leave-active{
        animation: show-out 1.5s linear infinite;
        /*transition: all 1s;*/
    }

    .lt-enter,.lt-leave-to{
        opacity: 0;
    }
    @keyframes show-in {
        /*0%{*/
            /*transform: translate(0px,0);*/
        /*}*/
        /*100%{*/
            /*transform: translate(0,0);*/
        /*}*/
        0% { background-color: #eee}
        50% {background-color: #aaa}
        100% {background-color: #eee}
    }
    @keyframes show-out {
        0%{
            transform: translate(0,0);
        }
        100%{
            transform: translate(0px,0);
        }
    }
</style>
