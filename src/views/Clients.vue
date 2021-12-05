<template>
  <div @click="router.replace(`/days/`)" class="backward-to-days-list">
    <i class="material-icons">arrow_back_ios</i>
  </div>
  <Loader v-if="isLoading"/>
  <div v-else class="clients">
    <div class="card">
      <div class="card-content">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Имя клиента</th>
            <th>Дата начала</th>
            <th>Сумма</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cl in clients" :key="cl._id">
            <td>#</td>
            <td>
              <router-link :to="`/client/${cl._id}`">
                {{ cl.name }}
              </router-link>
            </td>
            <td>{{ dateFilter(cl.opened_at, 'datetime') }}</td>
            <td>{{ cl.closed_at }}</td>
          </tr>
          </tbody>
        </table>
        <i @click.stop="isAddFormOpen=!isAddFormOpen" class="material-icons small link">add</i>
        <ClientAdd v-if="isAddFormOpen" @close-form-and-reload-list="closeFormAndReloadData"/>
      </div>
    </div>
    <br>
  </div>

</template>

<script>
import { dateFilter } from '@/utils'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import Loader from '@/components/Loader'
import { useStore } from 'vuex'
import ClientAdd from '@/components/ClientAdd'
import M from 'materialize-css'
import { useRouter } from 'vue-router'

export default {
  components: { ClientAdd, Loader },
  setup() {
    const router = useRouter()
    const store = useStore()
    const isLoading = ref(true)
    const isAddFormOpen = ref(false)
    const openedDay = computed(() => store.getters.openedDay)

    const onDataReload = async () => {
      await store.dispatch('DayFetchAllFromServer', 'opened')

      let payload = {
        dayId: openedDay.value._id
      }
      await store.dispatch('ClientFetchAllFromServer', payload)
      await store.dispatch('ClientFetchAgrByDayId', openedDay.value._id)
    }

    onBeforeMount(async () => {
      await onDataReload()
      isLoading.value = false
    })

    onMounted(() => {
      M.AutoInit()
    })

    const closeFormAndReloadData = async () => {
      isAddFormOpen.value = false
      await onDataReload()
    }

    return {
      isLoading,
      openedDayId: computed(() => store.getters.openedDayId),
      isDayOpen: computed(() => store.getters.isDayOpen),
      clients: computed(() => store.getters.clientList),
      isAddFormOpen,
      closeFormAndReloadData,
      openedDay,
      dateFilter,
      router
    }
  }

}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  margin-top: 10px;

}

.backward-to-days-list {
  cursor: pointer;
}
</style>