<template>
  <Loader v-if="isLoading"/>
  <div class="history" v-else-if="!isLoading">

    <div class="datepicker-block">
      <Datepicker
          range
          v-model="datePickerDates"
          locale="ru"
          cancelText="отменить"
          selectText="выбрать"
          :enableTimePicker="false"
          :format="formatPeriod"
          :previewFormat="formatPeriod"
      />

    </div>

    <div class="pagination-block">
      <ul class="pagination">

        <li :class="{disabled: pagination.currentPage===1}">
          <router-link :to="`${pagination.oneStep('backward')}`">
            <i class="material-icons">chevron_left</i>
          </router-link>
        </li>

        <li
            v-for="page in pagination.pages"
            :key="page.number"
            :class="{active: pagination.currentPage===page.number}"
        >
          <router-link :to="`/history/${page.number}`">{{ page.number }}</router-link>
        </li>

        <li :class="{disabled: pagination.currentPage===pagination.pages.length}">
          <router-link :to="`${pagination.oneStep('forward')}`">
            <i class="material-icons">chevron_right</i>
          </router-link>
        </li>

      </ul>
    </div>

    <div class="content-block">

      <table>
        <thead>
        <tr>
          <th>Имя сотрудника</th>
          <th>Дата открытия</th>
          <th>Дата закрытия</th>
          <th>Сумма</th>
        </tr>
        </thead>

        <tbody v-for="day in pagination.pages[pagination.currentPage-1].days" :key="day._id">
        <tr>
          <td>{{ day.opened_by }}</td>
          <td>{{ day.opened_at ? dateTimeFilter(day.opened_at) : '' }}</td>
          <td>{{ day.closed_at ? dateTimeFilter(day.closed_at) : '' }}</td>
          <td>{{ day.avgSum }}</td>
        </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import { useStore } from 'vuex'
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { dateTimeFilter, formatPeriod } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import Loader from '@/components/Loader'
import Datepicker from 'vue3-date-time-picker'

export default {
  components: { Loader, Datepicker },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const datePickerDates = ref()

    const isLoading = ref(true)

    onBeforeMount(async () => {
      await store.dispatch('DAYS_HISTORY_FETCH')
      const daysAmount = store.getters.daysAmount
      pagination.setPages(daysAmount)
      const page = route.params.id

      if ((page > pagination.pages.length) || (!page)) {
        await router.replace('/history/1')
      }

      isLoading.value = false
    })

    onMounted(() => {
      const startDate = new Date((new Date()).setHours(0, 0, 0, 0))
      const endDate = new Date(startDate)
      startDate.setDate(startDate.getDate() - 7)
      datePickerDates.value = [startDate, endDate]
    })

    const pagination = reactive({
      itemPerPage: 3,
      currentPage: computed(() => parseInt(route.params.id)),
      pages: [],
      setPages: function (daysAmount) {
        const pagesAmount = Math.ceil(daysAmount / this.itemPerPage)
        let daysCopy = daysHistory.value

        let newPagesArr = []
        for (let i = 1; i < pagesAmount + 1; i++) {
          let part = daysCopy.splice(0, this.itemPerPage)
          newPagesArr.push({
            number: i,
            days: part
          })
        }
        this.pages = newPagesArr
      },
      oneStep: (direction) => {
        if (!direction) return
        let id = route.params.id
        if ((direction === 'forward') && (id < pagination.pages.length)) {
          id++
        } else if ((direction === 'backward') && (id > 1)) {
          id--
        }
        return `/history/${id}`
      }
    })

    const daysHistory = computed(() => {
      let days = store.getters.daysHistory
      return days.sort((a, b) => new Date(b.opened_at) - new Date(a.opened_at))
    })

    return {
      daysHistory,
      dateTimeFilter,
      pagination,
      isLoading,
      datePickerDates,
      formatPeriod
    }
  }

}
</script>

<style lang="scss">
@import "~vue3-date-time-picker/dist/main.css";

.active {
  background-color: #2b2b4d !important;
  color: #dbdbdb !important;
}

.history {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content-block {
    width: 100%;
    height: 100%;
  }

  .pagination-block {
    margin-top: 20px;
    height: auto;
  }

}


div.dp__main.dp__theme_light > div > .dp__input_wrap {
  display: flex;

  & > input.dp__pointer.dp__input.dp__input_icon_pad {
    text-align: center !important;
    margin: 0;
    padding: 0 45px 0 45px;
  }
}

.dp__main {
  width: 110%;
}

</style>