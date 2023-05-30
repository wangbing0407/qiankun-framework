<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="我是vue子应用"/>
    <div class="info">
      <div>
        <el-descriptions title="我是用initGlobalState设置的全局人员变量">
          <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ info.age }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="danger" size="small" round @click="setGlobalVariable">子应用使用setGlobal修改全局参数</el-button>
      </div>
      <div>
        <el-descriptions title="我是用props设置的全局汽车变量">
          <el-descriptions-item label="品牌">{{ carPrices.name }}</el-descriptions-item>
          <el-descriptions-item label="价格">{{ carPrices.price }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="danger" size="small" round @click="setCarPrice">子应用使用props修改全局参数</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import action from '@/utils/action'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      info: {},
      isQiankun: window.__POWERED_BY_QIANKUN__
    }
  },
  computed: {
    carPrices() {
      return this.isQiankun ? this.$root.parentVuex.state.carInfo : '';
    }
  },
  mounted() {
    // 接收state
    action.onGlobalStateChange((state) => {
        console.log(state)
        this.info = state
    }, true);
  },
  methods: {
    // 子应用设置全局变量
    setGlobalVariable() {
      action.setGlobalState({name: '李四', age: 20})
    },
    setCarPrice() {
      const priceInfo = {
        name: '奔驰',
        price: '30W'
      }
      if(this.isQiankun){
        this.$root.parentVuex.commit('setCarInfo', priceInfo);
      }
    }
  }
}
</script>

<style>
.info {
  display: flex;
}
</style>