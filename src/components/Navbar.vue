<template>
  <nav class="navbar-fixed navigation">
    <div class="container">
      <router-link to="/" class="brand-logo">CRM</router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li v-show="isAuth">
          <router-link to="/days">Смена</router-link>
        </li>
        <li v-show="isAuth && isDayOpen">
          <router-link to="/clients">Клиенты</router-link>
        </li>
        <li v-show="isAuth && isDayOpen">
          <router-link to="/expenses">Затраты</router-link>
        </li>
        <li v-show="isAuth && isAdmin">
          <router-link to="/admin/userlist">Админ панель</router-link>
        </li>
        <li v-show="isAuth && isAdmin">
          <router-link to="/history/1">История</router-link>
        </li>
        <li v-show="isAuth && isAdmin">
          <router-link to="/categorize">Другое</router-link>
        </li>
        <li v-show="!isAuth">
          <router-link to="/login">Войти</router-link>
        </li>
        <li v-show="isAuth">
          <span class="navigation-link" @click="logOut">Выйти</span>
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li v-show="isAuth">
      <router-link to="/days">Смена</router-link>
    </li>
    <li v-show="isAuth && isDayOpen">
      <router-link to="/clients">Клиенты</router-link>
    </li>
    <li v-show="isAuth && isDayOpen">
      <router-link to="/expenses">Затраты</router-link>
    </li>
    <li v-show="isAuth && isAdmin">
      <router-link to="/admin/userlist">Админ панель</router-link>
    </li>
    <li v-show="isAuth && isAdmin">
      <router-link to="/history/1">История</router-link>
    </li>
    <li v-show="isAuth && isAdmin">
      <router-link to="/categorize">Другое</router-link>
    </li>
    <li v-show="!isAuth">
      <router-link to="/login">Войти</router-link>
    </li>
    <li v-show="isAuth">
      <span class="navigation-link" @click="logOut">Выйти</span>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import M from 'materialize-css'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    onUpdated(() => {
      let elems = document.querySelectorAll('.sidenav')
      M.Sidenav.init(elems, {})
    })

    const logOut = () => {
      store.dispatch('Logout')
      console.log('Выход из системы')
      router.replace('/login')
    }

    const isAuth = computed(() => store.getters.isAuth)
    const isAdmin = computed(() => store.getters.isAdmin)
    const isDayOpen = computed(() => store.getters.isDayOpen)

    return { logOut, isAuth, isAdmin, isDayOpen }
  }
}
</script>

<style scoped>
.navigation {
  background: #2b2b4d;
  position: fixed;
  top: 0;
}

.navigation-link {
  transition: background-color .3s;
  font-size: 1rem;
  display: block;
  padding: 0 30px;
  cursor: pointer;
  font-weight: 500;
}

</style>