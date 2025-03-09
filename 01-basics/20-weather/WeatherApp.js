import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

function timeOfDay(weatherData) {
  let weatherDataCurrent = weatherData.current
  return weatherDataCurrent.dt < weatherDataCurrent.sunrise || weatherDataCurrent.sunset < weatherDataCurrent.dt
}

export default defineComponent({
  name: 'WeatherApp',

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
        <li v-for="weatherData in weatherDatas" class="weather-card" :class="{'weather-card--night': timeOfDay(weatherData)}">
          <div v-if="weatherData.alert != null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherData.alert.sender_name }}: {{ weatherData.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{weatherData.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{ weatherData.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherData.current.weather.description">{{ weatherConditions[weatherData.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (weatherData.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (weatherData.current.pressure * 75 / 100).toFixed() }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherData.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherData.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherData.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})