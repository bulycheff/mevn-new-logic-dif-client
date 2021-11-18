<template>
  <form @submit.prevent="submitHandler" class="card">
    <div class="card-content">
      <div class="input-field">
        <input v-model="form.name" type="text" placeholder="Имя клиента">
      </div>
    </div>
    <button class="btn waves-effect waves-light">Сохранить
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close-form-and-reload-list'],
  setup(_, { emit }) {
    const store = useStore()
    const form = reactive({
      name: '',
    })
    const dayId = computed(() => store.getters.openedDay._id)

    const submitHandler = async () => {
      await store.dispatch('ClientCreateOnServer', { name: form.name, dayId: dayId.value })
      form.name = ''
      emit('close-form-and-reload-list')
    }

    return { form, submitHandler, dayId }
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