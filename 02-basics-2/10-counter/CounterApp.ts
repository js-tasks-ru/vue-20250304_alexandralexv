import { defineComponent, ref, type Ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const num: Ref<number> = ref(0)

    return {
      num,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="num <= 0"
        @click="num--"
      >➖</button>

      <span class="count" data-testid="count">{{ num }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="num >= 5"
        @click="num++"
      >➕</button>
    </div>
  `,
})
