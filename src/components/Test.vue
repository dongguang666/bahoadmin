<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <div class="testjq">这个是测试jquery</div>
    <h3>{{$store.state.mymsg}}</h3>
    <div class="changeStore"><button type="button" v-on:click="changestate" class="changeStoreBtn">改变state</button> </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import $ from 'jquery'
export default {
    name: 'Test',
    store,
    data () {
        return {
            msg: '这个是Test'
        }
    },
    methods: {
        changestate: function () {
            // alert(123)
            this.$store.commit('changeState', 'lala')
            $('.testjq').fadeOut()
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
