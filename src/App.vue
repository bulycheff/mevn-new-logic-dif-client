<template>
  <Navbar class="navigation-bar"/>
  <div class="container app-container">
    <router-view/>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import Navbar from '@/components/Navbar'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  components: { Navbar },
  setup() {
    const store = useStore()

    onBeforeMount(async () => {
      try {
        await store.dispatch('CheckTokenAndUserBeforeMountApp')
      } catch (e) {
        console.log(e)
      }
      if(!store.getters.user) {
        await router.replace('/login')
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
