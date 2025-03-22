import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',
  setup() {
    const meetupId = ref<number>(1)
    const meetupTitle = ref<string>('Loading...')
    const maxMeetupId: number = 5

    const fetchMeetupData = async (id: number) => {
      try {
        const meetup = await getMeetup(id)
        meetupTitle.value = meetup.title
      } catch (error) {
        console.error('Failed to fetch meetup data:', error)
      }
    }

    watch(
      meetupId,
      async newId => {
        await fetchMeetupData(newId)
      },
      { immediate: true },
    )

    const prevMeetup = () => {
      if (meetupId.value > 1) {
        meetupId.value--
      }
    }

    const nextMeetup = () => {
      if (meetupId.value < maxMeetupId) {
        meetupId.value++
      }
    }

    return {
      meetupId,
      meetupTitle,
      maxMeetupId,
      prevMeetup,
      nextMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button 
          class="button button--secondary" 
          type="button" 
          :disabled="meetupId === 1"
          @click="prevMeetup"
        >
          Предыдущий
        </button>
        <div class="radio-group" role="radiogroup">
          <div 
            v-for="id in maxMeetupId" 
            :key="id" 
            class="radio-group__button"
          >
            <input
              :id="'meetup-id-' + id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model.number="meetupId"
            />
            <label :for="'meetup-id-' + id" class="radio-group__label">{{ id }}</label>
          </div>
        </div>
        <button 
          class="button button--secondary" 
          type="button" 
          :disabled="meetupId === maxMeetupId"
          @click="nextMeetup"
        >
          Следующий
        </button>
      </div>
      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>
    </div>
  `,
})
