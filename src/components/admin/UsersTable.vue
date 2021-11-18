<template>
  <div class="admin-window__content">
    <div class="row users-page">
      <div class="card">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Логин для входа</th>
            <th>Имя</th>
            <th>Роли</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user._id">
            <td><i v-show="user.username!=='admin'" @click="this.$router.replace(`/admin/user/${user._id}`)"
                   class="material-icons tiny edit-link">edit</i></td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
            <td><i v-show="user.username!=='admin'" @click="removeUser(user._id)" class="material-icons tiny edit-link">remove_circle_outline</i>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersTable',
  setup() {
    const store = useStore()
    const users = computed(() => store.getters.users)

    onBeforeMount(async () => {
      if (store.getters.isAdmin) {
        await store.dispatch('FetchAllUsersFromApi')
      }
    })

    const removeUser = async id => {
      await store.dispatch('DeleteUserFromApiById', id)
      await store.dispatch('FetchAllUsersFromApi')
    }

    return { users, removeUser }
  }
}
</script>

<style lang="scss" scoped>

.admin-window__content {
  margin-top: 30px;
}

.edit-link {
  cursor: pointer;
}
</style>