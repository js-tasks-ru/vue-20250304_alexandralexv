import { defineComponent, ref, watch, type HTMLAttributes, type Ref } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    let x = ref<number>(0)
    let y = ref<number>(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event: MouseEvent) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    return {
      x,
      y,
      handleClick,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="{ left: x + 'px', top: y + 'px' }">📍</span>
    </div>
  `,
})
