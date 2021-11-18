<template>
  <div>
    <AdminCollection/>
    <div class="card">
      <form @submit.prevent="updateHandler" class="card-content">
        <div class="input-field">
          <h6>Логин (для входа в систему)</h6>
          <input v-model="loaded.user.username" placeholder="username">
        </div>
        <div class="input-field">
          <h6>Имя</h6>
          <input v-model="loaded.user.name" placeholder="username">
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Сохранить
          <i class="material-icons right">send</i>
        </button>
        <button @click.stop="this.$router.replace(`/admin/userlist`)"
                class="btn waves-effect waves-light red btn-back" type="submit" name="action">Отменить
          <i class="material-icons right">cancel</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AdminCollection from '@/components/admin/AdminCollection'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AdminUserEdit',
  components: { AdminCollection },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let loaded = reactive({})
    let allUsers = computed(() => store.getters.users)
    const checkDouble = ref(false)

    onBeforeMount(() => {
      loaded.user = computed(() => store.getters.users.filter(user => user._id === route.params.id)[0])
    })

    const updateHandler = async () => {
      const payload = {
        id: loaded.user._id,
        update: {
          name: loaded.user.name,
          username: loaded.user.username
        }
      }
      await store.dispatch('UpdateUserFields', payload)
      await router.replace(`/admin/userlist`)
    }

    return { updateHandler, loaded, allUsers, checkDouble }

  }
}
</script>

<style lang="scss" scoped>
.card-title {
  padding-left: 20px;
}

.checkbox-card {
  padding-left: 15px;
  padding-right: 5px;
}

.checkbox-card__title {
  padding-left: 0;
}

[type="checkbox"] + span:not(.lever) {
  padding-left: 25px;
}

.btn-back {
  margin-left: 25px;
}
</style>