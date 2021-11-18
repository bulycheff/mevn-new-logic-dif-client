<template>
  <ul class="collapsible">
    <template v-for="(item, idx) in list" :key="idx">
      <CategoryTemplate :cyr-name="item.name" :api-path="item.apiPath" :module-name="item.apiPath.split('/')[1]">
        {{ item.name }}
      </CategoryTemplate>
    </template>
  </ul>
</template>

<script>
import { onMounted, ref } from 'vue'
import CategoryTemplate from '@/components/categorize/CategoryTemplate'
import M from 'materialize-css'

export default {
  components: {
    CategoryTemplate
  },
  setup() {
    const list = ref([
      { name: 'Категории затрат', apiPath: 'base/cat' },
      { name: 'Кассы', apiPath: 'base/cash' },
      { name: 'Способы оплаты', apiPath: 'base/method' },
      { name: 'Пластиковые карты', apiPath: 'base/card' },
      { name: 'Комнаты', apiPath: 'base/room' },
      { name: 'Услуги', apiPath: 'base/service' }
    ])

    onMounted(() => {
      M.AutoInit()
    })

    return { list }

  }
}
</script>

<style scoped>

</style>