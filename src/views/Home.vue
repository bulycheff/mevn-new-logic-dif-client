<template>
  <div class="home">
    <div class="card">
      <div class="card-action">
        <h6>Чтобы начать работу в системе</h6>
      </div>
      <div class="card-content">
        <ol>
          <li>
            <router-link to="/days">Открыть</router-link>
            смену
          </li>
          <li>
            <span v-if="!isDayOpen">Добавить</span>
            <router-link v-else to="/clients">Добавить</router-link>
            клиентов
          </li>
          <li>Фиксировать покупки программ и бара</li>
        </ol>
      </div>
    </div>
  </div>
  <br>
  <br>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const store = useStore()
    const isDayOpen = computed(() => store.getters.isDayOpen)

    return { isDayOpen }
  }
}
</script>

<style lang="scss" scoped>
.card-action {
  background: #dbdbdb;
}


</style>