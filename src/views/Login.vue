<template>
  <div class="col s12 m8 l4 offset-m2 offset-l4">
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="submitHandler">
          <div class="form-field">
            <label for="username">Имя пользователя</label>
            <input v-model="form.username" type="text" id="username"
                   placeholder="Имя пользователя" autocomplete="username">
          </div>
          <div class="form-field">
            <label for="password">Пароль</label>
            <input v-model="form.password" type="password" id="password"
                   placeholder="Пароль" autocomplete="password">
          </div>
          <br>
          <button class="btn-large waves-effect waves-dark" style="width:100%;">Login
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: "Login",
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      username: '',
      password: ''
    })

    const submitHandler = async () => {
      try {
        await store.dispatch('Login', form)
        if (store.getters.isAuth) {
          form.username = ''
          form.password = ''
          await router.push('/')
          console.log('Вход в систему')
        } else {
          console.log('Неверная пара логин/пароль')
        }
      } catch (e) {
        console.log(e)
      }
      if (store.getters.isAdmin) {
        await store.dispatch('FetchAllUsersFromApi')
      }
    }

    return { form, submitHandler }
  }
}
</script>

<style lang="scss" scoped>
button {
  background: #2b2b4d;

  &:hover {
    background: #426084;
  }

  &:active {
    background: #2d4b6b;
  }

  &:focus {
    background: #3e2983;
  }
}
</style>