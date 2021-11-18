<template>
  <form @submit.prevent="submitHandler" class="card">
    <div class="card-content">
      <div class="input-field">
        <input v-model="form.name" type="text" placeholder="Имя сотрудника">
        <input v-model="form.position" type="text" placeholder="Должность">
      </div>
    </div>
    <button class="btn waves-effect waves-light">Отредактирвать
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = ref(null)
    const form = reactive({
      name: '',
      position: ''
    })

    onBeforeMount(async () => {
      id.value = await route.params.id
      await store.dispatch('FetchOneEmployeeFromServer', id.value)
      form.name = computed(() => store.getters.employeeToEdit.name).value
      form.position = computed(() => store.getters.employeeToEdit.position).value
    })

    const submitHandler = async () => {
      const payload = { ...form, id: id.value }
      await store.dispatch('EditEmployeeOnServerById', payload)
      store.commit('SET_EMPLOYEE_TO_EDIT', null)
      await router.replace(`/admin/personal`)
    }

    return { form, submitHandler }
  }
}
</script>

<style lang="scss" scoped>
button.btn {
  background: #c75a3e;

  &:hover {
    color: #dbdbdb;
  }
}
</style>