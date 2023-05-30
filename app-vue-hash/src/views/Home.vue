<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="我是vue子应用"/>
    <el-descriptions title="我是用initGlobalState设置的全局变量">
      <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ info.age }}</el-descriptions-item>
    </el-descriptions>
    <el-button type="danger" size="small" round @click="setGlobalVariable">使用setGlobal修改全局参数</el-button>
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
      info: {}
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
    }
  }
}
</script>
