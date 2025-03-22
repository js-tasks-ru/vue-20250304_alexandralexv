import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    type Operator = 'sum' | 'subtract' | 'multiply' | 'divide'

    const operator = ref<Operator>('sum')
    const firstOperand = ref<number>(0)
    const secondOperand = ref<number>(0)

    function calculation(first: number, second: number, operator: Operator): number | 'Error' {
      switch (operator) {
        case 'sum':
          return first + second
        case 'subtract':
          return first - second
        case 'multiply':
          return first * second
        case 'divide':
          return second !== 0 ? first / second : 'Error'
        default:
          throw new Error('Unknown operator')
      }
    }

    const result = computed(() => {
      return calculation(firstOperand.value, secondOperand.value, operator.value)
    })

    return {
      result,
      firstOperand,
      secondOperand,
      operator,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
