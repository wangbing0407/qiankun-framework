<template>
  <div id="app">
    <div class="menu-left">
      <el-menu :router="true" default-active="2" class="el-menu-vertical-demo"  @open="handleOpen"
        @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/app-vue-hash">
          <i class="el-icon-menu"></i>
          <span slot="title">vue2子应用</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div id="nav" class="info">
      <div>
        <el-descriptions title="我是用initGlobalState设置的全局人员变量">
          <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ info.age }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" size="small" round @click="setGlobalVariable">主应用设置全局人员参数</el-button>
      </div>
      <div>
        <el-descriptions title="我是用props设置的全局汽车变量">
          <el-descriptions-item label="品牌">{{ carPrices.name }}</el-descriptions-item>
          <el-descriptions-item label="价格">{{ carPrices.price }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" size="small" round @click="setCarPrice">主应用设置全局汽车参数</el-button>
      </div>
    </div>
    <div id="appContainer"></div>
    <router-view/>
  </div>
</template>

<script>
import actions from './utils/actions'; 

export default {
  data() {
    return {
      info: {
        name: '',
        age: null
      }
    }
  },
  computed: {
    carPrices() {
      return this.$store.state.carInfo
    }
  },
  mounted() {
    let data = {
      name: '张三',
      age: 18
    }
    actions.onGlobalStateChange((state, prevState) => {
      console.log('当前的', state);
      console.log('修改之前的', prevState);
      for(let key in this.info) {
        this.info[key] = state[key]
      }
    })
    actions.setGlobalState(data);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    setGlobalVariable() {
      actions.setGlobalState({name: '张三', age: 18});
    },
    setCarPrice() {
      let carInfo = {
        name: '比亚迪',
        price: '19W',
      }
      this.$store.commit('setCarInfo', carInfo)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.info {
  display: flex;
}
</style>
