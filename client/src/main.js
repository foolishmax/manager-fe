import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import request from './utils/request';
import { globalRegister } from './global'
import api from './api'
import store from './store'

const app = createApp(App)

//方式一
// globalRegister(app)

//方式二
// app.use(globalRegister)

//方式三
app.use({
  install: globalRegister
})

app.config.globalProperties.$request=request;
app.config.globalProperties.$api = api;

app.use(router)
app.use(store)
app.mount('#app')
