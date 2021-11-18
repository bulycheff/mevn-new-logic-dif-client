import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/dist/js/materialize.min'
import 'materialize-css/dist/js/materialize'
import M from 'materialize-css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')

M.AutoInit()