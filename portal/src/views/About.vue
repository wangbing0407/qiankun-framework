<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-row>
      <el-button type="primary" round @click="setGlobalVariable">主应用设置全局参数</el-button>
    </el-row>
  </div>
</template>

<script>
import actions from '../utils/actions';

export default {
  data() {
    return {

    }
  },
  methods: {
    setGlobalVariable() {
      let data = {
        name: 'wang',
        age: 18
      }
      actions.onGlobalStateChange((state, prevState) => {
        console.log('当前的', state);
        console.log('修改之前的', prevState);
      })
      actions.setGlobalState(data);
    }
  }
}
</script>
