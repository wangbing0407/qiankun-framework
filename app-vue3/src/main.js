import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let instance = null

function render({ container } = {}) {
  instance = createApp(App)
  instance.use(router)
  instance.use(store)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

// 如何独立运行微应用？
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap(props) {
  // 启动
}
export async function mount(props) {
  // 挂载
  render(props)
}
export async function unmount(props) {
  // 卸载
  instance.unmount()
  instance = null
}
