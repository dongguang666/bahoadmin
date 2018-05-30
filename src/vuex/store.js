import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
Vue.use(Vuex)
const state = {
    mymsg: '测试状态值',
    userLoginName: '',
    // baseServiceUrl: 'http://47.96.97.226:80',
    // baseServiceUrl: 'http://10.0.5.15:8080',
    baseServiceUrl: 'http://10.0.5.211:8080',
    key: {
        // 采购员 采购列表
        caigouList: '',
        updateDateForProcedures: '',
        // 查询用户信息  getLoginUser  queryUserInfo
        queryUserInfo: '',
        // 用户登录信息
        getLoginUser: '',
        // 退出登录
        loginOut: '',
        login: '',
        orderList: '',
        orderState: '',
        orderStateInfo: ''
    },
    appSideCfg: {
        // 顶部导航栏
        appHeader: true,
        // 主体内容部分
        appContent: true,
        // 左边栏
        appCntLeft: true,
        // 右边栏
        appCntRight: true
    }
}
const mutations = {
    changeState (state, obj) {
        state.mymsg = '这个是改变的'
    },
    userLoginNameSet (state, obj) {
        state.userLoginName = obj
    },
    // app.vue 顶部栏、侧边栏，显示隐藏设置 传值为：{name: 'appHeader', show: true}
    // name为对应class名 appHeader appContent appCntLeft appCntRight
    appSideSet (state, obj) {
        switch (obj.name) {
        case 'appHeader':
            state.appSideCfg.appHeader = obj.show
            break
        case 'appContent':
            state.appSideCfg.appContent = obj.show
            break
        case 'appCntLeft':
            state.appSideCfg.appCntLeft = obj.show
            break
        case 'appCntRight':
            state.appSideCfg.appCntRight = obj.show
            break
        default:
            state.appSideCfg.appHeader = state.appSideCfg.appContent = state.appSideCfg.appCntLeft = state.appSideCfg.appCntRight = obj.show
        }
    },
    callservice (state, obj) {
        // console.log('zoule')
        $.ajax({
            url: obj.url,
            // dataType: "jsonp",
            type: 'POST',
            xhrFields: {
                withCredentials: true,
                useDefaultXhrHeader: false
            },
            crossDomain: true,
            data: obj.postData,
            success: function (data) {
                state.key[obj.key] = data
            }
        })
    }
}
export default new Vuex.Store({
    state,
    mutations
})
