<template>
  <li>
    <div class="collapsible-header">
      <slot>Хедер</slot>
    </div>
    <div class="collapsible-body">
      <table v-if="itemList.length>0">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>#</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, idx) in itemList" :key="idx">
          <td>{{ item.name }}</td>
          <td><i @click.stop="deleteItem(item._id)" class="material-icons-round link">delete_outline</i></td>
        </tr>
        </tbody>
      </table>
      <br>
      <AddCategoryTemplate :apiPath="props.apiPath"/>
    </div>
  </li>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import AddCategoryTemplate from '@/components/categorize/AddCategoryTemplate'

export default {
  components: { AddCategoryTemplate },
  props: {
    apiPath: { type: String },
    moduleName: { type: String },
    cyrName: { type: String },
  },
  setup(props) {
    const store = useStore()
    const path_to = `${props.moduleName.toUpperCase()}`

    const itemList = computed(() => store.getters[`${path_to}_itemList`])

    onBeforeMount(async () => {
      await store.dispatch(`${path_to}_FetchAll`, { apiPath: props.apiPath })
    })

    const createItem = async () => {
      await store.dispatch(`${path_to}_Create`, { apiPath: props.apiPath })
    }

    const deleteItem = async (id) => {
      await store.dispatch(`${path_to}_Remove`, {
        id,
        apiPath: props.apiPath
      })
    }

    return { itemList, createItem, props, deleteItem }

  }
}
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  padding: 0;
}
</style>