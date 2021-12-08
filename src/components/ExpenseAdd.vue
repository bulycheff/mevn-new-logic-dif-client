<template>

  <div class="row input-row">
    <div class="input-field col s12">
      <select v-model="form.category" class="browser-default">
        <option value="Категория расхода" disabled selected>Категория расхода</option>
        <option v-for="cat in catList" :key="cat._id" :value="cat.name">{{ cat.name }}</option>
      </select>
    </div>
    <div class="input-field col s12">
      <input v-model="form.value" type="text" placeholder="Сумма"/>
    </div>
  </div>
  <button @click.stop="reg_expense" class="btn">Сохранить</button>

</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'

export default {
  emits: ['close-form-and-reload-list'],
  setup(_, { emit }) {
    const store = useStore()

    const form = reactive({
      category: 'Категория расхода',
      value: 0
    })
    const catList = computed(() => store.getters.CAT_itemList)
    const selectedCat = computed(() => catList.value.filter(item => item.name === form.category)[0])

    const day_id = store.getters.openedDayId
    const data2send = computed(() => ({
      category: selectedCat.value._id,
      value: form.value,
      day_id
    }))

    const reg_expense = async () => {

      await store.dispatch('EXPENSE_CREATE_ONE', data2send.value)
      form.value = 0
      form.category = 'Категория расхода'
      emit('close-form-and-reload-list')
    }


    return {
      catList,
      selectedCat,
      form,
      data2send,
      reg_expense
    }
  }
}
</script>

<style scoped>

</style>