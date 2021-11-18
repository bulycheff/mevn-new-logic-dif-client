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
          <th>Название программы</th>
          <th>Описание</th>
          <th>Стоимость</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in programList" :key="item._id">
          <td>
            <router-link :to="`/admin/program-item/${item._id}`">
              <i class="material-icons tiny edit-link link">edit</i>
            </router-link>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.cost }}</td>
          <td><i @click.stop="removeProgram(item._id)"
                 class="material-icons tiny edit-link link">remove_circle_outline</i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <i @click.stop="isFormOpen=!isFormOpen" class="material-icons small link">add</i>
    <ProgramAdd @close-form-and-reload-list="closeFormAndReloadList" v-if="isFormOpen"/>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import Loader from '@/components/Loader'
import ProgramAdd from '@/components/admin/ProgramAdd'
import { useStore } from 'vuex'

export default {
  components: { ProgramAdd, Loader },
  setup() {
    const store = useStore()
    const isFormOpen = ref(false)
    const isLoading = ref(false)
    const programList = computed(() => store.getters.programList)
    const onDataReload = async () => {
      await store.dispatch('ProgramFetchAllFromServer')
    }
    onBeforeMount(async () => {
      await onDataReload()
    })
    const closeFormAndReloadList = async () => {
      await onDataReload()
      isFormOpen.value = false
    }

    const removeProgram = async (id) => {
      await store.dispatch('ProgramRemoveFromServerById', id)
      await store.dispatch('ProgramFetchAllFromServer')
    }

    return {
      isFormOpen,
      isLoading,
      closeFormAndReloadList,
      programList,
      removeProgram

    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
}
</style>