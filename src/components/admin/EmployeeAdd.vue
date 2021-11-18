<template>
  <form @submit.prevent="submitHandler" class="card">
    <div class="card-content">
      <div class="input-field">
        <input v-model="form.name" type="text" placeholder="Имя сотрудника">
        <input v-model="form.position" type="text" placeholder="Должность">
      </div>
    </div>
    <button class="btn waves-effect waves-light">Сохранить
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close-form-and-reload-list'],
  setup(_, { emit }) {
    const store = useStore()
    const form = reactive({
      name: '',
      position: 'Мастер'
    })

    const submitHandler = async () => {
      await store.dispatch('SaveEmployeeToServer', form)
      form.name = ''
      form.position = 'Мастер'
      emit('close-form-and-reload-list')
    }

    return { form, submitHandler }
  }

}
</script>

<style lang="scss" scoped>
button.btn {
  background: #2b2b4d;

  &:hover {
    color: #dbdbdb;
  }
}
</style>