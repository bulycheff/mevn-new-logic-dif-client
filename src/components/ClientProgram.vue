<template>

  <ul class="collapsible">
    <li>
      <div class="collapsible-header">
        <i class="material-icons-sharp icon-font">timelapse</i>
        <span>Программы</span>
      </div>
      <div class="card-content collapsible-body table-responsive">

        <table v-if="!programListIsEmpty">
          <thead>
          <tr>
            <th></th>
            <th>Время</th>
            <th>Наименование</th>
            <th>Услуга</th>
            <th>Мастер</th>
            <th>Стоимость</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="item in programPurchaseList" :key="item._id">
            <td>
              <span class="material-icons-round">edit_note</span>
            </td>
            <td>{{ dateFilter(item.opened_at, 'datetime') }}</td>
            <td>{{ item.item_name }}</td>
            <td>{{ item.service_name }}</td>
            <td>{{ item.employee_name }}</td>
            <td>{{ item.item_cost_discounted }}</td>
            <td>
              <span @click.stop="deleteItemById(item._id)" class="material-icons-round link">delete_outline</span>
            </td>
          </tr>

          </tbody>
        </table>
        <i v-if="!isFormActive" @click.stop="isFormActive=true" class="material-icons small link">add</i>
        <i v-if="isFormActive" @click.stop="isFormActive=false" class="material-icons small link">remove</i>
        <ClientProgramAdd @close-add-program-form="isFormActive=!isFormActive" v-if="isFormActive"/>
      </div>
    </li>
  </ul>
</template>

<script>
import { dateFilter } from '@/utils'
import { computed, ref } from 'vue'
import ClientProgramAdd from '@/components/ClientProgramAdd'
import { useStore } from 'vuex'

export default {
  components: { ClientProgramAdd },
  setup() {
    const store = useStore()

    const isFormActive = ref(false)
    const client = computed(() => store.getters.clientToEdit)
    const day = computed(() => store.getters.openedDay)
    const programPurchaseList = computed(() => store.getters.purchaseList.filter(item => item.payment_category === 'program'))
    const programListIsEmpty = computed(() => !programPurchaseList.value.length)

    return {
      isFormActive,
      client,
      day,
      programPurchaseList,
      programListIsEmpty,
      deleteItemById: async (purchase_id) => {
        const payload = {
          purchase_id,
          client_id: client.value._id
        }
        await store.dispatch('PURCHASE_DELETE_BY_PURCHASE_ID', payload)
      },
      dateFilter
    }
  }
}
</script>

<style lang="scss">
.program-card {
  border: 1px solid #3c494a;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 80%;
  text-align: center;


}

.time-block {

}

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

.programs {
  display: flex;
  flex-wrap: nowrap;

  .one-program {
    min-width: 300px;

  }
}


</style>