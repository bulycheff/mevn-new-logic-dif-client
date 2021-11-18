<template>
  <div class="">

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onBeforeMount } from 'vue'

export default {
  setup() {
    const store = useStore()
    onBeforeMount(async () => {
      await store.dispatch('cat/FetchAll')
    })
  }
}
</script>

<style scoped>

</style>