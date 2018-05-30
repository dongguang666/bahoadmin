<template>
    <div class="login">
        <h3>{{msg}}</h3>
    </div>
</template>

<script>
import store from '@/vuex/store'
// import $ from 'jquery'
export default {
    name: 'Admin',
    store,
    data () {
        return {
            msg: '管理员操作'
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
    // changestate: function () {
    //   this.$store.commit('changeState', 'lala')
    //   // $('.testjq').fadeOut()
    // }
    }
}
</script>

<style scoped>

</style>
