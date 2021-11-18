<template>
  <div class="client-purchases">
    <div class="card-panel client-purchases__title">
      <p>{{ client.name }}</p>
      Открыт: {{ opened_at }}.
      Программы: {{ total.program }} ₽.
      Бар: {{ total.bar }} ₽.
      Тотал: {{ total.bar + total.program }} ₽.
    </div>
    <ClientProgram/>
    <ClientBar/>
    <br>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onBeforeMount } from 'vue'
import ClientProgram from '@/components/ClientProgram'
import ClientBar from '@/components/ClientBar'
import { dateFilter } from '@/utils'
import M from 'materialize-css'

export default {
  components: { ClientBar, ClientProgram },
  setup() {
    const route = useRoute()
    const store = useStore()
    const id = computed(() => route.params.id)
    const client = computed(() => store.getters.clientToEdit)
    const opened_at = computed(() => dateFilter(client.value.opened_at, 'datetime'))

    onBeforeMount(async () => {
      await store.dispatch('ClientFetchOneFromServerById', id.value)
      await store.dispatch('PURCHASE_FETCH_ALL_BY_CLIENT_ID', client.value._id)
      await store.dispatch('CASH_FetchAll', { apiPath: 'base/cash' })
      await store.dispatch('CARD_FetchAll', { apiPath: 'base/card' })
      await store.dispatch('METHOD_FetchAll', { apiPath: 'base/method' })
      await store.dispatch('ROOM_FetchAll', { apiPath: 'base/room' })
      await store.dispatch('SERVICE_FetchAll', { apiPath: 'base/service' })
      await store.dispatch('BarFetchAllFromServer')
      await store.dispatch('FetchEmployeeListFromServer')
      await store.dispatch('ProgramFetchAllFromServer')
      M.AutoInit()
    })

    return {
      client,
      dateFilter,
      total: computed(() => store.getters.purchaseListTotal),
      opened_at
    }

  }
}
</script>

<style lang="scss" scoped>
.client-purchases {
}

.card-action {
}

.client-purchases__title {
  background: rgba(141, 163, 153, 0.2);

  & > p {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 3rem;
    color: #3c494a;
    text-shadow: 0 1px #808d93,
    -1px 0 #cdd2d5,
    -1px 2px #808d93,
    -2px 1px #cdd2d5,
    -2px 3px #808d93,
    -3px 2px #cdd2d5,
    -3px 4px #808d93,
    -4px 3px #cdd2d5,

  }
}
</style>