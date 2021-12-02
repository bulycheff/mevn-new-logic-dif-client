<template>

  <Loader v-if="isLoading"/>

  <div v-else-if="!isLoading" class="content">
    <ul class="collapsible">
      <li>
        <div class="collapsible-header">
          <i class="material-icons-sharp icon-font">paid</i>
          <span>Внесение трат</span>
        </div>
        <div class="card-content collapsible-body">
          <table>
            <thead>
            <tr>
              <th></th>
              <th>Дата</th>
              <th>Категория трат</th>
              <th>Сумма</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="item in expense_list" :key="item._id">
              <td>#</td>
              <td>{{ dateFilter(item.opened_at, 'datetime') }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.value }} ₽</td>
              <td>
                <span @click.stop="deleteItemById(item._id)" class="material-icons-round link">delete_outline</span>
              </td>
            </tr>

            </tbody>
          </table>
          <br>
          <i class="material-icons small link">add</i>
          <ExpenseAdd/>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import { computed, onBeforeMount, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'
import { dateFilter } from '@/utils'
import ExpenseAdd from '@/components/ExpenseAdd'
import M from 'materialize-css'
import Loader from '@/components/Loader'

export default {
  components: { ExpenseAdd, Loader },
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const category_list = ref(computed(() => store.getters.CAT_itemList))
    let expense_list = ref()

    onBeforeMount(async () => {
      await store.dispatch('EXPENSE_FETCH_ALL')
      await store.dispatch('CAT_FetchAll', { apiPath: 'base/cat' })
      expense_list = computed(() => {
        return store.getters.expenseList.map(item => {
          let obj = new Object(item)
          obj.category_name = category_list.value.filter(cat_item => cat_item._id === item.category)[0].name
          return obj
        })
      })
      isLoading.value = false
    })


    let instance = ref()
    let elems = ref()
    onUpdated(()=> {
      elems.value = document.querySelectorAll('.collapsible')
      M.Collapsible.init(elems.value)
    })

    async function deleteItemById(id) {
      await store.dispatch('EXPENSE_DELETE_BY_ID', id)
    }

    return {
      expense_list,
      dateFilter,
      category_list,
      deleteItemById,
      isLoading,
      instance,
      elems
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

.icon-font {
  color: #2b2b4d;
  padding-right: 40px;
}
</style>