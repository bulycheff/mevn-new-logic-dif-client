<template>
  <div v-if="isLoading" class="loading">
    <Loader/>
  </div>

  <div v-else-if="!isLoading" class="days-content-page">
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-2">
          <div class="card-content white-text">
            <span class="card-title">{{ userGreet() }}, {{ name }}.</span>
            <span v-show="isDayOpen" class="card-title">Рабочая смена открыта.</span>
            <span v-show="!isDayOpen" class="card-title">Открытых рабочих смен нет.</span>
            <div v-if="!isDayOpen" class="card-action">
              <span @click.stop="createNewDay" class="days-link">Открыть смену</span>
            </div>
            <p style="display: none"> Чтобы приступить к работе, необходимо открыть рабочую смену.</p>
            <div v-for="day in dayList" :key="day._id" class="day-info">
              <hr>
              <h6>Инфо о смене:</h6>
              <p>Дата начала: {{ dateFilter(dayInfo.opened_at, 'datetime') }}</p>
              <p>Последний заказ: {{ dateFilter(dayInfo.last, 'datetime') }}</p>
              <hr>
              <p>Клиентов: {{ dayInfo.clients }}</p>
              <p>Программ: {{ dayInfo.programs.value }}</p>
              <p>Покупок по бару: {{ dayInfo.bars.value }}</p>
              <hr>
              <p>Программы: {{ dayInfo.programs.sum }}</p>
              <p>Бар: {{ dayInfo.bars.sum }}</p>
              <h6>Итого: {{ dayInfo.total.sum }}</h6>
              <div class="card-action">
                <router-link to="/clients">Клиенты</router-link>
                <span @click.stop="closeDayById(day._id)" class="days-link" v-if="isDayOpen">Заркыть смену</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import Loader from '@/components/Loader'
import { dateFilter } from '@/utils'
import { userGreet } from '@/utils'

export default {
  components: {
    Loader
  },
  setup() {
    const store = useStore()
    const isLoading = ref(true)

    const isFormOpen = ref(false)
    const isEditFormOpen = ref(false)
    const isDayOpen = computed(() => dayList.value.length > 0)
    const dayList = ref(computed(() => store.getters.dayList))
    const dayInfo = ref(computed(() => store.getters.dayAgrInfo))
    const name = computed(() => store.getters.user.name)

    onBeforeMount(async () => {
      await store.dispatch('DayFetchAllFromServer', 'opened')
      await store.dispatch('DayAgrInfoAboutById')
      isLoading.value = false
    })

    const removeItemFromList = async (id) => {
      await store.dispatch('RemoveDayFromServerById', id)
      await store.dispatch('DayFetchAllFromServer', 'opened')
      await store.dispatch('DayAgrInfoAboutById')
    }

    const createNewDay = async () => {
      await store.dispatch('DayCreateOnServer', {})
      await store.dispatch('DayFetchAllFromServer', 'opened')
      await store.dispatch('DayAgrInfoAboutById')
    }

    const closeDayById = async (id) => {
      const payload = {
        id,
        status: 'closed'
      }

      await store.dispatch('DayUpdateOnServerById', payload)
      await store.dispatch('DayFetchAllFromServer', 'opened')

    }

    return {
      isLoading,
      dayList,
      isFormOpen,
      removeItemFromList,
      isEditFormOpen,
      createNewDay,
      closeDayById,
      dateFilter,
      isDayOpen,
      userGreet,
      dayInfo,
      name
    }

  }
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.plus {
  margin-top: 30px;
}

.programs {
  color: white;
  display: grid;
  grid-gap: 10px;

  & > .card-panel {
    grid-template-columns:
      repeat(auto-fill, minmax(250px, 250px));
    background-color: #2b2b4d;
    border-radius: 10px;
    margin: 10px;
    height: 100%;
  }
}

.toast:not(.view) {
  display: block;
}

.days-link {
  color: #ffab40;
  margin-right: 24px;
  transition: color .3s ease;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #ffd8a6;
  }
}

.card-content {
  padding: 40px;

  .card-action {
    padding-left: 0;
    padding-top: 20px;
    margin-top: 20px;
  }
}

</style>