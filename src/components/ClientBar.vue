<template>

  <ul class="collapsible">
    <li>
      <div class="collapsible-header">
        <i class="material-icons-round icon-font">local_bar</i>
        <span>Бар</span>
      </div>
      <div class="card-content collapsible-body">
        <table v-if="!barListIsEmpty">
          <thead>
          <tr>
            <th></th>
            <th>Время</th>
            <th>Наименование</th>
            <th>Стоимость</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="item in purchaseList" :key="item._id">
            <td>
              <span class="material-icons-round">edit_note</span>
            </td>
            <td>{{ dateFilter(item.opened_at, 'datetime') }}</td>
            <td>{{ item.item_name }}</td>
            <td>{{ item.item_cost_discounted }}</td>
            <td>
              <span @click.stop="deleteItemById(item._id)" class="material-icons-round link">delete_outline</span>
            </td>
          </tr>
          </tbody>
        </table>
        <br>
        <i v-if="!isFormActive" @click.stop="isFormActive=true" class="material-icons small link">add</i>
        <i v-if="isFormActive" @click.stop="isFormActive=false" class="material-icons small link">remove</i>
        <ClientBarAdd @close-add-bar-form="isFormActive=!isFormActive" v-if="isFormActive"/>
      </div>
    </li>
  </ul>
</template>

<script>
import ClientBarAdd from '@/components/ClientBarAdd'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { dateFilter } from '@/utils'

export default {
  components: { ClientBarAdd },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isFormActive = ref(false)

    const client = computed(() => store.getters.clientToEdit)
    const day = computed(() => store.getters.openedDay)
    const purchaseList = computed(() => store.getters.purchaseList.filter(item => item.payment_category === 'bar'))
    const barListIsEmpty = computed(() => !purchaseList.value.length)

    onMounted(async () => {
      const id = route.params.id
      await store.dispatch('PURCHASE_FETCH_ALL_BY_CLIENT_ID', id)
    })

    return {
      isFormActive,
      client,
      day,
      purchaseList,
      barListIsEmpty,
      dateFilter,
      deleteItemById: async (purchase_id) => {
        const payload = {
          purchase_id,
          client_id: client.value._id
        }
        await store.dispatch('PURCHASE_DELETE_BY_PURCHASE_ID', payload)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}

.collapsible-header {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 2rem;

  & i {
    font-size: 3rem;
    vertical-align: bottom;
    line-height: normal;
  }

  & span {
    font-weight: 300;
    margin-left: 10px;
  }
}

.icon-font {
  color: #2b2b4d
}
</style>