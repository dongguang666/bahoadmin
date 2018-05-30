<template>
  <div class="gongying">
    <div class="testData">{{getOrderListData?'':''}}</div>
      <div class="testData">{{getUserInfoData?'':''}}</div>
    <h3 class="pageTit">{{msg}}</h3>
    <div class="stateClassify">
      <div class="stateClassifyItem active" v-on:click="listClassify($event, 0)">未执行</div>
      <div class="stateClassifyItem" v-on:click="listClassify($event, 1)">执行中</div>
      <div class="stateClassifyItem" v-on:click="listClassify($event, 2)">已完成</div>
    </div>
    <div class="listWrap">
      <div class="listTit">
        <div class="listTitItem">订单编号</div>
        <div class="listTitItem">采购员</div>
        <div class="listTitItem">下单日期</div>
        <div class="listTitItem">交货日期</div>
        <div class="listTitItem">备料</div>
        <div class="listTitItem">上线</div>
        <div class="listTitItem">包装</div>
        <div class="listTitItem">质检</div>
        <div class="listTitItem">出货</div>
      </div>
      <div class="listBox">
        <!---->
        <div class="listItem" v-for="orderItem in orderList" :key="orderItem.id" v-bind:data-orderbill="orderItem.orderBill.id + '_' + orderItem.orderBill.billNo" v-on:click="toorderstate($event)">
          <div class="listItemCnt">{{orderItem.orderBill.billNo}}</div>
          <div class="listItemCnt">{{orderItem.orderBill.buyerName}}</div>
          <div class="listItemCnt">{{orderItem.orderBill.createDate?orderItem.orderBill.createDate.split(' ')[0]:''}}</div>
          <div class="listItemCnt">{{orderItem.orderBill.lastModified?orderItem.orderBill.lastModified.split(' ')[0]:''}}</div>
          <div class="listItemCnt" v-for="zhixingItem in orderItem.procedures" :key="zhixingItem.id">
            <div class="listItemState">状态: {{zhixingItem.imgPath?'已完成':'未执行'}}</div>
            <div class="listItemJizhi">截止: {{zhixingItem.deadline?zhixingItem.deadline.split(' ')[0]:''}}</div>
          </div>
          <!--<div class="listItemCnt">-->
            <!--<div class="listItemState">状态: {{orderItem.statusText}}</div>-->
            <!--<div class="listItemJizhi">截止: 2018-05-20</div>-->
          <!--</div>-->
          <!--<div class="listItemCnt">-->
            <!--<div class="listItemState">状态: {{orderItem.statusText}}</div>-->
            <!--<div class="listItemJizhi">截止: 2018-05-20</div>-->
          <!--</div>-->
          <!--<div class="listItemCnt">-->
            <!--<div class="listItemState">状态: {{orderItem.statusText}}</div>-->
            <!--<div class="listItemJizhi">截止: 2018-05-20</div>-->
          <!--</div>-->
          <!--<div class="listItemCnt">-->
            <!--<div class="listItemState">状态: {{orderItem.statusText}}</div>-->
            <!--<div class="listItemJizhi">截止: 2018-05-20</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--分页器-->
    <div class="pagination">
      <div class="previousPage" v-on:click="previousCommit()">
        <div class="previousPic"><img src="../assets/shang2.png" /></div>
      </div>
      <div class="currentPage">{{currentPage}}</div>
      <div class="nextPage" v-on:click="nextCommit()">
        <div class="nextPic"><img src="../assets/xia2.png" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import $ from 'jquery'
export default {
    name: 'Gongying',
    store,
    data () {
        return {
            msg: '供应商-填报单',
            // 用户登录信息
            userInfoData: '',
            orderList: [],
            // 总条数
            totalRow: 0,
            // 总页数
            totalPage: 0,
            // 当前页数
            currentPage: 1,
            // 分页器数组
            paginationArr: [],
            // 查询用户信息
            queryUserInfoPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            },
            orderListPayload: {
                key: 'orderList',
                // queryOrderBillsByStatus queryOrderBillsByStatusForWeb
                url: this.$store.state.baseServiceUrl + '/orderBill/queryOrderBillsByStatusForWeb',
                postData: {
                    billStatus: 0,
                    pageNum: 1,
                    pageSize: 10
                }
            },
            getLoginUserPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            }
        }
    },
    created () {
    // this.ini()
        this.getLoginUserCommit()
        this.callOrderList()
    },
    watch: {
        // moneyVal (curVal, oldVal) {
        //   if (curVal > 0) {
        //   }
        // }
        orderList (curVal, oldVal) {
            this.queryUserInfoCommit()
        },
        userInfoData (curVal, oldVal) {
            var that = this
            if (curVal.code === oldVal.code) {
                // console.log('登录值不变')
            } else {
                if (curVal.code !== 200) {
                    that.queryUserInfoCommit()
                }
            }
        }
    },
    computed: {
        getUserInfoData () {
            var that = this
            if (that.$store.state.key.queryUserInfo) {
                if (that.$store.state.key.queryUserInfo.code === 200) {
                    // j
                } else {
                    that.$router.push('/Login')
                }
            }
            that.userInfoData = that.$store.state.key.queryUserInfo
            return that.$store.state.key.queryUserInfo
        },
        getOrderListData () {
            var that = this
            if (this.$store.state.key.orderList) {
                if (this.$store.state.key.orderList.code === 200) {
                    that.totalRow = this.$store.state.key.orderList.msg.totalRow
                    that.totalPage = this.$store.state.key.orderList.msg.totalPage
                    that.currentPage = this.$store.state.key.orderList.msg.pageNumber
                    for (var i = 0; i < this.$store.state.key.orderList.msg.list.length; i++) {
                        if (this.$store.state.key.orderList.msg.list[i].orderBill.status === 'WZX') {
                            that.$store.state.key.orderList.msg.list[i].orderBill.statusText = '未执行'
                        } else if (this.$store.state.key.orderList.msg.list[i].orderBill.status === 'ZXZ') {
                            that.$store.state.key.orderList.msg.list[i].orderBill.statusText = '执行中'
                        } else if (this.$store.state.key.orderList.msg.list[i].orderBill.status === 'YWC') {
                            that.$store.state.key.orderList.msg.list[i].orderBill.statusText = '已完成'
                        }
                    }
                    that.orderList = that.$store.state.key.orderList.msg.list
                } else if (this.$store.state.key.orderList.code === 303) {
                    // that.$router.push('/Login')
                }
                return this.$store.state.key.orderList
            }
        }
    },
    updated () {
        // this.queryUserInfoCommit()
        // this.userInfoData = this.$store.state.key.queryUserInfo
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
        // 查询用户信息
        queryUserInfoCommit: function () {
            this.$store.commit('callservice', this.queryUserInfoPayload)
        },
        getLoginUserCommit: function () {
            this.$store.commit('callservice', this.getLoginUserPayload)
        },
        callOrderList: function () {
            this.$store.commit('callservice', this.orderListPayload)
        },
        listClassify: function (e, classifyIndex) {
            var obj = e.currentTarget
            if ($(obj).hasClass('active')) {
            // j
            } else {
                $(obj).addClass('active').siblings().removeClass('active')
                this.orderListPayload.postData.pageNum = 1
                this.orderListPayload.postData.billStatus = classifyIndex
                this.$store.commit('callservice', this.orderListPayload)
            }
        },
        toorderstate: function (e) {
            var obj = e.currentTarget
            var order = $(obj).attr('data-orderbill').split('_')[0]
            var bill = $(obj).attr('data-orderbill').split('_')[1]
            // this.$router.push({
            //     name: 'Orderstate',
            //     params: {
            //         order: order,
            //         bill: bill
            //     }
            // })
            this.$router.push('/Orderstate?order=' + order + '&bill=' + bill)
        },
        previousCommit: function () {
            if (this.currentPage > 1) {
                this.orderListPayload.postData.pageNum = this.currentPage - 1
                this.$store.commit('callservice', this.orderListPayload)
            }
        },
        nextCommit: function () {
            if (this.currentPage < this.totalPage) {
                this.orderListPayload.postData.pageNum = this.currentPage + 1
                this.$store.commit('callservice', this.orderListPayload)
            }
        }
    }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .pageTit{
    padding: 30px 0 0 0;
  }
  .gongying{
    width: 100%;
  }
  .testData{
    width: 1000px;
    margin: 0 auto;
  }
.listWrap{
  width: 1000px;
  margin: 0 auto;
}
  .listTit{
    display: flex;
    display: -webkit-flex;
    background-color: #009688;
    color: #fff;
    padding: 10px 0;
  }
  .listTitItem{
    width: 110px;
    font-size: 16px;
  }
  .stateClassify{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    padding: 10px 0;
  }
  .stateClassifyItem{
    margin-left: 15px;
    color: #999;
    cursor: pointer;
  }
  .stateClassifyItem.active{
    color: #009688;
  }
  .listBox{
    /**/
  }
  .listItem{
    display: flex;
    display: -webkit-flex;
    padding: 10px 0;
    cursor: pointer;
  }
  .listItemCnt:nth-child(1),.listItemCnt:nth-child(2),.listItemCnt:nth-child(3),.listItemCnt:nth-child(4){
    padding-top: 10px;
  }
  .listItem:nth-child(2n){
    background: #e8fcfa;
  }
  .listItem:nth-child(2n+1){
    background: #fbfdfd;
  }
  .listItem:hover{
    background-color: #cff2ee;
  }
  .listItemCnt{
    font-size: 12px;
    width: 110px;
  }
  .danhang{
    /*padding-top: 10px;*/
  }
  .listItemState,.listItemJizhi{
    text-align: left;
  }
  .listItemState{
    /**/
  }
  .listItemJizhi{
    color: #999;
  }

  .pagination{
    display: flex;
    display: -webkit-flex;
    justify-content:center;
    padding-top: 30px;
  }
  .previousPage,.nextPage{
    padding: 0 10px;
  }
  .previousPic,.nextPic{
    width: 20px;
    height: 20px;
    background-color: #009688;
    border-radius: 10px;
    overflow: hidden;
  }
  .currentPage{
    color: #009688;
    line-height: 20px;
  }
</style>
