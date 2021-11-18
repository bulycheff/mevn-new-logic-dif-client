<template>
  <div class="">
    <form @submit.prevent="saveUserHandler" class="card">
      <div class="card-content">
        <div class="input-field">
          <input v-model="form.username" type="text" placeholder="Логин для входа в систему">
          <input v-model="form.password" type="password" placeholder="Пароль">
          <input v-model="form.name" type="text" placeholder="Имя пользователя">
        </div>
        <p class="role-title">Роль пользователя</p>
        <label>
          <input type="radio" value="user" v-model="roleChecked"/>
          <span>user</span>
        </label>
        <label>
          <input type="radio" value="manager" v-model="roleChecked"/>
          <span>manager</span>
        </label>
        <label>
          <input type="radio" value="director" v-model="roleChecked"/>
          <span>director</span>
        </label>
      </div>

      <button class="btn waves-effect waves-light">Сохранить
        <i class="material-icons right">send</i>
      </button>
    </form>

  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close-form'],
  setup(_, { emit }) {
    const store = useStore()
    const form = reactive({
      username: '',
      name: '',
      password: '',
    })
    const roleChecked = ref('user')
    const saveUserHandler = async () => {
      if (!form.username || !form.password) {
        return console.error('Логин и пароль не должны быть пустыми')
      }
      const payload = {
        role: [roleChecked.value],
        username: form.username,
        name: form.name,
        password: form.password
      }

      await store.dispatch('CreateNewUserByApi', payload)
      await store.dispatch('FetchAllUsersFromApi')
      form.username = ''
      form.password = ''
      form.name = ''
      emit('close-form')
    }
    return { saveUserHandler, roleChecked, form }
  },
}
</script>

<style lang="scss" scoped>
[type="radio"]:not(:checked) + span, [type="radio"]:checked + span {
  padding-left: 25px;
  padding-right: 5px;
}

.role-title {
  padding-top: 10px;
  padding-bottom: 5px;
}

button {
  background: #2b2b4d;

  &:hover {
    background: #282864;
    color: #dbdbdb;

  }

}

</style>