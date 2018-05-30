<template>
    <div class="login">
        {{msg}}
    </div>
</template>

<script>
import store from '@/vuex/store'
// import $ from 'jquery'
export default {
    name: 'Zzpage',
    store,
    data () {
        return {
            msg: '这个是登录组件'
        }
    },
    created () {
        // this.ini()
        var urlOrderid = this.GetQueryString('orderid')
        var billno = this.GetQueryString('billno')
        // window.location.href = 'orderstate.html?orderid=' + urlOrderid + '&billno=' + billno
        // this.$router.push('/Orderstate?order=' + order + '&bill=' + bill)
        this.$router.push('/Orderstate?order=' + urlOrderid + '&bill=' + billno)
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
        // changestate: function () {
        //   this.$store.commit('changeState', 'lala')
        //   // $('.testjq').fadeOut()
        // }
        GetQueryString: function (name) {
            var UrlCodesArr = {}
            var key = ''
            var value = ''
            // 取得整个地址栏
            var str = location.href
            var num = str.indexOf('?')
            // 取得所有参数   stringvar.substr(start [, length ]
            str = str.substr(num + 1)
            // 各个参数放到数组里
            var arr = str.split('&')
            for (var i = 0; i < arr.length; i++) {
                num = arr[i].indexOf('=')
                if (num > 0) {
                    // substring(a,b)  a:开始的下标 b:结束下标的前一个下标
                    key = arr[i].substring(0, num)
                    value = arr[i].substr(num + 1)
                    UrlCodesArr[key] = value
                }
            }
            if (UrlCodesArr[name]) {
                return UrlCodesArr[name]
            } else {
                return null
            }
        }
    }
}
</script>

<style scoped>

</style>
