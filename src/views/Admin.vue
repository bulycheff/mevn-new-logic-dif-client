<template>
  <div class="admin-window">
    <AdminCollection/>
    <div v-if="this.$route.params.name==='userlist'" class="user-list">
      <UsersTable/>
      <i v-show="this.$route.params.name==='userlist'" @click.prevent="showForm=!showForm"
         class="material-icons small link">add</i>
      <AddNewUser v-show="showForm && this.$route.params.name==='userlist'" @close-form="showForm=false"/>
    </div>
    <div v-else-if="this.$route.params.name==='personal'" class="employee-list">
      <Employee/>
    </div>
    <div v-else-if="this.$route.params.name==='programs'" class="programs-list">
      <Products/>
    </div>
    <div v-else-if="this.$route.params.name==='bar'" class="bar-list">
      <Bar/>
    </div>

  </div>
  <br>

</template>

<script>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import AdminCollection from '@/components/admin/AdminCollection'
import UsersTable from '@/components/admin/UsersTable'
import AddNewUser from '@/components/admin/AddNewUser'
import Employee from '@/components/admin/Employee'
import Products from '@/components/admin/Program'
import Bar from '@/components/admin/Bar'

export default {
  name: 'Admin',
  components: { Products, Employee, AddNewUser, UsersTable, AdminCollection, Bar },
  setup() {
    const showForm = ref(false)
    const route = useRoute()
    const query = computed(() => route.query)
    const loading = ref(true)

    return { query, loading, showForm }
  }
}
</script>

<style scoped lang="scss">
.link {
  cursor: pointer;
}

.admin-window {
  margin-top: 30px;
}
</style>