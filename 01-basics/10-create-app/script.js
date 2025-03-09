import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    const DATE = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })

    return {
      DATE,
    }
  },

  template: `<div>Сегодня {{ DATE }}</div>`,
})

const app = createApp(App)
const vm = app.mount('#app')
window.vm = vm