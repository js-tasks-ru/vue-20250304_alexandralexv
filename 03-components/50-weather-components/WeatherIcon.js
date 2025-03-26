import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-conditions__icon" :title="description">
      {{ icon }}
    </div>
  `,
})
