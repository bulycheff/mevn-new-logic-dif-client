<template>
  <form @submit.prevent="submitHandler" class="card">
    <div class="card-content">
      <div class="input-field">
        <input v-model="form.name" type="text" placeholder="Наименование напитка">
        <input v-model="form.description" type="text" placeholder="Описание">
        <input v-model="form.cost" type="text" placeholder="Стоимость">
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
      description: '',
      cost: ''
    })

    onBeforeMount(async () => {
      id.value = await route.params.id
      await store.dispatch('BarFetchOneFromServerById', id.value)
      form.name = computed(() => store.getters.barToEdit.name).value
      form.description = computed(() => store.getters.barToEdit.description).value
      form.cost = computed(() => store.getters.barToEdit.cost).value
    })

    const submitHandler = async () => {
      const payload = { ...form, id: id.value }
      await store.dispatch('BarUpdateOnServerById', payload)
      store.commit('BAR_SET_ONE_TO_EDIT', null)
      await router.replace(`/admin/bar`)
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