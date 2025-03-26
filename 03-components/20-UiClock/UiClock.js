import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  props: {
    locale: {
      type: String,
      default: navigator.language,
    },

    timeStyle: {
      type: String,
      default: 'medium',
      validator: value => {
        return ['full', 'long', 'medium', 'short'].includes(value)
      },
    },
  },

  setup(props) {
    const time = ref('')

    const updateTime = () => {
      time.value = new Date().toLocaleString(props.locale, { timeStyle: props.timeStyle })
    }

    onMounted(() => {
      updateTime()
      const intervalId = setInterval(updateTime, 1000)
      onUnmounted(() => {
        clearInterval(intervalId)
      })
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
