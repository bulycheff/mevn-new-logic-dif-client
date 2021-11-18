<template>
  <div v-if="loading" class="loading">
    <Loader/>
  </div>
  <div style="margin-top: 20px;" v-else-if="!isDayOpen" class="no-content">
    Нет открытых дней
  </div>
  <div v-else class="row">
    <div class="card">
      <div v-for="day in dayList" :key="day._id" class="card-panel">
        <div>Дата открытия: {{ dateFilter(day.opened_at, 'datetime') }}</div>
        <div>Статус:
          <router-link to="/clients">{{ day.status }}</router-link>
        </div>
        <div>Клиентов: {{ day.client.length }}</div>
        <div>Программы: 6</div>
        <div>Бар: 7</div>
        <div><span>Закрыть:</span> <span @click.stop="closeDayById(day._id)"
                                         class="material-icons small red-text edit-link link">close</span>
        </div>
      </div>
    </div>
  </div>
  <i v-if="!isDayOpen" @click.stop="createNewDay" class="material-icons green-text small link plus">add</i>

</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import Loader from '@/components/Loader'
import { dateFilter } from '@/utils'

export default {
  components: {
    Loader
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const dayList = ref([])
    const isFormOpen = ref(false)
    const isEditFormOpen = ref(false)
    const isDayOpen = ref(false)

    const onDataReload = async () => {
      await store.dispatch('DayFetchAllFromServer', 'opened')
      dayList.value = computed(() => store.getters.dayList).value
      isDayOpen.value = dayList.value.length > 0
    }

    onBeforeMount(async () => {
      await onDataReload()
      loading.value = false
    })

    const closeFormAndReloadList = async () => {
      await onDataReload()
      isFormOpen.value = false
    }

    const removeItemFromList = async (id) => {
      await store.dispatch('RemoveDayFromServerById', id)
      await onDataReload()
    }

    const createNewDay = async () => {
      await store.dispatch('DayCreateOnServer', {})
      await onDataReload()
    }

    const closeDayById = async (id) => {
      const payload = {}
      payload.id = id
      payload.status = 'closed'

      await store.dispatch('DayUpdateOnServerById', payload)
      await onDataReload()

    }

    return {
      loading,
      dayList,
      closeFormAndReloadList,
      isFormOpen,
      removeItemFromList,
      isEditFormOpen,
      createNewDay,
      closeDayById,
      dateFilter,
      isDayOpen
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

</style>