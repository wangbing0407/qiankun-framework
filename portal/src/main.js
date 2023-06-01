import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

const apps = [
  {
    name: 'app-vue-hash',
    entry: 'http://localhost:9912',
    container: '#appContainer',
    activeRule: '/app-vue-hash',
    props: { data: { store, router } },
  },
  {
    name: 'app-vue3',
    entry: 'http://localhost:9913',
    container: '#appContainer',
    activeRule: '/app-vue3',
    props: { data: {} },
  },
  {
    name: 'app-react',
    entry: 'http://localhost:9914',
    container: '#appContainer',
    activeRule: '/app-react',
    props: { data: {} },
  },
]

registerMicroApps(apps, {
  beforeLoad: (app) => {
    console.log('before load', app.name)
    return Promise.resolve()
  },
  beforeMount: [(app) => console.log('before mount', app.name)],
})
start()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
