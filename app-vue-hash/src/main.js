import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import action from './utils/action'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VXETable)

let router = null
let instance = null

function render({ data = {}, container } = {}) {
  router = new VueRouter({
    routes,
  })
  instance = new Vue({
    router,
    store,
    data() {
      return {
        parentRouter: data.router,
        parentVuex: data.store,
      }
    },
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue app bootstraped')
}

export async function mount(props) {
  action.setActions(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
