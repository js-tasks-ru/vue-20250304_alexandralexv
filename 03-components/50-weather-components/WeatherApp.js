import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherCard from './WeatherCard.js'

function timeOfDay(weatherData) {
  let weatherDataCurrent = weatherData.current
  return weatherDataCurrent.dt < weatherDataCurrent.sunrise || weatherDataCurrent.sunset < weatherDataCurrent.dt
}

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard,
  },

  setup() {
    return {
      weatherDatas: getWeatherData(),
      weatherConditions: WeatherConditionIcons,
      timeOfDay,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="weatherData in weatherDatas"
        :weatherData="weatherData"
        :weatherConditions="weatherConditions"
        :isNight="timeOfDay(weatherData)"/>
      </ul>
    </div>
  `,
})
