<template>

  <Loader v-if="isLoading"/>

  <div v-else-if="!isLoading" class="content">

    <div class="expense-header">
      <span class="material-icons-sharp icon-font expense-header__text first">paid</span>
      <span class="expense-header__text second">Внесение трат</span>
    </div>

    <table>
      <thead>
      <tr>
        <th>Дата</th>
        <th>Категория трат</th>
        <th>Сумма</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="row in expense_list" :key="row._id">
        <td>{{dateFilter(row.opened_at, 'datetime')}}</td>
        <td>{{row.category.name}}</td>
        <td>{{row.value}} ₽</td>
      </tr>

      </tbody>
    </table>

    <br>
    <i v-if="!addExpenseActive"  @click.stop="addExpenseActive = !addExpenseActive" class="material-icons small link">add</i>
    <div v-else-if="addExpenseActive">
      <i @click.stop="addExpenseActive = !addExpenseActive" class="material-icons small link">remove</i>
      <ExpenseAdd @close-form-and-reload-list="closeFormAndReloadData"/>
    </div>


  </div>

</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { dateFilter } from '@/utils'
import ExpenseAdd from '@/components/ExpenseAdd'
import Loader from '@/components/Loader'

export default {
  components: { ExpenseAdd, Loader },
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const category_list = ref(computed(() => store.getters.CAT_itemList))
    const expense_list = computed(() => store.getters.expenseList)
    const addExpenseActive = ref(false)


    onBeforeMount(async () => {
      await store.dispatch('DayFetchAllFromServer', 'opened')
      await store.dispatch('EXPENSE_FETCH_ALL')
      await store.dispatch('CAT_FetchAll', { apiPath: 'base/cat' })
      isLoading.value = false
    })

    async function deleteItemById(id) {
      await store.dispatch('EXPENSE_DELETE_BY_ID', id)
    }

    async function closeFormAndReloadData() {
      addExpenseActive.value = false
      await store.dispatch('EXPENSE_FETCH_ALL')
    }

    return {
      expense_list,
      dateFilter,
      category_list,
      deleteItemById,
      isLoading,
      addExpenseActive,
      closeFormAndReloadData
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
  }
}


.expense-header {
  vertical-align: baseline;
  box-sizing: inherit;
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;

  .expense-header__text {
    color: #2b2b4d;
    font-size: 3rem;
    padding: 0;
    align-items: center;
    height: 100%;
    vertical-align: center;

    &.second {
      font-size: 2.1rem;
      font-weight: 300;
    }

  }

}
</style>