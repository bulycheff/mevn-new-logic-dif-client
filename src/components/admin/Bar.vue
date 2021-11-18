<template>
  <div v-if="isLoading" class="loading">
    <Loader/>
  </div>
  <div v-else class="row">
    <div class="card">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Наименование</th>
          <th>Описание</th>
          <th>Цена</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in barList" :key="item._id">
          <td>
            <router-link :to="`/admin/bar-item/${item._id}`">
              <i class="material-icons tiny edit-link link">edit</i>
            </router-link>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.cost }}</td>
          <td><i @click.stop="removeItemFromBarList(item._id)" class="material-icons tiny edit-link link">remove_circle_outline</i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <i @click.stop="isFormOpen=!isFormOpen" class="material-icons small link">add</i>
    <BarAdd v-if="isFormOpen" @close-form-and-reload-list="closeFormAndReloadList"/>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import BarAdd from '@/components/admin/BarAdd'
import Loader from '@/components/Loader'
import { useStore } from 'vuex'

export default {
  components: { Loader, BarAdd },
  setup() {
    const store = useStore()
    const isFormOpen = ref(false)
    const isLoading = ref(false)
    const barList = ref([])

    const onDataReload = async () => {
      await store.dispatch('BarFetchAllFromServer')
      barList.value = computed(() => store.getters.barList).value
    }

    const removeItemFromBarList = async (id) => {
      await store.dispatch('BarRemoveFromServerById', id)
      await onDataReload()
    }

    const closeFormAndReloadList = async () => {
      await onDataReload()
      isFormOpen.value = false
    }

    onBeforeMount(async () => {
      await onDataReload()
    })


    return {
      isFormOpen,
      isLoading,
      barList,
      removeItemFromBarList,
      closeFormAndReloadList
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>