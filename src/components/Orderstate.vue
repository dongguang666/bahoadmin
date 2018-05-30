<template>
    <div class="orderstate">
      <div class="codeDebug">{{getOrderstateData?getOrderstateData:''}}</div>
      <div class="codeDebug">{{getOrderstateInfoData?getOrderstateInfoData:''}}</div>
      <h3 class="pageTit">{{msg}}</h3>
      <div class="listWrap">
        <div class="listTit">
          <div class="listTitItem">订单编号</div>
          <div class="listTitItem">供应商</div>
          <div class="listTitItem">采购员</div>
          <div class="listTitItem">跟单员</div>
          <div class="listTitItem">下单日期</div>
          <div class="listTitItem">交货日期</div>
        </div>
        <div class="listBox">
          <div class="listItem">
            <div class="listItemCnt">{{billno}}</div>
            <div class="listItemCnt">{{gongyingshang}}</div>
            <div class="listItemCnt">{{caiName}}</div>
            <div class="listItemCnt">{{genName}}</div>
            <div class="listItemCnt">{{createDate}}</div>
            <div class="listItemCnt">{{jiaohuoDate}}</div>
          </div>
        </div>
        <!--<div class="cntZhiTit">执行记录：</div>-->
        <div class="cntJiluWrap">
          <div class="cntJiluTitBox">
            <div class="cntJiluTitItem first">备料</div>
            <div class="cntJiluTitItem stateItemMid">上线</div>
            <div class="cntJiluTitItem stateItemMid">包装</div>
            <div class="cntJiluTitItem shehe stateItemMid">质检</div>
            <div class="cntJiluTitItem last">出货</div>
          </div>
          <div class="cntJiluLineBox">
            <div class="cntJiluLine">

            </div>
              <!--circleMove-->
            <div class="circleBox">
                <div class="circleItem tongguo" v-on:click="toStateDet($event)" v-for="circleitem in orderstateList" :key="circleitem.id + 'circle'" v-if="circleitem.tongguo === 'tongguo'" v-bind:class="circleitem.circleMove?'circleMove':''"></div>
              <div class="circleItem" v-for="circleitem in orderstateList" :key="circleitem.id + 'circle'" v-if="circleitem.tongguo !== 'tongguo'" v-bind:class="circleitem.circleMove?'circleMove':''"></div>
              <!--<div class="circleItem"></div>-->
              <!--<div class="circleItem"></div>-->
              <!--<div class="circleItem"></div>-->
            </div>
          </div>
          <div class="cntJiluStateBox">
            <div class="stateItem" v-bind:class="orderstateitem.tongguo === 'tongguo'?'tongguo':''" v-for="orderstateitem in orderstateList" :key="orderstateitem.id">{{orderstateitem.stateText}}</div>
            <!--<div class="stateItem"></div>-->
            <!--<div class="stateItem"></div>-->
            <!--<div class="stateItem"></div>-->
            <!--<div class="stateItem"></div>-->
          </div>
        </div>

        <!--表单上传 ?billId=115&status=BL-->
        <div class="progressItemWrap">
          <form class="myform" enctype="multipart/form-data" action="" method="post">
            <div class="progressTopBox">
              <div class="progressTit">{{currentItemTit}}</div>
              <div class="progressUpBtn">
                <div class="progressIptBox">
                  <input type="file" name="procedureImg" v-on:change="iptChange($event)" id="myfile" class="myfile" accept="image/png, image/gif, image/jpeg" />
                  <div class="progressEndDate">截止日期：<span class="lastdate">{{currentJiezhi}}</span></div>
                </div>
              </div>
              <div class="progressUpBtnReal" v-on:click="imgUpload($event)" v-if="uploadbtnshow">
                <div class="progressUpBtnRealPic"><img src="../assets/imgUploadIcon.png" /></div>
              </div>
            </div>
            <div class="yincangyu"><input type="text" name="billId" class="billId" id="billId" v-bind:value="orderid" /></div>
            <div class="yincangyu"><input type="text" name="status" class="status" id="status" v-bind:value="itemStatus" /></div>
            <!--<div class="progressEndDate">截止日期：<span class="lastdate">2018-05-22</span></div>-->

            <div class="prePicBox">
              <!--<div class="prePic"></div>-->
              <div class="prePic"><img class="yulanpic" src="" /></div>
            </div>

            <div class="subbtn" v-on:click="formSub()" v-if="btnshow">提交</div>
          </form>
        </div>

      </div>
        <!---->
        <div class="coverBox">
            <div class="coverCnt">
                <div class="coverPic">
                    <div class="coverPicAni"><img src="../assets/waiting2.png" /></div>
                </div>
                <div class="coverText">上传中....</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
import $ from 'jquery'
export default {
    name: 'Orderstate',
    store,
    data () {
        return {
            msg: '订单执行，图片上传',
            currentIndex: -1,
            btnshow: true,
            uploadbtnshow: true,
            currentTGPic: '',
            supplierName: '',
            caiName: '',
            genName: '',
            gongyingshang: '',
            createDate: '',
            jiaohuoDate: '',
            itemStatus: '',
            orderid: '',
            billno: '',
            imgBase64: '',
            wzxIndex: -1,
            currentItemTit: '',
            currentJiezhi: '',
            orderstateList: [],
            orderStatePayload: {
                key: 'orderState',
                // queryOrderBillsByStatus queryOrderBillsByStatusForWeb
                url: this.$store.state.baseServiceUrl + '/orderBill/findProcedures',
                postData: {
                    billId: this.orderid
                }
            },
            orderStateInfoPayload: {
                key: 'orderStateInfo',
                // queryOrderBillsByStatus queryOrderBillsByStatusForWeb
                url: this.$store.state.baseServiceUrl + '/orderBill/getOrderBillById',
                postData: {
                    billId: this.orderid
                }
            },
            imgUploadPayload: {
                key: 'imgUpload',
                // queryOrderBillsByStatus queryOrderBillsByStatusForWeb  uploadImgForOrderProcedureForWeb
                url: this.$store.state.baseServiceUrl + '/upload/uploadImgForOrderProcedureForWeb',
                postData: {
                    billId: this.orderid
                }
            }
        }
    },
    created () {
        var that = this
        // this.ini()
        //     this.orderid = this.orderStatePayload.postData.billId = this.orderStateInfoPayload.postData.billId = this.$route.params.order
        //     this.billno = this.$route.params.bill
        this.orderid = this.orderStatePayload.postData.billId = this.orderStateInfoPayload.postData.billId = this.GetQueryString('order')
        // var oodd = this.GetQueryString('order')
        this.billno = this.GetQueryString('bill')
        $('.billId').val(that.orderid)
        // console.log($('.billId').val())
        // $('.billno').text(that.billno)
        // console.log('newid:' + oodd)
        // console.log('jj:' + this.orderid)
        // console.log(this.$route.params.order + ', ' + this.$route.params.bill)
        this.ini()
    },
    watch: {
    // moneyVal (curVal, oldVal) {
    //   if (curVal > 0) {
    //   }
    // }
        currentIndex (curVal, oldVal) {
            // j
        },
        orderstateList (curVal, oldVal) {
            var that = this
            if (this.$store.state.key.orderState.code === 200) {
                that.wzxIndex = -1
                for (var i = 0; i < this.$store.state.key.orderState.msg.length; i++) {
                    if (this.$store.state.key.orderState.msg[i].imgPath) {
                        that.$store.state.key.orderState.msg[i].stateText = '已通过'
                        that.$store.state.key.orderState.msg[i].tongguo = 'tongguo'
                        if (i === 4) {
                            $('.status').val('CH')
                            that.itemStatus = 'CH'
                            that.btnshow = false
                            that.uploadbtnshow = false
                            that.currentItemTit = '已完成'
                            that.currentTGPic = that.$store.state.baseServiceUrl + '/upload/' + that.$store.state.key.orderState.msg[i].imgPath
                            $('.prePic').css('background-image', 'url(' + that.currentTGPic + ')')
                        }
                    } else {
                        if (that.wzxIndex < 0) {
                            // 当前待执行项目索引
                            that.currentIndex = i
                            that.$store.state.key.orderState.msg[i].circleMove = true
                            var statusText = that.$store.state.key.orderState.msg[i].status
                            that.currentJiezhi = that.$store.state.key.orderState.msg[i].deadline
                            // console.log('statusText:' + statusText)
                            switch (statusText) {
                            case 'BL':
                                $('.status').val('BL')
                                that.itemStatus = 'BL'
                                that.currentItemTit = '备料'
                                break
                            case 'SX':
                                $('.status').val('SX')
                                that.itemStatus = 'SX'
                                that.currentItemTit = '上线'
                                break
                            case 'BZ':
                                $('.status').val('BZ')
                                that.itemStatus = 'BZ'
                                that.currentItemTit = '包装'
                                break
                            case 'ZJ':
                                $('.status').val('ZJ')
                                that.itemStatus = 'ZJ'
                                that.currentItemTit = '质检'
                                break
                            case 'CH':
                                $('.status').val('CH')
                                that.itemStatus = 'CH'
                                that.currentItemTit = '出货'
                                break
                            default:
                                console.log(statusText)
                            }
                        }
                        that.wzxIndex = i
                        that.$store.state.key.orderState.msg[i].stateText = '截止:' + that.$store.state.key.orderState.msg[i].deadline
                    }
                }
                that.orderstateList = that.$store.state.key.orderState.msg
            } else if (this.$store.state.key.orderState.code === 303) {
                that.$router.push('/Login')
            }
        }
    },
    computed: {
        getOrderstateData () {
            var that = this
            if (this.$store.state.key.orderState.code === 200) {
                that.orderstateList = that.$store.state.key.orderState.msg
            } else if (this.$store.state.key.orderState.code === 303) {
                that.$router.push('/Login')
            }
            return this.$store.state.key.orderState
        },
        getOrderstateInfoData () {
            var that = this
            if (this.$store.state.key.orderStateInfo) {
                that.caiName = this.$store.state.key.orderStateInfo.msg.buyerName
                that.genName = this.$store.state.key.orderStateInfo.msg.merchandiserName
                that.gongyingshang = this.$store.state.key.orderStateInfo.msg.supplierName
                that.createDate = this.$store.state.key.orderStateInfo.msg.createDate
                that.jiaohuoDate = this.$store.state.key.orderStateInfo.msg.lastModified
                // return this.$store.state.key.orderState
            }
            return this.$store.state.key.orderStateInfo
        }
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
        },
        ini: function () {
            // console.log(1)
            this.$store.commit('callservice', this.orderStatePayload)
            this.$store.commit('callservice', this.orderStateInfoPayload)
        },
        imgUpload: function (e) {
            var clickEvent = $.Event('click')
            $('.myfile').trigger(clickEvent)
        },
        iptChange: function (e) {
            var that = this
            var file = document.getElementById('myfile').files[0]
            // 确认选择的文件是图片
            if (file.type.indexOf('image') === 0) {
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function (e) {
                    // 图片base64化
                    var newUrl = this.result
                    that.imgBase64 = this.result
                    $('.prePic').css('background-image', 'url("' + newUrl + '")')
                }
            }
        },
        formSub: function () {
            // console.log(this.imgBase64)
            if (this.imgBase64) {
                var baseUrl = this.$store.state.baseServiceUrl
                $('.coverBox').fadeIn()
                $('.myform').attr('action', baseUrl + '/upload/uploadImgForOrderProcedureForWeb')
                $('.myform').submit()
            } else {
                // console.log('imgBase64:' + this.imgBase64)
            }
        },
        toStateDet: function (e) {
            var obj = e.currentTarget
            var itemindex = $(obj).index()
            this.$router.push('/OrderstateDet?order=' + this.orderid + '&bill=' + this.billno + '&itemindex=' + itemindex)
        }
    }
}
</script>

<style scoped>
  .codeDebug{
      width: 800px;
      margin: 0 auto;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .pageTit{
    padding: 30px 0;
  }

  .listWrap{
    width: 780px;
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
    width: 130px;
    font-size: 16px;
  }
  .listBox{
    /**/
  }
  .listItem{
    display: flex;
    display: -webkit-flex;
    /*fcfcfc f4fffe*/
    background: #f4fffe;
    padding: 10px 0;
    cursor: pointer;
  }
  .listItem:hover{
    background-color: #d8f2f0;
  }
  .listItemCnt{
    padding-top: 5px;
    font-size: 12px;
    width: 130px;
  }

  .cntJiluWrap{
    font-size: 12px;
    margin-top: 3px;
    background-color: #f4fffe;
    padding: 10px 0;
  }
  .cntJiluTitBox,.cntJiluStateBox{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
  }
  .cntJiluTitItem{
    width: 25%;
  }
  .cntJiluTitItem:nth-child(1){
      width: 12.5%;
      text-align: left;
  }
  .cntJiluTitItem:nth-child(2),.cntJiluTitItem:nth-child(3),.cntJiluTitItem:nth-child(4){
      text-align: center;
  }
  .cntJiluTitItem:nth-child(5){
      width: 12.5%;
      text-align: right;
  }
  .cntJiluLineBox{
    position: relative;
    height: 12px;
  }
  .cntJiluLine{
    height: 6px;
    border-bottom: 1px solid #bbb;
  }
  .circleBox{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
  }
  .circleItem{
    width: 10px;
    height: 10px;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: #fff;
  }
  .bgMove{
      width: 10px;
      height: 10px;
      border-radius: 6px;
  }
  .stateItem{
    width: 25%;
  }
  .stateItem:nth-child(1){
      width: 12.5%;
      text-align: left;
  }
  .stateItem:nth-child(2),.stateItem:nth-child(3),.stateItem:nth-child(4){
      text-align: center;
  }
  .stateItem:nth-child(5){
      width: 12.5%;
      text-align: right;
  }
  /*.stateItemMid{*/
    /*text-align: center;*/
  /*}*/
  /*.first,.last{*/
    /*width: 12.5%;*/
  /*}*/
  /*.first{*/
    /*text-align: left;*/
  /*}*/
  /*.last{*/
    /*text-align: right;*/
  /*}*/
  .tongguo{
    color: #0aa49c;
  }
  .circleItem.tongguo{
    border: 1px solid #0aa49c;
      background-color: #0aa49c;
  }

  .progressItemWrap{
    margin-top: 20px;
  }
  .myfile{
    display: none;
  }
  .progressTopBox{
    display: flex;
    display: -webkit-flex;
  }
  .progressTit{
    _width: 50px;
    font-size: 24px;
    color: #000000;
  }
  .progressUpBtn{
    flex-grow: 1;
    -webkit-flex-grow: 1;
  }
  .progressUpBtnReal{
    width: 50px;
    padding-left: 20px;
    padding-right: 10px;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .progressIptBox{
    padding: 9px 0 0 10px;
  }
  .progressEndDate{
    text-align: left;
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
  .prePic{
    height: 370px;
    overflow: hidden;
    border: 1px solid #ddd;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .prePicBox{
    margin-top: 15px;
  }
  .yulanpic{
    display: none;
  }
  .subbtn{
    width: 60px;
    margin: 0 auto;
    margin-top: 50px;
    text-align: center;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
    background-color: #0aa49c;
  }
  .myCvs{
    width: 100%;
    height: 188px;
    border: 1px solid #aaa;
  }

  .yincangyu{
    height: 0;
    opacity: 0;
  }

  .circleMove{
      background-color: #aaa;
    _animation:circleMove 1.5s linear infinite;
  }
  @-webkit-keyframes circleMove
  {
    0% { background-color: #eee}
    50% {background-color: #aaa}
    100% {background-color: #eee}
  }

  /*loading  waiting*/
  .coverBox{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.5);
      display: none;
  }
  .coverCnt{
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
  }
  .coverPic{
      width: 50px;
      height: 50px;
      margin: 0 auto;
  }
  .coverText{
      margin-top: 5px;
      text-align: center;
      color: #fff;
  }
  .coverPicAni{
      animation:loadingMove 1.5s linear infinite;
  }
  @-webkit-keyframes loadingMove
  {
      from { transform:rotate(0deg)}
      to {transform:rotate(360deg)}
  }
</style>
