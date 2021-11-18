<template>
  <div v-if="loading" class="loading">
    <Loader/>
  </div>
  <div v-else class="row">
    <div class="card">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Должность</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(employee, idx) in employeeList" :key="idx">
          <td>
            <router-link :to="`/admin/employee/${employee._id}`">
              <i class="material-icons tiny edit-link link">edit</i>
            </router-link>
          </td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position }}</td>
          <td><i @click.stop="removeItemFromList(employee._id)" class="material-icons tiny edit-link link">remove_circle_outline</i>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <i @click.stop="isFormOpen=!isFormOpen" class="material-icons small link">add</i>
    <EmployeeAdd v-if="isFormOpen" @close-form-and-reload-list="closeFormAndReloadList"/>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'
import Loader from '@/components/Loader'
import EmployeeAdd from '@/components/admin/EmployeeAdd'

export default {
  components: { EmployeeAdd, Loader },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const employeeList = ref([])
    const isFormOpen = ref(false)
    const isEditFormOpen = ref(false)

    const onDataReload = async () => {
      await store.dispatch('FetchEmployeeListFromServer')
      employeeList.value = computed(() => store.getters.employeeList).value
    }

    onBeforeMount(async () => {
      await store.dispatch('FetchEmployeeListFromServer')
      employeeList.value = computed(() => store.getters.employeeList).value
      loading.value = false
    })

    const closeFormAndReloadList = async () => {
      await store.dispatch('FetchEmployeeListFromServer')
      employeeList.value = computed(() => store.getters.employeeList).value
      isFormOpen.value = false
    }

    const removeItemFromList = async (id) => {
      await store.dispatch('RemoveEmployeeFromServerById', id)
      await onDataReload()
    }

    return {
      loading,
      employeeList,
      closeFormAndReloadList,
      isFormOpen,
      removeItemFromList,
      isEditFormOpen,
    }

  }
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>