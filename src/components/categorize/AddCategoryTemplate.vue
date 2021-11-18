<template>
  <div class="">
    <form @submit.prevent="addNewItem" class="row">
      <div class="input-field col s6">
        <input v-model="form.name" id="first_name" type="text" class="validate">
      </div>
      <button class="btn">Добавить</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: ['apiPath'],
  setup(props) {
    const form = {
      name: ''
    }
    const store = useStore()

    const path_to = `${props.apiPath.split('/')[1].toUpperCase()}`

    const addNewItem = async () => {
      await store.dispatch(`${path_to}_Create`, { apiPath: props.apiPath, ...form })
      form.name=''
    }

    return { form, addNewItem }
  }
}
</script>

<style scoped>

</style>