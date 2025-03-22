import { defineComponent, ref, watch } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },

    count: {
      type: Number,
      required: true,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const num = ref<number>(props.count)

    watch(
      () => props.count,
      newValue => {
        num.value = newValue
      },
    )

    function changeCount(operator: string): void {
      let newValue: number = num.value

      if (operator === 'decrement') {
        newValue--
      } else if (operator === 'increment') {
        newValue++
      }

      if (newValue >= props.min && newValue <= props.max) {
        num.value = newValue
        emit('update:count', newValue)
      }
    }

    return {
      num,
      changeCount,
    }
  },

  template: `
    <div class="counter">
      <UiButton 
        aria-label="Decrement" 
        @click="changeCount('decrement')"
        :disabled="count <= min">
        ➖</UiButton>
      <span class="count" data-testid="count">{{ num }}</span>
      <UiButton 
        aria-label="Increment" 
        @click="changeCount('increment')"
        :disabled="count >= max">
        ➕</UiButton>
    </div>
  `,
})
