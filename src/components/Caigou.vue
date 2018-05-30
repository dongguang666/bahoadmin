<template>
    <div class="caigou">
        <div>{{getUserInfoData?'':''}}</div>
        <div>{{getCaigouList?'':''}}</div>
        <div>{{getDateUploadData?'':''}}</div>
        <h3 class="pageTit" v-on:click="testlaydate()">{{msg}}</h3>
        <div class="listWrap">
            <div class="listTit">
                <div class="listTitItem">订单编号</div>
                <div class="listTitItem">供应商</div>
                <div class="listTitItem">采购员</div>
                <div class="listTitItem">下单日期</div>
                <div class="listTitItem">交货日期</div>
                <div class="listTitItem">备料截止</div>
                <div class="listTitItem">上线截止</div>
                <div class="listTitItem">包装截止</div>
                <div class="listTitItem">质检当日</div>
                <div class="listTitItem">出货截止</div>
            </div>
            <div class="listBox">
                <!---->
                <!--<div class="listItem" v-for="item in itemArr" v-bind:key="item.itemkey">-->
                    <!--<div class="listItemCnt"><div class="listItemCntCell">2018052278</div></div>-->
                    <!--<div class="listItemCnt"><div class="listItemCntCell">杭州呼啦啦婴童用品有限公司</div></div>-->
                    <!--<div class="listItemCnt"><div class="listItemCntCell">王小小</div></div>-->
                    <!--<div class="listItemCnt"><div class="listItemCntCell">2018-05-20 14:20</div></div>-->
                    <!--<div class="listItemCnt" v-for="itemid in item.itemIdArr" v-bind:key="itemid">-->
                        <!--<div class="listItemCntCell">-->
                            <!--<input type="text" v-bind:id="itemid" v-bind:value="dateval[itemid]" v-on:click="selectDate($event)" placeholder="请选择日期" />-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!---->
                <div><h3>列表</h3></div>
                <div class="listItem" v-for="item in itemArr2" v-bind:key="item.orderBill.id">
                    <div class="listItemCnt"><div class="listItemCntCell">{{item.orderBill.billNo}}</div></div>
                    <div class="listItemCnt"><div class="listItemCntCell">{{item.orderBill.supplierName}}</div></div>
                    <div class="listItemCnt"><div class="listItemCntCell">{{item.orderBill.buyerName}}</div></div>
                    <div class="listItemCnt"><div class="listItemCntCell">{{item.orderBill.createDate?item.orderBill.createDate.split(' ')[0]:''}}</div></div>
                    <div class="listItemCnt"><div class="listItemCntCell">{{item.orderBill.lastModified?item.orderBill.lastModified.split(' ')[0]:''}}</div></div>
                    <div class="listItemCnt" v-for="iteminner in item.procedures" v-bind:key="iteminner.id">
                        <div class="listItemCntCell">
                            <!--v-on:change="iptChange($event)"-->
                            <input class="mydateipt" type="text" v-if="iteminner.deadline?true:false" v-bind:id="'id_' + iteminner.id" v-bind:value="iteminner.deadline?iteminner.deadline.split(' ')[0]:''" v-on:click="selectDate($event)" placeholder="请选择日期" />
                            <input class="mydateipt jjj" type="text" v-if="iteminner.deadline?false:true" v-bind:id="'id_' + iteminner.id" v-bind:value="iteminner.deadline?iteminner.deadline.split(' ')[0]:''" v-on:click="selectDate($event)" placeholder="请选择日期" />
                        </div>
                    </div>
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
    name: 'Caigou',
    store,
    data () {
        return {
            msg: '采购员-采购单',
            currentPage: 1,
            jiaohuodate: '2017-09-08',
            beiliaodate: '2017-09-08',
            shangxiandate: '2017-09-08',
            baozhuangdate: '2017-09-08',
            zhijiandate: '2017-09-08',
            chuhuodate: '2017-09-08',
            // 选中的value
            selectedVal: '',
            // 当前选中项的id
            currentid: '',
            dateval: {},
            itemArr: [],
            itemArr2: [],
            getLoginUserPayload: {
                key: 'queryUserInfo',
                url: this.$store.state.baseServiceUrl + '/login/getLoginUser',
                postData: {}
            },
            caigouListPayload: {
                key: 'caigouList',
                url: this.$store.state.baseServiceUrl + '/orderBill/queryOrderBillsByStatusForWeb',
                postData: {
                    billStatus: 0,
                    pageNum: 1,
                    pageSize: 10
                }
            },
            caiDateUploadPayload: {
                key: 'updateDateForProcedures',
                url: this.$store.state.baseServiceUrl + '/orderBill/updateDateForProcedures',
                postData: {
                    pId: 0,
                    dt: 1
                }
            }
        }
    },
    created () {
        this.ini()
    },
    watch: {
        // itemArr (curVal, oldVal) {
        //     var that = this
        //     for (var i = 0; i < this.itemArr.length; i++) {
        //         for (var r = 0; r < this.itemArr[i].itemIdArr.length; r++) {
        //             window.laydate.render({
        //                 elem: '#' + that.itemArr[i].itemIdArr[r],
        //                 // elem: $('#' + idarr[i])[0],
        //                 // type: 'datetime',
        //                 done: (value) => {
        //                     console.log(456)
        //                     that.dateval[that.itemArr[i].itemIdArr[r]] = value
        //                     // that[idarr[i] + 'date'] = value
        //                 }
        //             })
        //         }
        //     }
        // }
    },
    computed: {
    // getCreateCommentRecordData () {
    //   if (this.$store.state.key.key_CreateCommentRecord) {
    //     return this.$store.state.key.key_CreateCommentRecord
    //   }
    // }
        getCaigouList () {
            var that = this
            if (that.$store.state.key.caigouList) {
                if (that.$store.state.key.caigouList.code === 200) {
                    that.itemArr2 = that.$store.state.key.caigouList.msg.list
                    // console.log(that.itemArr2)
                }
            }
            return that.$store.state.key.caigouList
        },
        getDateUploadData () {
            var that = this
            if (that.$store.state.key.updateDateForProcedures) {
                if (that.$store.state.key.updateDateForProcedures.code === 200) {
                    console.log(that.$store.state.key.updateDateForProcedures.msg)
                    // console.log(that.itemArr2)
                }
            }
            return that.$store.state.key.updateDateForProcedures
        },
        getUserInfoData () {
            var that = this
            if (that.$store.state.key.queryUserInfo) {
                if (that.$store.state.key.queryUserInfo.code === 200) {
                    // j
                } else {
                    that.$router.push('/Login')
                }
            }
            return that.$store.state.key.queryUserInfo
        }
        // getCaigouData () {
        //     if (this.$store.state.key.caigouList) {
        //         // console.log(123456)
        //     }
        //     return this.$store.state.key.caigouList
        // }
    },
    updated () {
        var that = this
        // for (var i = 0; i < this.itemArr2.length && this.itemArr2.length > 0; i++) {
        //     for (var r = 0; r < this.itemArr2[i].procedures.length; r++) {
        //         // var ddddd = that.itemArr2[i].procedures[r].id
        //         window.laydate.render({
        //             elem: '#id_' + that.itemArr2[i].procedures[r].id,
        //             done: (value) => {
        //                 that.selectedVal = value
        //                 // console.log('id:' + ddddd)
        //                 // that.dateuploadcommit(value, that.currentid)
        //             }
        //         })
        //     }
        // }
        window.lay('.mydateipt').each(function () {
            window.laydate.render({
                elem: this,
                // trigger: 'click',
                done: (value) => {
                    that.selectedVal = value
                    var currentidyuan = this.id
                    var currentid = currentidyuan.split('_')[1]
                    // console.log(value)
                    // that.dateuploadcommit(value, currentid)
                }
            })
        })
    },
    destroyed () {
    // $('.nav_bottom').fadeIn()
    },
    mounted () {
        // var that = this
        // for (var i = 0; i < this.itemArr2.length && this.itemArr2.length > 0; i++) {
        //     for (var r = 0; r < this.itemArr2[i].procedures.length; r++) {
        //         window.laydate.render({
        //             elem: '#' + that.itemArr2[i].procedures[r]
        //         })
        //     }
        // }
    },
    methods: {
        dateuploadcommit: function (val, currentid) {
            this.caiDateUploadPayload.postData.pId = currentid
            this.caiDateUploadPayload.postData.dt = val
            console.log(this.caiDateUploadPayload.postData.pId)
            console.log(this.caiDateUploadPayload.postData.dt)
            this.$store.commit('callservice', this.caiDateUploadPayload)
        },
        previousCommit: function () {
            // if (this.currentPage > 1) {
            //     this.orderListPayload.postData.pageNum = this.currentPage - 1
            //     this.$store.commit('callservice', this.orderListPayload)
            // }
        },
        ini: function () {
            // getLoginUserPayload
            this.$store.commit('callservice', this.getLoginUserPayload)
            this.$store.commit('callservice', this.caigouListPayload)
        },
        iptChange: function (e) {
            // console.log(obj)
            // var obj = e.currentTarget
            // console.log($(obj).val())
        },
        nextCommit: function () {
            // if (this.currentPage < this.totalPage) {
            //     this.orderListPayload.postData.pageNum = this.currentPage + 1
            //     this.$store.commit('callservice', this.orderListPayload)
            // }
        },
        selectDate: function (e) {
            // var that = this
            var obj = e.currentTarget
            var eleid = $(obj).attr('id')
            this.currentid = eleid.split('_')[1]
            // console.log(that.selectedVal)
            // for (var i = 0; i < this.itemArr2.length && this.itemArr2.length > 0; i++) {
            //     for (var r = 0; r < this.itemArr2[i].procedures.length; r++) {
            //         window.laydate.render({
            //             elem: '#id_' + that.itemArr2[i].procedures[r].id,
            //             done: (value) => {
            //                 console.log(value)
            //                 // that.dateval[eleid] = value
            //             }
            //         })
            //     }
            // }
            // window.laydate.render({
            //     // elem: '#' + eleid,
            //     // elem: '#id_1228',
            //     elem: $('#' + eleid)[0],
            //     // type: 'datetime',
            //     done: (value) => {
            //         console.log(value)
            //         that.dateval[eleid] = value
            //     }
            // })
            // window.lay('.mydateipt').each(function () {
            //     window.laydate.render({
            //         elem: this,
            //         trigger: 'click',
            //         done: (value) => {
            //             console.log(this.id)
            //             console.log(value)
            //         }
            //     })
            // })
        },
        testlaydate: function () {
            // var that = this
            this.itemArr = [
                {itemIdArr: ['jiaohuo1', 'beiliao1', 'shangxian1', 'baozhuang1', 'zhijian1', 'chuhuo1'], itemkey: 1},
                {itemIdArr: ['jiaohuo2', 'beiliao2', 'shangxian2', 'baozhuang2', 'zhijian2', 'chuhuo2'], itemkey: 2},
                {itemIdArr: ['jiaohuo3', 'beiliao3', 'shangxian3', 'baozhuang3', 'zhijian3', 'chuhuo3'], itemkey: 3},
                {itemIdArr: ['jiaohuo4', 'beiliao4', 'shangxian4', 'baozhuang4', 'zhijian4', 'chuhuo4'], itemkey: 4},
                {itemIdArr: ['jiaohuo5', 'beiliao5', 'shangxian5', 'baozhuang5', 'zhijian5', 'chuhuo5'], itemkey: 5}
            ]
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
        padding: 30px 0;
    }
    .caigou{
        width: 100%;
    }
    .testData{
        width: 1000px;
        margin: 0 auto;
    }
    .listWrap{
        width: 1200px;
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
        width: 120px;
        font-size: 16px;
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
    .listItemCnt{
        _padding-top: 10px;
        display: table;
    }
    .listItem:nth-child(2n){
        background: #f2f2f2;
    }
    .listItem:nth-child(2n+1){
        background: #fcfcfc;
    }
    .listItem:hover{
        background-color: #ddd;
    }
    .listItemCnt{
        font-size: 12px;
        width: 120px;
        height: 35px;
    }
    .listItemCntCell{
        display:table-cell;
        vertical-align:middle;
    }
    .listItemCntCell input{
        width: 100%;
        background: transparent;
        border: none;
        text-align: center;
    }
    .danhang{
        /*padding-top: 10px;*/
    }
    .listItemState,.listItemJizhi{
        text-align: center;
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
