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

      <div v-if="isTableEmpty" class="empty-table center">
        <h5>В выборке отсутствуют элементы.</h5>
        <h6>Попрбуйте выбрать другие даты.</h6>
      </div>

      <table v-else-if="!isTableEmpty">
        <thead>
        <tr>
          <th>Имя сотрудника</th>
          <th>Дата открытия</th>
          <th>Дата закрытия</th>
          <th>Итого</th>
        </tr>
        </thead>

        <tbody v-for="day in pagination.pages[pagination.currentPage-1].days" :key="day._id">
        <tr>
          <td>{{ day.opened_by.username }}</td>
          <td>{{ day.opened_at ? dateTimeFilter(day.opened_at) : '' }}</td>
          <td>{{ day.closed_at ? dateTimeFilter(day.closed_at) : '' }}</td>
          <td>{{ day.avgSum }}</td>
        </tr>

        </tbody>
      </table>
    </div>

  </div>
<!--  <a onclick="M.toast({html: 'I am a toast', displayLength: 4000, classes: 'rounded', opacity: 0.3})"-->
<!--     class="btn">Toast!</a>-->
</template>

<script>

import { useStore } from 'vuex'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { dateTimeFilter, formatPeriod, getLastWeekPeriod, convertDateForApiRequest } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import Loader from '@/components/Loader'
import Datepicker from 'vue3-date-time-picker'
import M from 'materialize-css'

export default {
  components: { Loader, Datepicker },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const datePickerDates = getLastWeekPeriod()

    watch(datePickerDates, async () => {
      await router.replace(`/history/1`)
      if (datePickerDates.value === null) {
        console.log('RESETED')
        store.commit('DaysHistory_SET', [])
        store.commit('DaysHistoryNew_SET', [])
      } else {
        await store.dispatch('DAYS_HISTORY_NEW_FETCH', [convertDateForApiRequest(datePickerDates.value[0]), convertDateForApiRequest(datePickerDates.value[1])])
      }
    })

    const isLoading = ref(true)
    const daysAmount = ref(computed(() => store.getters.daysAmount))
    const pagesAmount = ref(computed(() => Math.ceil(daysAmount.value / pagination.maxDaysOnPage)))
    const isTableEmpty = ref(computed(() => (daysAmount.value === 0)))


    onBeforeMount(async () => {
      await store.dispatch('DAYS_HISTORY_NEW_FETCH', [convertDateForApiRequest(datePickerDates.value[0]), convertDateForApiRequest(datePickerDates.value[1])])
      const page = route.params.id

      if ((page > pagination.pages.length) || (!page)) {
        await router.replace('/history/1')
      }

      M.AutoInit()

      isLoading.value = false
    })

    const pagination = reactive({
      maxDaysOnPage: 3,
      currentPage: computed(() => parseInt(route.params.id)),
      pages: computed(() => {
        const daysCopy = ref(store.getters.daysHistory)
        let newPagesArr = []
        for (let i = 1; i < pagesAmount.value + 1; i++) {
          let part = daysCopy.value.splice(0, pagination.maxDaysOnPage)
          newPagesArr.push({
            number: i,
            days: part
          })
        }
        return newPagesArr
      }),

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

    const daysHistory = computed(() => store.getters.daysHistory)

    return {
      daysHistory,
      dateTimeFilter,
      pagination,
      isLoading,
      datePickerDates,
      formatPeriod,
      daysAmount,
      pagesAmount,
      isTableEmpty
    }
  }

}
</script>

<style lang="scss">
@import "../../public/datepicker";
@import "~materialize-css/sass/materialize";
@import "~materialize-css/sass/components/toast";

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

    ul.pagination > li.active {
      background-color: #2b2b4d !important;
      color: #dbdbdb !important;
    }
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

.toast {
  &:not(.show) {
    display: block;
  }

  border-radius: 12px !important;
  top: 35px;
  width: auto;
  margin-top: 10px;
  position: relative;
  max-width: 100%;
  height: auto;
  min-height: 48px;
  line-height: 1.5em;
  background-color: rgb(43, 43, 77);
  padding: 10px 25px;
  font-size: 1.1rem;
  font-weight: 300;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}
</style>