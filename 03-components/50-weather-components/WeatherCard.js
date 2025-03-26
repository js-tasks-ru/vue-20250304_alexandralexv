import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert'
import WeatherIcon from './WeatherIcon'
import WeatherDetails from './WeatherDetails'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherIcon,
    WeatherDetails,
  },

  props: {
    weatherData: {
      type: Object,
      required: true,
    },

    weatherConditions: {
      type: Object,
      required: true,
    },

    isNight: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    temperature() {
      return (this.weatherData.current.temp - 273.15).toFixed(1)
    },
  },

  template: `
        <li class="weather-card" :class="{'weather-card--night': isNight}">
          <WeatherAlert :alert="weatherData.alert" />
          <div>
            <h2 class="weather-card__name">
              {{weatherData.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{ weatherData.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
          <WeatherIcon 
          :icon="weatherConditions[weatherData.current.weather.id]" 
          :description="weatherData.current.weather.description" 
          />
            <div class="weather-conditions__temp">{{ temperature }} °C</div>
          </div>
          <WeatherDetails
          :pressure="(weatherData.current.pressure * 75 / 100).toFixed()"
          :humidity="weatherData.current.humidity"
          :clouds="weatherData.current.clouds"
          :windSpeed="weatherData.current.wind_speed"
          />
        </li>
  `,
})
