<template>
  <Navbar class="navigation-bar"/>
  <div class="container app-container">
    <router-view/>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar'
import { useStore } from 'vuex'

export default {
  components: { Navbar },
  setup() {
    const store = useStore()

    onMounted(async () => {
      try {
        await store.dispatch('OnAppMounted')
      } catch (e) {
        console.log(e)
      }
    })

    return {}

  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.css';

.app-container {
  position: relative;
  top: 80px;
}

</style>
