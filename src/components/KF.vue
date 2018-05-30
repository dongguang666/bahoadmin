<template>
    <div class="login">
        {{msg}}
        <div>{{date}}</div>
        <input type="text" id="test2" />
        <button type="button" id="ddbtn">btn</button>
        <input type="text" id="test">
    </div>
</template>

<script>
import store from '@/vuex/store'
// import $ from 'jquery'
// import $ from 'jquery'
export default {
    name: 'KF',
    store,
    data () {
        return {
            msg: '这个是开发组件',
            date: '2017-09-08'
        }
    },
    created () {
        // this.ini()
        // v-model="date"
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
        // console.log(laydate)
        window.laydate.render({
            elem: '#test2',
            // type: 'datetime',
            done: (value) => {
                this.date = value
            }
        })
        // this.$store.commit('changeRightBtn', {btnClassName: 'navTopAtcShareTag', show: true, link: ''})
    },
    methods: {
        // changestate: function () {
        //   this.$store.commit('changeState', 'lala')
        //   // $('.testjq').fadeOut()
        //   $()
        // }
    }
}
</script>

<style scoped>

</style>
